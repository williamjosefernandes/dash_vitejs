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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4"
      style={{ borderLeftWidth: '4px', borderLeftColor: discipline.color }}
    >
      {/* Header principal */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center flex-1 min-w-0">
          {/* Botão de expansão */}
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

          {/* Ícone da disciplina */}
          <div 
            className="p-3 rounded-lg flex-shrink-0 mr-4"
            style={{ backgroundColor: `${discipline.color}20` }}
          >
            <Icon 
              icon="solar:book-bold-duotone" 
              className="h-6 w-6"
              style={{ color: discipline.color }}
            />
          </div>

          {/* Nome e informações */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                {discipline.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge color={getStatusColor(discipline.status)} size="sm">
                  {discipline.status}
                </Badge>
                <Badge color={getPriorityColor(discipline.priority)} size="sm">
                  {discipline.priority}
                </Badge>
              </div>
            </div>
            
            {discipline.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                {discipline.description}
              </p>
            )}

            {/* Estatísticas rápidas */}
            <section className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
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
            className="bg-blue-600 hover:bg-blue-700"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            Tópico
          </Button>

          <Dropdown
            arrowIcon={false}
            inline
            label={<HiDotsVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />}
          >
            <Dropdown.Item onClick={onEdit} icon={HiPencil}>
              Editar Disciplina
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onDelete} icon={HiTrash} className="text-red-600 dark:text-red-400">
              Excluir Disciplina
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Barras de progresso */}
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

      {/* Resumo de status dos tópicos */}
      {isExpanded && discipline.topics.length > 0 && (
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
    </div>
  );
};

export default StudyDisciplineHeader;