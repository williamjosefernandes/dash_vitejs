import React, { useState } from 'react';
import { CronogramaItem } from '../../types/cronograma';
import { Calendar, Clock, BookOpen, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';

interface CronogramaListProps {
  cronogramas: CronogramaItem[];
  onEdit: (cronograma: CronogramaItem) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onSearch: (searchTerm: string) => void;
}

export const CronogramaList: React.FC<CronogramaListProps> = ({
  cronogramas,
  onEdit,
  onDelete,
  onCreate,
  onSearch
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const getStatusColor = (status: CronogramaItem['status']) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Pausado': return 'bg-yellow-100 text-yellow-800';
      case 'Concluído': return 'bg-blue-100 text-blue-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: CronogramaItem['priority']) => {
    switch (priority) {
      case 'Alta': return 'bg-red-500';
      case 'Média': return 'bg-yellow-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredCronogramas = cronogramas.filter(cronograma => {
    const matchesStatus = statusFilter === 'all' || cronograma.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || cronograma.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cronogramas de Estudo</h1>
            <p className="text-gray-600 mt-2">Gerencie seus cronogramas de estudo de forma eficiente</p>
          </div>
          <button
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Novo Cronograma
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar cronogramas..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Pausado">Pausado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas as Prioridades</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cronogramas Grid */}
      {filteredCronogramas.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum cronograma encontrado</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece criando seu primeiro cronograma de estudo'}
          </p>
          {!searchTerm && (
            <button
              onClick={onCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Criar Primeiro Cronograma
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCronogramas.map((cronograma) => (
            <div key={cronograma.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(cronograma.priority)}`}></div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cronograma.status)}`}>
                      {cronograma.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(cronograma)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(cronograma.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {cronograma.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {cronograma.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Progresso</label>
            <output className="text-sm text-gray-600">{cronograma.progress}%</output>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${cronograma.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <output>{cronograma.completedHours}h / {cronograma.totalHours}h</output>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen size={16} />
                    <output>{cronograma.subjects.length} matérias</output>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar size={16} />
                  <time>{formatDate(cronograma.startDate)} - {formatDate(cronograma.endDate)}</time>
                </div>

                {/* Subjects Tags */}
                <div className="flex flex-wrap gap-1">
                  {cronograma.subjects.slice(0, 3).map((subject, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                  {cronograma.subjects.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{cronograma.subjects.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};