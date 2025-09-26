import React, { useState } from 'react';
import { Card, Button, TextInput, Select, Badge, Datepicker } from 'flowbite-react';
import { HiSearch, HiFilter, HiX } from 'react-icons/hi';
import { HistoryFilters as IHistoryFilters, HistoryCategory } from '../../types/history';

interface HistoryFiltersProps {
  filters: IHistoryFilters;
  categories: HistoryCategory[];
  onFilterChange: (filters: IHistoryFilters) => void;
  subjects: string[];
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  filters,
  categories,
  onFilterChange,
  subjects
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (value: string) => {
    onFilterChange({
      ...filters,
      searchTerm: value
    });
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter(s => s !== subject)
      : [...filters.subjects, subject];
    
    onFilterChange({
      ...filters,
      subjects: newSubjects
    });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: [status]
    });
  };

  const clearFilters = () => {
    onFilterChange({
      dateRange: { startDate: '', endDate: '' },
      categories: [],
      subjects: [],
      status: [],
      searchTerm: ''
    });
  };

  const hasActiveFilters = filters.searchTerm || 
    filters.categories.length > 0 || 
    filters.subjects.length > 0 || 
    filters.status.length > 0 ||
    filters.dateRange.startDate ||
    filters.dateRange.endDate;

  return (
    <Card className="mb-6">
      <div className="space-y-4">
        {/* Barra de busca principal */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <TextInput
              icon={HiSearch}
              placeholder="Buscar por título, descrição ou tags..."
              value={filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              color="gray"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              <HiFilter className="w-4 h-4" />
              Filtros Avançados
            </Button>
            {hasActiveFilters && (
              <Button
                color="light"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <HiX className="w-4 h-4" />
                Limpar
              </Button>
            )}
          </div>
        </div>

        {/* Filtros expandidos */}
        {isExpanded && (
          <div className="border-t pt-4 space-y-4">
            {/* Filtros de data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Inicial
                </label>
                <TextInput
                  type="date"
                  value={filters.dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Final
                </label>
                <TextInput
                  type="date"
                  value={filters.dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* Filtro de status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <Select
                value={filters.status[0] || ''}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="completed">Concluído</option>
                <option value="in_progress">Em andamento</option>
                <option value="cancelled">Cancelado</option>
              </Select>
            </div>

            {/* Filtros de categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categorias
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    color={filters.categories.includes(category.id) ? category.color : 'gray'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Filtros de matéria */}
            {subjects.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Matérias
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <Badge
                      key={subject}
                      color={filters.subjects.includes(subject) ? 'blue' : 'gray'}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleSubjectToggle(subject)}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filtros ativos */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {filters.categories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Badge
                  key={categoryId}
                  color={category.color}
                  className="flex items-center gap-1"
                >
                  {category.name}
                  <HiX
                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                    onClick={() => handleCategoryToggle(categoryId)}
                  />
                </Badge>
              ) : null;
            })}
            {filters.subjects.map((subject) => (
              <Badge
                key={subject}
                color="blue"
                className="flex items-center gap-1"
              >
                {subject}
                <HiX
                  className="w-3 h-3 cursor-pointer hover:opacity-70"
                  onClick={() => handleSubjectToggle(subject)}
                />
              </Badge>
            ))}
            {filters.status.map((status) => (
              <Badge
                key={status}
                color="green"
                className="flex items-center gap-1"
              >
                {status === 'completed' ? 'Concluído' : 
                 status === 'in_progress' ? 'Em andamento' : 'Cancelado'}
                <HiX
                  className="w-3 h-3 cursor-pointer hover:opacity-70"
                  onClick={() => handleStatusChange('')}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default HistoryFilters;