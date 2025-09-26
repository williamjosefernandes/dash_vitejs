import React, { useState } from 'react';
import { useCronograma } from '../../hooks/useCronograma';
import { CronogramaList } from '../../components/cronograma/CronogramaList';
import { CronogramaModal } from '../../components/cronograma/CronogramaModal';
import { DeleteConfirmationModal } from '../../components/cronograma/DeleteConfirmationModal';
import { CronogramaItem, CronogramaFormData } from '../../types/cronograma';

export const CronogramaCRUDPage: React.FC = () => {
  const {
    cronogramas,
    create,
    update,
    delete: deleteCronograma,
    searchByTitle
  } = useCronograma();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCronograma, setSelectedCronograma] = useState<CronogramaItem | null>(null);
  const [cronogramaToDelete, setCronogramaToDelete] = useState<CronogramaItem | null>(null);

  // Search state
  const [filteredCronogramas, setFilteredCronogramas] = useState<CronogramaItem[]>(cronogramas);

  // Handle create new cronograma
  const handleCreate = () => {
    setModalMode('create');
    setSelectedCronograma(null);
    setIsModalOpen(true);
  };

  // Handle edit cronograma
  const handleEdit = (cronograma: CronogramaItem) => {
    setModalMode('edit');
    setSelectedCronograma(cronograma);
    setIsModalOpen(true);
  };

  // Handle delete cronograma
  const handleDelete = (id: string) => {
    const cronograma = cronogramas.find(c => c.id === id);
    if (cronograma) {
      setCronogramaToDelete(cronograma);
      setIsDeleteModalOpen(true);
    }
  };

  // Handle form submission
  const handleFormSubmit = (formData: CronogramaFormData) => {
    if (modalMode === 'create') {
      create(formData);
    } else if (selectedCronograma) {
      update(selectedCronograma.id, formData);
    }
    setIsModalOpen(false);
    setSelectedCronograma(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (cronogramaToDelete) {
      deleteCronograma(cronogramaToDelete.id);
      setCronogramaToDelete(null);
    }
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setFilteredCronogramas(cronogramas);
    } else {
      const results = searchByTitle(searchTerm);
      setFilteredCronogramas(results);
    }
  };

  // Update filtered cronogramas when cronogramas change
  React.useEffect(() => {
    setFilteredCronogramas(cronogramas);
  }, [cronogramas]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <CronogramaList
        cronogramas={filteredCronogramas}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onSearch={handleSearch}
      />

      {/* Cronograma Modal (Create/Edit) */}
      <CronogramaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCronograma(null);
        }}
        onSubmit={handleFormSubmit}
        cronograma={selectedCronograma}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCronogramaToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        cronograma={cronogramaToDelete}
      />
    </div>
  );
};