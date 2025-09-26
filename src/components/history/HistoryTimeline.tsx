import React from 'react';
import { Card, Badge, Button } from 'flowbite-react';
import { HiClock, HiBookOpen, HiRefresh, HiClipboardCheck, HiCalendar, HiDotsHorizontal, HiPencil, HiTrash } from 'react-icons/hi';
import { HistoryRecord, HistoryGroupedData } from '../../types/history';

interface HistoryTimelineProps {
  groupedRecords: HistoryGroupedData;
  onRecordEdit: (record: HistoryRecord) => void;
  onRecordDelete: (recordId: string) => void;
}

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  groupedRecords,
  onRecordEdit,
  onRecordDelete
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study':
        return <HiBookOpen className="w-5 h-5" />;
      case 'review':
        return <HiRefresh className="w-5 h-5" />;
      case 'simulation':
        return <HiClipboardCheck className="w-5 h-5" />;
      case 'planning':
        return <HiCalendar className="w-5 h-5" />;
      default:
        return <HiDotsHorizontal className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study':
        return 'blue';
      case 'review':
        return 'green';
      case 'simulation':
        return 'purple';
      case 'planning':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'cancelled':
        return 'failure';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em andamento';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  if (Object.keys(groupedRecords).length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <HiClock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Nenhum registro encontrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Tente ajustar os filtros para ver mais resultados
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedRecords)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, records]) => (
          <div key={date} className="relative">
            {/* Data do grupo */}
            <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 py-2 mb-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                {formatDate(date)}
              </h3>
            </div>

            {/* Timeline dos registros */}
            <div className="relative">
              {/* Linha vertical da timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

              <div className="space-y-4">
                {records
                  .sort((a, b) => b.time.localeCompare(a.time))
                  .map((record, index) => (
                    <div key={record.id} className="relative flex items-start space-x-4">
                      {/* Ícone da timeline */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-${getCategoryColor(record.category)}-100 dark:bg-${getCategoryColor(record.category)}-900 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg`}>
                        <div className={`text-${getCategoryColor(record.category)}-600 dark:text-${getCategoryColor(record.category)}-400`}>
                          {getCategoryIcon(record.category)}
                        </div>
                      </div>

                      {/* Conteúdo do registro */}
                      <Card className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge color={getCategoryColor(record.category)}>
                                {record.type}
                              </Badge>
                              <Badge color={getStatusColor(record.status)}>
                                {getStatusText(record.status)}
                              </Badge>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {record.time}
                              </span>
                              {record.duration && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  • {formatDuration(record.duration)}
                                </span>
                              )}
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {record.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {record.description}
                            </p>
                            {record.subject && (
                              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                                📚 {record.subject}
                              </p>
                            )}
                            {record.score && (
                              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                📊 Pontuação: {record.score}%
                              </p>
                            )}
                            {record.notes && (
                              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-2">
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                  💡 {record.notes}
                                </p>
                              </div>
                            )}
                            {record.tags && record.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {record.tags.map((tag) => (
                                  <Badge key={tag} color="gray" size="sm">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Ações */}
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              color="gray"
                              onClick={() => onRecordEdit(record)}
                              className="p-2"
                            >
                              <HiPencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              color="failure"
                              onClick={() => onRecordDelete(record.id)}
                              className="p-2"
                            >
                              <HiTrash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HistoryTimeline;