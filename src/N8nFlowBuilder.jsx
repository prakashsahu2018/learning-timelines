import React, { useState, useRef, useCallback, useEffect } from 'react';

// ─── Journey Data ─────────────────────────────────────────────────────────────
const initialNodes = [
  {
    id: 'trigger-1',
    type: 'trigger',
    title: 'Journey Start',
    subtitle: 'When learner enrolls',
    x: 80,
    y: 200,
    icon: '⚡',
    color: '#8b5cf6',
    outputs: ['out-1'],
    inputs: [],
    data: { event: 'enrollment', delay: 'immediate' },
  },
  {
    id: 'module-1',
    type: 'module',
    title: 'Self Awareness',
    subtitle: '3 activities · 1h 35m',
    x: 380,
    y: 120,
    icon: '🧠',
    color: '#10b981',
    outputs: ['out-1'],
    inputs: ['in-1'],
    data: {
      status: 'completed',
      items: [
        { name: 'Personality Assessment', duration: '30 min', type: 'assessment', done: true },
        { name: 'Strengths Finder', duration: '45 min', type: 'exercise', done: true },
        { name: 'Reflection Journal', duration: '20 min', type: 'activity', done: true },
      ],
    },
  },
  {
    id: 'condition-1',
    type: 'condition',
    title: 'Score Check',
    subtitle: 'Assessment ≥ 80%?',
    x: 700,
    y: 120,
    icon: '🔀',
    color: '#f59e0b',
    outputs: ['true', 'false'],
    inputs: ['in-1'],
    data: { condition: 'score >= 80', trueLabel: 'Pass', falseLabel: 'Retry' },
  },
  {
    id: 'module-2',
    type: 'module',
    title: 'Communication Skills',
    subtitle: '3 activities · 1h 35m',
    x: 1020,
    y: 60,
    icon: '💬',
    color: '#3b82f6',
    outputs: ['out-1'],
    inputs: ['in-1'],
    data: {
      status: 'in-progress',
      items: [
        { name: 'Active Listening', duration: '25 min', type: 'video', done: true },
        { name: 'Giving Feedback', duration: '30 min', type: 'video', done: false },
        { name: 'Practice Session', duration: '40 min', type: 'exercise', done: false },
      ],
    },
  },
  {
    id: 'retry-1',
    type: 'action',
    title: 'Send Retry Email',
    subtitle: 'Notify & reset module',
    x: 1020,
    y: 260,
    icon: '📧',
    color: '#ef4444',
    outputs: ['out-1'],
    inputs: ['in-1'],
    data: { action: 'send_email', template: 'retry_notification' },
  },
  {
    id: 'module-3',
    type: 'module',
    title: 'Team Leadership',
    subtitle: '3 activities · 2h 20m',
    x: 1340,
    y: 60,
    icon: '👥',
    color: '#6366f1',
    outputs: ['out-1'],
    inputs: ['in-1'],
    data: {
      status: 'locked',
      items: [
        { name: 'Delegation Basics', duration: '35 min', type: 'video', done: false },
        { name: 'Conflict Resolution', duration: '45 min', type: 'video', done: false },
        { name: 'Team Exercise', duration: '60 min', type: 'exercise', done: false },
      ],
    },
  },
  {
    id: 'wait-1',
    type: 'wait',
    title: 'Cool Down',
    subtitle: 'Wait 2 days',
    x: 1660,
    y: 60,
    icon: '⏳',
    color: '#ec4899',
    outputs: ['out-1'],
    inputs: ['in-1'],
    data: { duration: '2 days' },
  },
  {
    id: 'cert-1',
    type: 'action',
    title: 'Issue Certificate',
    subtitle: 'Generate & email cert',
    x: 1960,
    y: 60,
    icon: '🏆',
    color: '#f59e0b',
    outputs: [],
    inputs: ['in-1'],
    data: { action: 'issue_certificate', template: 'leadership_cert' },
  },
  {
    id: 'note-1',
    type: 'note',
    title: 'Sticky Note',
    subtitle: '',
    x: 700,
    y: 340,
    icon: '📌',
    color: '#fbbf24',
    outputs: [],
    inputs: [],
    data: { text: '💡 Tip: Learners who fail the score check get a personalized retry email with study recommendations.' },
  },
];

const initialEdges = [
  { id: 'e1', from: 'trigger-1', fromHandle: 'out-1', to: 'module-1', toHandle: 'in-1', animated: true },
  { id: 'e2', from: 'module-1', fromHandle: 'out-1', to: 'condition-1', toHandle: 'in-1' },
  { id: 'e3', from: 'condition-1', fromHandle: 'true', to: 'module-2', toHandle: 'in-1', label: 'Pass' },
  { id: 'e4', from: 'condition-1', fromHandle: 'false', to: 'retry-1', toHandle: 'in-1', label: 'Fail' },
  { id: 'e5', from: 'retry-1', fromHandle: 'out-1', to: 'module-1', toHandle: 'in-1', animated: false, dashed: true },
  { id: 'e6', from: 'module-2', fromHandle: 'out-1', to: 'module-3', toHandle: 'in-1' },
  { id: 'e7', from: 'module-3', fromHandle: 'out-1', to: 'wait-1', toHandle: 'in-1' },
  { id: 'e8', from: 'wait-1', fromHandle: 'out-1', to: 'cert-1', toHandle: 'in-1' },
];

// ─── Node palette for sidebar ────────────────────────────────────────────────
const nodePalette = [
  { type: 'trigger', icon: '⚡', label: 'Trigger', color: '#8b5cf6', desc: 'Start the flow' },
  { type: 'module', icon: '📚', label: 'Module', color: '#10b981', desc: 'Learning module' },
  { type: 'condition', icon: '🔀', label: 'Condition', color: '#f59e0b', desc: 'Branch logic' },
  { type: 'action', icon: '⚙️', label: 'Action', color: '#ef4444', desc: 'Perform action' },
  { type: 'wait', icon: '⏳', label: 'Wait', color: '#ec4899', desc: 'Delay / timer' },
  { type: 'note', icon: '📌', label: 'Note', color: '#fbbf24', desc: 'Sticky note' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const NODE_W = 260;
const NODE_MIN_H = 80;
const HANDLE_SIZE = 12;

const getNodeHeight = (node) => {
  if (node.type === 'note') return 120;
  if (node.type === 'module' && node.data?.items) return 80 + node.data.items.length * 26 + 16;
  if (node.type === 'condition') return 100;
  return NODE_MIN_H;
};

const getHandlePositions = (node) => {
  const h = getNodeHeight(node);
  const positions = {};
  // Inputs on left
  node.inputs.forEach((inp, i) => {
    positions[inp] = { x: node.x - 1, y: node.y + h / 2, side: 'left' };
  });
  // Outputs on right
  if (node.outputs.length === 1) {
    positions[node.outputs[0]] = { x: node.x + NODE_W + 1, y: node.y + h / 2, side: 'right' };
  } else if (node.outputs.length === 2) {
    positions[node.outputs[0]] = { x: node.x + NODE_W + 1, y: node.y + h * 0.35, side: 'right' };
    positions[node.outputs[1]] = { x: node.x + NODE_W + 1, y: node.y + h * 0.65, side: 'right' };
  }
  return positions;
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'completed': return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Completed', dot: 'bg-emerald-400' };
    case 'in-progress': return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'In Progress', dot: 'bg-blue-400' };
    case 'locked': return { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Locked', dot: 'bg-gray-500' };
    default: return null;
  }
};

// ─── Edge Component ───────────────────────────────────────────────────────────
const EdgePath = ({ edge, nodes }) => {
  const fromNode = nodes.find(n => n.id === edge.from);
  const toNode = nodes.find(n => n.id === edge.to);
  if (!fromNode || !toNode) return null;

  const fromHandles = getHandlePositions(fromNode);
  const toHandles = getHandlePositions(toNode);
  const start = fromHandles[edge.fromHandle];
  const end = toHandles[edge.toHandle];
  if (!start || !end) return null;

  const dx = Math.abs(end.x - start.x) * 0.5;
  const d = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;

  const edgeColor = fromNode.type === 'condition'
    ? (edge.fromHandle === 'true' ? '#10b981' : '#ef4444')
    : '#4b5563';

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={edgeColor}
        strokeWidth="2.5"
        strokeDasharray={edge.dashed ? '8 4' : 'none'}
        strokeLinecap="round"
        opacity={0.7}
      />
      {edge.animated && (
        <circle r="4" fill={edgeColor}>
          <animateMotion dur="2s" repeatCount="indefinite" path={d} />
        </circle>
      )}
      {edge.label && (
        (() => {
          const mx = (start.x + end.x) / 2;
          const my = (start.y + end.y) / 2;
          return (
            <g>
              <rect x={mx - 20} y={my - 10} width="40" height="20" rx="6" fill="#1e293b" stroke={edgeColor} strokeWidth="1" />
              <text x={mx} y={my + 4} textAnchor="middle" fill={edgeColor} fontSize="10" fontWeight="600">{edge.label}</text>
            </g>
          );
        })()
      )}
    </g>
  );
};

