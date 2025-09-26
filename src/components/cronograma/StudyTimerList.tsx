import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, TextInput, Textarea, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiPlus, HiPlay, HiPause, HiStop, HiPencil, HiTrash, HiClock, HiBookOpen, HiTrendingUp, HiChevronRight, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useStudyTimer } from '../../hooks/useStudyTimer';
import { StudyDiscipline } from '../../types/cronograma';

const StudyTimerList: React.FC = () => {
  const {
    disciplines,
    timers,
    stats,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    startTimer,
    stopTimer,
    resetTimer,
    getFormattedTime,
    isTimerRunning,
    getCurrentTime,
  } = useStudyTimer();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedDiscipline, setSelectedDiscipline] = useState<StudyDiscipline | null>(null);
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: number }>({});

  // Formulário
  const [formData, setFormData] = useState({
    name: '',
    content: [''],
    color: '#3B82F6',
    priority: 'Média' as 'Alta' | 'Média' | 'Baixa',
    status: 'Ativo' as 'Ativo' | 'Pausado' | 'Concluído',
    targetHours: 0,
  });

  // Atualizar tempos em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes: { [key: string]: number } = {};
      disciplines.forEach(discipline => {
        newTimes[discipline.id] = getCurrentTime(discipline.id);
      });
      setCurrentTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [disciplines, getCurrentTime]);

  const handleOpenModal = (mode: 'create' | 'edit', discipline?: StudyDiscipline) => {
    setModalMode(mode);
    if (discipline) {
      setSelectedDiscipline(discipline);
      setFormData({
        name: discipline.name,
        content: discipline.content,
        color: discipline.color,
        priority: discipline.priority,
        status: discipline.status,
        targetHours: discipline.targetHours || 0,
      });
    } else {
      setSelectedDiscipline(null);
      setFormData({
        name: '',
        content: [''],
        color: '#3B82F6',
        priority: 'Média',
        status: 'Ativo',
        targetHours: 0,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      addDiscipline(formData);
    } else if (modalMode === 'edit' && selectedDiscipline) {
      updateDiscipline(selectedDiscipline.id, formData);
    }
    setShowModal(false);
  };

  const handleDelete = (disciplineId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta disciplina? Todos os dados de tempo serão perdidos.')) {
      deleteDiscipline(disciplineId);
    }
  };

  const handleToggleTimer = (disciplineId: string) => {
    if (isTimerRunning(disciplineId)) {
      stopTimer(disciplineId);
    } else {
      startTimer(disciplineId);
    }
  };

  const addContentItem = () => {
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, '']
    }));
  };

  const removeContentItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  const updateContentItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.map((item, i) => i === index ? value : item)
    }));
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
      {/* Header com estatísticas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Icon 
                  icon="solar:stopwatch-bold-duotone" 
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cronômetro de Estudos
              </h2>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Gerencie seu tempo de estudo por disciplina e acompanhe seu progresso
            </p>
          </div>
          
          <Button 
            onClick={() => handleOpenModal('create')}
            className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            Nova Disciplina
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <HiClock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hoje</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {getFormattedTime(stats.todayTime)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <HiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Esta Semana</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {getFormattedTime(stats.weekTime)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <HiBookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {getFormattedTime(stats.totalTime)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Icon icon="solar:chart-bold-duotone" className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessões</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.totalSessions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de disciplinas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {disciplines.map((discipline) => {
          const currentTime = currentTimes[discipline.id] || 0;
          const isRunning = isTimerRunning(discipline.id);
          const progressPercentage = getProgressPercentage(discipline);

          return (
            <Card key={discipline.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <div 
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${discipline.color}20` }}
                  >
                    <Icon 
                      icon="solar:book-bold-duotone" 
                      className="h-6 w-6"
                      style={{ color: discipline.color }}
                    />
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {discipline.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge color={getStatusColor(discipline.status)} size="sm">
                        {discipline.status}
                      </Badge>
                      <Badge color={getPriorityColor(discipline.priority)} size="sm">
                        {discipline.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    color="gray"
                    onClick={() => handleOpenModal('edit', discipline)}
                  >
                    <HiPencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    color="failure"
                    onClick={() => handleDelete(discipline.id)}
                  >
                    <HiTrash className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Cronômetro */}
              <div className="text-center mb-4">
                <div className={`text-3xl font-mono font-bold mb-2 ${isRunning ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                  {getFormattedTime(currentTime)}
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    color={isRunning ? "failure" : "success"}
                    onClick={() => handleToggleTimer(discipline.id)}
                  >
                    {isRunning ? (
                      <>
                        <HiPause className="w-4 h-4 mr-1" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <HiPlay className="w-4 h-4 mr-1" />
                        Iniciar
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    color="gray"
                    onClick={() => resetTimer(discipline.id)}
                  >
                    <HiStop className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Progresso */}
              {discipline.targetHours && discipline.targetHours > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progresso</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: discipline.color 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Meta: {discipline.targetHours}h | Estudado: {(discipline.totalStudyTime / (1000 * 60 * 60)).toFixed(1)}h
                  </div>
                </div>
              )}

              {/* Tópicos de Estudo */}
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <HiBookOpen className="w-4 h-4 mr-2" />
                  Tópicos de Estudo ({discipline.content.length})
                </h4>
                <div className="space-y-2">
                  {discipline.content.slice(0, 5).map((content, index) => {
                    // Separar tópico principal de subtópicos (se houver " - " no texto)
                    const parts = content.split(' - ');
                    const mainTopic = parts[0];
                    const subtopic = parts.length > 1 ? parts.slice(1).join(' - ') : null;
                    
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border-l-4" style={{ borderLeftColor: discipline.color }}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <div 
                                className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                                style={{ backgroundColor: discipline.color }}
                              />
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {mainTopic}
                              </span>
                            </div>
                            {subtopic && (
                               <div className="ml-5 text-xs text-gray-600 dark:text-gray-400">
                                 <HiChevronRight className="w-3 h-3 inline mr-1" />
                                 {subtopic}
                               </div>
                             )}
                          </div>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                              Tópico {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {discipline.content.length > 5 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      +{discipline.content.length - 5} tópicos adicionais
                    </div>
                  )}
                </div>
              </div>

              {/* Estatísticas da disciplina */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tempo Total</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getFormattedTime(discipline.totalStudyTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sessões</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {stats.disciplineStats[discipline.id]?.sessions || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
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
          <Button onClick={() => handleOpenModal('create')}>
            <HiPlus className="w-4 h-4 mr-2" />
            Adicionar Disciplina
          </Button>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Header>
          {modalMode === 'create' ? 'Nova Disciplina' : 'Editar Disciplina'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome da Disciplina
              </label>
              <TextInput
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Matemática, Física, História..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prioridade
                </label>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Pausado">Pausado</option>
                  <option value="Concluído">Concluído</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cor da Disciplina
                </label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta de Horas (opcional)
                </label>
                <TextInput
                  type="number"
                  min="0"
                  value={formData.targetHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetHours: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tópicos de Estudo
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Para criar subtópicos, use o formato: "Tópico Principal - Subtópico"
              </p>
              <div className="space-y-2">
                {formData.content.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <TextInput
                      value={item}
                      onChange={(e) => updateContentItem(index, e.target.value)}
                      placeholder={`Ex: Álgebra - Equações do 2º grau`}
                      className="flex-1"
                    />
                    {formData.content.length > 1 && (
                      <Button
                        size="sm"
                        color="failure"
                        onClick={() => removeContentItem(index)}
                      >
                        <HiTrash className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  size="sm"
                  color="gray"
                  onClick={addContentItem}
                >
                  <HiPlus className="w-4 h-4 mr-2" />
                  Adicionar Tópico
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            {modalMode === 'create' ? 'Criar' : 'Salvar'}
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudyTimerList;