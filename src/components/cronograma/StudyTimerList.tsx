import React, { useState } from 'react';
import { Button, Modal, TextInput, Textarea, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiPlus, HiClock, HiBookOpen, HiTrendingUp } from 'react-icons/hi';
import { useStudyTopicTimer } from '../../hooks/useStudyTopicTimer';
import { StudyDisciplineWithTopics, StudyTopic } from '../../types/cronograma/studyTopic';
import StudyDisciplineHeader from './StudyDisciplineHeader';
import StudyTopicItem from './StudyTopicItem';
import { StudyDiscipline } from 'src/types/cronograma';

const StudyTimerList: React.FC = () => {
  const {
    disciplines,
    stats,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    addTopic,
    updateTopic,
    deleteTopic,
    startTopicTimer,
    stopTopicTimer,
    resetTopicTimer,
    markTopicComplete,
    getFormattedTime,
  } = useStudyTopicTimer();

  // Estados para modais
  const [showDisciplineModal, setShowDisciplineModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [editingDiscipline, setEditingDiscipline] = useState<StudyDisciplineWithTopics | null>(null);
  const [editingTopic, setEditingTopic] = useState<StudyTopic | null>(null);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('');
  
  // Estados para controle de expansão
  const [expandedDisciplines, setExpandedDisciplines] = useState<Set<string>>(new Set());

  // Estados para formulários
  const [disciplineForm, setDisciplineForm] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    priority: 'Média',
    status: 'Ativo',
    targetHours: 0,
  });

  const [topicForm, setTopicForm] = useState({
    name: '',
    description: '',
    targetHours: 0,
  });

  // Funções para controle de expansão
  const toggleDisciplineExpansion = (disciplineId: string) => {
    const newExpanded = new Set(expandedDisciplines);
    if (newExpanded.has(disciplineId)) {
      newExpanded.delete(disciplineId);
    } else {
      newExpanded.add(disciplineId);
    }
    setExpandedDisciplines(newExpanded);
  };

  // Funções para disciplinas
  const handleOpenDisciplineModal = (discipline?: StudyDisciplineWithTopics) => {
    if (discipline) {
      setEditingDiscipline(discipline);
      setDisciplineForm({
        name: discipline.name,
        description: discipline.description || '',
        color: discipline.color,
        priority: discipline.priority,
        status: discipline.status,
        targetHours: discipline.targetHours || 0,
      });
    } else {
      setEditingDiscipline(null);
      setDisciplineForm({
        name: '',
        description: '',
        color: '#3B82F6',
        priority: 'Média',
        status: 'Ativo',
        targetHours: 0,
      });
    }
    setShowDisciplineModal(true);
  };

  const handleSaveDiscipline = () => {
    if (!disciplineForm.name.trim()) return;

    const disciplineData = {
      name: disciplineForm.name.trim(),
      description: disciplineForm.description.trim(),
      color: disciplineForm.color,
      priority: disciplineForm.priority as 'Alta' | 'Média' | 'Baixa',
      status: disciplineForm.status as 'Ativo' | 'Pausado' | 'Concluído',
      targetHours: disciplineForm.targetHours,
    };

    if (editingDiscipline) {
      updateDiscipline(editingDiscipline.id, disciplineData);
    } else {
      addDiscipline(disciplineData);
    }

    setShowDisciplineModal(false);
    setEditingDiscipline(null);
  };

  const handleDeleteDiscipline = (disciplineId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina? Todos os dados de tempo serão perdidos.')) {
      deleteDiscipline(disciplineId);
    }
  };

  // Funções para tópicos
  const handleOpenTopicModal = (disciplineId: string, topic?: StudyTopic) => {
    setSelectedDisciplineId(disciplineId);
    
    if (topic) {
      setEditingTopic(topic);
      setTopicForm({
        name: topic.name,
        description: topic.description || '',
        targetHours: topic.targetHours || 0,
      });
    } else {
      setEditingTopic(null);
      setTopicForm({
        name: '',
        description: '',
        targetHours: 0,
      });
    }
    setShowTopicModal(true);
  };

  const handleSaveTopic = () => {
    if (!topicForm.name.trim() || !selectedDisciplineId) return;

    const topicData = {
      name: topicForm.name.trim(),
      description: topicForm.description.trim(),
      targetHours: topicForm.targetHours,
    };

    if (editingTopic) {
      updateTopic(selectedDisciplineId, editingTopic.id, topicData);
    } else {
      addTopic(selectedDisciplineId, topicData);
    }

    setShowTopicModal(false);
    setEditingTopic(null);
    setSelectedDisciplineId('');
  };

  // Calcular estatísticas por disciplina
  const getDisciplineStats = (discipline: StudyDisciplineWithTopics) => {
    const completedTopics = discipline.topics.filter(topic => topic.status === 'completed').length;
    const inProgressTopics = discipline.topics.filter(topic => topic.status === 'in_progress').length;
    
    return { completedTopics, inProgressTopics };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'red';
      case 'Média': return 'yellow';
      case 'Baixa': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'green';
      case 'Pausado': return 'yellow';
      case 'Concluído': return 'blue';
      default: return 'gray';
    }
  };

  const getProgressPercentage = (discipline: StudyDiscipline) => {
    if (!discipline.targetHours) return 0;
    const hoursStudied = discipline.totalStudyTime / (1000 * 60 * 60);
    return Math.min((hoursStudied / discipline.targetHours) * 100, 100);
  };

  return (
    <div className="space-y-6">

      {/* Lista de disciplinas */}
      <div className="space-y-4">
        {disciplines.map((discipline) => {
          const { completedTopics, inProgressTopics } = getDisciplineStats(discipline);
          const isExpanded = expandedDisciplines.has(discipline.id);

          return (
            <div key={discipline.id}>
              <StudyDisciplineHeader
                discipline={discipline}
                isExpanded={isExpanded}
                onToggleExpansion={() => toggleDisciplineExpansion(discipline.id)}
                onAddTopic={() => handleOpenTopicModal(discipline.id)}
                onEdit={() => handleOpenDisciplineModal(discipline)}
                onDelete={() => handleDeleteDiscipline(discipline.id)}
                getFormattedTime={getFormattedTime}
                completedTopics={completedTopics}
                inProgressTopics={inProgressTopics}
              />

              {/* Lista de tópicos */}
              {isExpanded && (
                <div className="ml-6 space-y-3">
                  {discipline.topics.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <Icon 
                        icon="solar:document-add-bold-duotone" 
                        className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" 
                      />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Nenhum tópico adicionado ainda
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleOpenTopicModal(discipline.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <HiPlus className="w-4 h-4 mr-2" />
                        Adicionar Primeiro Tópico
                      </Button>
                    </div>
                  ) : (
                    discipline.topics.map((topic) => (
                      <StudyTopicItem
                        key={topic.id}
                        topic={topic}
                        disciplineColor={discipline.color}
                        onStart={() => startTopicTimer(discipline.id, topic.id)}
                        onStop={() => stopTopicTimer(discipline.id, topic.id)}
                        onReset={() => resetTopicTimer(discipline.id, topic.id)}
                        onComplete={() => markTopicComplete(discipline.id, topic.id)}
                        onEdit={() => handleOpenTopicModal(discipline.id, topic)}
                        onDelete={() => deleteTopic(discipline.id, topic.id)}
                        getFormattedTime={getFormattedTime}
                        getCurrentTime={(topicId) => topic.currentTime || 0}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mensagem quando não há disciplinas */}
      {disciplines.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Icon icon="solar:book-bold-duotone" className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma disciplina cadastrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Adicione sua primeira disciplina para começar a cronometrar seus estudos
          </p>
        </div>
      )}

      {/* Modal para Tópico */}
      <Modal show={showTopicModal} onClose={() => setShowTopicModal(false)} size="md">
        <Modal.Header>
          {editingTopic ? 'Editar Tópico' : 'Novo Tópico'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome do Tópico
              </label>
              <TextInput
                value={topicForm.name}
                onChange={(e) => setTopicForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Equações do 2º grau"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição (opcional)
              </label>
              <Textarea
                value={topicForm.description}
                onChange={(e) => setTopicForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição do tópico..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta de Horas (opcional)
              </label>
              <TextInput
                type="number"
                min="0"
                step="0.5"
                value={topicForm.targetHours}
                onChange={(e) => setTopicForm(prev => ({ ...prev, targetHours: Number(e.target.value) }))}
                placeholder="0"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSaveTopic} disabled={!topicForm.name.trim()}>
            {editingTopic ? 'Salvar' : 'Criar'}
          </Button>
          <Button color="gray" onClick={() => setShowTopicModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudyTimerList;