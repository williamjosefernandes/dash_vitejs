import React from 'react';
import { Card, Button, Badge } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { CronogramaItem } from '../../types/cronograma/index';

interface DayActivity {
  time: string;
  subject: string;
  type: string;
  content: string;
  duration?: string;
}

interface DaySchedule {
  day: number;
  dayName: string;
  activities: DayActivity[];
}

interface CronogramaDetailViewProps {
  cronograma: CronogramaItem;
  onEdit?: () => void;
  onViewCalendar?: () => void;
}

// Dados de exemplo baseados na imagem
const mockScheduleData: DaySchedule[] = [
  {
    day: 26,
    dayName: 'Sáb, Julho',
    activities: [
      {
        time: '08:00 - 08:30',
        subject: 'Projeto/Português I',
        type: 'Plano de curso',
        content: 'Revisão Sintática - Complemento e Interpretação'
      },
      {
        time: '08:30 - 10:15',
        subject: 'Projeto/Português I',
        type: 'Complemento e Interpretação',
        content: 'Questões Práticas'
      },
      {
        time: '10:15 - 10:45',
        subject: 'Revisão de Lógica e Estatística I',
        type: 'Lógica/Proposições I',
        content: ''
      },
      {
        time: '10:45 - 11:15',
        subject: 'Revisão de Lógica e Estatística I',
        type: 'Lógica/Proposições II',
        content: ''
      },
      {
        time: '11:15 - 11:45',
        subject: 'Direito Administrativo I',
        type: 'Princípios Administrativos',
        content: 'Introdução'
      },
      {
        time: '11:45 - 12:00',
        subject: 'Direito Administrativo I',
        type: 'Princípios Administrativos',
        content: 'Legalidade - Impessoalidade'
      }
    ]
  },
  {
    day: 27,
    dayName: 'Sáb, Julho',
    activities: [
      {
        time: '08:00 - 08:15',
        subject: 'Direito Administrativo I',
        type: 'Princípios Administrativos',
        content: 'Legalidade - Impessoalidade'
      },
      {
        time: '08:15 - 08:45',
        subject: 'Fundamentos da Microeconomia e Macroeconomia I',
        type: 'Macroeconomia',
        content: 'Contas Nacionais'
      },
      {
        time: '10:00 - 10:15',
        subject: 'Fundamentos da Microeconomia e Macroeconomia I',
        type: 'Macroeconomia',
        content: 'Contas Nacionais II'
      },
      {
        time: '10:15 - 11:15',
        subject: 'Contabilidade Geral para a prova discursiva I',
        type: 'Escrituração e Lançamentos',
        content: 'Escrituração e Lançamentos'
      }
    ]
  }
];

const CronogramaDetailView: React.FC<CronogramaDetailViewProps> = ({
  cronograma,
  onEdit,
  onViewCalendar
}) => {
  const getSubjectColor = (subject: string): string => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200'
    ];
    
    const hash = subject.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const formatTime = (time: string): string => {
    return time.replace(' - ', ' - ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Meus cronogramas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Confira o que estudar
          </p>
        </div>
        <Button
          color="blue"
          size="sm"
          onClick={onEdit}
          className="flex items-center gap-2"
        >
          <Icon icon="solar:pen-bold" className="w-4 h-4" />
          Criar cronograma
        </Button>
      </div>

      {/* Main Schedule Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cronograma principal
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              color="gray"
              onClick={onEdit}
              className="flex items-center gap-1"
            >
              <Icon icon="solar:pen-bold" className="w-3 h-3" />
            </Button>
            <Button
              size="xs"
              color="gray"
              className="flex items-center gap-1"
            >
              <Icon icon="solar:menu-dots-bold" className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Badge color="green" size="sm" className="mb-2">
            Cronograma de Estudo
          </Badge>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {mockScheduleData.map((daySchedule) => (
            <div key={daySchedule.day} className="relative">
              {/* Day Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base">
                  {daySchedule.day}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {daySchedule.dayName}
                  </h4>
                </div>
              </div>

              {/* Activities */}
              <div className="ml-13 space-y-2">
                {daySchedule.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 px-2 py-0.5 rounded border">
                              {formatTime(activity.time)}
                            </span>
                            <Badge
                              color="blue"
                              size="xs"
                              className={`${getSubjectColor(activity.subject)} text-xs px-2 py-0.5`}
                            >
                              {activity.subject}
                            </Badge>
                          </div>
                          
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1 leading-tight">
                            {activity.type}
                          </h5>
                          
                          {activity.content && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                              {activity.content}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Button
                            size="xs"
                            color="gray"
                            className="p-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon icon="solar:pen-bold" className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connector line for next day */}
              {daySchedule.day < mockScheduleData[mockScheduleData.length - 1].day && (
                <div className="absolute left-5 top-12 w-0.5 h-6 bg-gray-300 dark:bg-gray-600"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Data de finalização do cronograma: <span className="font-medium">14/02/2024</span>
            </div>
            <Button
              color="blue"
              size="sm"
              onClick={onViewCalendar}
              className="flex items-center gap-2"
            >
              <Icon icon="solar:calendar-bold" className="w-4 h-4" />
              Visualizar calendário
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CronogramaDetailView;