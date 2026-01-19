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
import { Compass } from 'lucide-react';
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
  
  const nodeWidth = 280;
  const nodeHeight = 90;
  
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 80,
    ranksep: 120,
    marginx: 100,
    marginy: 100,
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

  // Calculate center offset based on root position
  const rootNode = dagreGraph.node('root');
  const centerOffsetX = rootNode ? -rootNode.x + nodeWidth / 2 : 0;
  const centerOffsetY = rootNode ? -rootNode.y + nodeHeight / 2 : 0;
  
  const layoutedNodes = visibleNodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2 + centerOffsetX,
        y: nodeWithPosition.y - nodeHeight / 2 + centerOffsetY,
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
  const [isSpinning, setIsSpinning] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  // Recenter map and collapse all nodes
  const handleRecenter = useCallback(() => {
    if (!reactFlowInstance) return;
    
    setIsSpinning(true);
    
    // Collapse all nodes
    const allNodesData = getAllNodes(rawTreeData);
    const allNodeIds = new Set(allNodesData.map(n => n.id).filter(id => id !== 'root'));
    setCollapsedNodes(allNodeIds);
    
    // Fit view after a short delay to allow nodes to collapse
    setTimeout(() => {
      reactFlowInstance.fitView({ duration: 800, padding: 0.2 });
      // Stop spinning after the full animation completes
      setTimeout(() => {
        setIsSpinning(false);
      }, 800);
    }, 100);
  }, [reactFlowInstance]);

  // Toggle node collapse/expand with auto-collapse siblings
  const handleToggle = useCallback((nodeId: string) => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      const allNodesData = getAllNodes(rawTreeData);
      const clickedNode = allNodesData.find(n => n.id === nodeId);
      
      const wasCollapsed = newSet.has(nodeId);
      
      if (wasCollapsed) {
        // Expanding this node
        newSet.delete(nodeId);
      } else {
        // Collapsing this node
        newSet.add(nodeId);
        
        // Also collapse all descendants
        const collapseDescendants = (id: string) => {
          const node = allNodesData.find(n => n.id === id);
          if (node) {
            node.children.forEach(child => {
              newSet.add(child.id);
              collapseDescendants(child.id);
            });
          }
        };
        collapseDescendants(nodeId);
      }
      
      // Auto-collapse siblings when expanding
      if (wasCollapsed && clickedNode?.parent) {
        const parent = allNodesData.find(n => n.id === clickedNode.parent);
        if (parent) {
          parent.children.forEach(sibling => {
            if (sibling.id !== nodeId) {
              newSet.add(sibling.id);
              // Also collapse all descendants of siblings
              const collapseDescendants = (id: string) => {
                const node = allNodesData.find(n => n.id === id);
                if (node) {
                  node.children.forEach(child => {
                    newSet.add(child.id);
                    collapseDescendants(child.id);
                  });
                }
              };
              collapseDescendants(sibling.id);
            }
          });
        }
      }
      
      return newSet;
    });
    
    // Zoom to the clicked node after state updates
    if (reactFlowInstance) {
      setTimeout(() => {
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
          reactFlowInstance.fitView({
            nodes: [node],
            duration: 600,
            padding: 0.5,
            minZoom: 0.5,
            maxZoom: 1.2,
          });
        }
      }, 100);
    }
  }, [reactFlowInstance, nodes]);

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
        onInit={setReactFlowInstance}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        minZoom={0.3}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1f1f1f"
        />
        <Controls 
          showInteractive={false}
        />
      </ReactFlow>

      {/* Search Overlay */}
      <DiagnosisSearch onNavigate={handleNavigateToNode} />

      {/* Compass Recenter Button - to the right of search */}
      <motion.button
        onClick={handleRecenter}
        className="absolute top-6 left-[25.5rem] bg-black/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/10 hover:bg-black/100 hover:border-white/20 transition-all group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Compass 
          className={`w-8 h-8 text-white transition-transform ${isSpinning ? 'animate-spin' : ''}`}
        />
      </motion.button>

      {/* Legend */}
      <motion.div
        className="absolute bottom-6 left-6 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h3 className="text-sm font-bold text-white mb-2">Problem Levels</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-200">Level 1: Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-200">Level 2: Major</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-200">Level 3: Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-200">Level 4: Minor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-200">Level 5: Specific</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosisMap;

