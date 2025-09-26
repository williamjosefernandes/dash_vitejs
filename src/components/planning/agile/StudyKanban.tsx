import React, { useState, useCallback } from 'react';
import { Card, Badge, Button, Tooltip } from 'flowbite-react';
import { 
  HiClock, HiExclamationCircle, 
  HiPlus, HiDotsVertical, HiPlay, HiCheck 
} from 'react-icons/hi';
import { CycleItem, BacklogItem } from '../../../types/planning';

interface StudyKanbanProps {
  cycleItems: CycleItem[];
  backlogItems: BacklogItem[];
  onItemMove: (itemId: string, newStatus: CycleItem['status'], newPosition: number) => void;
  onItemStart: (itemId: string) => void;
  onItemComplete: (itemId: string) => void;
  onItemEdit: (itemId: string) => void;
  onAddItem: () => void;
}

interface KanbanColumn {
  id: CycleItem['status'];
  title: string;
  color: string;
  icon: React.ComponentType<any>;
  maxItems?: number;
}

const columns: KanbanColumn[] = [
  {
    id: 'pendente',
    title: 'Backlog',
    color: 'gray',
    icon: HiPlus
  },
  {
    id: 'em_andamento',
    title: 'Em Andamento',
    color: 'blue',
    icon: HiPlay,
    maxItems: 3 // Limite WIP (Work in Progress)
  },
  {
    id: 'concluido',
    title: 'Concluído',
    color: 'green',
    icon: HiCheck
  },
  {
    id: 'bloqueado',
    title: 'Bloqueado',
    color: 'red',
    icon: HiExclamationCircle
  }
];

