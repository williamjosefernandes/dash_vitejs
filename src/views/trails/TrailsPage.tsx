import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Dropdown, Modal, TextInput, Textarea, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiPlus, HiDotsVertical, HiPencil, HiTrash, HiEye, HiSearch, HiViewGrid, HiViewList, HiStar, HiBookOpen, HiTrendingUp, HiLightBulb } from 'react-icons/hi';
import { mockTrails } from '../../data/mockData/trails';
import { Trail, TrailCategory, TrailDifficulty } from '../../types/trails';

const TrailsPage: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>(mockTrails);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'ativo' | 'inativo' | 'rascunho'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'iniciante' | 'intermediario' | 'avancado'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Formulário
  const [formData, setFormData] = useState<{
    title: string;
    shortDescription: string;
    description: string;
    category: TrailCategory;
    difficulty: TrailDifficulty;
    color: string;
    icon: string;
    estimatedDuration: string;
    totalHours: number;
  }>({
    title: '',
    shortDescription: '',
    description: '',
    category: 'enem',
    difficulty: 'intermediario',
    color: 'blue',
    icon: 'solar:book-bold-duotone',
    estimatedDuration: '3 meses',
    totalHours: 120
  });

  // Filtros e busca
  const filteredTrails = useMemo(() => {
    return trails.filter(trail => {
      const matchesSearch = trail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trail.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trail.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || trail.status === filterStatus;
      
      const matchesDifficulty = filterDifficulty === 'all' || trail.difficulty === filterDifficulty;
      
      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [trails, searchTerm, filterStatus, filterDifficulty]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = trails.length;
    const active = trails.filter(t => t.status === 'ativo').length;
    const popular = trails.filter(t => t.enrolledStudents > 5000).length;
    const totalPlans = trails.reduce((sum, t) => sum + t.plansCreated, 0);
    
    return { total, active, popular, totalPlans };
  }, [trails]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', trail?: Trail) => {
    setModalMode(mode);
    if (trail) {
      setSelectedTrail(trail);
      setFormData({
        title: trail.title,
        shortDescription: trail.shortDescription,
        description: trail.description,
        category: trail.category,
        difficulty: trail.difficulty,
        color: trail.color,
        icon: trail.icon,
        estimatedDuration: trail.estimatedDuration,
        totalHours: trail.totalHours
      });
    } else {
      setSelectedTrail(null);
      setFormData({
        title: '',
        shortDescription: '',
        description: '',
        category: 'enem',
        difficulty: 'intermediario',
        color: 'blue',
        icon: 'solar:book-bold-duotone',
        estimatedDuration: '3 meses',
        totalHours: 120
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newTrail: Trail = {
        id: `trail${Date.now()}`,
        ...formData,
        status: 'ativo',
        rating: 0,
        reviewsCount: 0,
        enrolledStudents: 0,
        completedStudents: 0,
        successRate: 0,
        weeklyHours: Math.ceil(formData.totalHours / 12),
        subjects: [],
        milestones: [],
        objectives: [],
        prerequisites: [],
        resources: [],
        targetAudience: '',
        tags: [],
        isPublic: true,
        isCustomizable: true,
        allowsModification: true,
        createdBy: 'Usuário',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        plansCreated: 0,
        lastUsed: new Date().toISOString()
      };
      setTrails([...trails, newTrail]);
    } else if (modalMode === 'edit' && selectedTrail) {
      setTrails(trails.map(t => 
        t.id === selectedTrail.id 
          ? { ...t, ...formData, updatedAt: new Date().toISOString() }
          : t
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (trailId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta trilha?')) {
      setTrails(trails.filter(t => t.id !== trailId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'green';
      case 'inativo': return 'gray';
      case 'rascunho': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'inativo': return 'Inativo';
      case 'rascunho': return 'Rascunho';
      default: return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'iniciante': return 'green';
      case 'intermediario': return 'yellow';
      case 'avancado': return 'red';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'enem': return 'blue';
      case 'vestibular': return 'purple';
      case 'concurso': return 'amber';
      case 'graduacao': return 'green';
      case 'pos_graduacao': return 'orange';
      case 'certificacao': return 'indigo';
      case 'idiomas': return 'emerald';
      case 'tecnologia': return 'cyan';
      default: return 'gray';
    }
  };

  const getCategoryLabel = (category: TrailCategory) => {
    switch (category) {
      case 'enem': return 'ENEM';
      case 'vestibular': return 'Vestibular';
      case 'concurso': return 'Concurso';
      case 'graduacao': return 'Graduação';
      case 'pos_graduacao': return 'Pós-graduação';
      case 'certificacao': return 'Certificação';
      case 'idiomas': return 'Idiomas';
      case 'tecnologia': return 'Tecnologia';
      default: return category;
    }
  };

  const getDifficultyLabel = (difficulty: TrailDifficulty) => {
    switch (difficulty) {
      case 'iniciante': return 'Iniciante';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      default: return difficulty;
    }
  };

  // Componente para visualização em Grid
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTrails.map((trail) => (
        <Card key={trail.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="flex items-center min-w-0 flex-1">
              <div className={`p-2 rounded-lg bg-${trail.color}-100 dark:bg-${trail.color}-900 flex-shrink-0`}>
                <Icon icon={trail.icon} className={`h-6 w-6 text-${trail.color}-600 dark:text-${trail.color}-400`} />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 break-words">
                  {trail.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{trail.estimatedDuration}</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={<HiDotsVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />}
              >
                <Dropdown.Item onClick={() => handleOpenModal('view', trail)}>
                  <HiEye className="mr-2 h-4 w-4" />
                  Visualizar
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOpenModal('edit', trail)}>
                  <HiPencil className="mr-2 h-4 w-4" />
                  Editar
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDelete(trail.id)} className="text-red-600">
                  <HiTrash className="mr-2 h-4 w-4" />
                  Excluir
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex justify-between items-center flex-shrink-0">
              <Badge color={getStatusColor(trail.status)}>
                {getStatusText(trail.status)}
              </Badge>
              <div className="flex items-center gap-1">
                <HiStar className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {trail.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
              <span className="truncate">{trail.totalHours}h • {trail.subjects.length} disciplinas</span>
              <span className="flex-shrink-0 ml-2">{trail.enrolledStudents.toLocaleString()} alunos</span>
            </div>

            <div className="flex gap-2 flex-wrap flex-shrink-0">
              <Badge color={getCategoryColor(trail.category)} size="sm">
                {getCategoryLabel(trail.category)}
              </Badge>
              <Badge color={getDifficultyColor(trail.difficulty)} size="sm">
                {getDifficultyLabel(trail.difficulty)}
              </Badge>
            </div>

            {trail.shortDescription && (
              <div className="flex-1 flex items-start">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 break-words">
                  {trail.shortDescription}
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  // Componente para visualização em Lista
  const ListView = () => (
    <div className="space-y-4">
      {filteredTrails.map((trail, index) => {
        // Determina se o item está em um grupo de 3 que deve ter fundo cinza
        const groupIndex = Math.floor(index / 3);
        const shouldHaveGrayBackground = groupIndex % 2 === 0;
        
        return (
          <Card 
            key={trail.id} 
            className={`hover:shadow-md transition-shadow duration-200 ${
              shouldHaveGrayBackground 
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Informações principais */}
            <div className="flex items-center flex-1 min-w-0">
              <div className={`p-3 rounded-lg bg-${trail.color}-100 dark:bg-${trail.color}-900 flex-shrink-0`}>
                <Icon icon={trail.icon} className={`h-8 w-8 text-${trail.color}-600 dark:text-${trail.color}-400`} />
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {trail.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {trail.estimatedDuration}
                  </span>
                </div>
                {trail.shortDescription && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {trail.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Progresso e estatísticas */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4 lg:min-w-0 xl:min-w-max">
              <div className="flex flex-col items-start sm:items-center lg:items-end xl:items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={getStatusColor(trail.status)}>
                    {getStatusText(trail.status)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <HiStar className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {trail.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {trail.totalHours}h • {trail.subjects.length} disciplinas • {trail.enrolledStudents.toLocaleString()} alunos
                </div>
              </div>

              {/* Badges e ações */}
              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex gap-2 flex-wrap">
                  <Badge color={getCategoryColor(trail.category)} size="sm">
                    {getCategoryLabel(trail.category)}
                  </Badge>
                  <Badge color={getDifficultyColor(trail.difficulty)} size="sm">
                    {getDifficultyLabel(trail.difficulty)}
                  </Badge>
                </div>
                
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<HiDotsVertical className="h-5 w-5 text-gray-500" />}
                >
                  <Dropdown.Item onClick={() => handleOpenModal('view', trail)}>
                    <HiEye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenModal('edit', trail)}>
                    <HiPencil className="mr-2 h-4 w-4" />
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleDelete(trail.id)} className="text-red-600">
                    <HiTrash className="mr-2 h-4 w-4" />
                    Excluir
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Icon 
                    icon="solar:book-bold-duotone" 
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Trilhas de Estudo
                </h1>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Modelos pré-cadastrados para facilitar a criação de planos de estudo
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
                onClick={() => handleOpenModal('create')}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Nova Trilha
              </Button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <HiBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <HiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <HiStar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Populares</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.popular}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <HiLightBulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planos Criados</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPlans.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Controles de Visualização */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <TextInput
                placeholder="Buscar trilhas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={HiSearch}
                className="w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                <option value="all">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="rascunho">Rascunho</option>
              </Select>
              <Select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value as any)}>
                <option value="all">Todas as dificuldades</option>
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de Trilhas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {filteredTrails.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <HiBookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhuma trilha encontrada
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Tente ajustar os filtros ou criar uma nova trilha para começar.
              </p>
              <Button 
                onClick={() => handleOpenModal('create')}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Criar Primeira Trilha
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? <GridView /> : <ListView />}
            </>
          )}
        </div>

        {/* Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
         <Modal.Header className="border-b border-gray-200 dark:border-gray-700 pb-4">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
               <Icon 
                 icon="solar:book-bold-duotone" 
                 className="w-5 h-5 text-blue-600 dark:text-blue-400"
               />
             </div>
             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
               {modalMode === 'create' ? 'Nova Trilha' : 
                modalMode === 'edit' ? 'Editar Trilha' : 'Detalhes da Trilha'}
             </h3>
           </div>
         </Modal.Header>
         <Modal.Body className="p-6">
           <div className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Nome da Trilha
               </label>
               <TextInput
                 value={formData.title}
                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                 placeholder="Ex: Preparação para ENEM 2024"
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Descrição Curta
               </label>
               <TextInput
                 value={formData.shortDescription}
                 onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                 placeholder="Ex: Trilha completa para preparação do ENEM"
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Descrição Completa
               </label>
               <Textarea
                 value={formData.description}
                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                 placeholder="Descreva o conteúdo da trilha..."
                 rows={3}
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Categoria
                 </label>
                 <Select
                   value={formData.category}
                   onChange={(e) => setFormData({ ...formData, category: e.target.value as TrailCategory })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="enem">ENEM</option>
                   <option value="vestibular">Vestibular</option>
                   <option value="concurso">Concurso</option>
                   <option value="graduacao">Graduação</option>
                   <option value="pos_graduacao">Pós-graduação</option>
                   <option value="certificacao">Certificação</option>
                   <option value="idiomas">Idiomas</option>
                   <option value="tecnologia">Tecnologia</option>
                 </Select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Dificuldade
                 </label>
                 <Select
                   value={formData.difficulty}
                   onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as TrailDifficulty })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="iniciante">Iniciante</option>
                   <option value="intermediario">Intermediário</option>
                   <option value="avancado">Avançado</option>
                 </Select>
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Duração Estimada
                 </label>
                 <TextInput
                   value={formData.estimatedDuration}
                   onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                   placeholder="Ex: 6 meses"
                   disabled={modalMode === 'view'}
                   className="w-full"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Total de Horas
                 </label>
                 <TextInput
                   type="number"
                   value={formData.totalHours}
                   onChange={(e) => setFormData({ ...formData, totalHours: parseInt(e.target.value) || 0 })}
                   placeholder="Ex: 240"
                   disabled={modalMode === 'view'}
                   className="w-full"
                 />
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Cor
                 </label>
                 <Select
                   value={formData.color}
                   onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="blue">Azul</option>
                   <option value="green">Verde</option>
                   <option value="red">Vermelho</option>
                   <option value="yellow">Amarelo</option>
                   <option value="purple">Roxo</option>
                   <option value="pink">Rosa</option>
                   <option value="indigo">Índigo</option>
                 </Select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Ícone
                 </label>
                 <Select
                   value={formData.icon}
                   onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="solar:book-bold-duotone">Livro</option>
                   <option value="solar:calculator-bold-duotone">Calculadora</option>
                   <option value="solar:atom-bold-duotone">Átomo</option>
                   <option value="solar:test-tube-bold-duotone">Tubo de Ensaio</option>
                   <option value="solar:dna-bold-duotone">DNA</option>
                   <option value="solar:scale-bold-duotone">Balança</option>
                 </Select>
               </div>
             </div>
           </div>
         </Modal.Body>
         {modalMode !== 'view' && (
           <Modal.Footer className="border-t border-gray-200 dark:border-gray-700 pt-4">
             <div className="flex justify-end gap-3 w-full">
               <Button 
                 color="gray" 
                 onClick={() => setShowModal(false)}
                 className="px-4 py-2"
               >
                 Cancelar
               </Button>
               <Button 
                 onClick={handleSave} 
                 className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2"
               >
                 {modalMode === 'create' ? 'Criar' : 'Salvar'}
               </Button>
             </div>
           </Modal.Footer>
         )}
         </Modal>
      </div>
    </div>
  );
};

export default TrailsPage;