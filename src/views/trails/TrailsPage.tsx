import React from 'react';
import { Card } from 'flowbite-react';
import { HiMap } from 'react-icons/hi';

const TrailsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trilhas</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Planos de Estudo pré-configurados no sistema
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiMap className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Trilhas de Aprendizado
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Planos de Estudo estruturados com início, meio e fim
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Trilhas para ENEM, Vestibulares e Concursos</p>
            <p>• Sequência lógica de disciplinas e conteúdos</p>
            <p>• Possibilidade de personalização</p>
            <p>• Acompanhamento de progresso</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrailsPage;