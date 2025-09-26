import React, { useState } from 'react';
import { Modal, Button, Alert } from 'flowbite-react';
import { HiTrash, HiX, HiExclamationCircle } from 'react-icons/hi';
import { HistoryRecord } from '../../types/history';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: HistoryRecord | null;
  onConfirm: (recordId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  record,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!record) return;

    setIsDeleting(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onConfirm(record.id);
      onClose();
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  if (!record) return null;

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <HiExclamationCircle className="h-5 w-5 text-red-500" />
          Confirmar Exclusão
        </div>
      </Modal.Header>
      
      <Modal.Body>
        <div className="space-y-4">
          <Alert color="warning" icon={HiExclamationCircle}>
            <span className="font-medium">Atenção!</span> Esta ação não pode ser desfeita. 
            O registro será permanentemente removido do seu histórico.
          </Alert>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Registro a ser excluído:
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Título:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {record.title}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Categoria:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {record.category}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Matéria:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {record.subject}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Data:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDate(record.date)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Duração:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDuration(record.duration || 0)}
                </span>
              </div>
              
              {record.score !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Pontuação:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {record.score}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Descrição:</strong> {record.description}
            </p>
            
            {record.notes && (
              <p className="mt-2">
                <strong>Notas:</strong> {record.notes}
              </p>
            )}
            
            {record.tags && record.tags.length > 0 && (
              <div className="mt-2">
                <strong>Tags:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {record.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex justify-end gap-2 w-full">
          <Button
            color="gray"
            onClick={onClose}
            disabled={isDeleting}
          >
            <HiX className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            color="failure"
            onClick={handleConfirm}
            disabled={isDeleting}
            isProcessing={isDeleting}
          >
            <HiTrash className="mr-2 h-4 w-4" />
            {isDeleting ? 'Excluindo...' : 'Excluir Registro'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};