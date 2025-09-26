import React, { useState } from 'react';
import { Modal, Button, Select, Checkbox, TextInput, Alert } from 'flowbite-react';
import { HiDownload, HiX, HiInformationCircle } from 'react-icons/hi';
import { ExportOptions, HistoryCategory } from '../../types/history';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  categories: HistoryCategory[];
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  categories
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: {
      startDate: '',
      endDate: ''
    },
    includeStats: true,
    categories: []
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleFormatChange = (format: 'csv' | 'pdf' | 'json') => {
    setExportOptions(prev => ({
      ...prev,
      format
    }));
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setExportOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setExportOptions(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleIncludeStatsToggle = () => {
    setExportOptions(prev => ({
      ...prev,
      includeStats: !prev.includeStats
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportOptions);
      onClose();
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'csv':
        return 'Arquivo de planilha compatível com Excel e Google Sheets';
      case 'pdf':
        return 'Documento PDF formatado com timeline e estatísticas';
      case 'json':
        return 'Arquivo JSON com todos os dados estruturados';
      default:
        return '';
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <HiDownload className="w-5 h-5" />
          Exportar Histórico
        </div>
      </Modal.Header>
      
      <Modal.Body>
        <div className="space-y-6">
          {/* Formato de exportação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Formato de Exportação
            </label>
            <Select
              value={exportOptions.format}
              onChange={(e) => handleFormatChange(e.target.value as 'csv' | 'pdf' | 'json')}
            >
              <option value="csv">CSV (Planilha)</option>
              <option value="pdf">PDF (Documento)</option>
              <option value="json">JSON (Dados estruturados)</option>
            </Select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getFormatDescription(exportOptions.format)}
            </p>
          </div>

          {/* Período de exportação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Período (opcional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Data inicial
                </label>
                <TextInput
                  type="date"
                  value={exportOptions.dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Data final
                </label>
                <TextInput
                  type="date"
                  value={exportOptions.dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Deixe em branco para exportar todo o histórico
            </p>
          </div>

          {/* Categorias */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categorias (opcional)
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={exportOptions.categories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {category.name} ({category.count} registros)
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Deixe desmarcado para incluir todas as categorias
            </p>
          </div>

          {/* Opções adicionais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Opções Adicionais
            </label>
            <div className="flex items-center">
              <Checkbox
                id="include-stats"
                checked={exportOptions.includeStats}
                onChange={handleIncludeStatsToggle}
              />
              <label
                htmlFor="include-stats"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Incluir estatísticas e métricas
              </label>
            </div>
          </div>

          {/* Informações sobre a exportação */}
          <Alert color="info" icon={HiInformationCircle}>
            <div className="text-sm">
              <p className="font-medium mb-1">Sobre a exportação:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Os dados serão exportados no formato selecionado</li>
                <li>Filtros aplicados na página não afetam a exportação</li>
                <li>O arquivo será baixado automaticamente após a geração</li>
                {exportOptions.format === 'pdf' && (
                  <li>O PDF incluirá uma timeline visual dos registros</li>
                )}
              </ul>
            </div>
          </Alert>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex justify-end gap-3 w-full">
          <Button
            color="gray"
            onClick={onClose}
            disabled={isExporting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Exportando...
              </>
            ) : (
              <>
                <HiDownload className="w-4 h-4" />
                Exportar
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportModal;