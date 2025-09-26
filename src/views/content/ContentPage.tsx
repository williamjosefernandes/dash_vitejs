import React from 'react';
import { Card } from 'flowbite-react';
import { HiLibrary } from 'react-icons/hi';

const ContentPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Conteúdo</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Biblioteca central de materiais de estudo
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiLibrary className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Biblioteca de Conteúdo
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Biblioteca completa com PDFs, videoaulas, artigos e questões comentadas
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Filtros por disciplina, tema e dificuldade</p>
            <p>• Sistema de busca rápida</p>
            <p>• Conteúdo gratuito e premium</p>
            <p>• Avaliações e comentários</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContentPage;