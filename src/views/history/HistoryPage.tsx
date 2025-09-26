import React, { useState, useMemo } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { HiDownload, HiPlus } from 'react-icons/hi';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryTimeline from '../../components/history/HistoryTimeline';
import HistoryStats from '../../components/history/HistoryStats';
import ExportModal from '../../components/history/ExportModal';
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
  const [loading, setLoading] = useState(false);

  // Extrair matérias únicas dos registros
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(mockHistoryRecords
      .filter(record => record.subject)
      .map(record => record.subject!))]
      .sort();
    return uniqueSubjects;
  }, []);

  // Filtrar registros baseado nos filtros aplicados
  const filteredRecords = useMemo(() => {
    return mockHistoryRecords.filter(record => {
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
  }, [filters]);

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
    // Implementar edição de registro
    console.log('Editar registro:', record);
  };

  const handleRecordDelete = (recordId: string) => {
    // Implementar exclusão de registro
    console.log('Excluir registro:', recordId);
  };

  return (
    <div className="p-6 space-y-6">
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
    </div>
  );
};

export default HistoryPage;