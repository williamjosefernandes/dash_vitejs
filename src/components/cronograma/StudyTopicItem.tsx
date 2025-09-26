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
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200">
      {/* Header do tópico */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start flex-1 min-w-0">
          {/* Indicador de status */}
          <div className="flex-shrink-0 mr-3 mt-1">
            <Icon 
              icon={getStatusIcon(topic.status)}
              className={`w-5 h-5 ${
                topic.status === 'not_studied' ? 'text-gray-400' :
                topic.status === 'in_progress' ? 'text-orange-500' :
                'text-green-500'
              }`}
            />
          </div>
          
          {/* Nome e descrição */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
              {topic.name}
            </h4>
            {topic.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {topic.description}
              </p>
            )}
            
            {/* Status badge */}
            <div className="flex items-center gap-2 mt-2">
              <Badge color={getStatusColor(topic.status)} size="sm">
                {getStatusText(topic.status)}
              </Badge>
              
              {/* Meta de horas */}
              {topic.targetHours && (
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
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HiClock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Tempo de Estudo
            </span>
          </div>
          
          {/* Tempo atual */}
          <div className={`text-lg font-mono font-bold ${
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
          >
            {topic.isTimerRunning ? (
              <>
                <HiPause className="w-3 h-3 mr-1" />
                Pausar
              </>
            ) : (
              <>
                <HiPlay className="w-3 h-3 mr-1" />
                Iniciar
              </>
            )}
          </Button>
          
          <Button
            size="xs"
            color="gray"
            onClick={onResetTimer}
            disabled={topic.isTimerRunning || currentTime === 0}
          >
            <HiStop className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Barra de progresso (se houver meta) */}
      {topic.targetHours && topic.targetHours > 0 && (
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

      {/* Estatísticas do tópico */}
      <section className="grid grid-cols-2 gap-4 text-center pt-3 border-t border-gray-200 dark:border-gray-600">
        <article>
          <p className="text-xs text-gray-500 dark:text-gray-400">Sessões</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {topic.sessions.length}
          </p>
        </article>
        <article>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tempo Total</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
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