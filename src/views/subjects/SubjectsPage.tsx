import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Progress, Dropdown, Modal, TextInput, Textarea, Select } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiPlus, HiDotsVertical, HiPencil, HiTrash, HiEye, HiClock, HiAcademicCap, HiTrendingUp, HiSearch } from 'react-icons/hi';
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Disciplinas</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie suas disciplinas e acompanhe o progresso de cada uma
          </p>
        </div>
        <Button onClick={() => handleOpenModal('create')} className="bg-primary hover:bg-primaryemphasis">
          <HiPlus className="mr-2 h-4 w-4" />
          Nova Disciplina
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <HiAcademicCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <HiTrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <HiClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Em Andamento</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <HiClock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Horas Totais</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <TextInput
              placeholder="Buscar disciplinas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={HiSearch}
            />
          </div>
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
      </Card>

      {/* Lista de Disciplinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-${subject.color}-100 dark:bg-${subject.color}-900`}>
                  <Icon icon={subject.icon} className={`h-6 w-6 text-${subject.color}-600 dark:text-${subject.color}-400`} />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {subject.name}
                  </h3>
                  {subject.code && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{subject.code}</p>
                  )}
                </div>
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

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge color={getStatusColor(subject.progress)}>
                  {getStatusText(subject.progress)}
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {subject.progress}%
                </span>
              </div>

              <Progress progress={subject.progress} color={subject.color} />

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{subject.completedHours}h / {subject.totalHours}h</span>
                <span>{subject.topics.length} tópicos</span>
              </div>

              <div className="flex gap-2">
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
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {subject.description}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <HiAcademicCap className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Nenhuma disciplina encontrada
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tente ajustar os filtros ou criar uma nova disciplina.
            </p>
          </div>
        </Card>
      )}

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Header>
          {modalMode === 'create' ? 'Nova Disciplina' : 
           modalMode === 'edit' ? 'Editar Disciplina' : 'Detalhes da Disciplina'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome da Disciplina
              </label>
              <TextInput
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Matemática Avançada"
                disabled={modalMode === 'view'}
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
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dificuldade
                </label>
                <Select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                  disabled={modalMode === 'view'}
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
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cor
                </label>
                <Select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  disabled={modalMode === 'view'}
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
          <Modal.Footer>
            <Button onClick={handleSave} className="bg-primary hover:bg-primaryemphasis">
              {modalMode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default SubjectsPage;