import React from 'react';
import { Card } from 'flowbite-react';
import { HiRefresh } from 'react-icons/hi';

const ReviewsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Revisões</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Sistema de revisão inteligente com repetição espaçada
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiRefresh className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Sistema de Revisões
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Sistema inteligente de revisões com IA que sugere quando revisar cada disciplina/tópico
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Repetição espaçada personalizada</p>
            <p>• Histórico de revisões realizadas</p>
            <p>• Sugestões automáticas da IA</p>
            <p>• Acompanhamento de retenção</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewsPage;