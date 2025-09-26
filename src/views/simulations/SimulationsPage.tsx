import React from 'react';
import { Card } from 'flowbite-react';
import { HiBeaker } from 'react-icons/hi';

const SimulationsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Simulados</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Simulados personalizados ou completos baseados no Plano de Estudo
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiBeaker className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Sistema de Simulados
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Simulados completos com relatórios detalhados de performance
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Simulados personalizados por disciplina</p>
            <p>• Relatórios com percentual de acertos</p>
            <p>• Tempo médio por questão</p>
            <p>• Ranking entre colegas</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimulationsPage;