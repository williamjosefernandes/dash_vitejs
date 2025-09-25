import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Progress, Modal, TextInput, Label, Select, Textarea } from 'flowbite-react';

const Trilhas = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState<any>(null);

  // Dados simulados de trilhas
  const trails = [
    {
      id: 1,
      title: 'Matemática para ENEM',
      description: 'Trilha completa de matemática focada no ENEM com todos os tópicos essenciais',
      category: 'Exatas',
      level: 'intermediate',
      duration: 120,
      modules: 15,
      progress: 65,
      status: 'in_progress',
      difficulty: 'medium',
      rating: 4.8,
      students: 1250,
      instructor: 'Prof. João Silva',
      tags: ['ENEM', 'Álgebra', 'Geometria', 'Estatística'],
      color: 'blue',
      icon: 'solar:calculator-bold-duotone',
      estimatedCompletion: '2024-11-15',
      nextModule: 'Funções Quadráticas'
    },
    {
      id: 2,
      title: 'Física Mecânica Completa',
      description: 'Domine os conceitos fundamentais da mecânica clássica',
      category: 'Exatas',
      level: 'beginner',
      duration: 80,
      modules: 12,
      progress: 30,
      status: 'in_progress',
      difficulty: 'easy',
      rating: 4.6,
      students: 890,
      instructor: 'Prof. Maria Santos',
      tags: ['Mecânica', 'Leis de Newton', 'Energia'],
      color: 'green',
      icon: 'solar:atom-bold-duotone',
      estimatedCompletion: '2024-10-30',
      nextModule: 'Leis de Newton'
    },
    {
      id: 3,
      title: 'Química Orgânica Avançada',
      description: 'Trilha avançada de química orgânica com foco em reações e mecanismos',
      category: 'Exatas',
      level: 'advanced',
      duration: 150,
      modules: 20,
      progress: 0,
      status: 'not_started',
      difficulty: 'hard',
      rating: 4.9,
      students: 650,
      instructor: 'Prof. Carlos Lima',
      tags: ['Química Orgânica', 'Reações', 'Mecanismos'],
      color: 'purple',
      icon: 'solar:test-tube-bold-duotone',
      estimatedCompletion: '2024-12-20',
      nextModule: 'Introdução aos Compostos Orgânicos'
    },
    {
      id: 4,
      title: 'Biologia Molecular',
      description: 'Explore os processos moleculares da vida',
      category: 'Biológicas',
      level: 'intermediate',
      duration: 100,
      modules: 14,
      progress: 85,
      status: 'almost_complete',
      difficulty: 'medium',
      rating: 4.7,
      students: 720,
      instructor: 'Prof. Ana Costa',
      tags: ['DNA', 'RNA', 'Proteínas', 'Genética'],
      color: 'emerald',
      icon: 'solar:dna-bold-duotone',
      estimatedCompletion: '2024-09-30',
      nextModule: 'Engenharia Genética'
    },
    {
      id: 5,
      title: 'História do Brasil República',
      description: 'Período republicano brasileiro desde 1889 até os dias atuais',
      category: 'Humanas',
      level: 'beginner',
      duration: 60,
      modules: 10,
      progress: 100,
      status: 'completed',
      difficulty: 'easy',
      rating: 4.5,
      students: 980,
      instructor: 'Prof. Roberto Alves',
      tags: ['República', 'Era Vargas', 'Ditadura', 'Redemocratização'],
      color: 'amber',
      icon: 'solar:history-bold-duotone',
      estimatedCompletion: '2024-09-15',
      nextModule: null
    },
    {
      id: 6,
      title: 'Redação ENEM Nota 1000',
      description: 'Técnicas e estratégias para alcançar a nota máxima na redação do ENEM',
      category: 'Linguagens',
      level: 'intermediate',
      duration: 40,
      modules: 8,
      progress: 50,
      status: 'in_progress',
      difficulty: 'medium',
      rating: 4.9,
      students: 1500,
      instructor: 'Prof. Lucia Oliveira',
      tags: ['Redação', 'ENEM', 'Argumentação', 'Estrutura'],
      color: 'orange',
      icon: 'solar:pen-new-square-bold-duotone',
      estimatedCompletion: '2024-10-15',
      nextModule: 'Desenvolvimento de Argumentos'
    }
  ];

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return 'Indefinido';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'failure';
      default: return 'gray';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_started': return 'Não Iniciada';
      case 'in_progress': return 'Em Progresso';
      case 'almost_complete': return 'Quase Concluída';
      case 'completed': return 'Concluída';
      default: return 'Indefinida';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'gray';
      case 'in_progress': return 'info';
      case 'almost_complete': return 'warning';
      case 'completed': return 'success';
      default: return 'gray';
    }
  };

  const filteredTrails = trails.filter(trail => {
    const matchesCategory = filterCategory === 'all' || trail.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || trail.level === filterLevel;
    return matchesCategory && matchesLevel;
  });

  const stats = {
    total: trails.length,
    inProgress: trails.filter(t => t.status === 'in_progress').length,
    completed: trails.filter(t => t.status === 'completed').length,
    notStarted: trails.filter(t => t.status === 'not_started').length,
    averageProgress: Math.round(trails.reduce((sum, t) => sum + t.progress, 0) / trails.length),
    totalHours: trails.reduce((sum, t) => sum + t.duration, 0)
  };

  const handleTrailClick = (trail: any) => {
    setSelectedTrail(trail);
    setShowModal(true);
  };

  const handleStartTrail = (trail: any) => {
    console.log('Iniciando trilha:', trail.title);
  };

  const handleContinueTrail = (trail: any) => {
    console.log('Continuando trilha:', trail.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trilhas de Aprendizado 🛤️
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Trilhas personalizadas e recomendadas para otimizar seu aprendizado
            </p>
          </div>
          <Button color="primary">
            <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
            Criar Trilha
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:route-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:play-circle-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Em Progresso</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.completed}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Concluídas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:pause-circle-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.notStarted}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Não Iniciadas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:chart-2-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageProgress}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Progresso Médio</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalHours}h</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total de Horas</p>
        </CardBox>
      </div>

      {/* Filtros */}
      <CardBox>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48">
            <Label htmlFor="category" value="Categoria" />
            <Select id="category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">Todas as categorias</option>
              <option value="Exatas">Exatas</option>
              <option value="Biológicas">Biológicas</option>
              <option value="Humanas">Humanas</option>
              <option value="Linguagens">Linguagens</option>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Label htmlFor="level" value="Nível" />
            <Select id="level" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
              <option value="all">Todos os níveis</option>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </Select>
          </div>
        </div>
      </CardBox>

      {/* Lista de Trilhas */}
      <TitleCard title="Trilhas Disponíveis">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrails.map((trail) => (
            <div key={trail.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-12 h-12 bg-${trail.color}-100 dark:bg-${trail.color}-900 rounded-lg`}>
                    <Icon icon={trail.icon} className={`w-6 h-6 text-${trail.color}-600 dark:text-${trail.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{trail.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{trail.instructor}</p>
                  </div>
                </div>
                <Badge color={getStatusColor(trail.status)} size="sm">
                  {getStatusText(trail.status)}
                </Badge>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{trail.description}</p>

              {/* Progresso */}
              {trail.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{trail.progress}%</span>
                  </div>
                  <Progress progress={trail.progress} color={trail.color} size="sm" />
                </div>
              )}

              {/* Informações da trilha */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{trail.modules}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Módulos</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{trail.duration}h</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Duração</div>
                </div>
              </div>

              {/* Métricas */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:star-bold-duotone" className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-300">{trail.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:users-group-two-rounded-bold-duotone" className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{trail.students} alunos</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Icon icon="solar:tag-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {trail.category} • 
                    <Badge color={getLevelColor(trail.level)} size="sm" className="ml-2">
                      {getLevelText(trail.level)}
                    </Badge>
                  </span>
                </div>

                {trail.nextModule && (
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Próximo: {trail.nextModule}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Conclusão prevista: {new Date(trail.estimatedCompletion).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trail.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} color="light" size="sm">
                    {tag}
                  </Badge>
                ))}
                {trail.tags.length > 3 && (
                  <Badge color="light" size="sm">
                    +{trail.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                {trail.status === 'not_started' ? (
                  <Button size="sm" color="primary" onClick={() => handleStartTrail(trail)} className="flex-1">
                    <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                    Iniciar
                  </Button>
                ) : trail.status === 'completed' ? (
                  <Button size="sm" color="success" disabled className="flex-1">
                    <Icon icon="solar:check-circle-bold-duotone" className="w-4 h-4 mr-1" />
                    Concluída
                  </Button>
                ) : (
                  <Button size="sm" color="primary" onClick={() => handleContinueTrail(trail)} className="flex-1">
                    <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                    Continuar
                  </Button>
                )}
                <Button size="sm" color="secondary" onClick={() => handleTrailClick(trail)} className="flex-1">
                  <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                  Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TitleCard>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Header>
          {selectedTrail?.title}
        </Modal.Header>
        <Modal.Body>
          {selectedTrail && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label value="Informações Gerais" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Instrutor:</strong> {selectedTrail.instructor}</div>
                    <div><strong>Categoria:</strong> {selectedTrail.category}</div>
                    <div><strong>Nível:</strong> {getLevelText(selectedTrail.level)}</div>
                    <div><strong>Dificuldade:</strong> {getDifficultyText(selectedTrail.difficulty)}</div>
                    <div><strong>Status:</strong> {getStatusText(selectedTrail.status)}</div>
                  </div>
                </div>

                <div>
                  <Label value="Métricas" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Duração:</strong> {selectedTrail.duration} horas</div>
                    <div><strong>Módulos:</strong> {selectedTrail.modules}</div>
                    <div><strong>Avaliação:</strong> {selectedTrail.rating} ⭐</div>
                    <div><strong>Alunos:</strong> {selectedTrail.students}</div>
                  </div>
                </div>
              </div>

              <div>
                <Label value="Descrição" className="text-lg font-semibold mb-3 block" />
                <p className="text-gray-600 dark:text-gray-300">{selectedTrail.description}</p>
              </div>

              {selectedTrail.progress > 0 && (
                <div>
                  <Label value="Progresso Atual" className="text-lg font-semibold mb-3 block" />
                  <Progress progress={selectedTrail.progress} color={selectedTrail.color} size="lg" />
                  <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {selectedTrail.progress}% concluído
                  </div>
                  {selectedTrail.nextModule && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:play-circle-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium">Próximo módulo: {selectedTrail.nextModule}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label value="Tags" className="text-lg font-semibold mb-3 block" />
                <div className="flex flex-wrap gap-2">
                  {selectedTrail.tags.map((tag: string, index: number) => (
                    <Badge key={index} color="light">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label value="Cronograma" className="text-lg font-semibold mb-3 block" />
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium">
                      Conclusão prevista: {new Date(selectedTrail.estimatedCompletion).toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedTrail?.status === 'not_started' ? (
            <Button color="primary" onClick={() => handleStartTrail(selectedTrail)}>
              <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-2" />
              Iniciar Trilha
            </Button>
          ) : selectedTrail?.status !== 'completed' ? (
            <Button color="primary" onClick={() => handleContinueTrail(selectedTrail)}>
              <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-2" />
              Continuar Trilha
            </Button>
          ) : null}
          <Button color="secondary">
            <Icon icon="solar:bookmark-bold-duotone" className="w-4 h-4 mr-2" />
            Favoritar
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Trilhas;