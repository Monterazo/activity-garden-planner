
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskStatus, TaskPriority } from '@/types/task';

interface TaskFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: TaskStatus | 'all';
  onStatusChange: (value: TaskStatus | 'all') => void;
  filterPriority: TaskPriority | 'all';
  onPriorityChange: (value: TaskPriority | 'all') => void;
}

export const TaskFilter = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterPriority,
  onPriorityChange
}: TaskFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center h-10">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md h-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-sm h-full"
        />
      </div>

      {/* Status Filter */}
      <div className="h-full">
        <Select value={filterStatus} onValueChange={(value: TaskStatus | 'all') => onStatusChange(value)}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white h-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="all" className="text-white hover:bg-gray-700">
              Todos
            </SelectItem>
            <SelectItem value="pending" className="text-white hover:bg-gray-700">
              Pendente
            </SelectItem>
            <SelectItem value="in-progress" className="text-white hover:bg-gray-700">
              Realizando
            </SelectItem>
            <SelectItem value="completed" className="text-white hover:bg-gray-700">
              Concluída
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority Filter */}
      <div className="h-full">
        <Select value={filterPriority} onValueChange={(value: TaskPriority | 'all') => onPriorityChange(value)}>
          <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white h-full">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="all" className="text-white hover:bg-gray-700">
              Todas
            </SelectItem>
            <SelectItem value="high" className="text-white hover:bg-gray-700">
              Alta
            </SelectItem>
            <SelectItem value="medium" className="text-white hover:bg-gray-700">
              Média
            </SelectItem>
            <SelectItem value="low" className="text-white hover:bg-gray-700">
              Baixa
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
