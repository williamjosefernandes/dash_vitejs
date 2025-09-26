import React from 'react';
import { TextInput, Select, Button, Badge } from 'flowbite-react';
import { HiSearch, HiFilter, HiX } from 'react-icons/hi';
import { StudyPlanFilters } from '../../types/studyPlans';

interface StudyPlanFiltersProps {
  filters: StudyPlanFilters;
  onFiltersChange: (filters: StudyPlanFilters) => void;
  onClearFilters: () => void;
  totalResults: number;
}

const StudyPlanFiltersComponent: React.FC<StudyPlanFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults
}) => {
  const handleFilterChange = (key: keyof StudyPlanFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== 'all'
  );

  const categoryOptions = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'concursos', label: 'Concursos' },
    { value: 'idiomas', label: 'Idiomas' },
    { value: 'academico', label: 'Acadêmico' },
    { value: 'certificacoes', label: 'Certificações' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'ativo', label: 'Ativo' },
    { value: 'pausado', label: 'Pausado' },
    { value: 'concluido', label: 'Concluído' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Todas as Dificuldades' },
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Título' },
    { value: 'progress', label: 'Progresso' },
    { value: 'startDate', label: 'Data de Início' },
    { value: 'endDate', label: 'Data de Fim' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Busca */}
        <div className="flex-1">
          <TextInput
            icon={HiSearch}
            placeholder="Buscar planos de estudo..."
            value={filters.searchTerm || ''}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={filters.difficulty || 'all'}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            {difficultyOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={filters.sortBy || 'title'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={filters.sortOrder || 'asc'}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </Select>
        </div>

        {/* Botão limpar filtros */}
        {hasActiveFilters && (
          <Button
            color="gray"
            size="sm"
            onClick={onClearFilters}
            className="whitespace-nowrap"
          >
            <HiX className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filtros ativos e resultados */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge color="blue" size="sm">
              Categoria: {categoryOptions.find(opt => opt.value === filters.category)?.label}
            </Badge>
          )}
          {filters.status && (
            <Badge color="green" size="sm">
              Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
            </Badge>
          )}
          {filters.difficulty && (
            <Badge color="yellow" size="sm">
              Dificuldade: {difficultyOptions.find(opt => opt.value === filters.difficulty)?.label}
            </Badge>
          )}
          {filters.searchTerm && (
            <Badge color="purple" size="sm">
              Busca: "{filters.searchTerm}"
            </Badge>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalResults} {totalResults === 1 ? 'plano encontrado' : 'planos encontrados'}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanFiltersComponent;