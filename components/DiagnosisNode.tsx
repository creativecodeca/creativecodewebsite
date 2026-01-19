import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  AlertCircle,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export interface DiagnosisNodeData {
  label: string;
  level: number;
  collapsed: boolean;
  childCount: number;
  onToggle: (id: string) => void;
}

// Icon selection based on level
const getIcon = (level: number, label: string) => {
  const iconProps = { className: "w-5 h-5", strokeWidth: 2.5 };
  
  if (level === 1) return <DollarSign {...iconProps} />;
  if (level === 2) {
    if (label.includes('SLOW') || label.includes('OUT')) return <TrendingDown {...iconProps} />;
    return <TrendingUp {...iconProps} />;
  }
  if (level === 3) {
    if (label.includes('CLIENT')) return <Users {...iconProps} />;
    if (label.includes('CYCLE') || label.includes('TIME')) return <Clock {...iconProps} />;
    return <Target {...iconProps} />;
  }
  if (level === 4) return <AlertCircle {...iconProps} />;
  if (level === 5) return <Info {...iconProps} />;
  return <CheckCircle {...iconProps} />;
};

// Color scheme based on level - Dark Theme
const getColorClasses = (level: number) => {
  switch (level) {
    case 1:
      return {
        bg: 'bg-red-950/50',
        border: 'border-red-500',
        text: 'text-red-200',
        icon: 'text-red-400',
        hoverBg: 'hover:bg-red-900/60',
        shadow: 'shadow-red-900/50',
      };
    case 2:
      return {
        bg: 'bg-orange-950/50',
        border: 'border-orange-500',
        text: 'text-orange-200',
        icon: 'text-orange-400',
        hoverBg: 'hover:bg-orange-900/60',
        shadow: 'shadow-orange-900/50',
      };
    case 3:
      return {
        bg: 'bg-yellow-950/50',
        border: 'border-yellow-500',
        text: 'text-yellow-200',
        icon: 'text-yellow-400',
        hoverBg: 'hover:bg-yellow-900/60',
        shadow: 'shadow-yellow-900/50',
      };
    case 4:
      return {
        bg: 'bg-blue-950/50',
        border: 'border-blue-500',
        text: 'text-blue-200',
        icon: 'text-blue-400',
        hoverBg: 'hover:bg-blue-900/60',
        shadow: 'shadow-blue-900/50',
      };
    case 5:
      return {
        bg: 'bg-green-950/50',
        border: 'border-green-500',
        text: 'text-green-200',
        icon: 'text-green-400',
        hoverBg: 'hover:bg-green-900/60',
        shadow: 'shadow-green-900/50',
      };
    default:
      return {
        bg: 'bg-gray-950/50',
        border: 'border-gray-500',
        text: 'text-gray-200',
        icon: 'text-gray-400',
        hoverBg: 'hover:bg-gray-900/60',
        shadow: 'shadow-gray-900/50',
      };
  }
};

const DiagnosisNode: React.FC<NodeProps<DiagnosisNodeData>> = ({ id, data }) => {
  const colors = getColorClasses(data.level);
  const hasChildren = data.childCount > 0;

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg border-2 
        ${colors.bg} ${colors.border} ${colors.hoverBg}
        transition-all duration-200 ease-in-out
        cursor-pointer select-none
        shadow-md hover:shadow-lg ${colors.shadow}
        min-w-[200px] max-w-[300px]
        ${hasChildren ? 'hover:scale-105' : ''}
      `}
      onClick={() => hasChildren && data.onToggle(id)}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-600 !border-2 !border-gray-800"
      />

      {/* Content */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 ${colors.icon}`}>
          {getIcon(data.level, data.label)}
        </div>

        {/* Label */}
        <div className="flex-1">
          <p className={`text-sm font-semibold leading-tight ${colors.text}`}>
            {data.label}
          </p>
          {hasChildren && (
            <p className="text-xs text-gray-400 mt-1">
              {data.childCount} {data.childCount === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>

        {/* Collapse/Expand Icon */}
        {hasChildren && (
          <div className={`flex-shrink-0 ${colors.icon}`}>
            {data.collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        )}
      </div>

      {/* Bottom Handle */}
      {hasChildren && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-gray-600 !border-2 !border-gray-800"
        />
      )}
    </div>
  );
};

export default DiagnosisNode;

