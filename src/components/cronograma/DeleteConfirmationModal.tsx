import React from 'react';
import { CronogramaItem } from '../../types/cronograma';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cronograma: CronogramaItem | null;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  cronograma
}) => {
  if (!isOpen || !cronograma) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Confirmar Exclusão
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-3">
              Tem certeza que deseja excluir o cronograma:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-gray-900 mb-1">
                {cronograma.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {cronograma.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <output>Status: {cronograma.status}</output>
            <output>Progresso: {cronograma.progress}%</output>
            <output>{cronograma.subjects.length} matérias</output>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-red-800 mb-1">
                  Atenção: Esta ação não pode ser desfeita
                </h4>
                <p className="text-sm text-red-700">
                  Todos os dados do cronograma, incluindo progresso e configurações, 
                  serão permanentemente removidos do sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Excluir Cronograma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};