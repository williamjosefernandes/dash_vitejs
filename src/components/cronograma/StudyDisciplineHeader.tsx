import React from 'react';
import { Button, Badge, Dropdown } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  HiChevronDown, 
  HiChevronRight, 
  HiPlus, 
  HiDotsVertical, 
  HiPencil, 
  HiTrash,
  HiTrendingUp,
  HiClock,
  HiBookOpen
} from 'react-icons/hi';
import { StudyDisciplineWithTopics } from '../../types/cronograma/studyTopic';

interface StudyDisciplineHeaderProps {
  discipline: StudyDisciplineWithTopics;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onAddTopic: () => void;
  onEdit: () => void;
  onDelete: () => void;
  getFormattedTime: (milliseconds: number) => string;
  completedTopics: number;
  inProgressTopics: number;
  viewMode?: 'grid' | 'list' | 'calendar';
}

const StudyDisciplineHeader: React.FC<StudyDisciplineHeaderProps> = ({
  discipline,
  isExpanded,
  onToggleExpansion,
  onAddTopic,
  onEdit,
  onDelete,
  getFormattedTime,
  completedTopics,
  inProgressTopics,
  viewMode = 'list',
}) => {
  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'success';
      case 'Pausado':
        return 'warning';
      case 'Concluído':
        return 'info';
      default:
        return 'gray';
    }
  };

  // Obter cor da prioridade
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'failure';
      case 'Média':
        return 'warning';
      case 'Baixa':
        return 'info';
      default:
        return 'gray';
    }
  };

  // Calcular progresso geral da disciplina
  const getProgressPercentage = () => {
    if (discipline.topics.length === 0) return 0;
    return (completedTopics / discipline.topics.length) * 100;
  };

  // Calcular progresso da meta de horas
  const getHoursProgressPercentage = () => {
    if (!discipline.targetHours) return 0;
    const hoursStudied = discipline.totalStudyTime / (1000 * 60 * 60);
    return Math.min((hoursStudied / discipline.targetHours) * 100, 100);
  };

  return (
    <div 
      className={`${
        viewMode === 'grid' || viewMode === 'calendar' 
          ? '' 
          : 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4'
      }`}
      style={{ 
        borderLeftWidth: viewMode === 'list' ? '4px' : '0', 
        borderLeftColor: viewMode === 'list' ? discipline.color : 'transparent' 
      }}
    >
      {/* Header principal */}
      <div className={`flex items-center justify-between ${viewMode === 'grid' || viewMode === 'calendar' ? 'mb-3' : 'mb-4'}`}>
        <div className="flex items-center flex-1 min-w-0">
          {/* Botão de expansão - apenas no modo lista */}
          {viewMode === 'list' && (
            <Button
              size="sm"
              color="gray"
              onClick={onToggleExpansion}
              className="mr-3 p-2"
            >
              {isExpanded ? (
                <HiChevronDown className="w-4 h-4" />
              ) : (
                <HiChevronRight className="w-4 h-4" />
              )}
            </Button>
          )}

          {/* Ícone da disciplina */}
          <div 
            className={`${
              viewMode === 'grid' || viewMode === 'calendar' 
                ? 'p-2 rounded-lg flex-shrink-0 mr-3' 
                : 'p-3 rounded-lg flex-shrink-0 mr-4'
            }`}
            style={{ backgroundColor: `${discipline.color}20` }}
          >
            <Icon 
              icon="solar:book-bold-duotone" 
              className={`${viewMode === 'grid' || viewMode === 'calendar' ? 'h-5 w-5' : 'h-6 w-6'}`}
              style={{ color: discipline.color }}
            />
          </div>

          {/* Nome e informações */}
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-2 ${viewMode === 'grid' || viewMode === 'calendar' ? 'mb-1' : 'mb-2'}`}>
              <h3 className={`${
                viewMode === 'grid' || viewMode === 'calendar' 
                  ? 'text-lg font-semibold' 
                  : 'text-xl font-bold'
              } text-gray-900 dark:text-white line-clamp-1`}>
                {discipline.name}
              </h3>
              {viewMode === 'list' && (
                <div className="flex items-center gap-2">
                  <Badge color={getStatusColor(discipline.status)} size="sm">
                    {discipline.status}
                  </Badge>
                  <Badge color={getPriorityColor(discipline.priority)} size="sm">
                    {discipline.priority}
                  </Badge>
                </div>
              )}
            </div>
            
            {discipline.description && viewMode === 'list' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                {discipline.description}
              </p>
            )}

            {/* Estatísticas rápidas */}
            <section className={`flex items-center gap-${viewMode === 'grid' || viewMode === 'calendar' ? '3' : '6'} text-sm text-gray-600 dark:text-gray-400`}>
              <article className="flex items-center gap-1">
                <HiBookOpen className="w-4 h-4" />
                <output>{discipline.topics.length} tópicos</output>
              </article>
              <article className="flex items-center gap-1">
                <HiTrendingUp className="w-4 h-4" />
                <output>{completedTopics} concluídos</output>
              </article>
              <article className="flex items-center gap-1">
                <HiClock className="w-4 h-4" />
                <time>{getFormattedTime(discipline.totalStudyTime)}</time>
              </article>
            </section>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            onClick={onAddTopic}
            className={`${
              viewMode === 'grid' || viewMode === 'calendar' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white px-2 py-1' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            title="Adicionar tópico"
          >
            <HiPlus className={`${viewMode === 'grid' || viewMode === 'calendar' ? 'w-3 h-3' : 'w-4 h-4'}`} />
            {viewMode === 'list' && <span className="ml-1">Tópico</span>}
          </Button>

          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <Button
                size="sm"
                color="gray"
                className={`${
                  viewMode === 'grid' || viewMode === 'calendar' 
                    ? 'p-1' 
                    : 'p-2'
                }`}
              >
                <HiDotsVertical className={`${viewMode === 'grid' || viewMode === 'calendar' ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
            )}
          >
            <Dropdown.Item onClick={onEdit} icon={HiPencil}>
              Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={onDelete} icon={HiTrash} className="text-red-600 dark:text-red-400">
              Excluir
            </Dropdown.Item>
          </Dropdown>

          {/* Botão de expansão para grid/calendar */}
          {(viewMode === 'grid' || viewMode === 'calendar') && (
            <Button
              size="sm"
              color="gray"
              onClick={onToggleExpansion}
              className="p-1"
              title={isExpanded ? 'Recolher' : 'Expandir'}
            >
              {isExpanded ? (
                <HiChevronDown className="w-3 h-3" />
              ) : (
                <HiChevronRight className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Barras de progresso */}
      {viewMode === 'list' && (
        <section className="space-y-3">
          {/* Progresso de tópicos */}
          <article>
            <header className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <label>Progresso dos Tópicos</label>
              <output>{getProgressPercentage().toFixed(1)}%</output>
            </header>
            <progress className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" value={getProgressPercentage()} max="100">
              <meter
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${getProgressPercentage()}%`,
                  backgroundColor: discipline.color 
                }}
              ></meter>
            </progress>
          </article>

          {/* Progresso da meta de horas (se houver) */}
          {discipline.targetHours && discipline.targetHours > 0 && (
            <article>
              <header className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <label>Meta de Horas</label>
                <output>{getHoursProgressPercentage().toFixed(1)}%</output>
              </header>
              <progress className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" value={getHoursProgressPercentage()} max="100">
                <meter
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${getHoursProgressPercentage()}%`,
                    backgroundColor: `${discipline.color}80` 
                  }}
                ></meter>
              </progress>
              <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Estudado: {(discipline.totalStudyTime / (1000 * 60 * 60)).toFixed(1)}h de {discipline.targetHours}h
              </small>
            </article>
          )}
        </section>
      )}

      {/* Progresso compacto para grid/calendar */}
      {(viewMode === 'grid' || viewMode === 'calendar') && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progresso</span>
            <span>{getProgressPercentage().toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${getProgressPercentage()}%`,
                backgroundColor: discipline.color 
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Resumo de status dos tópicos */}
      {isExpanded && discipline.topics.length > 0 && viewMode === 'list' && (
        <section className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <section className="grid grid-cols-3 gap-4 text-center">
            <article className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <output className="text-lg font-bold text-gray-600 dark:text-gray-300">
                {discipline.topics.length - completedTopics - inProgressTopics}
              </output>
              <small className="text-xs text-gray-500 dark:text-gray-400">Não estudados</small>
            </article>
            <article className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <output className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {inProgressTopics}
              </output>
              <small className="text-xs text-gray-500 dark:text-gray-400">Em progresso</small>
            </article>
            <article className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <output className="text-lg font-bold text-green-600 dark:text-green-400">
                {completedTopics}
              </output>
              <small className="text-xs text-gray-500 dark:text-gray-400">Concluídos</small>
            </article>
          </section>
        </section>
      )}

      {/* Resumo compacto para grid/calendar */}
      {isExpanded && discipline.topics.length > 0 && (viewMode === 'grid' || viewMode === 'calendar') && (
        <div className="mt-2 flex justify-center space-x-4 text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            {discipline.topics.length - completedTopics - inProgressTopics} não estudados
          </span>
          <span className="text-orange-500 dark:text-orange-400">
            {inProgressTopics} em progresso
          </span>
          <span className="text-green-500 dark:text-green-400">
            {completedTopics} concluídos
          </span>
        </div>
      )}
    </div>
  );
};

export default StudyDisciplineHeader;