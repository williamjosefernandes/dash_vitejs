import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Progress, Dropdown, Modal, TextInput, Textarea, Select, ToggleSwitch } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiPlus, HiDotsVertical, HiPencil, HiTrash, HiEye, HiClock, HiAcademicCap, HiTrendingUp, HiSearch, HiViewGrid, HiViewList } from 'react-icons/hi';
import { mockSubjects } from '../../data/mockData';
import { Subject } from '../../data/mockData/studyPlans';

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'not_started' | 'in_progress' | 'completed'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Formulário
  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    description: string;
    color: string;
    icon: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    priority: 'low' | 'medium' | 'high';
  }>({
    name: '',
    code: '',
    description: '',
    color: 'blue',
    icon: 'solar:book-bold-duotone',
    difficulty: 'intermediate',
    priority: 'medium'
  });

  // Filtros e busca
  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subject.code?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'not_started' && subject.progress === 0) ||
        (filterStatus === 'in_progress' && subject.progress > 0 && subject.progress < 100) ||
        (filterStatus === 'completed' && subject.progress === 100);
      
      const matchesDifficulty = filterDifficulty === 'all' || subject.difficulty === filterDifficulty;
      
      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [subjects, searchTerm, filterStatus, filterDifficulty]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = subjects.length;
    const completed = subjects.filter(s => s.progress === 100).length;
    const inProgress = subjects.filter(s => s.progress > 0 && s.progress < 100).length;
    const notStarted = subjects.filter(s => s.progress === 0).length;
    const totalHours = subjects.reduce((sum, s) => sum + s.totalHours, 0);
    const completedHours = subjects.reduce((sum, s) => sum + s.completedHours, 0);
    
    return { total, completed, inProgress, notStarted, totalHours, completedHours };
  }, [subjects]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', subject?: Subject) => {
    setModalMode(mode);
    if (subject) {
      setSelectedSubject(subject);
      setFormData({
        name: subject.name,
        code: subject.code || '',
        description: subject.description || '',
        color: subject.color,
        icon: subject.icon,
        difficulty: subject.difficulty,
        priority: subject.priority
      });
    } else {
      setSelectedSubject(null);
      setFormData({
        name: '',
        code: '',
        description: '',
        color: 'blue',
        icon: 'solar:book-bold-duotone',
        difficulty: 'intermediate',
        priority: 'medium'
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newSubject: Subject = {
        id: `subj${Date.now()}`,
        ...formData,
        topics: [],
        progress: 0,
        totalHours: 0,
        completedHours: 0,
        instructor: {
          id: 'temp-instructor',
          name: 'Professor Temporário',
          email: 'temp@example.com',
          specialization: ['Geral'],
          avatar: 'https://ui-avatars.com/api/?name=Professor+Temporario&background=6b7280&color=fff',
          rating: 4.0
        }
      };
      setSubjects([...subjects, newSubject]);
    } else if (modalMode === 'edit' && selectedSubject) {
      setSubjects(subjects.map(s => 
        s.id === selectedSubject.id 
          ? { ...s, ...formData }
          : s
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (subjectId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
      setSubjects(subjects.filter(s => s.id !== subjectId));
    }
  };

  const getStatusColor = (progress: number) => {
    if (progress === 0) return 'gray';
    if (progress < 100) return 'yellow';
    return 'green';
  };

  const getStatusText = (progress: number) => {
    if (progress === 0) return 'Não iniciado';
    if (progress < 100) return 'Em andamento';
    return 'Concluído';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'gray';
      case 'medium': return 'yellow';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  // Componente para visualização em Grid
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSubjects.map((subject) => (
        <Card key={subject.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="flex items-center min-w-0 flex-1">
              <div className={`p-2 rounded-lg bg-${subject.color}-100 dark:bg-${subject.color}-900 flex-shrink-0`}>
                <Icon icon={subject.icon} className={`h-6 w-6 text-${subject.color}-600 dark:text-${subject.color}-400`} />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 break-words">
                  {subject.name}
                </h3>
                {subject.code && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{subject.code}</p>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={<HiDotsVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />}
              >
                <Dropdown.Item onClick={() => handleOpenModal('view', subject)}>
                  <HiEye className="mr-2 h-4 w-4" />
                  Visualizar
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOpenModal('edit', subject)}>
                  <HiPencil className="mr-2 h-4 w-4" />
                  Editar
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDelete(subject.id)} className="text-red-600">
                  <HiTrash className="mr-2 h-4 w-4" />
                  Excluir
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex justify-between items-center flex-shrink-0">
              <Badge color={getStatusColor(subject.progress)}>
                {getStatusText(subject.progress)}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {subject.progress}%
              </span>
            </div>

            <div className="flex-shrink-0">
              <Progress progress={subject.progress} color={subject.color} />
            </div>

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
              <span className="truncate">{subject.completedHours}h / {subject.totalHours}h</span>
              <span className="flex-shrink-0 ml-2">{subject.topics.length} tópicos</span>
            </div>

            <div className="flex gap-2 flex-wrap flex-shrink-0">
              <Badge color={getDifficultyColor(subject.difficulty)} size="sm">
                {subject.difficulty === 'beginner' ? 'Iniciante' : 
                 subject.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </Badge>
              <Badge color={getPriorityColor(subject.priority)} size="sm">
                {subject.priority === 'low' ? 'Baixa' : 
                 subject.priority === 'medium' ? 'Média' : 'Alta'}
              </Badge>
            </div>

            {subject.description && (
              <div className="flex-1 flex items-start">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 break-words">
                  {subject.description}
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
      {filteredSubjects.map((subject, index) => {
        // Determina se o item está em um grupo de 3 que deve ter fundo cinza
        // Grupos: 0-2 (cinza), 3-5 (branco), 6-8 (cinza), 9-11 (branco), etc.
        const groupIndex = Math.floor(index / 3);
        const shouldHaveGrayBackground = groupIndex % 2 === 0;
        
        return (
          <Card 
            key={subject.id} 
            className={`hover:shadow-md transition-shadow duration-200 ${
              shouldHaveGrayBackground 
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Informações principais */}
            <div className="flex items-center flex-1 min-w-0">
              <div className={`p-3 rounded-lg bg-${subject.color}-100 dark:bg-${subject.color}-900 flex-shrink-0`}>
                <Icon icon={subject.icon} className={`h-8 w-8 text-${subject.color}-600 dark:text-${subject.color}-400`} />
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {subject.name}
                  </h3>
                  {subject.code && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {subject.code}
                    </span>
                  )}
                </div>
                {subject.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {subject.description}
                  </p>
                )}
              </div>
            </div>

            {/* Progresso e estatísticas */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4 lg:min-w-0 xl:min-w-max">
              <div className="flex flex-col items-start sm:items-center lg:items-end xl:items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={getStatusColor(subject.progress)}>
                    {getStatusText(subject.progress)}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {subject.progress}%
                  </span>
                </div>
                <div className="w-32 mb-2">
                  <Progress progress={subject.progress} color={subject.color} size="sm" />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {subject.completedHours}h / {subject.totalHours}h • {subject.topics.length} tópicos
                </div>
              </div>

              {/* Badges e ações */}
              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex gap-2 flex-wrap">
                  <Badge color={getDifficultyColor(subject.difficulty)} size="sm">
                    {subject.difficulty === 'beginner' ? 'Iniciante' : 
                     subject.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </Badge>
                  <Badge color={getPriorityColor(subject.priority)} size="sm">
                    {subject.priority === 'low' ? 'Baixa' : 
                     subject.priority === 'medium' ? 'Média' : 'Alta'}
                  </Badge>
                </div>
                
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<HiDotsVertical className="h-5 w-5 text-gray-500" />}
                >
                  <Dropdown.Item onClick={() => handleOpenModal('view', subject)}>
                    <HiEye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenModal('edit', subject)}>
                    <HiPencil className="mr-2 h-4 w-4" />
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleDelete(subject.id)} className="text-red-600">
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
                  Disciplinas
                </h1>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Gerencie suas disciplinas e acompanhe o progresso de cada uma
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
                Nova Disciplina
              </Button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <HiAcademicCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <HiClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Em Andamento</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <HiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Horas Totais</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Controles de Visualização */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <TextInput
                placeholder="Buscar disciplinas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={HiSearch}
                className="w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                <option value="all">Todos os status</option>
                <option value="not_started">Não iniciado</option>
                <option value="in_progress">Em andamento</option>
                <option value="completed">Concluído</option>
              </Select>
              <Select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value as any)}>
                <option value="all">Todas as dificuldades</option>
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de Disciplinas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <HiAcademicCap className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhuma disciplina encontrada
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Tente ajustar os filtros ou criar uma nova disciplina para começar.
              </p>
              <Button 
                onClick={() => handleOpenModal('create')}
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Criar Primeira Disciplina
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
               {modalMode === 'create' ? 'Nova Disciplina' : 
                modalMode === 'edit' ? 'Editar Disciplina' : 'Detalhes da Disciplina'}
             </h3>
           </div>
         </Modal.Header>
         <Modal.Body className="p-6">
           <div className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Nome da Disciplina
               </label>
               <TextInput
                 value={formData.name}
                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                 placeholder="Ex: Matemática Avançada"
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Código (Opcional)
               </label>
               <TextInput
                 value={formData.code}
                 onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                 placeholder="Ex: MAT301"
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Descrição
               </label>
               <Textarea
                 value={formData.description}
                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                 placeholder="Descreva o conteúdo da disciplina..."
                 rows={3}
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Dificuldade
                 </label>
                 <Select
                   value={formData.difficulty}
                   onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="beginner">Iniciante</option>
                   <option value="intermediate">Intermediário</option>
                   <option value="advanced">Avançado</option>
                 </Select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Prioridade
                 </label>
                 <Select
                   value={formData.priority}
                   onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="low">Baixa</option>
                   <option value="medium">Média</option>
                   <option value="high">Alta</option>
                 </Select>
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

export default SubjectsPage;