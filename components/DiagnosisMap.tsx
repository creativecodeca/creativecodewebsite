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
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import dagre from 'dagre';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import 'reactflow/dist/style.css';
import DiagnosisNode, { DiagnosisNodeData } from './DiagnosisNode';
import DiagnosisSearch from './DiagnosisSearch';
import ContextMenu from './ContextMenu';
import AIModal from './AIModal';
import { rawTreeData, TreeNode, getAllNodes, getChildrenIds } from '../data/diagnosticTree';

// Node types for React Flow
const nodeTypes = {
  diagnosisNode: DiagnosisNode,
};

// Create dagre graph for layout - only layouts visible nodes
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
    nodesep: 50,
    ranksep: 80,
    marginx: 50,
    marginy: 50,
  });

  // Filter to only visible nodes based on collapse state
  const visibleNodeIds = new Set<string>();
  const addVisibleNodes = (nodeId: string) => {
    visibleNodeIds.add(nodeId);
    if (!collapsedNodes.has(nodeId)) {
      const children = getChildrenIds(nodeId);
      children.forEach(childId => addVisibleNodes(childId));
    }
  };
  addVisibleNodes('root');

  // Only add visible nodes to layout
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
    const dagreNode = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: dagreNode.x - (nodeWidth / 2),
        y: dagreNode.y - (nodeHeight / 2),
      },
      sourcePosition: 'bottom',
      targetPosition: 'top',
    };
  });

  return { nodes: layoutedNodes, edges: visibleEdges };
};

