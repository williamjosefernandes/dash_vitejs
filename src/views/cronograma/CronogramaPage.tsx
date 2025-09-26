import React from 'react';
import { HiClock } from 'react-icons/hi';
import StudyTimerList from '../../components/cronograma/StudyTimerList';

const CronogramaPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <HiClock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cronômetro de Estudos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Organize seus estudos por conteúdo e acompanhe seu progresso
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <StudyTimerList />
        </div>
      </div>
    </div>
  );
};

export default CronogramaPage;