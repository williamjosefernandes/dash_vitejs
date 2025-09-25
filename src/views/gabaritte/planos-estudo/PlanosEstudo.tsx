import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, TextInput, Label, Select, Textarea } from 'flowbite-react';

const PlanosEstudo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Dados simulados dos planos de estudo
  const studyPlans = [
    {
      id: 1,
      title: 'Preparação ENEM 2024',
      description: 'Plano completo para preparação do ENEM com foco em Matemática e Ciências da Natureza',
      subjects: ['Matemática', 'Física', 'Química', 'Biologia'],
      duration: '6 meses',
      progress: 65,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      dailyHours: 4,
      weeklyGoal: 28
    },
    {
      id: 2,
      title: 'Vestibular Medicina',
      description: 'Preparação intensiva para vestibular de Medicina com ênfase em Biologia e Química',
      subjects: ['Biologia', 'Química', 'Física', 'Matemática', 'Português'],
      duration: '12 meses',
      progress: 30,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      dailyHours: 6,
      weeklyGoal: 42
    },
    {
      id: 3,
      title: 'Concurso Público',
      description: 'Preparação para concursos públicos com foco em Direito Administrativo e Constitucional',
      subjects: ['Direito Administrativo', 'Direito Constitucional', 'Português', 'Matemática'],
      duration: '8 meses',
      progress: 85,
      status: 'completed',
      startDate: '2023-08-01',
      endDate: '2024-04-01',
      dailyHours: 5,
      weeklyGoal: 35
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
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      case 'paused': return 'Pausado';
      default: return 'Inativo';
    }
  };

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setShowModal(true);
  };

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Planos de Estudo 📚
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Gerencie seus planos de estudo personalizados e acompanhe seu progresso
            </p>
          </div>
          <Button color="primary" onClick={handleCreatePlan}>
            <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
            Novo Plano
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas dos Planos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:document-text-bold-duotone" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3</h3>
          <p className="text-gray-600 dark:text-gray-300">Planos Criados</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:play-circle-bold-duotone" className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
          <p className="text-gray-600 dark:text-gray-300">Planos Ativos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:check-circle-bold-duotone" className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1</h3>
          <p className="text-gray-600 dark:text-gray-300">Planos Concluídos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:chart-2-bold-duotone" className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">60%</h3>
          <p className="text-gray-600 dark:text-gray-300">Progresso Médio</p>
        </CardBox>
      </div>

      {/* Lista de Planos */}
      <TitleCard title="Meus Planos de Estudo">
        <div className="space-y-4">
          {studyPlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.title}</h3>
                    <Badge color={`light${getStatusColor(plan.status)}`} className={`text-${getStatusColor(plan.status)}`}>
                      {getStatusText(plan.status)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{plan.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Duração: {plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{plan.dailyHours}h/dia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:target-bold-duotone" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{plan.weeklyGoal}h/semana</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:book-2-bold-duotone" className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{plan.subjects.length} disciplinas</span>
                    </div>
                  </div>

                  {/* Disciplinas */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plan.subjects.map((subject, index) => (
                      <Badge key={index} color="lightgray" className="text-gray-700">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  {/* Progresso */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm" color="primary" onClick={() => handleEditPlan(plan)}>
                    <Icon icon="solar:pen-new-square-bold-duotone" className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" color="secondary">
                    <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                    Visualizar
                  </Button>
                  {plan.status === 'active' && (
                    <Button size="sm" color="warning">
                      <Icon icon="solar:pause-circle-bold-duotone" className="w-4 h-4 mr-1" />
                      Pausar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TitleCard>

      {/* Modal para Criar/Editar Plano */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="2xl">
        <Modal.Header>
          {selectedPlan ? 'Editar Plano de Estudo' : 'Criar Novo Plano de Estudo'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" value="Título do Plano" />
              <TextInput
                id="title"
                placeholder="Ex: Preparação ENEM 2024"
                defaultValue={selectedPlan?.title || ''}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" value="Descrição" />
              <Textarea
                id="description"
                placeholder="Descreva os objetivos e foco do seu plano de estudo"
                rows={3}
                defaultValue={selectedPlan?.description || ''}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" value="Duração" />
                <Select id="duration" className="mt-1">
                  <option>3 meses</option>
                  <option>6 meses</option>
                  <option>12 meses</option>
                  <option>18 meses</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="dailyHours" value="Horas Diárias" />
                <Select id="dailyHours" className="mt-1">
                  <option>2 horas</option>
                  <option>4 horas</option>
                  <option>6 horas</option>
                  <option>8 horas</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" value="Data de Início" />
                <TextInput
                  id="startDate"
                  type="date"
                  defaultValue={selectedPlan?.startDate || ''}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="endDate" value="Data de Término" />
                <TextInput
                  id="endDate"
                  type="date"
                  defaultValue={selectedPlan?.endDate || ''}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label value="Disciplinas" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {['Matemática', 'Física', 'Química', 'Biologia', 'Português', 'História', 'Geografia', 'Inglês'].map((subject) => (
                  <label key={subject} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={selectedPlan?.subjects?.includes(subject)}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            {selectedPlan ? 'Salvar Alterações' : 'Criar Plano'}
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlanosEstudo;