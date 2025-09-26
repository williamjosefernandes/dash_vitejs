import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const CronogramaPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCronograma = () => {
    navigate('/cronograma/criar');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Meus cronogramas
        </h1>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
        {/* Calendar Icon */}
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
            <Icon 
              icon="solar:calendar-bold-duotone" 
              className="w-24 h-24 text-gray-300 dark:text-gray-600"
            />
          </div>
        </div>

        {/* Empty State Text */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Você ainda não criou nenhum cronograma de estudo
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Assim que você criar um cronograma, ele aparecerá aqui.
          </p>
        </div>

        {/* Create Button */}
        <button 
          onClick={handleCreateCronograma}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <Icon icon="solar:add-circle-bold" className="w-5 h-5 mr-2" />
          Criar cronograma
        </button>
      </div>
    </div>
  );
};

export default CronogramaPage;