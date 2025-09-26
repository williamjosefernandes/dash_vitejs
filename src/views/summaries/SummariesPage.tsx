import React from 'react';
import { Card } from 'flowbite-react';
import { HiDocumentText } from 'react-icons/hi';

const SummariesPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resumos</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Banco de resumos do aluno e gerados pela IA
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiDocumentText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Sistema de Resumos
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Resumos personalizados em diferentes formatos
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Fichamentos e resumos rápidos</p>
            <p>• Mapas mentais interativos</p>
            <p>• Resumos gerados por IA</p>
            <p>• Visualização otimizada para revisão</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummariesPage;