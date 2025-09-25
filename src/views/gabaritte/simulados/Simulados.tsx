import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, TextInput, Label, Select, Progress, Tabs } from 'flowbite-react';

const Simulados = () => {
  const [activeTab, setActiveTab] = useState('disponíveis');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSimulado, setSelectedSimulado] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Dados simulados de simulados
  const simulados = [
    {
      id: 1,
      title: 'ENEM 2024 - Simulado Completo',
      description: 'Simulado completo com 180 questões baseadas no padrão ENEM',
      type: 'enem',
      subjects: ['Matemática', 'Português', 'Ciências Humanas', 'Ciências da Natureza', 'Redação'],
      questions: 180,
      duration: 330, // em minutos
      difficulty: 'medium',
      status: 'available',
      attempts: 0,
      bestScore: null,
      averageScore: 650,
      totalAttempts: 15420,
      createdAt: '2024-09-15',
      tags: ['ENEM', 'Completo', 'Oficial'],
      category: 'Vestibular',
      adaptative: true,
      aiGenerated: false,
      premium: false
    },
    {
      id: 2,
      title: 'Matemática - Funções',
      description: 'Simulado focado em funções matemáticas com questões adaptativas',
      type: 'subject',
      subjects: ['Matemática'],
      questions: 30,
      duration: 90,
      difficulty: 'medium',
      status: 'completed',
      attempts: 2,
      bestScore: 85,
      averageScore: 78,
      totalAttempts: 8934,
      createdAt: '2024-09-10',
      completedAt: '2024-09-12',
      tags: ['Matemática', 'Funções', 'Adaptativo'],
      category: 'Disciplina',
      adaptative: true,
      aiGenerated: true,
      premium: false,
      lastScore: 85,
      timeSpent: 75,
      correctAnswers: 26,
      wrongAnswers: 4,
      performance: {
        'Funções Lineares': 90,
        'Funções Quadráticas': 85,
        'Funções Exponenciais': 80,
        'Funções Logarítmicas': 75
      }
    },
    {
      id: 3,
      title: 'Física - Mecânica Clássica',
      description: 'Questões de mecânica com foco em leis de Newton e cinemática',
      type: 'subject',
      subjects: ['Física'],
      questions: 25,
      duration: 75,
      difficulty: 'hard',
      status: 'in_progress',
      attempts: 1,
      bestScore: null,
      averageScore: 72,
      totalAttempts: 5621,
      createdAt: '2024-09-14',
      startedAt: '2024-09-16',
      tags: ['Física', 'Mecânica', 'Newton'],
      category: 'Disciplina',
      adaptative: true,
      aiGenerated: true,
      premium: false,
      progress: 60,
      currentQuestion: 15,
      timeRemaining: 30
    },
    {
      id: 4,
      title: 'Química Orgânica - Avançado',
      description: 'Simulado avançado de química orgânica com questões complexas',
      type: 'subject',
      subjects: ['Química'],
      questions: 40,
      duration: 120,
      difficulty: 'hard',
      status: 'available',
      attempts: 0,
      bestScore: null,
      averageScore: 68,
      totalAttempts: 3245,
      createdAt: '2024-09-13',
      tags: ['Química', 'Orgânica', 'Avançado'],
      category: 'Disciplina',
      adaptative: true,
      aiGenerated: true,
      premium: true
    },
    {
      id: 5,
      title: 'Vestibular FUVEST - Primeira Fase',
      description: 'Simulado baseado no padrão FUVEST com questões de múltipla escolha',
      type: 'vestibular',
      subjects: ['Matemática', 'Português', 'História', 'Geografia', 'Física', 'Química', 'Biologia'],
      questions: 90,
      duration: 240,
      difficulty: 'hard',
      status: 'completed',
      attempts: 1,
      bestScore: 72,
      averageScore: 65,
      totalAttempts: 12890,
      createdAt: '2024-09-08',
      completedAt: '2024-09-09',
      tags: ['FUVEST', 'Vestibular', 'USP'],
      category: 'Vestibular',
      adaptative: false,
      aiGenerated: false,
      premium: false,
      lastScore: 72,
      timeSpent: 220,
      correctAnswers: 65,
      wrongAnswers: 25,
      performance: {
        'Matemática': 80,
        'Português': 75,
        'História': 70,
        'Geografia': 68,
        'Física': 72,
        'Química': 69,
        'Biologia': 74
      }
    }
  ];

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'failure';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'completed': return 'Concluído';
      case 'in_progress': return 'Em Andamento';
      case 'locked': return 'Bloqueado';
      default: return 'Disponível';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'info';
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'locked': return 'gray';
      default: return 'gray';
    }
  };

  const filteredSimulados = simulados.filter(simulado => {
    const matchesSubject = filterSubject === 'all' || simulado.subjects.includes(filterSubject);
    const matchesDifficulty = filterDifficulty === 'all' || simulado.difficulty === filterDifficulty;
    return matchesSubject && matchesDifficulty;
  });

  const getSimuladosByTab = () => {
    switch (activeTab) {
      case 'disponíveis':
        return filteredSimulados.filter(s => s.status === 'available');
      case 'em-andamento':
        return filteredSimulados.filter(s => s.status === 'in_progress');
      case 'concluídos':
        return filteredSimulados.filter(s => s.status === 'completed');
      case 'todos':
      default:
        return filteredSimulados;
    }
  };

  const stats = {
    total: simulados.length,
    available: simulados.filter(s => s.status === 'available').length,
    completed: simulados.filter(s => s.status === 'completed').length,
    inProgress: simulados.filter(s => s.status === 'in_progress').length,
    averageScore: Math.round(simulados.filter(s => s.bestScore).reduce((sum, s) => sum + (s.bestScore || 0), 0) / simulados.filter(s => s.bestScore).length),
    totalQuestions: simulados.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.questions, 0)
  };

  const handleSimuladoClick = (simulado: any) => {
    setSelectedSimulado(simulado);
    setShowModal(true);
  };

  const handleStartSimulado = (simulado: any) => {
    console.log('Iniciando simulado:', simulado.title);
  };

  const handleContinueSimulado = (simulado: any) => {
    console.log('Continuando simulado:', simulado.title);
  };

  const handleViewResults = (simulado: any) => {
    console.log('Visualizando resultados:', simulado.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Simulados Adaptativos 🎯
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sistema inteligente de simulados com análise de desempenho e questões adaptativas
            </p>
          </div>
          <Button color="primary" onClick={() => setShowCreateModal(true)}>
            <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
            Criar Simulado
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:document-text-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:play-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.available}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Disponíveis</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Em Andamento</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.completed}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Concluídos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageScore || 0}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Média</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:question-circle-bold-duotone" className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Questões</p>
        </CardBox>
      </div>

      {/* Filtros */}
      <CardBox>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48">
            <Label htmlFor="subject" value="Disciplina" />
            <Select id="subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="all">Todas as disciplinas</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biologia">Biologia</option>
              <option value="História">História</option>
              <option value="Geografia">Geografia</option>
              <option value="Português">Português</option>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Label htmlFor="difficulty" value="Dificuldade" />
            <Select id="difficulty" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
              <option value="all">Todas as dificuldades</option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </Select>
          </div>
        </div>
      </CardBox>

      {/* Tabs de Simulados */}
      <TitleCard title="Simulados">
        <Tabs aria-label="Simulados tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'disponíveis'} 
            title="Disponíveis" 
            icon={() => <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('disponíveis')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSimuladosByTab().map((simulado) => (
                <div key={simulado.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.title}</h3>
                        {simulado.premium && (
                          <Badge color="warning" size="sm">Premium</Badge>
                        )}
                        {simulado.adaptative && (
                          <Badge color="info" size="sm">IA</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{simulado.category}</p>
                    </div>
                    <Badge color={getStatusColor(simulado.status)} size="sm">
                      {getStatusText(simulado.status)}
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {simulado.description}
                  </p>

                  {/* Informações do simulado */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.questions}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Questões</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{Math.floor(simulado.duration / 60)}h{simulado.duration % 60 > 0 ? `${simulado.duration % 60}m` : ''}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Duração</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.averageScore}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Média Geral</div>
                    </div>
                  </div>

                  {/* Disciplinas */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {simulado.subjects.slice(0, 3).map((subject, index) => (
                        <Badge key={index} color="light" size="sm">
                          {subject}
                        </Badge>
                      ))}
                      {simulado.subjects.length > 3 && (
                        <Badge color="light" size="sm">
                          +{simulado.subjects.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:target-bold-duotone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">Dificuldade</span>
                      </div>
                      <Badge color={getDifficultyColor(simulado.difficulty)} size="sm">
                        {getDifficultyText(simulado.difficulty)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:users-group-two-rounded-bold-duotone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">Tentativas</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{simulado.totalAttempts.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">Criado em</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {new Date(simulado.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button size="sm" color="primary" onClick={() => handleStartSimulado(simulado)} className="flex-1">
                      <Icon icon="solar:play-bold-duotone" className="w-4 h-4 mr-1" />
                      Iniciar
                    </Button>
                    <Button size="sm" color="secondary" onClick={() => handleSimuladoClick(simulado)}>
                      <Icon icon="solar:eye-bold-duotone" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'em-andamento'} 
            title="Em Andamento" 
            icon={() => <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('em-andamento')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSimuladosByTab().map((simulado) => (
                <div key={simulado.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{simulado.category}</p>
                    </div>
                    <Badge color="warning" size="sm">Em Andamento</Badge>
                  </div>

                  {/* Progresso */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Questão {simulado.currentQuestion} de {simulado.questions}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{simulado.progress}%</span>
                    </div>
                    <Progress progress={simulado.progress} color="blue" size="sm" />
                  </div>

                  {/* Tempo restante */}
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Tempo restante: {simulado.timeRemaining} minutos
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" color="primary" onClick={() => handleContinueSimulado(simulado)} className="flex-1">
                      <Icon icon="solar:play-bold-duotone" className="w-4 h-4 mr-1" />
                      Continuar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'concluídos'} 
            title="Concluídos" 
            icon={() => <Icon icon="solar:check-circle-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('concluídos')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSimuladosByTab().map((simulado) => (
                <div key={simulado.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{simulado.category}</p>
                    </div>
                    <Badge color="success" size="sm">Concluído</Badge>
                  </div>

                  {/* Resultado */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-green-700 dark:text-green-300">{simulado.lastScore}%</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Pontuação</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">{simulado.correctAnswers}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">Acertos</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.timeSpent}min</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Tempo</div>
                    </div>
                  </div>

                  {/* Performance por disciplina */}
                  {simulado.performance && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Performance por Área</h4>
                      <div className="space-y-2">
                        {Object.entries(simulado.performance).slice(0, 3).map(([subject, score]) => (
                          <div key={subject} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">{subject}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-600 dark:text-gray-300 w-8">{score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" color="primary" onClick={() => handleViewResults(simulado)} className="flex-1">
                      <Icon icon="solar:chart-2-bold-duotone" className="w-4 h-4 mr-1" />
                      Ver Resultados
                    </Button>
                    <Button size="sm" color="secondary" onClick={() => handleStartSimulado(simulado)}>
                      <Icon icon="solar:refresh-bold-duotone" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'todos'} 
            title="Todos" 
            icon={() => <Icon icon="solar:list-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('todos')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSimuladosByTab().map((simulado) => (
                <div key={simulado.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{simulado.title}</h3>
                        {simulado.premium && (
                          <Badge color="warning" size="sm">Premium</Badge>
                        )}
                        {simulado.adaptative && (
                          <Badge color="info" size="sm">IA</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{simulado.category}</p>
                    </div>
                    <Badge color={getStatusColor(simulado.status)} size="sm">
                      {getStatusText(simulado.status)}
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {simulado.description}
                  </p>

                  <div className="flex gap-2">
                    {simulado.status === 'available' && (
                      <Button size="sm" color="primary" onClick={() => handleStartSimulado(simulado)} className="flex-1">
                        <Icon icon="solar:play-bold-duotone" className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                    )}
                    {simulado.status === 'in_progress' && (
                      <Button size="sm" color="warning" onClick={() => handleContinueSimulado(simulado)} className="flex-1">
                        <Icon icon="solar:play-bold-duotone" className="w-4 h-4 mr-1" />
                        Continuar
                      </Button>
                    )}
                    {simulado.status === 'completed' && (
                      <Button size="sm" color="success" onClick={() => handleViewResults(simulado)} className="flex-1">
                        <Icon icon="solar:chart-2-bold-duotone" className="w-4 h-4 mr-1" />
                        Resultados
                      </Button>
                    )}
                    <Button size="sm" color="secondary" onClick={() => handleSimuladoClick(simulado)}>
                      <Icon icon="solar:eye-bold-duotone" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <span>{selectedSimulado?.title}</span>
            {selectedSimulado?.premium && (
              <Badge color="warning" size="sm">Premium</Badge>
            )}
            {selectedSimulado?.adaptative && (
              <Badge color="info" size="sm">IA Adaptativo</Badge>
            )}
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedSimulado && (
            <div className="space-y-6">
              {/* Informações gerais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSimulado.questions}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Questões</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Math.floor(selectedSimulado.duration / 60)}h{selectedSimulado.duration % 60 > 0 ? `${selectedSimulado.duration % 60}m` : ''}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Duração</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSimulado.averageScore}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Média Geral</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSimulado.totalAttempts.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tentativas</div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <Label value="Descrição" className="text-lg font-semibold mb-3 block" />
                <p className="text-gray-700 dark:text-gray-300">{selectedSimulado.description}</p>
              </div>

              {/* Disciplinas */}
              <div>
                <Label value="Disciplinas Abordadas" className="text-lg font-semibold mb-3 block" />
                <div className="flex flex-wrap gap-2">
                  {selectedSimulado.subjects.map((subject: string, index: number) => (
                    <Badge key={index} color="light">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Performance (se concluído) */}
              {selectedSimulado.performance && (
                <div>
                  <Label value="Performance por Área" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-3">
                    {Object.entries(selectedSimulado.performance).map(([subject, score]) => (
                      <div key={subject} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{subject}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-semibold w-12">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <Label value="Tags" className="text-lg font-semibold mb-3 block" />
                <div className="flex flex-wrap gap-2">
                  {selectedSimulado.tags.map((tag: string, index: number) => (
                    <Badge key={index} color="light">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Tipo:</strong> {selectedSimulado.type === 'enem' ? 'ENEM' : selectedSimulado.type === 'vestibular' ? 'Vestibular' : 'Disciplina'}
                </div>
                <div>
                  <strong>Dificuldade:</strong> {getDifficultyText(selectedSimulado.difficulty)}
                </div>
                <div>
                  <strong>Categoria:</strong> {selectedSimulado.category}
                </div>
                <div>
                  <strong>Adaptativo:</strong> {selectedSimulado.adaptative ? 'Sim' : 'Não'}
                </div>
                <div>
                  <strong>Gerado por IA:</strong> {selectedSimulado.aiGenerated ? 'Sim' : 'Não'}
                </div>
                <div>
                  <strong>Criado em:</strong> {new Date(selectedSimulado.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedSimulado?.status === 'available' && (
            <Button color="primary" onClick={() => handleStartSimulado(selectedSimulado)}>
              <Icon icon="solar:play-bold-duotone" className="w-4 h-4 mr-2" />
              Iniciar Simulado
            </Button>
          )}
          {selectedSimulado?.status === 'in_progress' && (
            <Button color="warning" onClick={() => handleContinueSimulado(selectedSimulado)}>
              <Icon icon="solar:play-bold-duotone" className="w-4 h-4 mr-2" />
              Continuar Simulado
            </Button>
          )}
          {selectedSimulado?.status === 'completed' && (
            <Button color="success" onClick={() => handleViewResults(selectedSimulado)}>
              <Icon icon="solar:chart-2-bold-duotone" className="w-4 h-4 mr-2" />
              Ver Resultados Detalhados
            </Button>
          )}
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Criar Simulado */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} size="lg">
        <Modal.Header>
          Criar Simulado Personalizado
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" value="Título do Simulado" />
              <TextInput id="title" placeholder="Ex: Matemática - Funções Avançadas" />
            </div>

            <div>
              <Label htmlFor="description" value="Descrição" />
              <TextInput id="description" placeholder="Descreva o foco e objetivos do simulado" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" value="Tipo de Simulado" />
                <Select id="type">
                  <option value="subject">Por Disciplina</option>
                  <option value="enem">ENEM</option>
                  <option value="vestibular">Vestibular</option>
                  <option value="custom">Personalizado</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty" value="Dificuldade" />
                <Select id="difficulty">
                  <option value="easy">Fácil</option>
                  <option value="medium">Médio</option>
                  <option value="hard">Difícil</option>
                  <option value="mixed">Misto</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="questions" value="Número de Questões" />
                <TextInput id="questions" type="number" placeholder="30" min="10" max="200" />
              </div>

              <div>
                <Label htmlFor="duration" value="Duração (minutos)" />
                <TextInput id="duration" type="number" placeholder="90" min="30" max="600" />
              </div>
            </div>

            <div>
              <Label htmlFor="subjects" value="Disciplinas" />
              <Select id="subjects" multiple>
                <option value="Matemática">Matemática</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Biologia">Biologia</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Português">Português</option>
                <option value="Inglês">Inglês</option>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Simulado adaptativo (IA)</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Questões comentadas</span>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            <Icon icon="solar:add-circle-bold-duotone" className="w-4 h-4 mr-2" />
            Criar Simulado
          </Button>
          <Button color="gray" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Simulados;