// Convert tree data to React Flow nodes and edges
const convertTreeToFlow = (
  tree: TreeNode,
  collapsedNodes: Set<string>,
  onToggle: (id: string) => void,
  handleContextMenu: (id: string, event: React.MouseEvent) => void
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
        onContextMenu: handleContextMenu,
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

const DiagnosisMapContent: React.FC = () => {
  const { fitView } = useReactFlow();
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(() => {
    const allNodesData = getAllNodes(rawTreeData);
    return new Set(allNodesData.map(n => n.id).filter(id => id !== 'root'));
  });
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId: string; nodeLabel: string } | null>(null);
  
  // AI Modal state
  const [aiModal, setAiModal] = useState<{ isOpen: boolean; title: string; content: string; isLoading: boolean }>({
    isOpen: false,
    title: '',
    content: '',
    isLoading: false,
  });

  // Handle context menu
  const handleContextMenu = useCallback((nodeId: string, event: React.MouseEvent) => {
    const allNodesData = getAllNodes(rawTreeData);
    const node = allNodesData.find(n => n.id === nodeId);
    if (node) {
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        nodeId,
        nodeLabel: node.label,
      });
    }
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Handle AI Explain
  const handleExplain = useCallback(async () => {
    if (!contextMenu) return;
    
    closeContextMenu();
    setAiModal({
      isOpen: true,
      title: `Explaining: ${contextMenu.nodeLabel}`,
      content: '',
      isLoading: true,
    });

    try {
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodeId: contextMenu.nodeId,
          nodeLabel: contextMenu.nodeLabel,
          mode: 'explain',
        }),
      });

      const data = await response.json();
      
      setAiModal({
        isOpen: true,
        title: `Explaining: ${contextMenu.nodeLabel}`,
        content: data.content || 'Unable to generate explanation.',
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setAiModal({
        isOpen: true,
        title: `Explaining: ${contextMenu.nodeLabel}`,
        content: 'Failed to generate explanation. Please try again.',
        isLoading: false,
      });
    }
  }, [contextMenu, closeContextMenu]);

  // Handle AI Solve
  const handleSolve = useCallback(async () => {
    if (!contextMenu) return;
    
    closeContextMenu();
    setAiModal({
      isOpen: true,
      title: `Solutions for: ${contextMenu.nodeLabel}`,
      content: '',
      isLoading: true,
    });

    try {
      const response = await fetch('/api/ai-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodeId: contextMenu.nodeId,
          nodeLabel: contextMenu.nodeLabel,
          mode: 'solve',
        }),
      });

      const data = await response.json();
      
      setAiModal({
        isOpen: true,
        title: `Solutions for: ${contextMenu.nodeLabel}`,
        content: data.content || 'Unable to generate solutions.',
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching solutions:', error);
      setAiModal({
        isOpen: true,
        title: `Solutions for: ${contextMenu.nodeLabel}`,
        content: 'Failed to generate solutions. Please try again.',
        isLoading: false,
      });
    }
  }, [contextMenu, closeContextMenu]);

  const closeAiModal = useCallback(() => {
    setAiModal({
      isOpen: false,
      title: '',
      content: '',
      isLoading: false,
    });
  }, []);

  // Recenter map and collapse all nodes
  const handleRecenter = useCallback(() => {
    setIsSpinning(true);
    
    // Collapse all nodes
    const allNodesData = getAllNodes(rawTreeData);
    const allNodeIds = new Set(allNodesData.map(n => n.id).filter(id => id !== 'root'));
    setCollapsedNodes(allNodeIds);
    
    // Fit view after a short delay to allow nodes to collapse
    requestAnimationFrame(() => {
      setTimeout(() => {
        fitView({ 
          duration: 1000, // Longer for recenter
          padding: 0.25 
        });
        // Stop spinning after the full animation completes
        setTimeout(() => {
          setIsSpinning(false);
        }, 1000);
      }, 100);
    });
  }, [fitView]);

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
    
    // Zoom to the entire visible tree to keep context
    // Use requestAnimationFrame to ensure the fitView happens AFTER the next render cycle
    // this prevents the "overshoot" jitter where camera and nodes move at once
    requestAnimationFrame(() => {
      setTimeout(() => {
        fitView({
          duration: 800, // Slightly longer for a more "expensive" feel
          padding: 0.35, // More generous padding
        });
      }, 50);
    });
  }, [fitView]); // Fixed dependency

  // Convert tree to flow format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertTreeToFlow(rawTreeData, collapsedNodes, handleToggle, handleContextMenu),
    [collapsedNodes, handleToggle, handleContextMenu]
  );

  // Layout based on visible nodes only
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
    requestAnimationFrame(() => {
      setTimeout(() => {
        fitView({
          nodes: [{ id: nodeId }],
          duration: 800,
          padding: 0.5,
          minZoom: 0.5,
          maxZoom: 1.2,
        });
      }, 100);
    });

    // Clear highlight after 3 seconds
    setTimeout(() => setHighlightedNode(null), 3000);
  }, [fitView]);

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
        onInit={(instance) => {
          // Initial fit view after React Flow is ready
          instance.fitView({ padding: 0.15, duration: 0, minZoom: 0.5 });
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        fitView={false}
        panOnDrag={true}
        zoomOnScroll={true}
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
      </ReactFlow>

      {/* Search Overlay */}
      <DiagnosisSearch onNavigate={handleNavigateToNode} />

      {/* Compass Recenter Button - to the right of search, vertically centered */}
      <motion.button
        onClick={handleRecenter}
        className="absolute top-[2.2rem] left-[27.5rem] transition-all group z-50 h-[52px] flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Compass 
          className={`w-10 h-10 text-white transition-transform ${isSpinning ? 'animate-spin-custom' : ''} group-hover:scale-110 active:scale-95`}
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

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onExplain={handleExplain}
            onSolve={handleSolve}
            onClose={closeContextMenu}
          />
        )}
      </AnimatePresence>

      {/* AI Modal */}
      <AnimatePresence>
        {aiModal.isOpen && (
          <AIModal
            title={aiModal.title}
            content={aiModal.content}
            isLoading={aiModal.isLoading}
            onClose={closeAiModal}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main wrapper component with client-side mounting guard
const DiagnosisMap: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-screen h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <DiagnosisMapContent />
    </ReactFlowProvider>
  );
};

export default DiagnosisMap;

