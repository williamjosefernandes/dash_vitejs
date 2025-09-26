import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Dropdown, Modal, TextInput, Textarea, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiPlus, HiDotsVertical, HiPencil, HiTrash, HiEye, HiSearch, HiViewGrid, HiViewList, HiStar, HiBookOpen, HiTrendingUp, HiLightBulb } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useCronograma } from '../../hooks/useCronograma';
import { CronogramaItem } from '../../types/cronograma';
import CronogramaDetailView from '../../components/cronograma/CronogramaDetailView';

const CronogramaPage: React.FC = () => {
  const navigate = useNavigate();
  const { cronogramas, create, update, delete: deleteCronograma } = useCronograma();
  
  const [selectedCronograma, setSelectedCronograma] = useState<CronogramaItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Ativo' | 'Pausado' | 'Concluído'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'Alta' | 'Média' | 'Baixa'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Formulário
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'Ativo' | 'Pausado' | 'Concluído';
    priority: 'Alta' | 'Média' | 'Baixa';
    totalHours: number;
    subjects: string[];
  }>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Ativo',
    priority: 'Média',
    totalHours: 0,
    subjects: []
  });

  // Filtros e busca
  const filteredCronogramas = useMemo(() => {
    return cronogramas.filter(cronograma => {
      const matchesSearch = cronograma.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cronograma.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cronograma.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || cronograma.status === filterStatus;
      
      const matchesPriority = filterPriority === 'all' || cronograma.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [cronogramas, searchTerm, filterStatus, filterPriority]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = cronogramas.length;
    const active = cronogramas.filter(c => c.status === 'Ativo').length;
    const completed = cronogramas.filter(c => c.status === 'Concluído').length;
    const totalHours = cronogramas.reduce((sum, c) => sum + c.totalHours, 0);
    
    return { total, active, completed, totalHours };
  }, [cronogramas]);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', cronograma?: CronogramaItem) => {
    setModalMode(mode);
    if (cronograma) {
      setSelectedCronograma(cronograma);
      setFormData({
        title: cronograma.title,
        description: cronograma.description,
        startDate: cronograma.startDate,
        endDate: cronograma.endDate,
        status: cronograma.status,
        priority: cronograma.priority,
        totalHours: cronograma.totalHours,
        subjects: cronograma.subjects
      });
    } else {
      setSelectedCronograma(null);
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Ativo',
        priority: 'Média',
        totalHours: 0,
        subjects: []
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      create(formData);
    } else if (modalMode === 'edit' && selectedCronograma) {
      update(selectedCronograma.id, formData);
    }
    setShowModal(false);
  };

  const handleDelete = (cronogramaId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cronograma?')) {
      deleteCronograma(cronogramaId);
    }
  };

  const handleCreateCronograma = () => {
    navigate('/cronograma/criar');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'green';
      case 'Pausado': return 'yellow';
      case 'Concluído': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    return status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'red';
      case 'Média': return 'yellow';
      case 'Baixa': return 'green';
      default: return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Componente para visualização em Grid
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCronogramas.map((cronograma) => (
        <Card key={cronograma.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="flex items-center min-w-0 flex-1">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 flex-shrink-0">
                <Icon icon="solar:calendar-bold-duotone" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 break-words">
                  {cronograma.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{formatDate(cronograma.startDate)} - {formatDate(cronograma.endDate)}</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={<HiDotsVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />}
              >
                <Dropdown.Item onClick={() => handleOpenModal('view', cronograma)}>
                  <HiEye className="mr-2 h-4 w-4" />
                  Visualizar
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOpenModal('edit', cronograma)}>
                  <HiPencil className="mr-2 h-4 w-4" />
                  Editar
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDelete(cronograma.id)} className="text-red-600">
                  <HiTrash className="mr-2 h-4 w-4" />
                  Excluir
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex justify-between items-center flex-shrink-0">
              <Badge color={getStatusColor(cronograma.status)}>
                {getStatusText(cronograma.status)}
              </Badge>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {cronograma.progress.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
              <span className="truncate">{cronograma.totalHours}h • {cronograma.subjects.length} matérias</span>
              <span className="flex-shrink-0 ml-2">{cronograma.completedHours}h concluídas</span>
            </div>

            <div className="flex gap-2 flex-wrap flex-shrink-0">
              <Badge color={getPriorityColor(cronograma.priority)} size="sm">
                {cronograma.priority}
              </Badge>
            </div>

            {cronograma.description && (
              <div className="flex-1 flex items-start">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 break-words">
                  {cronograma.description}
                </p>
              </div>
            )}

            {/* Progress Bar */}
            <div className="flex-shrink-0">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${cronograma.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // Componente para visualização em Lista
  const ListView = () => (
    <div className="space-y-4">
      {filteredCronogramas.map((cronograma, index) => {
        // Determina se o item está em um grupo de 3 que deve ter fundo cinza
        const groupIndex = Math.floor(index / 3);
        const shouldHaveGrayBackground = groupIndex % 2 === 0;
        
        return (
          <Card 
            key={cronograma.id} 
            className={`hover:shadow-md transition-shadow duration-200 ${
              shouldHaveGrayBackground 
                ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Informações principais */}
            <div className="flex items-center flex-1 min-w-0">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 flex-shrink-0">
                <Icon icon="solar:calendar-bold-duotone" className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {cronograma.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {formatDate(cronograma.startDate)} - {formatDate(cronograma.endDate)}
                  </span>
                </div>
                {cronograma.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {cronograma.description}
                  </p>
                )}
              </div>
            </div>

            {/* Progresso e estatísticas */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-4 lg:min-w-0 xl:min-w-max">
              <div className="flex flex-col items-start sm:items-center lg:items-end xl:items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={getStatusColor(cronograma.status)}>
                    {getStatusText(cronograma.status)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {cronograma.progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {cronograma.totalHours}h • {cronograma.subjects.length} matérias • {cronograma.completedHours}h concluídas
                </div>
              </div>

              {/* Badges e ações */}
              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="flex gap-2 flex-wrap">
                  <Badge color={getPriorityColor(cronograma.priority)} size="sm">
                    {cronograma.priority}
                  </Badge>
                </div>
                
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<HiDotsVertical className="h-5 w-5 text-gray-500" />}
                >
                  <Dropdown.Item onClick={() => handleOpenModal('view', cronograma)}>
                    <HiEye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenModal('edit', cronograma)}>
                    <HiPencil className="mr-2 h-4 w-4" />
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleDelete(cronograma.id)} className="text-red-600">
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
                    icon="solar:calendar-bold-duotone" 
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Meus Cronogramas
                </h1>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Gerencie seus cronogramas de estudo e acompanhe seu progresso
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
                Novo Cronograma
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ativos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <HiStar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <HiLightBulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Horas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Controles de Visualização */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <TextInput
                placeholder="Buscar cronogramas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={HiSearch}
                className="w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                <option value="all">Todos os status</option>
                <option value="Ativo">Ativo</option>
                <option value="Pausado">Pausado</option>
                <option value="Concluído">Concluído</option>
              </Select>
              <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as any)}>
                <option value="all">Todas as prioridades</option>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </Select>
            </div>
          </div>
        </div>


        {/* Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
         <Modal.Header className="border-b border-gray-200 dark:border-gray-700 pb-4">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
               <Icon 
                 icon="solar:calendar-bold-duotone" 
                 className="w-5 h-5 text-blue-600 dark:text-blue-400"
               />
             </div>
             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
               {modalMode === 'create' ? 'Novo Cronograma' : 
                modalMode === 'edit' ? 'Editar Cronograma' : 'Detalhes do Cronograma'}
             </h3>
           </div>
         </Modal.Header>
         <Modal.Body className="p-6">
           <div className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Nome do Cronograma
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
                 Descrição
               </label>
               <Textarea
                 value={formData.description}
                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                 placeholder="Descreva o cronograma..."
                 rows={3}
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Data de Início
                 </label>
                 <TextInput
                   type="date"
                   value={formData.startDate}
                   onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Data de Fim
                 </label>
                 <TextInput
                   type="date"
                   value={formData.endDate}
                   onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 />
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                   Status
                 </label>
                 <Select
                   value={formData.status}
                   onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                   disabled={modalMode === 'view'}
                   className="w-full"
                 >
                   <option value="Ativo">Ativo</option>
                   <option value="Pausado">Pausado</option>
                   <option value="Concluído">Concluído</option>
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
                   <option value="Alta">Alta</option>
                   <option value="Média">Média</option>
                   <option value="Baixa">Baixa</option>
                 </Select>
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Total de Horas
               </label>
               <TextInput
                 type="number"
                 value={formData.totalHours}
                 onChange={(e) => setFormData({ ...formData, totalHours: parseInt(e.target.value) || 0 })}
                 placeholder="Ex: 120"
                 disabled={modalMode === 'view'}
                 className="w-full"
               />
             </div>
           </div>
         </Modal.Body>
         <Modal.Footer className="border-t border-gray-200 dark:border-gray-700 pt-4">
           <div className="flex justify-end gap-3 w-full">
             <Button color="gray" onClick={() => setShowModal(false)}>
               {modalMode === 'view' ? 'Fechar' : 'Cancelar'}
             </Button>
             {modalMode !== 'view' && (
               <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                 {modalMode === 'create' ? 'Criar' : 'Salvar'}
               </Button>
             )}
           </div>
         </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CronogramaPage;