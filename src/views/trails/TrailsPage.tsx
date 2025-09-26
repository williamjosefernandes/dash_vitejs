import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, TextInput, Select, Dropdown, Progress, Alert } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  HiSearch, 
  HiFilter, 
  HiViewGrid, 
  HiViewList, 
  HiSortAscending,
  HiSortDescending,
  HiEye,
  HiStar,
  HiUsers,
  HiClock,
  HiAcademicCap,
  HiPlus,
  HiTrendingUp,
  HiBookOpen,
  HiLightBulb,
  HiGlobeAlt,
  HiCheckCircle
} from 'react-icons/hi';
import TrailCard from '../../components/trails/TrailCard';
import CreatePlanModal from '../../components/trails/CreatePlanModal';
import { Trail, TrailCategory, TrailDifficulty, TrailStats } from '../../types/trails';
import { StudyPlan } from '../../types/studyPlans';
import { mockTrails, mockTrailStats } from '../../data/mockData/trails';

type ViewMode = 'grid' | 'list';
type SortOption = 'title' | 'rating' | 'enrolledStudents' | 'createdAt' | 'successRate';
type SortOrder = 'asc' | 'desc';

const TrailsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TrailCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TrailDifficulty | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Estados do modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Filtros e ordenação
  const filteredAndSortedTrails = useMemo(() => {
    let filtered = mockTrails.filter(trail => {
      const matchesSearch = trail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trail.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trail.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || trail.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || trail.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Ordenação
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy, sortOrder]);

  const handleViewTrail = (trailId: string) => {
    console.log('Visualizar trilha:', trailId);
    // Implementar navegação para detalhes da trilha
  };

  const handleCreatePlan = (trailId: string) => {
    const trail = mockTrails.find(t => t.id === trailId);
    if (trail) {
      setSelectedTrail(trail);
      setShowCreateModal(true);
    }
  };

  const handlePlanCreated = (planData: Partial<StudyPlan>) => {
    console.log('Plano criado:', planData);
    
    // Aqui você integraria com a API para salvar o plano
    // Por enquanto, apenas simulamos o sucesso
    
    // Fechar modal e mostrar feedback de sucesso
    setShowCreateModal(false);
    setSelectedTrail(null);
    setShowSuccessAlert(true);
    
    // Esconder alerta após 5 segundos
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
    
    // Aqui você poderia redirecionar para a página do plano criado
    // navigate(`/planos/${planData.id}`);
  };

  const getCategoryLabel = (category: TrailCategory | 'all') => {
    switch (category) {
      case 'enem': return 'ENEM';
      case 'vestibular': return 'Vestibular';
      case 'concurso': return 'Concurso';
      case 'graduacao': return 'Graduação';
      case 'pos_graduacao': return 'Pós-graduação';
      case 'certificacao': return 'Certificação';
      case 'idiomas': return 'Idiomas';
      case 'tecnologia': return 'Tecnologia';
      case 'all': return 'Todas as categorias';
      default: return category;
    }
  };

  const getDifficultyLabel = (difficulty: TrailDifficulty | 'all') => {
    switch (difficulty) {
      case 'basico': return 'Básico';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      case 'all': return 'Todas as dificuldades';
      default: return difficulty;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trilhas de Estudo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Modelos pré-cadastrados para facilitar a criação de planos de estudo
          </p>
        </div>
      </div>

      {/* Seção de Estatísticas */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Visão Geral
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Estatísticas das trilhas disponíveis
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Trilhas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockTrailStats.totalTrails}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <HiBookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trilhas Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockTrailStats.activeTrails}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <HiTrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Populares</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockTrailStats.popularTrails}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
                <HiStar className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planos Criados</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockTrailStats.totalPlansCreated.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <HiLightBulb className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Controles */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1">
            <TextInput
              icon={HiSearch}
              placeholder="Buscar trilhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TrailCategory | 'all')}
            >
              <option value="all">Todas as categorias</option>
              <option value="enem">ENEM</option>
              <option value="vestibular">Vestibular</option>
              <option value="concurso">Concurso</option>
              <option value="graduacao">Graduação</option>
              <option value="pos_graduacao">Pós-graduação</option>
              <option value="certificacao">Certificação</option>
              <option value="idiomas">Idiomas</option>
              <option value="tecnologia">Tecnologia</option>
            </Select>

            <Select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as TrailDifficulty | 'all')}
            >
              <option value="all">Todas as dificuldades</option>
              <option value="basico">Básico</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </Select>

            <Select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as SortOption);
                setSortOrder(order as SortOrder);
              }}
            >
              <option value="rating-desc">Melhor avaliadas</option>
              <option value="enrolledStudents-desc">Mais populares</option>
              <option value="successRate-desc">Maior taxa de sucesso</option>
              <option value="createdAt-desc">Mais recentes</option>
              <option value="title-asc">Nome (A-Z)</option>
              <option value="title-desc">Nome (Z-A)</option>
            </Select>
          </div>

          {/* Controles de Visualização */}
          <div className="flex gap-2">
            <Button
              color={viewMode === 'grid' ? 'blue' : 'gray'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <HiViewGrid className="h-4 w-4" />
            </Button>
            <Button
              color={viewMode === 'list' ? 'blue' : 'gray'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <HiViewList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Resultados */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredAndSortedTrails.length} trilha{filteredAndSortedTrails.length !== 1 ? 's' : ''} encontrada{filteredAndSortedTrails.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedTrails.map((trail) => (
            <TrailCard
              key={trail.id}
              trail={trail}
              onView={handleViewTrail}
              onCreatePlan={handleCreatePlan}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredAndSortedTrails.map((trail, index) => (
            <Card
              key={trail.id}
              className={`hover:shadow-md transition-shadow duration-200 ${
                index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
              }`}
            >
              <div className="flex items-center justify-between gap-6 p-2">
                {/* Informações principais */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`p-3 rounded-lg bg-${trail.color}-100 dark:bg-${trail.color}-900 flex-shrink-0`}>
                    <Icon 
                      icon={trail.icon} 
                      className={`h-6 w-6 text-${trail.color}-600 dark:text-${trail.color}-400`} 
                    />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {trail.title}
                      </h3>
                      <Badge color={trail.category === 'enem' ? 'blue' : 
                                   trail.category === 'vestibular' ? 'purple' :
                                   trail.category === 'concurso' ? 'amber' :
                                   trail.category === 'graduacao' ? 'green' :
                                   trail.category === 'pos_graduacao' ? 'orange' :
                                   trail.category === 'certificacao' ? 'indigo' :
                                   trail.category === 'idiomas' ? 'emerald' :
                                   trail.category === 'tecnologia' ? 'cyan' : 'gray'} 
                             size="sm">
                        {getCategoryLabel(trail.category)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {trail.shortDescription}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <HiStar className="h-3 w-3 text-yellow-400" />
                        <span>{trail.rating.toFixed(1)} ({trail.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiUsers className="h-3 w-3" />
                        <span>{trail.enrolledStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiClock className="h-3 w-3" />
                        <span>{trail.totalHours}h • {trail.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiAcademicCap className="h-3 w-3" />
                        <span>{trail.subjects.length} disciplinas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Taxa de sucesso */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {trail.successRate}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      aprovação
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    color="blue"
                    onClick={() => handleCreatePlan(trail.id)}
                  >
                    <HiPlus className="w-4 h-4 mr-1" />
                    Criar Plano
                  </Button>
                  
                  <Button
                    size="sm"
                    color="gray"
                    onClick={() => handleViewTrail(trail.id)}
                  >
                    <HiEye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Estado vazio */}
      {filteredAndSortedTrails.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <HiGlobeAlt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhuma trilha encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tente ajustar os filtros ou termos de busca
            </p>
            <Button
              color="blue"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        </Card>
      )}

      {/* Alerta de Sucesso */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            color="success"
            icon={HiCheckCircle}
            onDismiss={() => setShowSuccessAlert(false)}
            className="shadow-lg"
          >
            <span className="font-medium">Plano criado com sucesso!</span> Seu novo plano de estudos foi criado baseado na trilha selecionada.
          </Alert>
        </div>
      )}

      {/* Modal de Criação de Plano */}
      <CreatePlanModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedTrail(null);
        }}
        trail={selectedTrail}
        onCreatePlan={handlePlanCreated}
      />
    </div>
  );
};

export default TrailsPage;