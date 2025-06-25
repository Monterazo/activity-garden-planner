
import { useState, useEffect } from 'react';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskModal } from '@/components/TaskModal';
import { TaskFilter } from '@/components/TaskFilter';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Add some initial tasks for demonstration
      const initialTasks: Task[] = [
        {
          id: '1',
          title: 'Tablet view',
          description: 'Interface for when recording a new audio note',
          status: 'pending',
          priority: 'high',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Mobile view',
          description: 'Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.',
          status: 'in-progress',
          priority: 'medium',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Audio recording',
          description: 'Interface for when recording a new audio note',
          status: 'completed',
          priority: 'low',
          createdAt: new Date().toISOString(),
        },
      ];
      setTasks(initialTasks);
      localStorage.setItem('kanban-tasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    setIsModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-4xl font-bold">Kanban</h1>
            <Button 
              onClick={handleNewTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nova atividade
            </Button>
          </div>

          {/* Filters */}
          <TaskFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            filterPriority={filterPriority}
            onPriorityChange={setFilterPriority}
          />
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          tasks={filteredTasks}
          onTaskStatusChange={handleTaskStatusChange}
          onTaskEdit={handleEditTask}
          onTaskDelete={handleDeleteTask}
        />

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
          onSave={selectedTask ? handleUpdateTask : handleCreateTask}
          onDelete={selectedTask ? handleDeleteTask : undefined}
        />
      </div>
    </div>
  );
};

export default Index;
