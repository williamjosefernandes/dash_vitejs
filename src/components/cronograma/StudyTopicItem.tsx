import React, { useState, useEffect } from 'react';
import { Button, Badge, Dropdown } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  HiPlay, 
  HiPause, 
  HiStop, 
  HiDotsVertical, 
  HiPencil, 
  HiTrash, 
  HiCheck,
  HiClock,
  HiExclamation
} from 'react-icons/hi';
import { StudyTopic, StudyTopicStatus } from '../../types/cronograma/studyTopic';

interface StudyTopicItemProps {
  topic: StudyTopic;
  disciplineColor: string;
  onStartTimer: () => void;
  onStopTimer: () => void;
  onResetTimer: () => void;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  getCurrentTime: () => number;
  getFormattedTime: (milliseconds: number) => string;
  viewMode?: 'grid' | 'list' | 'calendar';
}

const StudyTopicItem: React.FC<StudyTopicItemProps> = ({
  topic,
  disciplineColor,
  onStartTimer,
  onStopTimer,
  onResetTimer,
  onComplete,
  onEdit,
  onDelete,
  getCurrentTime,
  getFormattedTime,
  viewMode = 'list',
}) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Atualizar tempo em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [getCurrentTime]);

  // Obter cor do status
  const getStatusColor = (status: StudyTopicStatus) => {
    switch (status) {
      case 'not_studied':
        return 'gray';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'gray';
    }
  };

  // Obter ícone do status
  const getStatusIcon = (status: StudyTopicStatus) => {
    switch (status) {
      case 'not_studied':
        return 'solar:clock-circle-bold-duotone';
      case 'in_progress':
        return 'solar:play-circle-bold-duotone';
      case 'completed':
        return 'solar:check-circle-bold-duotone';
      default:
        return 'solar:clock-circle-bold-duotone';
    }
  };

  // Obter texto do status
  const getStatusText = (status: StudyTopicStatus) => {
    switch (status) {
      case 'not_studied':
        return 'Não estudado';
      case 'in_progress':
        return 'Em progresso';
      case 'completed':
        return 'Concluído';
      default:
        return 'Não estudado';
    }
  };

  // Calcular progresso se houver meta
  const getProgressPercentage = () => {
    if (!topic.targetHours) return 0;
    const hoursStudied = topic.totalStudyTime / (1000 * 60 * 60);
    return Math.min((hoursStudied / topic.targetHours) * 100, 100);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${
      viewMode === 'grid' || viewMode === 'calendar' 
        ? 'p-3' 
        : 'p-4'
    }`}>
      {/* Header do tópico */}
      <div className={`flex items-start justify-between ${
        viewMode === 'grid' || viewMode === 'calendar' ? 'mb-2' : 'mb-3'
      }`}>
        <div className="flex items-start flex-1 min-w-0">
          {/* Indicador de status */}
          <div className={`flex-shrink-0 mr-3 ${
            viewMode === 'grid' || viewMode === 'calendar' ? 'mt-0.5' : 'mt-1'
          }`}>
            <Icon 
              icon={getStatusIcon(topic.status)}
              className={`${
                viewMode === 'grid' || viewMode === 'calendar' ? 'w-4 h-4' : 'w-5 h-5'
              } ${
                topic.status === 'not_studied' ? 'text-gray-400' :
                topic.status === 'in_progress' ? 'text-orange-500' :
                'text-green-500'
              }`}
            />
          </div>
          
          {/* Nome e descrição */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium text-gray-900 dark:text-white line-clamp-1 ${
              viewMode === 'grid' || viewMode === 'calendar' ? 'text-xs' : 'text-sm'
            }`}>
              {topic.name}
            </h4>
            {topic.description && viewMode === 'list' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {topic.description}
              </p>
            )}
            
            {/* Status badge */}
            <div className={`flex items-center gap-2 ${
              viewMode === 'grid' || viewMode === 'calendar' ? 'mt-1' : 'mt-2'
            }`}>
              <Badge color={getStatusColor(topic.status)} size="sm">
                {viewMode === 'grid' || viewMode === 'calendar' 
                  ? getStatusText(topic.status).substring(0, 8) + (getStatusText(topic.status).length > 8 ? '...' : '')
                  : getStatusText(topic.status)
                }
              </Badge>
              
              {/* Meta de horas - apenas em list view */}
              {topic.targetHours && viewMode === 'list' && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Meta: {topic.targetHours}h
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Menu de ações */}
        <Dropdown
          arrowIcon={false}
          inline
          label={<HiDotsVertical className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />}
        >
          <Dropdown.Item onClick={onEdit} icon={HiPencil}>
            Editar
          </Dropdown.Item>
          {topic.status !== 'completed' && (
            <Dropdown.Item onClick={onComplete} icon={HiCheck}>
              Marcar como concluído
            </Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item onClick={onDelete} icon={HiTrash} className="text-red-600 dark:text-red-400">
            Excluir
          </Dropdown.Item>
        </Dropdown>
      </div>

      {/* Cronômetro */}
      <div className={`bg-gray-50 dark:bg-gray-700 rounded-lg ${
        viewMode === 'grid' || viewMode === 'calendar' ? 'p-2 mb-2' : 'p-3 mb-3'
      }`}>
        <div className={`flex items-center justify-between ${
          viewMode === 'grid' || viewMode === 'calendar' ? 'mb-1' : 'mb-2'
        }`}>
          <div className="flex items-center gap-2">
            <HiClock className={`text-gray-500 dark:text-gray-400 ${
              viewMode === 'grid' || viewMode === 'calendar' ? 'w-3 h-3' : 'w-4 h-4'
            }`} />
            {viewMode === 'list' && (
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Tempo de Estudo
              </span>
            )}
          </div>
          
          {/* Tempo atual */}
          <div className={`font-mono font-bold ${
            viewMode === 'grid' || viewMode === 'calendar' ? 'text-sm' : 'text-lg'
          } ${
            topic.isTimerRunning 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {getFormattedTime(currentTime)}
          </div>
        </div>

        {/* Controles do cronômetro */}
        <div className="flex items-center justify-center gap-2">
          <Button
            size="xs"
            color={topic.isTimerRunning ? "failure" : "success"}
            onClick={topic.isTimerRunning ? onStopTimer : onStartTimer}
            disabled={topic.status === 'completed'}
            className={viewMode === 'grid' || viewMode === 'calendar' ? 'px-2 py-1' : ''}
          >
            {topic.isTimerRunning ? (
              <>
                <HiPause className={`${
                  viewMode === 'grid' || viewMode === 'calendar' ? 'w-2 h-2' : 'w-3 h-3'
                } mr-1`} />
                {viewMode === 'list' ? 'Pausar' : 'P'}
              </>
            ) : (
              <>
                <HiPlay className={`${
                  viewMode === 'grid' || viewMode === 'calendar' ? 'w-2 h-2' : 'w-3 h-3'
                } mr-1`} />
                {viewMode === 'list' ? 'Iniciar' : 'I'}
              </>
            )}
          </Button>
          
          <Button
            size="xs"
            color="gray"
            onClick={onResetTimer}
            className={viewMode === 'grid' || viewMode === 'calendar' ? 'px-2 py-1' : ''}
            disabled={topic.isTimerRunning || currentTime === 0}
          >
            <HiStop className={`${
              viewMode === 'grid' || viewMode === 'calendar' ? 'w-2 h-2' : 'w-3 h-3'
            } mr-1`} />
            {viewMode === 'list' ? 'Reset' : 'R'}
          </Button>
        </div>
      </div>

      {/* Barra de progresso (se houver meta) - apenas em list view */}
      {topic.targetHours && topic.targetHours > 0 && viewMode === 'list' && (
        <div className="mb-3">
          <header className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <label>Progresso da Meta</label>
            <output>{getProgressPercentage().toFixed(1)}%</output>
          </header>
          <progress className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2" value={getProgressPercentage()} max="100">
            <meter
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${getProgressPercentage()}%`,
                backgroundColor: disciplineColor 
              }}
            ></meter>
          </progress>
          <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Estudado: {(topic.totalStudyTime / (1000 * 60 * 60)).toFixed(1)}h de {topic.targetHours}h
          </small>
        </div>
      )}

      {/* Progresso compacto para grid/calendar */}
      {topic.targetHours && topic.targetHours > 0 && (viewMode === 'grid' || viewMode === 'calendar') && (
        <div className="mb-2">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
            <div
              className="h-1 rounded-full transition-all duration-300"
              style={{ 
                width: `${getProgressPercentage()}%`,
                backgroundColor: disciplineColor 
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{getProgressPercentage().toFixed(0)}%</span>
            <span>{topic.targetHours}h</span>
          </div>
        </div>
      )}

      {/* Estatísticas do tópico */}
      <section className={`grid grid-cols-2 gap-4 text-center border-t border-gray-200 dark:border-gray-600 ${
        viewMode === 'grid' || viewMode === 'calendar' ? 'pt-2' : 'pt-3'
      }`}>
        <article>
          <p className={`text-gray-500 dark:text-gray-400 ${
            viewMode === 'grid' || viewMode === 'calendar' ? 'text-xs' : 'text-xs'
          }`}>Sessões</p>
          <p className={`font-semibold text-gray-900 dark:text-white ${
            viewMode === 'grid' || viewMode === 'calendar' ? 'text-xs' : 'text-sm'
          }`}>
            {topic.sessions.length}
          </p>
        </article>
        <article>
          <p className={`text-gray-500 dark:text-gray-400 ${
            viewMode === 'grid' || viewMode === 'calendar' ? 'text-xs' : 'text-xs'
          }`}>Tempo Total</p>
          <p className={`font-semibold text-gray-900 dark:text-white ${
            viewMode === 'grid' || viewMode === 'calendar' ? 'text-xs' : 'text-sm'
          }`}>
            {getFormattedTime(topic.totalStudyTime)}
          </p>
        </article>
      </section>

      {/* Indicador de timer ativo */}
      {topic.isTimerRunning && (
        <aside className="absolute -top-1 -right-1">
          <mark className="w-3 h-3 bg-green-500 rounded-full animate-pulse block"></mark>
        </aside>
      )}
    </div>
  );
};

export default StudyTopicItem;