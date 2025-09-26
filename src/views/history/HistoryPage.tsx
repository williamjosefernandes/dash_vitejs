import React, { useState, useMemo } from 'react';
import { Button, Spinner, Toast } from 'flowbite-react';
import { HiDownload, HiPlus, HiCheck, HiX } from 'react-icons/hi';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryTimeline from '../../components/history/HistoryTimeline';
import HistoryStats from '../../components/history/HistoryStats';
import ExportModal from '../../components/history/ExportModal';
import { EditRecordModal } from '../../components/history/EditRecordModal';
import { DeleteConfirmModal } from '../../components/history/DeleteConfirmModal';
import { HistoryFilters as IHistoryFilters, HistoryRecord, HistoryGroupedData, ExportOptions } from '../../types/history';
import { mockHistoryRecords, mockHistoryCategories, mockHistoryStats } from '../../data/mockData/historyData';

const HistoryPage: React.FC = () => {
  const [filters, setFilters] = useState<IHistoryFilters>({
    dateRange: { startDate: '', endDate: '' },
    categories: [],
    subjects: [],
    status: [],
    searchTerm: ''
  });
  
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [records, setRecords] = useState<HistoryRecord[]>(mockHistoryRecords);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Extrair matérias únicas dos registros
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(records
      .filter(record => record.subject)
      .map(record => record.subject!))]
      .sort();
    return uniqueSubjects;
  }, [records]);

  // Filtrar registros baseado nos filtros aplicados
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Filtro por termo de busca
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          record.title.toLowerCase().includes(searchTerm) ||
          record.description.toLowerCase().includes(searchTerm) ||
          record.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          record.subject?.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Filtro por data
      if (filters.dateRange.startDate && record.date < filters.dateRange.startDate) {
        return false;
      }
      if (filters.dateRange.endDate && record.date > filters.dateRange.endDate) {
        return false;
      }

      // Filtro por categoria
      if (filters.categories.length > 0 && !filters.categories.includes(record.category)) {
        return false;
      }

      // Filtro por matéria
      if (filters.subjects.length > 0 && (!record.subject || !filters.subjects.includes(record.subject))) {
        return false;
      }

      // Filtro por status
      if (filters.status.length > 0 && !filters.status.includes(record.status)) {
        return false;
      }

      return true;
    });
  }, [filters, records]);

  // Agrupar registros por data
  const groupedRecords: HistoryGroupedData = useMemo(() => {
    return filteredRecords.reduce((groups, record) => {
      const date = record.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(record);
      return groups;
    }, {} as HistoryGroupedData);
  }, [filteredRecords]);

  // Calcular estatísticas baseadas nos registros filtrados
  const filteredStats = useMemo(() => {
    const completedRecords = filteredRecords.filter(r => r.status === 'completed');
    const totalTime = filteredRecords.reduce((sum, r) => sum + (r.duration || 0), 0);
    const scoresWithValues = filteredRecords.filter(r => r.score !== undefined);
    const averageScore = scoresWithValues.length > 0 
      ? scoresWithValues.reduce((sum, r) => sum + (r.score || 0), 0) / scoresWithValues.length 
      : 0;

    // Encontrar matéria mais estudada
    const subjectCounts = filteredRecords.reduce((counts, record) => {
      if (record.subject) {
        counts[record.subject] = (counts[record.subject] || 0) + 1;
      }
      return counts;
    }, {} as Record<string, number>);
    
    const mostStudiedSubject = Object.entries(subjectCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Nenhuma';

    return {
      totalRecords: filteredRecords.length,
      totalStudyTime: totalTime,
      completedActivities: completedRecords.length,
      averageScore,
      mostStudiedSubject,
      streakDays: mockHistoryStats.streakDays // Manter o valor original para streak
    };
  }, [filteredRecords]);

  const handleFilterChange = (newFilters: IHistoryFilters) => {
    setFilters(newFilters);
  };

  const handleExport = async (options: ExportOptions) => {
    setLoading(true);
    try {
      // Simular processo de exportação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui seria implementada a lógica real de exportação
      console.log('Exportando com opções:', options);
      
      // Simular download do arquivo
      const filename = `historico_estudos_${new Date().toISOString().split('T')[0]}.${options.format}`;
      console.log(`Arquivo ${filename} seria baixado`);
      
    } catch (error) {
      console.error('Erro na exportação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordEdit = (record: HistoryRecord) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleRecordDelete = (recordId: string) => {
    const record = records.find(r => r.id === recordId);
    if (record) {
      setSelectedRecord(record);
      setIsDeleteModalOpen(true);
    }
  };

  const handleSaveRecord = (updatedRecord: HistoryRecord) => {
    setRecords(prevRecords => 
      prevRecords.map(record => 
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
    setToast({
      show: true,
      message: 'Registro atualizado com sucesso!',
      type: 'success'
    });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleDeleteRecord = (recordId: string) => {
    setRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
    setToast({
      show: true,
      message: 'Registro excluído com sucesso!',
      type: 'success'
    });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Toast de notificação */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50">
          <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              toast.type === 'success' ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200' : 
              'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'
            }`}>
              {toast.type === 'success' ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <Toast.Toggle onClick={() => setToast({ show: false, message: '', type: 'success' })} />
          </Toast>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Histórico</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Linha do tempo completa da sua jornada de estudos
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            color="gray"
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2"
          >
            <HiDownload className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <HistoryStats stats={filteredStats} />

      {/* Filtros */}
      <HistoryFilters
        filters={filters}
        categories={mockHistoryCategories}
        subjects={subjects}
        onFilterChange={handleFilterChange}
      />

      {/* Timeline */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="xl" />
        </div>
      ) : (
        <HistoryTimeline
          groupedRecords={groupedRecords}
          onRecordEdit={handleRecordEdit}
          onRecordDelete={handleRecordDelete}
        />
      )}

      {/* Modal de Exportação */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        categories={mockHistoryCategories}
      />

      {/* Modal de Edição */}
      <EditRecordModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        categories={mockHistoryCategories}
        onSave={handleSaveRecord}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        onConfirm={handleDeleteRecord}
      />
    </div>
  );
};

export default HistoryPage;