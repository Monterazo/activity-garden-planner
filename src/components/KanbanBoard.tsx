import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@/types/task';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

export const KanbanBoard = ({
  tasks,
  onTaskStatusChange,
  onTaskEdit,
  onTaskDelete
}: KanbanBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    {
      id: 'pending',
      title: 'Pendente',
      color: '#EC221F'
    },
    {
      id: 'in-progress', 
      title: 'Realizando',
      color: '#7678D1'
    },
    {
      id: 'completed',
      title: 'Concluída', 
      color: '#00A88B'
    }
  ] as const;

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      onTaskStatusChange(draggedTask.id, status);
    }
    setDraggedTask(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => (
        <div 
          key={column.id}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id as TaskStatus)}
          className="rounded-2xl p-6 min-h-[574px] flex flex-col items-center gap-4"
          style={{ 
            background: '#262626',
            width: '368px'
          }}
        >
          <h2 
            className="text-white font-bold text-center"
            style={{ 
              fontSize: '28px', 
              lineHeight: '44px',
              fontWeight: 700,
              width: '320px',
              height: '44px'
            }}
          >
            {column.title}
          </h2>
          
          <div className="space-y-4 w-full flex flex-col items-center">
            {getTasksByStatus(column.id as TaskStatus).map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                onEdit={() => onTaskEdit(task)}
                onDelete={() => onTaskDelete(task.id)}
                onDragStart={() => handleDragStart(task)}
                isDragging={draggedTask?.id === task.id}
                statusColor={column.color}
              />
            ))}
          </div>
          
          {getTasksByStatus(column.id as TaskStatus).length === 0 && (
            <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg w-full">
              Nenhuma atividade
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
