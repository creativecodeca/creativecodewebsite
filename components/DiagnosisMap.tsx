import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MiniMap,
  Position,
} from 'reactflow';
import dagre from 'dagre';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';
import DiagnosisNode, { DiagnosisNodeData } from './DiagnosisNode';
import DiagnosisSearch from './DiagnosisSearch';
import { rawTreeData, TreeNode, getAllNodes, getChildrenIds } from '../data/diagnosticTree';

// Node types for React Flow
const nodeTypes = {
  diagnosisNode: DiagnosisNode,
};

// Create dagre graph for layout
const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = 'TB',
  collapsedNodes: Set<string>
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const nodeWidth = 250;
  const nodeHeight = 80;
  
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 100,
    ranksep: 150,
    marginx: 50,
    marginy: 50,
  });

  // Filter out collapsed nodes and their descendants
  const visibleNodeIds = new Set<string>();
  const addVisibleNodes = (nodeId: string) => {
    visibleNodeIds.add(nodeId);
    if (!collapsedNodes.has(nodeId)) {
      const children = getChildrenIds(nodeId);
      children.forEach(childId => addVisibleNodes(childId));
    }
  };
  addVisibleNodes('root');

  // Only add visible nodes to the graph
  const visibleNodes = nodes.filter(node => visibleNodeIds.has(node.id));
  const visibleEdges = edges.filter(
    edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
  );

  visibleNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  visibleEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = visibleNodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
  });

  return { nodes: layoutedNodes, edges: visibleEdges };
};

// Convert tree data to React Flow nodes and edges
const convertTreeToFlow = (
  tree: TreeNode,
  collapsedNodes: Set<string>,
  onToggle: (id: string) => void
): { nodes: Node<DiagnosisNodeData>[]; edges: Edge[] } => {
  const allNodes = getAllNodes(tree);
  const nodes: Node<DiagnosisNodeData>[] = [];
  const edges: Edge[] = [];

  allNodes.forEach((treeNode) => {
    nodes.push({
      id: treeNode.id,
      type: 'diagnosisNode',
      position: { x: 0, y: 0 }, // Will be set by layout
      data: {
        label: treeNode.label,
        level: treeNode.level,
        collapsed: collapsedNodes.has(treeNode.id),
        childCount: treeNode.children.length,
        onToggle,
      },
    });

    // Create edges to children
    treeNode.children.forEach((child) => {
      edges.push({
        id: `${treeNode.id}-${child.id}`,
        source: treeNode.id,
        target: child.id,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    });
  });

  return { nodes, edges };
};

const DiagnosisMap: React.FC = () => {
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  
  // Toggle node collapse/expand
  const handleToggle = useCallback((nodeId: string) => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Convert tree to flow format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertTreeToFlow(rawTreeData, collapsedNodes, handleToggle),
    [collapsedNodes, handleToggle]
  );

  // Apply layout
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges, 'TB', collapsedNodes),
    [initialNodes, initialEdges, collapsedNodes]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // Update nodes when layout changes
  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

  // Navigate to node from search
  const handleNavigateToNode = useCallback((nodeId: string) => {
    setHighlightedNode(nodeId);
    
    // Expand all parent nodes
    const allNodesData = getAllNodes(rawTreeData);
    const targetNode = allNodesData.find(n => n.id === nodeId);
    if (targetNode && targetNode.parent) {
      // Find path to root and expand all parents
      const pathToRoot: string[] = [];
      let current = targetNode;
      while (current.parent) {
        pathToRoot.push(current.parent);
        const parent = allNodesData.find(n => n.id === current.parent);
        if (!parent) break;
        current = parent;
      }
      
      setCollapsedNodes((prev) => {
        const newSet = new Set(prev);
        pathToRoot.forEach(id => newSet.delete(id));
        return newSet;
      });
    }

    // Scroll to node (React Flow will handle this with fitView)
    setTimeout(() => {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        // Focus on the node
        window.dispatchEvent(new CustomEvent('focus-node', { detail: { nodeId } }));
      }
    }, 500);

    // Clear highlight after 3 seconds
    setTimeout(() => setHighlightedNode(null), 3000);
  }, [nodes]);

  // Highlight effect for nodes
  const highlightedNodes = useMemo(() => {
    if (!highlightedNode) return nodes;
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        highlighted: node.id === highlightedNode,
      },
      style: node.id === highlightedNode ? {
        ...node.style,
        boxShadow: '0 0 0 3px #3b82f6',
        zIndex: 1000,
      } : node.style,
    }));
  }, [nodes, highlightedNode]);

  return (
    <motion.div 
      className="w-screen h-screen dot-grid-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ReactFlow
        nodes={highlightedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#e5e7eb"
        />
        <Controls 
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg"
          showInteractive={false}
        />
        <MiniMap 
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg"
          nodeColor={(node) => {
            const level = (node.data as DiagnosisNodeData).level;
            const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#10b981', '#6b7280'];
            return colors[Math.min(level - 1, colors.length - 1)];
          }}
          maskColor="rgba(0, 0, 0, 0.05)"
        />
      </ReactFlow>

      {/* Search Overlay */}
      <DiagnosisSearch onNavigate={handleNavigateToNode} />

      {/* Instructions */}
      <motion.div
        className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-sm border border-gray-200"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-sm font-bold text-gray-900 mb-2">How to Use</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click nodes to expand/collapse branches</li>
          <li>• Drag to pan, scroll to zoom</li>
          <li>• Use search (bottom right) to find specific issues</li>
          <li>• Colors indicate problem severity/level</li>
        </ul>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h3 className="text-sm font-bold text-gray-900 mb-2">Problem Levels</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-700">Level 1: Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-700">Level 2: Major</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-700">Level 3: Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700">Level 4: Minor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-700">Level 5: Specific</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosisMap;