// ─── Node Component ───────────────────────────────────────────────────────────
const FlowNode = ({ node, selected, onMouseDown, onSelect, onHandleMouseDown }) => {
  const h = getNodeHeight(node);
  const handles = getHandlePositions(node);
  const isNote = node.type === 'note';

  if (isNote) {
    return (
      <div
        className={`absolute rounded-xl shadow-lg cursor-grab active:cursor-grabbing select-none transition-shadow ${selected ? 'ring-2 ring-yellow-400/60' : ''}`}
        style={{
          left: node.x,
          top: node.y,
          width: NODE_W,
          height: h,
          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
          transform: 'rotate(1deg)',
          zIndex: selected ? 50 : 10,
        }}
        onMouseDown={(e) => { onSelect(node.id); onMouseDown(e, node.id); }}
      >
        <div className="p-4 text-sm text-yellow-900 font-medium leading-relaxed">
          {node.data.text}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute rounded-xl shadow-lg cursor-grab active:cursor-grabbing select-none group transition-shadow ${selected ? 'ring-2 ring-white/30 shadow-xl' : 'hover:shadow-xl'}`}
      style={{
        left: node.x,
        top: node.y,
        width: NODE_W,
        minHeight: h,
        background: '#1e293b',
        borderLeft: `4px solid ${node.color}`,
        zIndex: selected ? 50 : 10,
      }}
      onMouseDown={(e) => { onSelect(node.id); onMouseDown(e, node.id); }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${node.color}22` }}
        >
          {node.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-white text-sm font-semibold truncate">{node.title}</div>
          <div className="text-slate-400 text-xs truncate">{node.subtitle}</div>
        </div>
        <div className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs">⋮</div>
      </div>

      {/* Module items */}
      {node.type === 'module' && node.data?.items && (
        <div className="px-4 pb-2 space-y-1">
          {node.data.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                {item.done ? '✓' : '○'}
              </span>
              <span className={item.done ? 'text-slate-500 line-through' : 'text-slate-300'}>{item.name}</span>
              <span className="ml-auto text-slate-600 text-[10px]">{item.duration}</span>
            </div>
          ))}
        </div>
      )}

      {/* Condition branches */}
      {node.type === 'condition' && (
        <div className="px-4 pb-3 flex gap-2">
          <div className="flex-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-center">
            <span className="text-emerald-400 text-xs font-medium">✓ {node.data.trueLabel || 'True'}</span>
          </div>
          <div className="flex-1 rounded-md bg-red-500/10 border border-red-500/20 px-2 py-1 text-center">
            <span className="text-red-400 text-xs font-medium">✗ {node.data.falseLabel || 'False'}</span>
          </div>
        </div>
      )}

      {/* Status badge */}
      {node.data?.status && (() => {
        const badge = getStatusBadge(node.data.status);
        if (!badge) return null;
        return (
          <div className="px-4 pb-3">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
              {badge.label}
            </span>
          </div>
        );
      })()}

      {/* Wait info */}
      {node.type === 'wait' && (
        <div className="px-4 pb-3">
          <div className="rounded-md bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 text-center">
            <span className="text-pink-400 text-xs font-medium">⏱ {node.data.duration}</span>
          </div>
        </div>
      )}

      {/* Action info */}
      {node.type === 'action' && node.data?.action && (
        <div className="px-4 pb-3">
          <div className="rounded-md bg-slate-700/50 px-3 py-1.5">
            <span className="text-slate-400 text-xs font-mono">{node.data.action}</span>
          </div>
        </div>
      )}

      {/* Connection Handles */}
      {Object.entries(handles).map(([key, pos]) => (
        <div
          key={key}
          className="absolute z-20"
          style={{
            left: pos.side === 'left' ? -HANDLE_SIZE / 2 - 2 : NODE_W - HANDLE_SIZE / 2 + 2,
            top: pos.y - node.y - HANDLE_SIZE / 2,
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
          }}
          onMouseDown={(e) => { e.stopPropagation(); onHandleMouseDown(e, node.id, key, pos); }}
        >
          <div
            className="w-full h-full rounded-full border-2 border-slate-500 bg-slate-800 hover:border-white hover:bg-slate-600 transition-colors cursor-crosshair"
          />
        </div>
      ))}
    </div>
  );
};

