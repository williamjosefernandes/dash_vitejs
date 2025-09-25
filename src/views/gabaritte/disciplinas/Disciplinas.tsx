import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Progress, TextInput, Select, Modal, Label } from 'flowbite-react';

const Disciplinas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<any>(null);

  // Dados simulados das disciplinas
  const disciplines = [
    {
      id: 1,
      name: 'Matemática',
      code: 'MAT001',
      professor: 'Prof. João Silva',
      category: 'Exatas',
      progress: 75,
      status: 'active',
      totalHours: 120,
      completedHours: 90,
      nextClass: '2024-09-26 14:00',
      grade: 8.5,
      attendance: 95,
      color: 'blue',
      icon: 'solar:calculator-bold-duotone'
    },
    {
      id: 2,
      name: 'Física',
      code: 'FIS001',
      professor: 'Prof. Maria Santos',
      category: 'Exatas',
      progress: 60,
      status: 'active',
      totalHours: 100,
      completedHours: 60,
      nextClass: '2024-09-27 10:00',
      grade: 7.8,
      attendance: 88,
      color: 'green',
      icon: 'solar:atom-bold-duotone'
    },
    {
      id: 3,
      name: 'Química',
      code: 'QUI001',
      professor: 'Prof. Carlos Lima',
      category: 'Exatas',
      progress: 85,
      status: 'active',
      totalHours: 80,
      completedHours: 68,
      nextClass: '2024-09-26 16:00',
      grade: 9.2,
      attendance: 92,
      color: 'purple',
      icon: 'solar:test-tube-bold-duotone'
    },
    {
      id: 4,
      name: 'Biologia',
      code: 'BIO001',
      professor: 'Prof. Ana Costa',
      category: 'Biológicas',
      progress: 45,
      status: 'active',
      totalHours: 90,
      completedHours: 40,
      nextClass: '2024-09-28 09:00',
      grade: 7.5,
      attendance: 85,
      color: 'emerald',
      icon: 'solar:dna-bold-duotone'
    },
    {
      id: 5,
      name: 'Português',
      code: 'POR001',
      professor: 'Prof. Lucia Oliveira',
      category: 'Humanas',
      progress: 100,
      status: 'completed',
      totalHours: 60,
      completedHours: 60,
      nextClass: null,
      grade: 9.5,
      attendance: 98,
      color: 'orange',
      icon: 'solar:book-2-bold-duotone'
    },
    {
      id: 6,
      name: 'História',
      code: 'HIS001',
      professor: 'Prof. Roberto Alves',
      category: 'Humanas',
      progress: 30,
      status: 'paused',
      totalHours: 70,
      completedHours: 21,
      nextClass: null,
      grade: 6.8,
      attendance: 75,
      color: 'amber',
      icon: 'solar:history-bold-duotone'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'paused': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'completed': return 'Concluída';
      case 'paused': return 'Pausada';
      default: return 'Inativa';
    }
  };

  const filteredDisciplines = disciplines.filter(discipline => {
    const matchesSearch = discipline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discipline.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discipline.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || discipline.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: disciplines.length,
    active: disciplines.filter(d => d.status === 'active').length,
    completed: disciplines.filter(d => d.status === 'completed').length,
    paused: disciplines.filter(d => d.status === 'paused').length,
    averageGrade: (disciplines.reduce((sum, d) => sum + d.grade, 0) / disciplines.length).toFixed(1),
    averageProgress: Math.round(disciplines.reduce((sum, d) => sum + d.progress, 0) / disciplines.length)
  };

  const handleViewDetails = (discipline: any) => {
    setSelectedDiscipline(discipline);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Disciplinas 📖
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Acompanhe o progresso de todas as suas disciplinas matriculadas
            </p>
          </div>
          <Button color="primary">
            <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
            Nova Disciplina
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:book-2-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:play-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.active}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Ativas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.completed}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Concluídas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:pause-circle-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.paused}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Pausadas</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageGrade}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Nota Média</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:chart-2-bold-duotone" className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageProgress}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Progresso</p>
        </CardBox>
      </div>

      {/* Filtros */}
      <CardBox>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <TextInput
              icon={Icon}
              placeholder="Buscar disciplinas, professores ou códigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Todas as disciplinas</option>
              <option value="active">Ativas</option>
              <option value="completed">Concluídas</option>
              <option value="paused">Pausadas</option>
            </Select>
          </div>
        </div>
      </CardBox>

      {/* Lista de Disciplinas */}
      <TitleCard title="Minhas Disciplinas">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDisciplines.map((discipline) => (
            <div key={discipline.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-12 h-12 bg-${discipline.color}-100 dark:bg-${discipline.color}-900 rounded-lg`}>
                    <Icon icon={discipline.icon} className={`w-6 h-6 text-${discipline.color}-600 dark:text-${discipline.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{discipline.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{discipline.code}</p>
                  </div>
                </div>
                <Badge color={`light${getStatusColor(discipline.status)}`} className={`text-${getStatusColor(discipline.status)}`}>
                  {getStatusText(discipline.status)}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:user-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{discipline.professor}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon icon="solar:tag-bold-duotone" className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{discipline.category}</span>
                </div>

                {discipline.nextClass && (
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Próxima aula: {new Date(discipline.nextClass).toLocaleDateString('pt-BR')} às {new Date(discipline.nextClass).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>

              {/* Progresso */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{discipline.completedHours}/{discipline.totalHours}h</span>
                </div>
                <Progress progress={discipline.progress} color={discipline.color} size="sm" />
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{discipline.grade}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Nota</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{discipline.attendance}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Presença</div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button size="sm" color="primary" onClick={() => handleViewDetails(discipline)} className="flex-1">
                  <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                  Detalhes
                </Button>
                <Button size="sm" color="secondary" className="flex-1">
                  <Icon icon="solar:book-2-bold-duotone" className="w-4 h-4 mr-1" />
                  Estudar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TitleCard>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Header>
          Detalhes da Disciplina: {selectedDiscipline?.name}
        </Modal.Header>
        <Modal.Body>
          {selectedDiscipline && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label value="Informações Gerais" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Código:</strong> {selectedDiscipline.code}</div>
                    <div><strong>Professor:</strong> {selectedDiscipline.professor}</div>
                    <div><strong>Categoria:</strong> {selectedDiscipline.category}</div>
                    <div><strong>Status:</strong> {getStatusText(selectedDiscipline.status)}</div>
                  </div>
                </div>

                <div>
                  <Label value="Métricas de Desempenho" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Nota Atual:</strong> {selectedDiscipline.grade}</div>
                    <div><strong>Frequência:</strong> {selectedDiscipline.attendance}%</div>
                    <div><strong>Horas Concluídas:</strong> {selectedDiscipline.completedHours}h</div>
                    <div><strong>Total de Horas:</strong> {selectedDiscipline.totalHours}h</div>
                  </div>
                </div>
              </div>

              <div>
                <Label value="Progresso da Disciplina" className="text-lg font-semibold mb-3 block" />
                <Progress progress={selectedDiscipline.progress} color={selectedDiscipline.color} size="lg" />
                <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {selectedDiscipline.progress}% concluído
                </div>
              </div>

              {selectedDiscipline.nextClass && (
                <div>
                  <Label value="Próxima Aula" className="text-lg font-semibold mb-3 block" />
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium">
                        {new Date(selectedDiscipline.nextClass).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} às {new Date(selectedDiscipline.nextClass).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            <Icon icon="solar:book-2-bold-duotone" className="w-4 h-4 mr-2" />
            Iniciar Estudo
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Disciplinas;