
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
}

export const TaskCard = ({ task, onEdit, onDelete, onDragStart, isDragging }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'pending': return 'from-red-500 to-red-600';
      case 'in-progress': return 'from-blue-500 to-blue-600';
      case 'completed': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`bg-gray-700 rounded-lg p-4 cursor-move transition-all duration-200 hover:bg-gray-650 border-l-4 bg-gradient-to-r ${getStatusColor()} ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white font-semibold text-lg">{task.title}</h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
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

      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
        {task.description}
      </p>

      <div className="flex justify-between items-center">
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
        >
          {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
        </span>
        
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  );
};
