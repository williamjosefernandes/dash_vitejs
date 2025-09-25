import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Progress, Modal, TextInput, Label, Select, Textarea, Tabs, TabItem } from 'flowbite-react';

const Revisoes = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showModal, setShowModal] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<any>(null);
  const [filterSubject, setFilterSubject] = useState('all');

  // Dados simulados de revisões
  const revisions = [
    {
      id: 1,
      title: 'Álgebra Linear - Matrizes',
      subject: 'Matemática',
      topic: 'Matrizes e Determinantes',
      type: 'spaced',
      difficulty: 'medium',
      nextReview: '2024-09-26',
      lastReview: '2024-09-20',
      reviewCount: 3,
      retention: 85,
      status: 'due',
      estimatedTime: 30,
      priority: 'high',
      notes: 'Focar em operações com matrizes 3x3',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Leis de Newton',
      subject: 'Física',
      topic: 'Mecânica Clássica',
      type: 'active',
      difficulty: 'easy',
      nextReview: '2024-09-27',
      lastReview: '2024-09-22',
      reviewCount: 5,
      retention: 92,
      status: 'scheduled',
      estimatedTime: 20,
      priority: 'medium',
      notes: 'Revisar exemplos práticos',
      color: 'green'
    },
    {
      id: 3,
      title: 'Química Orgânica - Funções',
      subject: 'Química',
      topic: 'Funções Orgânicas',
      type: 'intensive',
      difficulty: 'hard',
      nextReview: '2024-09-26',
      lastReview: '2024-09-24',
      reviewCount: 2,
      retention: 65,
      status: 'due',
      estimatedTime: 45,
      priority: 'high',
      notes: 'Dificuldade com nomenclatura',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Genética - Mendel',
      subject: 'Biologia',
      topic: 'Leis de Mendel',
      type: 'spaced',
      difficulty: 'medium',
      nextReview: '2024-09-28',
      lastReview: '2024-09-25',
      reviewCount: 4,
      retention: 78,
      status: 'scheduled',
      estimatedTime: 35,
      priority: 'medium',
      notes: 'Praticar cruzamentos',
      color: 'emerald'
    },
    {
      id: 5,
      title: 'Segunda Guerra Mundial',
      subject: 'História',
      topic: 'Guerras Mundiais',
      type: 'active',
      difficulty: 'easy',
      nextReview: '2024-09-29',
      lastReview: '2024-09-23',
      reviewCount: 6,
      retention: 95,
      status: 'completed',
      estimatedTime: 25,
      priority: 'low',
      notes: 'Bem consolidado',
      color: 'amber'
    }
  ];

  const getTypeText = (type: string) => {
    switch (type) {
      case 'spaced': return 'Espaçada';
      case 'active': return 'Ativa';
      case 'intensive': return 'Intensiva';
      default: return 'Padrão';
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

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due': return 'failure';
      case 'scheduled': return 'info';
      case 'completed': return 'success';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'due': return 'Vencida';
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Concluída';
      default: return 'Indefinida';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'failure';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'gray';
    }
  };

  const filteredRevisions = revisions.filter(revision => {
    const matchesSubject = filterSubject === 'all' || revision.subject === filterSubject;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'scheduled' && revision.status === 'scheduled') ||
                      (activeTab === 'due' && revision.status === 'due') ||
                      (activeTab === 'completed' && revision.status === 'completed');
    return matchesSubject && matchesTab;
  });

  const stats = {
    total: revisions.length,
    due: revisions.filter(r => r.status === 'due').length,
    scheduled: revisions.filter(r => r.status === 'scheduled').length,
    completed: revisions.filter(r => r.status === 'completed').length,
    averageRetention: Math.round(revisions.reduce((sum, r) => sum + r.retention, 0) / revisions.length),
    totalTime: revisions.reduce((sum, r) => sum + r.estimatedTime, 0)
  };

  const handleRevisionClick = (revision: any) => {
    setSelectedRevision(revision);
    setShowModal(true);
  };

  const handleStartRevision = (revision: any) => {
    // Lógica para iniciar revisão
    console.log('Iniciando revisão:', revision.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Revisões 🔄
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sistema inteligente de revisões programadas para otimizar sua retenção
            </p>
          </div>
          <Button color="primary">
            <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
            Nova Revisão
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:refresh-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:danger-circle-bold-duotone" className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.due}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Vencidas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.scheduled}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Agendadas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.completed}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Concluídas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:brain-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageRetention}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Retenção</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalTime}min</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Tempo Total</p>
        </CardBox>
      </div>

      {/* Filtros */}
      <CardBox>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <Tabs aria-label="Revisões" variant="underline">
              <TabItem active={activeTab === 'due'} title="Vencidas" onClick={() => setActiveTab('due')}>
                <Icon icon="solar:danger-circle-bold-duotone" className="w-4 h-4 mr-2" />
              </TabItem>
              <TabItem active={activeTab === 'scheduled'} title="Agendadas" onClick={() => setActiveTab('scheduled')}>
                <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 mr-2" />
              </TabItem>
              <TabItem active={activeTab === 'completed'} title="Concluídas" onClick={() => setActiveTab('completed')}>
                <Icon icon="solar:check-circle-bold-duotone" className="w-4 h-4 mr-2" />
              </TabItem>
              <TabItem active={activeTab === 'all'} title="Todas" onClick={() => setActiveTab('all')}>
                <Icon icon="solar:list-bold-duotone" className="w-4 h-4 mr-2" />
              </TabItem>
            </Tabs>
          </div>
          <div className="w-full md:w-48">
            <Select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="all">Todas as disciplinas</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biologia">Biologia</option>
              <option value="História">História</option>
            </Select>
          </div>
        </div>
      </CardBox>

      {/* Lista de Revisões */}
      <TitleCard title="Minhas Revisões">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRevisions.map((revision) => (
            <div key={revision.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-12 h-12 bg-${revision.color}-100 dark:bg-${revision.color}-900 rounded-lg`}>
                    <Icon icon="solar:refresh-bold-duotone" className={`w-6 h-6 text-${revision.color}-600 dark:text-${revision.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{revision.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{revision.subject} • {revision.topic}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge color={getStatusColor(revision.status)} size="sm">
                    {getStatusText(revision.status)}
                  </Badge>
                  <Badge color={getPriorityColor(revision.priority)} size="sm">
                    {revision.priority === 'high' ? 'Alta' : revision.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Retenção</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{revision.retention}%</span>
                </div>
                <Progress progress={revision.retention} color={revision.retention >= 80 ? 'green' : revision.retention >= 60 ? 'yellow' : 'red'} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{revision.reviewCount}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Revisões</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{revision.estimatedTime}min</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tempo Est.</div>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:tag-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">Tipo: {getTypeText(revision.type)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon icon="solar:chart-2-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Dificuldade: 
                    <Badge color={getDifficultyColor(revision.difficulty)} size="sm" className="ml-2">
                      {getDifficultyText(revision.difficulty)}
                    </Badge>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Próxima: {new Date(revision.nextReview).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {revision.notes && (
                  <div className="flex items-start gap-2">
                    <Icon icon="solar:notes-bold-duotone" className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300 text-xs">{revision.notes}</span>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                {revision.status === 'due' || revision.status === 'scheduled' ? (
                  <Button size="sm" color="primary" onClick={() => handleStartRevision(revision)} className="flex-1">
                    <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                    Iniciar
                  </Button>
                ) : (
                  <Button size="sm" color="success" disabled className="flex-1">
                    <Icon icon="solar:check-circle-bold-duotone" className="w-4 h-4 mr-1" />
                    Concluída
                  </Button>
                )}
                <Button size="sm" color="secondary" onClick={() => handleRevisionClick(revision)} className="flex-1">
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
          Detalhes da Revisão: {selectedRevision?.title}
        </Modal.Header>
        <Modal.Body>
          {selectedRevision && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label value="Informações Gerais" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Disciplina:</strong> {selectedRevision.subject}</div>
                    <div><strong>Tópico:</strong> {selectedRevision.topic}</div>
                    <div><strong>Tipo:</strong> {getTypeText(selectedRevision.type)}</div>
                    <div><strong>Dificuldade:</strong> {getDifficultyText(selectedRevision.difficulty)}</div>
                    <div><strong>Status:</strong> {getStatusText(selectedRevision.status)}</div>
                  </div>
                </div>

                <div>
                  <Label value="Métricas de Performance" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Retenção:</strong> {selectedRevision.retention}%</div>
                    <div><strong>Revisões Realizadas:</strong> {selectedRevision.reviewCount}</div>
                    <div><strong>Tempo Estimado:</strong> {selectedRevision.estimatedTime} minutos</div>
                    <div><strong>Prioridade:</strong> {selectedRevision.priority === 'high' ? 'Alta' : selectedRevision.priority === 'medium' ? 'Média' : 'Baixa'}</div>
                  </div>
                </div>
              </div>

              <div>
                <Label value="Cronograma" className="text-lg font-semibold mb-3 block" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium">Próxima Revisão</span>
                    </div>
                    <div className="text-lg font-semibold">
                      {new Date(selectedRevision.nextReview).toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:history-bold-duotone" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium">Última Revisão</span>
                    </div>
                    <div className="text-lg font-semibold">
                      {new Date(selectedRevision.lastReview).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label value="Progresso de Retenção" className="text-lg font-semibold mb-3 block" />
                <Progress 
                  progress={selectedRevision.retention} 
                  color={selectedRevision.retention >= 80 ? 'green' : selectedRevision.retention >= 60 ? 'yellow' : 'red'} 
                  size="lg" 
                />
                <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {selectedRevision.retention}% de retenção
                </div>
              </div>

              {selectedRevision.notes && (
                <div>
                  <Label value="Observações" className="text-lg font-semibold mb-3 block" />
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{selectedRevision.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedRevision?.status !== 'completed' && (
            <Button color="primary" onClick={() => handleStartRevision(selectedRevision)}>
              <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-2" />
              Iniciar Revisão
            </Button>
          )}
          <Button color="secondary">
            <Icon icon="solar:pen-bold-duotone" className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Revisoes;