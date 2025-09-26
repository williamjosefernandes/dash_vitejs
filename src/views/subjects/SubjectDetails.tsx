import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, Button, Badge, Progress, Dropdown, Modal, TextInput, Textarea, Select, Tabs } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { 
  HiArrowLeft, HiPlus, HiDotsVertical, HiPencil, HiTrash, HiEye, 
  HiClock, HiCheckCircle, HiExclamationCircle, HiPlay, HiPause 
} from 'react-icons/hi';
import { mockSubjects, mockTopics } from '../../data/mockData';
import { Subject, Topic } from '../../types/planning';

const SubjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [subject] = useState<Subject | null>(
    mockSubjects.find(s => s.id === id) || null
  );
  const [topics, setTopics] = useState<Topic[]>(
    mockTopics.filter(t => subject?.topics.some(st => st.id === t.id))
  );
  
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  // Formulário de tópico
  const [topicForm, setTopicForm] = useState<{
    name: string;
    description: string;
    estimatedHours: number;
    difficulty: 'easy' | 'medium' | 'hard';
    prerequisites: string[];
  }>({
    name: '',
    description: '',
    estimatedHours: 0,
    difficulty: 'medium',
    prerequisites: []
  });

  if (!subject) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disciplina não encontrada</h2>
          <Button onClick={() => navigate('/subjects')} className="mt-4">
            Voltar para Disciplinas
          </Button>
        </div>
      </div>
    );
  }

  // Estatísticas dos tópicos
  const topicStats = useMemo(() => {
    const total = topics.length;
    const completed = topics.filter(t => t.status === 'completed').length;
    const inProgress = topics.filter(t => t.status === 'in_progress').length;
    const notStarted = topics.filter(t => t.status === 'not_started').length;
    const reviewNeeded = topics.filter(t => t.status === 'review_needed').length;
    
    return { total, completed, inProgress, notStarted, reviewNeeded };
  }, [topics]);

  const handleOpenTopicModal = (mode: 'create' | 'edit' | 'view', topic?: Topic) => {
    setModalMode(mode);
    if (topic) {
      setSelectedTopic(topic);
      setTopicForm({
        name: topic.name,
        description: topic.description || '',
        estimatedHours: topic.estimatedHours,
        difficulty: topic.difficulty,
        prerequisites: topic.prerequisites || []
      });
    } else {
      setSelectedTopic(null);
      setTopicForm({
        name: '',
        description: '',
        estimatedHours: 0,
        difficulty: 'medium',
        prerequisites: []
      });
    }
    setShowTopicModal(true);
  };

  const handleSaveTopic = () => {
    if (modalMode === 'create') {
      const newTopic: Topic = {
        id: `topic${Date.now()}`,
        ...topicForm,
        completedHours: 0,
        progress: 0,
        status: 'not_started',
        resources: [],
        exercises: []
      };
      setTopics([...topics, newTopic]);
    } else if (modalMode === 'edit' && selectedTopic) {
      setTopics(topics.map(t => 
        t.id === selectedTopic.id 
          ? { ...t, ...topicForm }
          : t
      ));
    }
    setShowTopicModal(false);
  };

  const handleDeleteTopic = (topicId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este tópico?')) {
      setTopics(topics.filter(t => t.id !== topicId));
    }
  };

  const handleUpdateTopicStatus = (topicId: string, newStatus: Topic['status']) => {
    setTopics(topics.map(t => 
      t.id === topicId 
        ? { 
            ...t, 
            status: newStatus,
            progress: newStatus === 'completed' ? 100 : 
                     newStatus === 'in_progress' ? Math.max(t.progress, 10) : 0
          }
        : t
    ));
  };

  const getStatusColor = (status: Topic['status']) => {
    switch (status) {
      case 'not_started': return 'gray';
      case 'in_progress': return 'yellow';
      case 'completed': return 'green';
      case 'review_needed': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: Topic['status']) => {
    switch (status) {
      case 'not_started': return 'Não iniciado';
      case 'in_progress': return 'Em andamento';
      case 'completed': return 'Concluído';
      case 'review_needed': return 'Revisão necessária';
      default: return 'Desconhecido';
    }
  };

  const getSubjectDifficultyColor = (difficulty: Subject['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getDifficultyColor = (difficulty: Topic['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'green';
      case 'medium': return 'yellow';
      case 'hard': return 'red';
      default: return 'gray';
    }
  };

  const getDifficultyText = (difficulty: Topic['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            color="gray"
            onClick={() => navigate('/subjects')}
            className="p-2"
          >
            <HiArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-${subject.color}-100 dark:bg-${subject.color}-900`}>
              <Icon 
                icon={subject.icon} 
                className={`h-8 w-8 text-${subject.color}-600 dark:text-${subject.color}-400`} 
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {subject.name}
              </h1>
              {subject.code && (
                <p className="text-gray-600 dark:text-gray-400">{subject.code}</p>
              )}
            </div>
          </div>
        </div>
        <Button 
          onClick={() => handleOpenTopicModal('create')}
          className="bg-primary hover:bg-primaryemphasis"
        >
          <HiPlus className="mr-2 h-4 w-4" />
          Novo Tópico
        </Button>
      </div>

      {/* Informações da Disciplina */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Progresso Geral
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{subject.progress}%</span>
              </div>
              <Progress progress={subject.progress} color={subject.color} />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{subject.completedHours}h concluídas</span>
                <span>{subject.totalHours}h totais</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Informações
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dificuldade:</span>
                <Badge color={getSubjectDifficultyColor(subject.difficulty)}>
                  {subject.difficulty === 'beginner' ? 'Iniciante' : 
                   subject.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Prioridade:</span>
                <Badge color={subject.priority === 'high' ? 'red' : subject.priority === 'medium' ? 'yellow' : 'gray'}>
                  {subject.priority === 'high' ? 'Alta' : subject.priority === 'medium' ? 'Média' : 'Baixa'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tópicos:</span>
                <span>{topicStats.total}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Status dos Tópicos
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Concluídos:</span>
                <span className="text-green-600 font-medium">{topicStats.completed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Em andamento:</span>
                <span className="text-yellow-600 font-medium">{topicStats.inProgress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Não iniciados:</span>
                <span className="text-gray-600 font-medium">{topicStats.notStarted}</span>
              </div>
            </div>
          </div>
        </div>

        {subject.description && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Descrição
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{subject.description}</p>
          </div>
        )}
      </Card>

      {/* Tabs */}
      <Tabs aria-label="Subject details tabs">
        <Tabs.Item active title="Tópicos" icon={HiEye}>
          {/* Lista de Tópicos */}
          <div className="space-y-4">
            {topics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {topic.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge color={getStatusColor(topic.status)}>
                          {getStatusText(topic.status)}
                        </Badge>
                        <Dropdown
                          arrowIcon={false}
                          inline
                          label={<HiDotsVertical className="h-5 w-5 text-gray-500" />}
                        >
                          <Dropdown.Item onClick={() => handleOpenTopicModal('view', topic)}>
                            <HiEye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleOpenTopicModal('edit', topic)}>
                            <HiPencil className="mr-2 h-4 w-4" />
                            Editar
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          {topic.status === 'not_started' && (
                            <Dropdown.Item onClick={() => handleUpdateTopicStatus(topic.id, 'in_progress')}>
                              <HiPlay className="mr-2 h-4 w-4" />
                              Iniciar
                            </Dropdown.Item>
                          )}
                          {topic.status === 'in_progress' && (
                            <>
                              <Dropdown.Item onClick={() => handleUpdateTopicStatus(topic.id, 'completed')}>
                                <HiCheckCircle className="mr-2 h-4 w-4" />
                                Marcar como Concluído
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleUpdateTopicStatus(topic.id, 'not_started')}>
                                <HiPause className="mr-2 h-4 w-4" />
                                Pausar
                              </Dropdown.Item>
                            </>
                          )}
                          {topic.status === 'completed' && (
                            <Dropdown.Item onClick={() => handleUpdateTopicStatus(topic.id, 'review_needed')}>
                              <HiExclamationCircle className="mr-2 h-4 w-4" />
                              Marcar para Revisão
                            </Dropdown.Item>
                          )}
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={() => handleDeleteTopic(topic.id)} className="text-red-600">
                            <HiTrash className="mr-2 h-4 w-4" />
                            Excluir
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </div>

                    {topic.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {topic.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{topic.progress}%</span>
                        </div>
                        <Progress progress={topic.progress} color={subject.color} size="sm" />
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Tempo: </span>
                        <span>{topic.completedHours}h / {topic.estimatedHours}h</span>
                      </div>
                      <div className="text-sm">
                        <Badge color={getDifficultyColor(topic.difficulty)} size="sm">
                          {getDifficultyText(topic.difficulty)}
                        </Badge>
                      </div>
                    </div>

                    {topic.prerequisites && topic.prerequisites.length > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Pré-requisitos: </span>
                        <span>{topic.prerequisites.join(', ')}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>{topic.resources.length} recursos</span>
                      <span>{topic.exercises?.length || 0} exercícios</span>
                      {topic.deadline && (
                        <span>Prazo: {new Date(topic.deadline).toLocaleDateString('pt-BR')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {topics.length === 0 && (
              <Card>
                <div className="text-center py-12">
                  <HiEye className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nenhum tópico encontrado
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Comece adicionando tópicos para esta disciplina.
                  </p>
                  <Button 
                    onClick={() => handleOpenTopicModal('create')}
                    className="mt-4 bg-primary hover:bg-primaryemphasis"
                  >
                    <HiPlus className="mr-2 h-4 w-4" />
                    Adicionar Tópico
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </Tabs.Item>

        <Tabs.Item title="Recursos" icon={HiClock}>
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Recursos da disciplina serão exibidos aqui.
              </p>
            </div>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Estatísticas" icon={HiCheckCircle}>
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Estatísticas detalhadas da disciplina serão exibidas aqui.
              </p>
            </div>
          </Card>
        </Tabs.Item>
      </Tabs>

      {/* Modal de Tópico */}
      <Modal show={showTopicModal} onClose={() => setShowTopicModal(false)} size="lg">
        <Modal.Header>
          {modalMode === 'create' ? 'Novo Tópico' : 
           modalMode === 'edit' ? 'Editar Tópico' : 'Detalhes do Tópico'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome do Tópico
              </label>
              <TextInput
                value={topicForm.name}
                onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                placeholder="Ex: Álgebra Linear"
                disabled={modalMode === 'view'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição
              </label>
              <Textarea
                value={topicForm.description}
                onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })}
                placeholder="Descreva o conteúdo do tópico..."
                rows={3}
                disabled={modalMode === 'view'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horas Estimadas
                </label>
                <TextInput
                  type="number"
                  value={topicForm.estimatedHours}
                  onChange={(e) => setTopicForm({ ...topicForm, estimatedHours: Number(e.target.value) })}
                  min="0"
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dificuldade
                </label>
                <Select
                  value={topicForm.difficulty}
                  onChange={(e) => setTopicForm({ ...topicForm, difficulty: e.target.value as any })}
                  disabled={modalMode === 'view'}
                >
                  <option value="easy">Fácil</option>
                  <option value="medium">Médio</option>
                  <option value="hard">Difícil</option>
                </Select>
              </div>
            </div>
          </div>
        </Modal.Body>
        {modalMode !== 'view' && (
          <Modal.Footer>
            <Button onClick={handleSaveTopic} className="bg-primary hover:bg-primaryemphasis">
              {modalMode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
            <Button color="gray" onClick={() => setShowTopicModal(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default SubjectDetails;