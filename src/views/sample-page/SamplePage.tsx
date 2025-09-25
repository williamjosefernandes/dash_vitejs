// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import CardBox from '../../components/shared/CardBox';


const SamplePage = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Exemplo de div que ocupa 100% da altura da viewport */}
      <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center rounded-lg border border-border dark:border-darkborder">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Div com 100% da Altura da Viewport
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Este div ocupa toda a altura disponível da viewport e se ajusta responsivamente
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Características:
            </h3>
            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
              <li>✅ Altura: 100% da viewport</li>
              <li>✅ Design responsivo</li>
              <li>✅ Suporte a tema escuro</li>
              <li>✅ Flexbox para centralização</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
