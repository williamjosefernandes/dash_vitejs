import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, Progress, TextInput, Select, Tabs } from 'flowbite-react';

const Historico = () => {
  const [activeTab, setActiveTab] = useState('atividades');
  const [filterPeriod, setFilterPeriod] = useState('todos');
  const [filterType, setFilterType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Dados simulados de histórico
  const activities = [
    {
      id: 1,
      type: 'study',
      title: 'Sessão de Estudo - Matemática',
      description: 'Estudou funções quadráticas por 45 minutos',
      subject: 'Matemática',
      duration: 45,
      score: 88,
      date: '2024-01-15T14:30:00',
      details: {
        topics: ['Funções Quadráticas', 'Gráficos', 'Vértice da Parábola'],
        exercises: 12,
        correct: 10,
        difficulty: 'Médio',
        notes: 'Boa compreensão dos conceitos básicos, precisa praticar mais problemas complexos'
      }
    },
    {
      id: 2,
      type: 'exam',
      title: 'Simulado ENEM - Ciências da Natureza',
      description: 'Completou simulado com 78% de acertos',
      subject: 'Ciências da Natureza',
      duration: 180,
      score: 78,
      date: '2024-01-15T09:00:00',
      details: {
        questions: 45,
        correct: 35,
        wrong: 10,
        subjects: ['Física', 'Química', 'Biologia'],
        timeSpent: '2h 45min',
        performance: {
          'Física': 82,
          'Química': 71,
          'Biologia': 85
        }
      }
    },
    {
      id: 3,
      type: 'review',
      title: 'Revisão Espaçada - Química Orgânica',
      description: 'Revisou nomenclatura de compostos orgânicos',
      subject: 'Química',
      duration: 25,
      score: 92,
      date: '2024-01-14T16:15:00',
      details: {
        cards: 20,
        easy: 12,
        medium: 6,
        hard: 2,
        retention: '95%',
        nextReview: '2024-01-17'
      }
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Meta Alcançada!',
      description: 'Completou 7 dias consecutivos de estudo',
      subject: 'Geral',
      duration: 0,
      score: 100,
      date: '2024-01-14T23:59:00',
      details: {
        streak: 7,
        totalHours: 18.5,
        subjects: 4,
        avgScore: 84
      }
    },
    {
      id: 5,
      type: 'content',
      title: 'Conteúdo Gerado por IA',
      description: 'Criou resumo sobre Revolução Industrial',
      subject: 'História',
      duration: 15,
      score: 0,
      date: '2024-01-14T11:20:00',
      details: {
        words: 850,
        topics: ['Primeira Revolução Industrial', 'Máquina a Vapor', 'Transformações Sociais'],
        quality: 'Alta',
        sources: 5
      }
    },
    {
      id: 6,
      type: 'study',
      title: 'Sessão de Estudo - Física',
      description: 'Estudou cinemática e dinâmica',
      subject: 'Física',
      duration: 60,
      score: 75,
      date: '2024-01-13T15:45:00',
      details: {
        topics: ['Movimento Uniforme', 'Leis de Newton', 'Força e Aceleração'],
        exercises: 15,
        correct: 11,
        difficulty: 'Difícil',
        notes: 'Dificuldade com problemas que envolvem múltiplas forças'
      }
    },
    {
      id: 7,
      type: 'planning',
      title: 'Plano de Estudo Criado',
      description: 'Criou plano para preparação do ENEM',
      subject: 'Geral',
      duration: 10,
      score: 0,
      date: '2024-01-13T08:30:00',
      details: {
        duration: '12 semanas',
        subjects: ['Matemática', 'Português', 'Ciências', 'Humanas'],
        hoursPerWeek: 20,
        goals: ['750+ pontos no ENEM', 'Melhorar redação']
      }
    },
    {
      id: 8,
      type: 'trail',
      title: 'Trilha Iniciada - Matemática Básica',
      description: 'Começou trilha de fundamentos matemáticos',
      subject: 'Matemática',
      duration: 0,
      score: 0,
      date: '2024-01-12T19:00:00',
      details: {
        modules: 8,
        estimatedTime: '6 semanas',
        difficulty: 'Iniciante',
        instructor: 'Prof. Carlos Silva'
      }
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'study': return 'solar:book-2-bold-duotone';
      case 'exam': return 'solar:diploma-bold-duotone';
      case 'review': return 'solar:refresh-circle-bold-duotone';
      case 'achievement': return 'solar:cup-star-bold-duotone';
      case 'content': return 'solar:document-add-bold-duotone';
      case 'planning': return 'solar:calendar-mark-bold-duotone';
      case 'trail': return 'solar:map-point-wave-bold-duotone';
      default: return 'solar:history-bold-duotone';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'study': return 'blue';
      case 'exam': return 'purple';
      case 'review': return 'green';
      case 'achievement': return 'yellow';
      case 'content': return 'indigo';
      case 'planning': return 'pink';
      case 'trail': return 'teal';
      default: return 'gray';
    }
  };

  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'study': return 'Estudo';
      case 'exam': return 'Simulado';
      case 'review': return 'Revisão';
      case 'achievement': return 'Conquista';
      case 'content': return 'Conteúdo';
      case 'planning': return 'Planejamento';
      case 'trail': return 'Trilha';
      default: return 'Atividade';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes === 0) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'todos' || activity.type === filterType;
    
    // Filtro por período (simplificado)
    const matchesPeriod = filterPeriod === 'todos' || true; // Implementar lógica de período
    
    return matchesSearch && matchesType && matchesPeriod;
  });

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  // Estatísticas do histórico
  const stats = {
    totalActivities: activities.length,
    totalStudyTime: activities.reduce((sum, act) => sum + act.duration, 0),
    averageScore: Math.round(activities.filter(act => act.score > 0).reduce((sum, act) => sum + act.score, 0) / activities.filter(act => act.score > 0).length),
    achievements: activities.filter(act => act.type === 'achievement').length
  };

  // Dados para gráfico de progresso (simulado)
  const progressData = [
    { date: '2024-01-08', score: 72 },
    { date: '2024-01-09', score: 75 },
    { date: '2024-01-10', score: 78 },
    { date: '2024-01-11', score: 76 },
    { date: '2024-01-12', score: 82 },
    { date: '2024-01-13', score: 85 },
    { date: '2024-01-14', score: 88 },
    { date: '2024-01-15', score: 84 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Histórico de Atividades 📊
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Acompanhe todo seu progresso e atividades realizadas
            </p>
          </div>
          <Button color="primary">
            <Icon icon="solar:export-bold-duotone" className="w-5 h-5 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:history-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalActivities}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total de Atividades</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{formatDuration(stats.totalStudyTime)}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Tempo Total de Estudo</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:chart-2-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Média de Desempenho</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:cup-star-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.achievements}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Conquistas</p>
        </CardBox>
      </div>

      {/* Tabs */}
      <TitleCard title="Histórico Detalhado">
        <Tabs aria-label="Histórico tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'atividades'} 
            title="Atividades" 
            icon={() => <Icon icon="solar:list-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('atividades')}
          >
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6">
              <div className="flex-1">
                <TextInput
                  icon={() => <Icon icon="solar:magnifer-bold-duotone" className="w-4 h-4" />}
                  placeholder="Buscar atividades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="todos">Todos os Tipos</option>
                <option value="study">Estudos</option>
                <option value="exam">Simulados</option>
                <option value="review">Revisões</option>
                <option value="achievement">Conquistas</option>
                <option value="content">Conteúdo</option>
                <option value="planning">Planejamento</option>
                <option value="trail">Trilhas</option>
              </Select>
              <Select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)}>
                <option value="todos">Todos os Períodos</option>
                <option value="hoje">Hoje</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
                <option value="trimestre">Último Trimestre</option>
              </Select>
            </div>

            {/* Timeline de Atividades */}
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleActivityClick(activity)}>
                  <div className="flex items-start gap-4">
                    {/* Ícone da atividade */}
                    <div className={`flex items-center justify-center w-12 h-12 bg-${getActivityColor(activity.type)}-100 dark:bg-${getActivityColor(activity.type)}-900 rounded-lg flex-shrink-0`}>
                      <Icon icon={getActivityIcon(activity.type)} className={`w-6 h-6 text-${getActivityColor(activity.type)}-600 dark:text-${getActivityColor(activity.type)}-400`} />
                    </div>

                    {/* Conteúdo da atividade */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{activity.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(activity.date)}</div>
                          {activity.score > 0 && (
                            <div className={`text-lg font-semibold mt-1 ${activity.score >= 80 ? 'text-green-600' : activity.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {activity.score}%
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Badges e informações */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge color={getActivityColor(activity.type)} size="sm">
                          {getActivityTypeText(activity.type)}
                        </Badge>
                        <Badge color="light" size="sm">
                          {activity.subject}
                        </Badge>
                        {activity.duration > 0 && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4" />
                            {formatDuration(activity.duration)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <Icon icon="solar:history-bold-duotone" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhuma atividade encontrada</h3>
                <p className="text-gray-500 dark:text-gray-400">Tente ajustar os filtros ou realizar algumas atividades.</p>
              </div>
            )}
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'progresso'} 
            title="Progresso" 
            icon={() => <Icon icon="solar:graph-up-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('progresso')}
          >
            <div className="mt-6 space-y-6">
              {/* Gráfico de Progresso Simulado */}
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evolução do Desempenho</h3>
                <div className="space-y-3">
                  {progressData.map((point, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 w-20">
                        {new Date(point.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </div>
                      <div className="flex-1">
                        <Progress progress={point.score} color={point.score >= 80 ? 'green' : point.score >= 60 ? 'yellow' : 'red'} size="sm" />
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white w-12">
                        {point.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estatísticas por Disciplina */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Desempenho por Disciplina</h3>
                  <div className="space-y-4">
                    {['Matemática', 'Física', 'Química', 'História', 'Português'].map((subject) => {
                      const score = Math.floor(Math.random() * 30) + 70; // Score simulado
                      return (
                        <div key={subject}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{score}%</span>
                          </div>
                          <Progress progress={score} color={score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'} size="sm" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tempo de Estudo Semanal</h3>
                  <div className="space-y-4">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => {
                      const hours = Math.floor(Math.random() * 4) + 1; // Horas simuladas
                      return (
                        <div key={day}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{hours}h</span>
                          </div>
                          <Progress progress={(hours / 5) * 100} color="blue" size="sm" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'conquistas'} 
            title="Conquistas" 
            icon={() => <Icon icon="solar:cup-star-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('conquistas')}
          >
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.filter(act => act.type === 'achievement').map((achievement) => (
                  <div key={achievement.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mx-auto mb-4">
                      <Icon icon="solar:cup-star-bold-duotone" className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{achievement.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(achievement.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>

      {/* Modal de Detalhes da Atividade */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Icon icon={getActivityIcon(selectedActivity?.type)} className="w-6 h-6" />
            <span>{selectedActivity?.title}</span>
            <Badge color={getActivityColor(selectedActivity?.type)} size="sm">
              {getActivityTypeText(selectedActivity?.type)}
            </Badge>
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <div className="space-y-6">
              {/* Informações básicas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(selectedActivity.date)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Data/Hora</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{formatDuration(selectedActivity.duration)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Duração</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedActivity.subject}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Disciplina</div>
                </div>
                {selectedActivity.score > 0 && (
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`text-lg font-semibold ${selectedActivity.score >= 80 ? 'text-green-600' : selectedActivity.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {selectedActivity.score}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Desempenho</div>
                  </div>
                )}
              </div>

              {/* Descrição */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Descrição</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedActivity.description}</p>
              </div>

              {/* Detalhes específicos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Detalhes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedActivity.details).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {Array.isArray(value) ? value.join(', ') : 
                         typeof value === 'object' ? JSON.stringify(value, null, 2) : 
                         String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            <Icon icon="solar:share-bold-duotone" className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Historico;