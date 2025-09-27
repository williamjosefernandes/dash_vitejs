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
  HiBookOpen,
  HiPlay
} from 'react-icons/hi';
import { StudyDisciplineWithTopics } from '../../types/cronograma/studyTopic';

interface StudyScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  topic: string;
  type: 'class' | 'study' | 'review';
  status: 'pending' | 'in_progress' | 'completed';
  color: string;
}

interface StudyDaySchedule {
  date: string;
  dayName: string;
  dayNumber: number;
  items: StudyScheduleItem[];
}

interface StudyDisciplineHeaderProps {
  discipline?: StudyDisciplineWithTopics;
  scheduleData?: StudyDaySchedule[];
  isExpanded?: boolean;
  onToggleExpansion?: () => void;
  onAddTopic?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  getFormattedTime?: (milliseconds: number) => string;
  completedTopics?: number;
  inProgressTopics?: number;
  viewMode?: 'grid' | 'list' | 'calendar' | 'schedule';
  onStartStudy?: (itemId: string) => void;
}

const StudyDisciplineHeader: React.FC<StudyDisciplineHeaderProps> = ({
  discipline,
  scheduleData,
  isExpanded,
  onToggleExpansion,
  onAddTopic,
  onEdit,
  onDelete,
  getFormattedTime,
  completedTopics,
  inProgressTopics,
  viewMode = 'list',
  onStartStudy,
}) => {
  // Se for modo cronograma, renderizar layout específico
  if (viewMode === 'schedule' && scheduleData) {
    return (
      <div>
        {/* Header do cronograma */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <Icon
                  icon="solar:calendar-bold-duotone"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Meus Estudos
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lista de conteúdos para estudo
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" color="blue">
                <HiPlus className="w-4 h-4 mr-1" />
                Adicionar Conteúdo
              </Button>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <Button size="sm" color="gray">
                    <HiDotsVertical className="w-4 h-4" />
                  </Button>
                )}
              >
                <Dropdown.Item icon={HiPencil}>Editar cronograma</Dropdown.Item>
                <Dropdown.Item icon={HiTrash} className="text-red-600">Excluir</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Lista de dias */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {scheduleData.map((day) => (
            <div key={day.date} className="p-6">
              {/* Header do dia */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {day.dayNumber}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {day.dayName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {day.date}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  color="gray"
                  onClick={onToggleExpansion}
                  className="p-2"
                >
                  {isExpanded ? (
                    <HiChevronDown className="w-4 h-4" />
                  ) : (
                    <HiChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Lista de atividades do dia */}
              <div className="space-y-3">
                {day.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    {/* Horário */}
                    <div className="flex-shrink-0 text-center min-w-[80px]">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.startTime}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.endTime}
                      </div>
                    </div>

                    {/* Indicador de cor */}
                    <div
                      className="w-1 h-12 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {item.subject}
                        </h4>
                        <Badge
                          color={
                            item.type === 'class' ? 'blue' :
                            item.type === 'study' ? 'green' : 'yellow'
                          }
                          size="xs"
                        >
                          {item.type === 'class' ? 'Aula' :
                           item.type === 'study' ? 'Estudo' : 'Revisão'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        {item.topic}
                      </p>
                    </div>

                    {/* Status e ações */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.status === 'completed' ? 'bg-green-500' :
                            item.status === 'in_progress' ? 'bg-yellow-500' :
                            'bg-gray-300'
                          }`}
                        />
                      </div>
                      
                      {item.status === 'pending' && onStartStudy && (
                        <Button
                          size="xs"
                          color="blue"
                          onClick={() => onStartStudy(item.id)}
                          className="px-2 py-1"
                        >
                          <HiPlay className="w-3 h-3" />
                        </Button>
                      )}
                      
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <Button size="xs" color="gray" className="p-1">
                            <HiDotsVertical className="w-3 h-3" />
                          </Button>
                        )}
                      >
                        <Dropdown.Item icon={HiPencil}>Editar</Dropdown.Item>
                        <Dropdown.Item icon={HiTrash} className="text-red-600">Excluir</Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
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
    if (!discipline || discipline.topics.length === 0) return 0;
    return ((completedTopics || 0) / discipline.topics.length) * 100;
  };

  // Calcular progresso da meta de horas
  const getHoursProgressPercentage = () => {
    if (!discipline || !discipline.targetHours) return 0;
    const hoursStudied = discipline.totalStudyTime / (1000 * 60 * 60);
    return Math.min((hoursStudied / discipline.targetHours) * 100, 100);
  };

  // Se não há disciplina, retornar null
  if (!discipline) return null;

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
          {viewMode === 'list' && onToggleExpansion && (
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
                <output>{completedTopics || 0} concluídos</output>
              </article>
              <article className="flex items-center gap-1">
                <HiClock className="w-4 h-4" />
                <time>{getFormattedTime ? getFormattedTime(discipline.totalStudyTime) : '0h'}</time>
              </article>
            </section>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onAddTopic && (
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
          )}

          {(onEdit || onDelete) && (
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
              {onEdit && (
                <Dropdown.Item onClick={onEdit} icon={HiPencil}>
                  Editar
                </Dropdown.Item>
              )}
              {onDelete && (
                <Dropdown.Item onClick={onDelete} icon={HiTrash} className="text-red-600 dark:text-red-400">
                  Excluir
                </Dropdown.Item>
              )}
            </Dropdown>
          )}

          {/* Botão de expansão para grid/calendar */}
          {(viewMode === 'grid' || viewMode === 'calendar') && onToggleExpansion && (
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
                {discipline.topics.length - (completedTopics || 0) - (inProgressTopics || 0)}
              </output>
              <small className="text-xs text-gray-500 dark:text-gray-400">Não estudados</small>
            </article>
            <article className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <output className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {inProgressTopics || 0}
              </output>
              <small className="text-xs text-gray-500 dark:text-gray-400">Em progresso</small>
            </article>
            <article className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <output className="text-lg font-bold text-green-600 dark:text-green-400">
                {completedTopics || 0}
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
            {discipline.topics.length - (completedTopics || 0) - (inProgressTopics || 0)} não estudados
          </span>
          <span className="text-orange-500 dark:text-orange-400">
            {inProgressTopics || 0} em progresso
          </span>
          <span className="text-green-500 dark:text-green-400">
            {completedTopics || 0} concluídos
          </span>
        </div>
      )}
    </div>
  );
};

export default StudyDisciplineHeader;