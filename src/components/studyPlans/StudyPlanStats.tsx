import React from 'react';
import { Card } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiTrendingUp, HiClock, HiAcademicCap, HiCheckCircle, HiPlay, HiFire } from 'react-icons/hi';
import { StudyPlanStats } from '../../types/studyPlans';

interface StudyPlanStatsProps {
  stats: StudyPlanStats;
}

const StudyPlanStatsComponent: React.FC<StudyPlanStatsProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Total de Planos',
      value: stats.totalPlans,
      icon: 'solar:book-bookmark-bold-duotone',
      color: 'blue',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Planos Ativos',
      value: stats.activePlans,
      icon: 'solar:play-bold-duotone',
      color: 'green',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Planos Concluídos',
      value: stats.completedPlans,
      icon: 'solar:check-circle-bold-duotone',
      color: 'emerald',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
      textColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Horas Totais',
      value: `${stats.totalStudyHours}h`,
      icon: 'solar:clock-circle-bold-duotone',
      color: 'purple',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Média Semanal',
      value: `${stats.weeklyAverage}h`,
      icon: 'solar:calendar-bold-duotone',
      color: 'amber',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      title: 'Sequência',
      value: `${stats.streakDays} dias`,
      icon: 'solar:fire-bold-duotone',
      color: 'red',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statItems.map((item, index) => (
        <Card key={index} className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full ${item.bgColor}`}>
              <Icon 
                icon={item.icon} 
                className={`w-6 h-6 ${item.textColor}`}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.title}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StudyPlanStatsComponent;