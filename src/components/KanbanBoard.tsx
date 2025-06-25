
import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@/types/task';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

export const KanbanBoard = ({ tasks, onTaskStatusChange, onTaskEdit, onTaskDelete }: KanbanBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns = [
    { id: 'pending', title: 'Pendente', color: 'bg-red-500' },
    { id: 'in-progress', title: 'Realizando', color: 'bg-blue-500' },
    { id: 'completed', title: 'Concluída', color: 'bg-green-500' },
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
          className="bg-gray-800 rounded-lg p-4 min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id as TaskStatus)}
        >
          <h2 className="text-xl font-bold mb-4 text-white">
            {column.title}
          </h2>
          
          <div className="space-y-3">
            {getTasksByStatus(column.id as TaskStatus).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onTaskEdit(task)}
                onDelete={() => onTaskDelete(task.id)}
                onDragStart={() => handleDragStart(task)}
                isDragging={draggedTask?.id === task.id}
              />
            ))}
          </div>
          
          {getTasksByStatus(column.id as TaskStatus).length === 0 && (
            <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
              Nenhuma atividade
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
