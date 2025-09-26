import React from 'react';
import { Card } from 'flowbite-react';
import { HiCog } from 'react-icons/hi';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Personalização do perfil do aluno
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <HiCog className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Configurações do Sistema
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Em breve: Painel completo de configurações e personalização
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Dados pessoais e preferências</p>
            <p>• Configurações de notificação</p>
            <p>• Assinatura e cartões de pagamento</p>
            <p>• Definição de metas e privacidade</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;