// ─── Minimap ──────────────────────────────────────────────────────────────────
const Minimap = ({ nodes, viewport, canvasRef }) => {
  const MINIMAP_W = 180;
  const MINIMAP_H = 100;
  const padding = 40;

  const allX = nodes.map(n => n.x);
  const allY = nodes.map(n => n.y);
  const minX = Math.min(...allX) - padding;
  const minY = Math.min(...allY) - padding;
  const maxX = Math.max(...allX) + NODE_W + padding;
  const maxY = Math.max(...allY) + 200 + padding;
  const worldW = maxX - minX;
  const worldH = maxY - minY;
  const scale = Math.min(MINIMAP_W / worldW, MINIMAP_H / worldH);

  return (
    <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden" style={{ width: MINIMAP_W, height: MINIMAP_H, zIndex: 100 }}>
      <svg width={MINIMAP_W} height={MINIMAP_H}>
        {nodes.map(n => (
          <rect
            key={n.id}
            x={(n.x - minX) * scale}
            y={(n.y - minY) * scale}
            width={NODE_W * scale}
            height={getNodeHeight(n) * scale}
            rx={2}
            fill={n.type === 'note' ? '#fde68a' : n.color}
            opacity={0.6}
          />
        ))}
        {canvasRef.current && (() => {
          const cw = canvasRef.current.clientWidth;
          const ch = canvasRef.current.clientHeight;
          const vx = (-viewport.x / viewport.zoom - minX) * scale;
          const vy = (-viewport.y / viewport.zoom - minY) * scale;
          const vw = (cw / viewport.zoom) * scale;
          const vh = (ch / viewport.zoom) * scale;
          return <rect x={vx} y={vy} width={vw} height={vh} fill="none" stroke="white" strokeWidth="1" opacity={0.4} rx={2} />;
        })()}
      </svg>
    </div>
  );
};

