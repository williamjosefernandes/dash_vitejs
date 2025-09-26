import React from 'react';
import { Card } from 'flowbite-react';
import { HiClock, HiCheckCircle, HiTrendingUp, HiBookOpen, HiFire } from 'react-icons/hi';
import { HistoryStats as IHistoryStats } from '../../types/history';

interface HistoryStatsProps {
  stats: IHistoryStats;
}

const HistoryStats: React.FC<HistoryStatsProps> = ({ stats }) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  const statsCards = [
    {
      title: 'Total de Registros',
      value: stats.totalRecords.toString(),
      icon: <HiBookOpen className="w-8 h-8" />,
      color: 'blue',
      description: 'atividades registradas'
    },
    {
      title: 'Tempo Total de Estudo',
      value: formatTime(stats.totalStudyTime),
      icon: <HiClock className="w-8 h-8" />,
      color: 'green',
      description: 'horas dedicadas'
    },
    {
      title: 'Atividades Concluídas',
      value: stats.completedActivities.toString(),
      icon: <HiCheckCircle className="w-8 h-8" />,
      color: 'purple',
      description: `${Math.round((stats.completedActivities / stats.totalRecords) * 100)}% de conclusão`
    },
    {
      title: 'Pontuação Média',
      value: `${stats.averageScore.toFixed(1)}%`,
      icon: <HiTrendingUp className="w-8 h-8" />,
      color: 'orange',
      description: 'desempenho geral'
    },
    {
      title: 'Matéria Mais Estudada',
      value: stats.mostStudiedSubject,
      icon: <HiBookOpen className="w-8 h-8" />,
      color: 'indigo',
      description: 'foco principal'
    },
    {
      title: 'Sequência de Dias',
      value: `${stats.streakDays} dias`,
      icon: <HiFire className="w-8 h-8" />,
      color: 'red',
      description: 'estudando consecutivamente'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800'
      },
      indigo: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-800'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {statsCards.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        return (
          <Card key={index} className={`border-l-4 ${colors.border} hover:shadow-lg transition-shadow`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.description}
                </p>
              </div>
              <div className={`p-3 rounded-full ${colors.bg}`}>
                <div className={colors.text}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default HistoryStats;