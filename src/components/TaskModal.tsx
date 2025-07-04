import { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSave: (task: Task | Omit<Task, 'id' | 'createdAt'>) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskModal = ({ isOpen, onClose, task, onSave, onDelete }: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
    }
  }, [task, isOpen]);

  const handleSave = () => {
    if (!title.trim()) return;

    if (task) {
      onSave({
        ...task,
        title,
        description,
        status,
        priority,
      });
    } else {
      onSave({
        title,
        description,
        status,
        priority,
      });
    }
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id);
    }
  };

  // Se estamos editando uma tarefa, mostra o layout em tela cheia
  if (task) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-800 border-gray-600 text-white w-screen h-screen max-w-none p-8 rounded-none">
          <div className="space-y-6 h-full">
            {/* Header com título e controles */}
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-white font-open-sans">
                {task.title}
              </h1>
              
              <div className="flex items-center gap-4">
                {/* Dropdown de Status */}
                <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="pending" className="text-white hover:bg-gray-600">
                      Pendente
                    </SelectItem>
                    <SelectItem value="in-progress" className="text-white hover:bg-gray-600">
                      Realizando
                    </SelectItem>
                    <SelectItem value="completed" className="text-white hover:bg-gray-600">
                      Concluída
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Botão Deletar atividade */}
                <Button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6"
                >
                  Deletar atividade
                </Button>

                {/* Botão Editar informações */}
                <Button
                  onClick={handleSave}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6"
                >
                  Editar informações
                </Button>
              </div>
            </div>

            {/* Seção Descrição */}
            <div className="space-y-4 flex-1">
              <Label className="text-white text-lg font-semibold">Descrição</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white min-h-[400px] resize-none"
                placeholder="Digite a descrição da atividade"
              />
            </div>

            {/* Campo de Prioridade (oculto mas mantido para funcionalidade) */}
            <input type="hidden" value={priority} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Para criar nova tarefa, mantém o layout original
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Nova Atividade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da atividade"
              className="bg-gray-700 border-gray-600 text-white mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição da atividade"
              className="bg-gray-700 border-gray-600 text-white mt-1 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="pending" className="text-white hover:bg-gray-600">
                    Pendente
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-white hover:bg-gray-600">
                    Realizando
                  </SelectItem>
                  <SelectItem value="completed" className="text-white hover:bg-gray-600">
                    Concluída
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority" className="text-sm font-medium">
                Prioridade
              </Label>
              <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="low" className="text-white hover:bg-gray-600">
                    Baixa
                  </SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-gray-600">
                    Média
                  </SelectItem>
                  <SelectItem value="high" className="text-white hover:bg-gray-600">
                    Alta
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Criar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