const StudyKanban: React.FC<StudyKanbanProps> = ({
  cycleItems,
  backlogItems,
  onItemMove,
  onItemStart,
  onItemComplete,
  onItemEdit,
  onAddItem
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Agrupa itens por status
  const itemsByStatus = cycleItems.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {} as Record<CycleItem['status'], CycleItem[]>);

  // Ordena itens por posição
  Object.keys(itemsByStatus).forEach(status => {
    itemsByStatus[status as CycleItem['status']].sort((a, b) => a.position - b.position);
  });

  // Encontra dados do backlog para um item do ciclo
  const getBacklogData = (backlogItemId: string): BacklogItem | undefined => {
    return backlogItems.find(item => item.id === backlogItemId);
  };

  // Handlers de drag and drop
  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, columnId: CycleItem['status']) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const column = columns.find(col => col.id === columnId);
    const currentItems = itemsByStatus[columnId] || [];
    
    // Verifica limite WIP
    if (column?.maxItems && currentItems.length >= column.maxItems) {
      alert(`Limite de ${column.maxItems} itens atingido para "${column.title}"`);
      return;
    }

    // Calcula nova posição (no final da coluna)
    const newPosition = currentItems.length > 0 
      ? Math.max(...currentItems.map(item => item.position)) + 1 
      : 0;

    onItemMove(draggedItem, columnId, newPosition);
    
    setDraggedItem(null);
    setDragOverColumn(null);
  }, [draggedItem, itemsByStatus, onItemMove]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverColumn(null);
  }, []);

  // Renderiza um item do Kanban
  const renderKanbanItem = (cycleItem: CycleItem) => {
    const backlogData = getBacklogData(cycleItem.backlogItemId);
    if (!backlogData) return null;

    const isDragging = draggedItem === cycleItem.id;
    const isBlocked = cycleItem.status === 'bloqueado';

    return (
      <Card
        key={cycleItem.id}
        className={`mb-3 cursor-move transition-all duration-200 ${
          isDragging ? 'opacity-50 transform rotate-2' : ''
        } ${isBlocked ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, cycleItem.id)}
        onDragEnd={handleDragEnd}
      >
        <div className="p-3">
          {/* Header do item */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                {backlogData.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {backlogData.discipline}
              </p>
            </div>
            <Button
              size="xs"
              color="gray"
              className="ml-2"
              onClick={() => onItemEdit(cycleItem.id)}
            >
              <HiDotsVertical className="h-3 w-3" />
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            <Badge 
              color={backlogData.priority === 'alta' ? 'red' : 
                     backlogData.priority === 'media' ? 'yellow' : 'gray'}
              size="xs"
            >
              {backlogData.priority}
            </Badge>
            <Badge color="purple" size="xs">
              {backlogData.contentType}
            </Badge>
            {backlogData.difficulty && (
              <Badge 
                color={backlogData.difficulty === 'dificil' ? 'red' : 
                       backlogData.difficulty === 'medio' ? 'yellow' : 'green'}
                size="xs"
              >
                {backlogData.difficulty}
              </Badge>
            )}
          </div>

          {/* Informações de tempo */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <HiClock className="h-3 w-3 mr-1" />
              <span>{backlogData.estimatedHours}h estimadas</span>
            </div>
            {cycleItem.actualHours && (
              <span className="text-blue-600 dark:text-blue-400">
                {cycleItem.actualHours}h reais
              </span>
            )}
          </div>

          {/* Bloqueios */}
          {isBlocked && cycleItem.blockers && cycleItem.blockers.length > 0 && (
            <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs">
              <div className="flex items-center text-red-700 dark:text-red-300 mb-1">
                <HiExclamationCircle className="h-3 w-3 mr-1" />
                <span className="font-medium">Bloqueios:</span>
              </div>
              {cycleItem.blockers.map((blocker, index) => (
                <div key={index} className="text-red-600 dark:text-red-400">
                  • {blocker}
                </div>
              ))}
            </div>
          )}

          {/* Ações rápidas */}
          <div className="flex gap-1 mt-2">
            {cycleItem.status === 'pendente' && (
              <Button
                size="xs"
                color="blue"
                onClick={() => onItemStart(cycleItem.id)}
                className="flex-1"
              >
                <HiPlay className="h-3 w-3 mr-1" />
                Iniciar
              </Button>
            )}
            {cycleItem.status === 'em_andamento' && (
              <Button
                size="xs"
                color="green"
                onClick={() => onItemComplete(cycleItem.id)}
                className="flex-1"
              >
                <HiCheck className="h-3 w-3 mr-1" />
                Concluir
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnItems = itemsByStatus[column.id] || [];
        const isDropTarget = dragOverColumn === column.id;
        const isWipLimitReached = column.maxItems && columnItems.length >= column.maxItems;

        return (
          <div
            key={column.id}
            className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[500px] transition-all duration-200 ${
              isDropTarget ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 border-dashed' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Header da coluna */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <column.icon className={`h-5 w-5 mr-2 text-${column.color}-600`} />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {column.title}
                </h3>
                <Badge color={column.color} size="sm" className="ml-2">
                  {columnItems.length}
                  {column.maxItems && `/${column.maxItems}`}
                </Badge>
              </div>
              
              {column.id === 'pendente' && (
                <Tooltip content="Adicionar item do backlog">
                  <Button
                    size="xs"
                    color="gray"
                    onClick={onAddItem}
                  >
                    <HiPlus className="h-3 w-3" />
                  </Button>
                </Tooltip>
              )}
            </div>

            {/* Aviso de limite WIP */}
            {isWipLimitReached && (
              <div className="mb-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded text-xs text-yellow-700 dark:text-yellow-300">
                <HiExclamationCircle className="h-3 w-3 inline mr-1" />
                Limite WIP atingido
              </div>
            )}

            {/* Lista de itens */}
            <div className="space-y-2">
              {columnItems.map(renderKanbanItem)}
            </div>

            {/* Área de drop vazia */}
            {columnItems.length === 0 && (
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <column.icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {column.id === 'pendente' ? 'Adicione itens do backlog' : 
                     column.id === 'em_andamento' ? 'Arraste itens para iniciar' :
                     column.id === 'concluido' ? 'Itens concluídos aparecerão aqui' :
                     'Itens bloqueados aparecerão aqui'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StudyKanban;