// ─── Main Flow Builder ────────────────────────────────────────────────────────
const N8nFlowBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggingNode, setDraggingNode] = useState(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 0.85 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [connecting, setConnecting] = useState(null); // { fromNodeId, fromHandle, startPos }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [detailNode, setDetailNode] = useState(null);
  const canvasRef = useRef(null);

  // ── Pan & zoom ────────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setViewport(v => {
      const newZoom = Math.min(2, Math.max(0.2, v.zoom * delta));
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      return {
        zoom: newZoom,
        x: mx - (mx - v.x) * (newZoom / v.zoom),
        y: my - (my - v.y) * (newZoom / v.zoom),
      };
    });
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const handleCanvasMouseDown = (e) => {
    if (e.target === e.currentTarget || e.target.closest('.canvas-inner')) {
      if (!e.target.closest('[data-node]')) {
        setSelectedNode(null);
        setDetailNode(null);
        setIsPanning(true);
        setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const wx = (e.clientX - rect.left - viewport.x) / viewport.zoom;
    const wy = (e.clientY - rect.top - viewport.y) / viewport.zoom;
    setMousePos({ x: wx, y: wy });

    if (isPanning) {
      setViewport(v => ({ ...v, x: e.clientX - panStart.x, y: e.clientY - panStart.y }));
      return;
    }
    if (draggingNode) {
      const { nodeId, offsetX, offsetY } = draggingNode;
      setNodes(prev => prev.map(n =>
        n.id === nodeId ? { ...n, x: wx - offsetX, y: wy - offsetY } : n
      ));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNode(null);
    if (connecting) {
      // Check if mouse is over any input handle
      const target = nodes.find(n => {
        if (n.id === connecting.fromNodeId) return false;
        const handles = getHandlePositions(n);
        return Object.entries(handles).some(([key, pos]) => {
          if (pos.side !== 'left') return false;
          return Math.abs(mousePos.x - pos.x) < 20 && Math.abs(mousePos.y - pos.y) < 20;
        });
      });
      if (target) {
        const handles = getHandlePositions(target);
        const inputHandle = Object.entries(handles).find(([, pos]) => pos.side === 'left');
        if (inputHandle) {
          const newEdge = {
            id: `e-${Date.now()}`,
            from: connecting.fromNodeId,
            fromHandle: connecting.fromHandle,
            to: target.id,
            toHandle: inputHandle[0],
          };
          setEdges(prev => [...prev, newEdge]);
        }
      }
      setConnecting(null);
    }
  };

  const handleNodeMouseDown = (e, nodeId) => {
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    const wx = (e.clientX - rect.left - viewport.x) / viewport.zoom;
    const wy = (e.clientY - rect.top - viewport.y) / viewport.zoom;
    const node = nodes.find(n => n.id === nodeId);
    setDraggingNode({ nodeId, offsetX: wx - node.x, offsetY: wy - node.y });
  };

  const handleHandleMouseDown = (e, nodeId, handleKey, pos) => {
    e.stopPropagation();
    if (pos.side === 'right') {
      setConnecting({ fromNodeId: nodeId, fromHandle: handleKey, startPos: pos });
    }
  };

  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
    setDetailNode(nodes.find(n => n.id === nodeId));
  };

  // ── Add node from palette ─────────────────────────────────
  const addNode = (paletteItem) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = (rect.width / 2 - viewport.x) / viewport.zoom;
    const cy = (rect.height / 2 - viewport.y) / viewport.zoom;
    const newNode = {
      id: `${paletteItem.type}-${Date.now()}`,
      type: paletteItem.type,
      title: paletteItem.label,
      subtitle: 'Click to configure',
      x: cx - NODE_W / 2 + Math.random() * 40 - 20,
      y: cy - 40 + Math.random() * 40 - 20,
      icon: paletteItem.icon,
      color: paletteItem.color,
      outputs: paletteItem.type === 'condition' ? ['true', 'false'] : paletteItem.type === 'note' ? [] : ['out-1'],
      inputs: paletteItem.type === 'trigger' || paletteItem.type === 'note' ? [] : ['in-1'],
      data: paletteItem.type === 'note' ? { text: 'Double-click to edit...' } : {},
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.id);
    setDetailNode(newNode);
  };

  // ── Delete node ───────────────────────────────────────────
  const deleteNode = (nodeId) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(e => e.from !== nodeId && e.to !== nodeId));
    if (selectedNode === nodeId) { setSelectedNode(null); setDetailNode(null); }
  };

  // ── Keyboard ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNode && !e.target.closest('input, textarea')) {
          deleteNode(selectedNode);
        }
      }
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setDetailNode(null);
        setConnecting(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedNode]);

  const resetView = () => setViewport({ x: 0, y: 0, zoom: 0.85 });
  const zoomIn = () => setViewport(v => ({ ...v, zoom: Math.min(2, v.zoom * 1.2) }));
  const zoomOut = () => setViewport(v => ({ ...v, zoom: Math.max(0.2, v.zoom / 1.2) }));

  const completedCount = nodes.filter(n => n.data?.status === 'completed').length;
  const moduleCount = nodes.filter(n => n.type === 'module').length;

  return (
    <div className="h-screen w-screen flex bg-slate-950 text-white overflow-hidden">

      {/* ── Sidebar ──────────────────────────────────────── */}
      <div className={`flex-shrink-0 border-r border-slate-800 bg-slate-900 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
        {/* Sidebar header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🗺️</span>
            <h2 className="font-bold text-base">Journey Flow</h2>
          </div>
          <p className="text-xs text-slate-500">Leadership Development</p>
        </div>

        {/* Progress */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Progress</span>
            <span className="text-emerald-400 font-semibold">{completedCount}/{moduleCount} modules</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all" style={{ width: `${moduleCount ? (completedCount / moduleCount) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Node palette */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Add Nodes</h3>
          <div className="space-y-2">
            {nodePalette.map(item => (
              <button
                key={item.type}
                onClick={() => addNode(item)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${item.color}22` }}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white">{item.label}</div>
                  <div className="text-[10px] text-slate-500">{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{nodes.length} nodes</span>
            <span>·</span>
            <span>{edges.length} connections</span>
          </div>
        </div>
      </div>

      {/* ── Main Canvas Area ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top toolbar */}
        <div className="h-12 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0" style={{ zIndex: 100 }}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sm transition-colors"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div className="h-5 w-px bg-slate-700 mx-1" />
            <span className="text-sm font-semibold text-slate-300">Leadership Development Journey</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">Active</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={resetView} className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors" title="Reset view">⟳ Fit</button>
            <button onClick={zoomOut} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sm text-slate-300 transition-colors">−</button>
            <span className="text-xs text-slate-400 w-12 text-center font-mono">{Math.round(viewport.zoom * 100)}%</span>
            <button onClick={zoomIn} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sm text-slate-300 transition-colors">+</button>
            <div className="h-5 w-px bg-slate-700 mx-1" />
            <button
              onClick={() => {
                // Export as JSON
                const data = JSON.stringify({ nodes, edges }, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'journey-flow.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
            >
              💾 Export
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden"
          style={{
            background: '#0f172a',
            backgroundImage: `radial-gradient(circle, #1e293b 1px, transparent 1px)`,
            backgroundSize: `${20 * viewport.zoom}px ${20 * viewport.zoom}px`,
            backgroundPosition: `${viewport.x}px ${viewport.y}px`,
            cursor: isPanning ? 'grabbing' : connecting ? 'crosshair' : 'default',
          }}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="canvas-inner absolute origin-top-left"
            style={{
              transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            }}
          >
            {/* SVG for edges */}
            <svg
              className="absolute pointer-events-none"
              style={{ left: 0, top: 0, width: '5000px', height: '5000px', overflow: 'visible', zIndex: 1 }}
            >
              {edges.map(edge => (
                <EdgePath key={edge.id} edge={edge} nodes={nodes} />
              ))}
              {/* Temp connecting line */}
              {connecting && (
                <path
                  d={`M ${connecting.startPos.x} ${connecting.startPos.y} C ${connecting.startPos.x + 80} ${connecting.startPos.y}, ${mousePos.x - 80} ${mousePos.y}, ${mousePos.x} ${mousePos.y}`}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  strokeLinecap="round"
                  opacity={0.8}
                />
              )}
            </svg>

            {/* Nodes */}
            {nodes.map(node => (
              <div key={node.id} data-node>
                <FlowNode
                  node={node}
                  selected={selectedNode === node.id}
                  onMouseDown={handleNodeMouseDown}
                  onSelect={handleNodeSelect}
                  onHandleMouseDown={handleHandleMouseDown}
                />
              </div>
            ))}
          </div>

          {/* Minimap */}
          <Minimap nodes={nodes} viewport={viewport} canvasRef={canvasRef} />

          {/* Zoom controls overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2" style={{ zIndex: 100 }}>
            {connecting && (
              <div className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-xs text-indigo-400 animate-pulse">
                Drop on a node input to connect
              </div>
            )}
          </div>

          {/* Help hint */}
          <div className="absolute top-4 right-4 text-[10px] text-slate-600 space-y-0.5" style={{ zIndex: 100 }}>
            <div>Scroll to zoom · Drag canvas to pan</div>
            <div>Drag handles to connect · Del to remove</div>
          </div>
        </div>
      </div>

      {/* ── Detail Panel ─────────────────────────────────── */}
      {detailNode && detailNode.type !== 'note' && (
        <div className="w-72 flex-shrink-0 border-l border-slate-800 bg-slate-900 overflow-y-auto">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${detailNode.color}22` }}>
                {detailNode.icon}
              </div>
              <div>
                <div className="text-sm font-semibold">{detailNode.title}</div>
                <div className="text-[10px] text-slate-500 capitalize">{detailNode.type} node</div>
              </div>
            </div>
            <button onClick={() => setDetailNode(null)} className="text-slate-500 hover:text-white text-xs">✕</button>
          </div>

          <div className="p-4 space-y-4">
            {/* Node info */}
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Node ID</label>
              <div className="text-xs text-slate-300 font-mono mt-1 bg-slate-800 px-2 py-1.5 rounded-md">{detailNode.id}</div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Type</label>
              <div className="mt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: detailNode.color }}></span>
                <span className="text-xs text-slate-300 capitalize">{detailNode.type}</span>
              </div>
            </div>

            {/* Status */}
            {detailNode.data?.status && (() => {
              const badge = getStatusBadge(detailNode.data.status);
              return (
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Items */}
            {detailNode.data?.items && (
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Activities</label>
                <div className="mt-2 space-y-1.5">
                  {detailNode.data.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 text-xs">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                        {item.done ? '✓' : '○'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={item.done ? 'text-slate-500' : 'text-slate-300'}>{item.name}</div>
                        <div className="text-[10px] text-slate-600">{item.duration} · {item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Condition */}
            {detailNode.data?.condition && (
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Condition</label>
                <div className="mt-1 bg-slate-800 px-2 py-1.5 rounded-md text-xs text-slate-300 font-mono">{detailNode.data.condition}</div>
              </div>
            )}

            {/* Action */}
            {detailNode.data?.action && (
              <div>
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Action</label>
                <div className="mt-1 bg-slate-800 px-2 py-1.5 rounded-md text-xs text-slate-300 font-mono">{detailNode.data.action}</div>
              </div>
            )}

            {/* Connections */}
            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Connections</label>
              <div className="mt-2 space-y-1">
                {edges.filter(e => e.from === detailNode.id).map(e => {
                  const target = nodes.find(n => n.id === e.to);
                  return (
                    <div key={e.id} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-emerald-400">→</span>
                      <span>{target?.title || e.to}</span>
                      {e.label && <span className="text-slate-600">({e.label})</span>}
                    </div>
                  );
                })}
                {edges.filter(e => e.to === detailNode.id).map(e => {
                  const source = nodes.find(n => n.id === e.from);
                  return (
                    <div key={e.id} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-blue-400">←</span>
                      <span>{source?.title || e.from}</span>
                      {e.label && <span className="text-slate-600">({e.label})</span>}
                    </div>
                  );
                })}
                {edges.filter(e => e.from === detailNode.id || e.to === detailNode.id).length === 0 && (
                  <div className="text-xs text-slate-600 italic">No connections</div>
                )}
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => deleteNode(detailNode.id)}
              className="w-full py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
            >
              Delete Node
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default N8nFlowBuilder;
