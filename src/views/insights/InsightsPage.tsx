import React from 'react';
import { Card } from 'flowbite-react';
import { HiChartBar } from 'react-icons/hi';

const InsightsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Insights</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Relatórios inteligentes gerados pela IA
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiChartBar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Dashboard de Insights
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Análises inteligentes com recomendações personalizadas da IA
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Identificação de pontos fortes e fracos</p>
            <p>• Recomendações de ajustes na rotina</p>
            <p>• Detecção de disciplinas negligenciadas</p>
            <p>• Sugestões de conteúdos adicionais</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InsightsPage;