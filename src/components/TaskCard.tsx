
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onDragStart: () => void;
  isDragging: boolean;
  statusColor: string;
}

export const TaskCard = ({ task, onEdit, onDelete, onDragStart, isDragging, statusColor }: TaskCardProps) => {
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`rounded-lg p-6 cursor-move transition-all duration-200 font-open-sans ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        width: '320px',
        backgroundColor: statusColor,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 16px 32px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px'
      }}
    >
      <div className="flex justify-between items-start mb-2 w-full">
        <h3 
          className="text-white font-semibold"
          style={{ 
            fontSize: '16px', 
            lineHeight: '150%',
            fontWeight: 600,
            width: '272px',
            height: '24px'
          }}
        >
          {task.title}
        </h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-200 p-1">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-600">
            <DropdownMenuItem onClick={onEdit} className="text-white hover:bg-gray-700">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete} 
              className="text-red-400 hover:bg-gray-700 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p 
          className="text-white opacity-75"
          style={{ 
            fontSize: '14px', 
            lineHeight: '140%',
            fontWeight: 400,
            width: '272px'
          }}
        >
          {task.description}
        </p>
      )}

      <div 
        className="flex flex-row items-center gap-2 pt-1"
        style={{ 
          padding: '4px 0px',
          gap: '8px'
        }}
      >
        <div 
          className="border border-white border-opacity-75 rounded-sm px-2 py-0.5"
          style={{
            padding: '2px 8px',
            gap: '10px',
            borderRadius: '2px'
          }}
        >
          <span 
            className="text-white opacity-75 text-sm"
            style={{ 
              fontSize: '14px', 
              lineHeight: '140%',
              fontWeight: 400
            }}
          >
            {getPriorityText(task.priority)}
          </span>
        </div>
      </div>
    </div>
  );
};
