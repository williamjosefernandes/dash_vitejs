import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Progress, Modal, Alert, TextInput, Select } from 'flowbite-react';
import { HiPlus, HiViewGrid, HiViewList, HiInformationCircle, HiSearch, HiAcademicCap, HiTrendingUp, HiClock, HiBookOpen } from 'react-icons/hi';
import { Icon } from '@iconify/react';

// Componentes
import StudyPlanCard from '../../components/studyPlans/StudyPlanCard';

// Tipos e dados
import { StudyPlan, StudyPlanFilters } from '../../types/studyPlans';
import { mockStudyPlansNew } from '../../data/mockData/studyPlansNew';

const StudyPlansPage: React.FC = () => {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>(mockStudyPlansNew);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [filters, setFilters] = useState<StudyPlanFilters>({
    searchTerm: '',
    category: undefined,
    status: undefined,
    difficulty: undefined,
    sortBy: 'title',
    sortOrder: 'asc'
  });

  // Filtrar e ordenar planos de estudo
  const filteredAndSortedPlans = useMemo(() => {
    let filtered = studyPlans.filter(plan => {
      const matchesSearch = !filters.searchTerm || 
        plan.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm!.toLowerCase()));
      
      const matchesCategory = !filters.category || plan.category === filters.category;
      const matchesStatus = !filters.status || plan.status === filters.status;
      const matchesDifficulty = !filters.difficulty || plan.difficulty === filters.difficulty;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
    });

    // Ordenação
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any = a[filters.sortBy as keyof StudyPlan];
        let bValue: any = b[filters.sortBy as keyof StudyPlan];
        
        if (filters.sortBy === 'startDate' || filters.sortBy === 'endDate') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    return filtered;
  }, [studyPlans, filters]);

  // Estatísticas calculadas
  const stats = useMemo(() => {
    const total = studyPlans.length;
    const active = studyPlans.filter(p => p.status === 'ativo').length;
    const completed = studyPlans.filter(p => p.status === 'concluido').length;
    const paused = studyPlans.filter(p => p.status === 'pausado').length;
    
    return { total, active, completed, paused };
  }, [studyPlans]);

  // Handlers
  const handleViewPlan = (id: string) => {
    console.log('Visualizar plano:', id);
    // Implementar navegação para detalhes do plano
  };

  const handleEditPlan = (id: string) => {
    console.log('Editar plano:', id);
    // Implementar edição do plano
  };

  const handleDeletePlan = (id: string) => {
    setSelectedPlanId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPlanId) {
      setStudyPlans(prev => prev.filter(plan => plan.id !== selectedPlanId));
      setShowDeleteModal(false);
      setSelectedPlanId(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    setStudyPlans(prev => prev.map(plan => {
      if (plan.id === id) {
        const newStatus = plan.status === 'ativo' ? 'pausado' : 'ativo';
        return { ...plan, status: newStatus };
      }
      return plan;
    }));
  };

  const handleCreatePlan = () => {
    console.log('Criar novo plano');
    // Implementar criação de novo plano
  };

  // Componente para visualização em Grid
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAndSortedPlans.map(plan => (
        <StudyPlanCard
          key={plan.id}
          studyPlan={plan}
          onView={handleViewPlan}
          onEdit={handleEditPlan}
          onDelete={handleDeletePlan}
          onToggleStatus={handleToggleStatus}
        />
      ))}
    </div>
  );

  // Componente para visualização em Lista
  const ListView = () => (
    <div className="space-y-3">
      {filteredAndSortedPlans.map((plan, index) => {
        // Determina se o item está em um grupo de 3 que deve ter fundo cinza
        const groupIndex = Math.floor(index / 3);
        const shouldHaveGrayBackground = groupIndex % 2 === 0;
        
        return (
          <Card 
            key={plan.id} 
            className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.01] ${
              shouldHaveGrayBackground 
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 p-2">
              {/* Informações principais */}
              <div className="flex items-center flex-1 min-w-0">
                <div className={`p-3 rounded-lg bg-${plan.color}-100 dark:bg-${plan.color}-900 flex-shrink-0`}>
                  <Icon icon={plan.icon} className={`h-8 w-8 text-${plan.color}-600 dark:text-${plan.color}-400`} />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                      {plan.title}
                    </h3>
                    <Badge color="gray" size="sm" className="flex-shrink-0">
                      {plan.category}
                    </Badge>
                  </div>
                  {plan.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {plan.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <HiAcademicCap className="w-3 h-3" />
                      {plan.subjects.length} disciplinas
                    </span>
                    <span className="flex items-center gap-1">
                      <HiClock className="w-3 h-3" />
                      {plan.completedHours}h / {plan.totalHours}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Progresso e estatísticas */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4 lg:min-w-0 xl:min-w-max">
                <div className="flex flex-col items-start sm:items-center lg:items-end xl:items-center min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge color={plan.status === 'ativo' ? 'success' : plan.status === 'pausado' ? 'warning' : plan.status === 'concluido' ? 'info' : 'failure'}>
                      {plan.status === 'ativo' ? 'Ativo' : 
                       plan.status === 'pausado' ? 'Pausado' : 
                       plan.status === 'concluido' ? 'Concluído' : 'Cancelado'}
                    </Badge>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {plan.progress}%
                    </span>
                  </div>
                  <div className="w-40 mb-2">
                    <Progress progress={plan.progress} color={plan.color} size="md" />
                  </div>
                  <Badge color={plan.difficulty === 'iniciante' ? 'success' : plan.difficulty === 'intermediario' ? 'warning' : 'failure'} size="sm">
                    {plan.difficulty === 'iniciante' ? 'Iniciante' : 
                     plan.difficulty === 'intermediario' ? 'Intermediário' : 'Avançado'}
                  </Badge>
                </div>

                {/* Ações */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button size="sm" color="light" onClick={() => handleViewPlan(plan.id)} className="w-full sm:w-auto">
                    <HiBookOpen className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button size="sm" color="blue" onClick={() => handleEditPlan(plan.id)} className="w-full sm:w-auto">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );

  const selectedPlan = studyPlans.find(plan => plan.id === selectedPlanId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Icon 
                    icon="solar:book-bookmark-bold-duotone" 
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Planos de Estudo
                </h1>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Gerencie seus planos de estudo personalizados e acompanhe seu progresso de forma organizada
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Toggle de visualização */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  title="Visualização em grade"
                >
                  <HiViewGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  title="Visualização em lista"
                >
                  <HiViewList className="w-4 h-4" />
                </button>
              </div>
              
              <Button 
                onClick={handleCreatePlan}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Visão Geral
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Acompanhe o progresso dos seus planos de estudo
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl group-hover:shadow-md transition-all duration-200">
                  <HiAcademicCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Planos</p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl group-hover:shadow-md transition-all duration-200">
                  <HiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planos Ativos</p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl group-hover:shadow-md transition-all duration-200">
                  <HiClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.paused}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planos Pausados</p>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl group-hover:shadow-md transition-all duration-200">
                  <HiBookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planos Concluídos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Controles de Visualização */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <TextInput
                placeholder="Buscar planos de estudo..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                icon={HiSearch}
                className="w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Select 
                value={filters.status || 'all'} 
                onChange={(e) => setFilters({ ...filters, status: e.target.value === 'all' ? undefined : e.target.value as any })}
              >
                <option value="all">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="pausado">Pausado</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </Select>
              <Select 
                value={filters.difficulty || 'all'} 
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value === 'all' ? undefined : e.target.value as any })}
              >
                <option value="all">Todas as dificuldades</option>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de Planos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {filteredAndSortedPlans.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Icon 
                  icon="solar:book-bookmark-bold-duotone" 
                  className="w-10 h-10 text-gray-400"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhum plano encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {Object.values(filters).some(v => v) 
                  ? 'Tente ajustar os filtros para encontrar planos de estudo que correspondam aos seus critérios.'
                  : 'Comece criando seu primeiro plano de estudos personalizado para organizar seu aprendizado.'
                }
              </p>
              <Button 
                onClick={handleCreatePlan}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                {Object.values(filters).some(v => v) ? 'Criar Novo Plano' : 'Criar Primeiro Plano'}
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? <GridView /> : <ListView />}
            </>
          )}
        </div>

        {/* Modal de Confirmação de Exclusão */}
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="md">
          <Modal.Header className="border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <HiInformationCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirmar Exclusão
              </span>
            </div>
          </Modal.Header>
          <Modal.Body className="p-6">
            <div className="space-y-4">
              <Alert 
                color="warning" 
                icon={HiInformationCircle}
                className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
              >
                <span className="font-medium">Atenção!</span> Esta ação não pode ser desfeita.
              </Alert>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Tem certeza que deseja excluir o plano de estudos{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    "{selectedPlan?.title}"
                  </span>?
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Todos os dados relacionados a este plano, incluindo progresso, estatísticas e configurações personalizadas, serão perdidos permanentemente.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-t border-gray-200 dark:border-gray-600 p-6">
            <div className="flex gap-3 w-full sm:w-auto sm:justify-end">
              <Button 
                color="failure" 
                onClick={confirmDelete}
                className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              >
                Sim, Excluir
              </Button>
              <Button 
                color="gray" 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 sm:flex-none"
              >
                Cancelar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default StudyPlansPage;