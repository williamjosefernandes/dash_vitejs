import React from 'react';
import { Card } from 'flowbite-react';
import { HiClock } from 'react-icons/hi';

const HistoryPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Histórico</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Linha do tempo da jornada de estudos
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiClock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Histórico de Atividades
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Timeline completa da sua jornada de estudos
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Registro de atividades realizadas</p>
            <p>• Revisões concluídas</p>
            <p>• Simulados feitos</p>
            <p>• Evolução acumulada</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistoryPage;