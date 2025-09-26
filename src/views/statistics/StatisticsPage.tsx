import React from 'react';
import { Card } from 'flowbite-react';
import { HiTrendingUp } from 'react-icons/hi';

const StatisticsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Estatísticas</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Painel de desempenho com gráficos e métricas
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiTrendingUp className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Dashboard de Estatísticas
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Painel completo com métricas detalhadas de performance
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Horas de estudo por período</p>
            <p>• Acertos por disciplina</p>
            <p>• Evolução semanal/mensal</p>
            <p>• Conclusão de metas e comparativos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatisticsPage;