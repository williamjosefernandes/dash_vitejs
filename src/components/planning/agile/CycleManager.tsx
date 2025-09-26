import React, { useState } from 'react';
import { Card, Button, Badge, Modal, TextInput, Textarea, Select, Progress } from 'flowbite-react';
import { 
  HiPlus, HiPlay, HiStop, HiRefresh, HiCalendar, HiClock, 
  HiTrendingUp, HiCheckCircle 
} from 'react-icons/hi';
import { StudyCycle, CycleMetrics, BacklogItem } from '../../../types/planning';

interface CycleManagerProps {
  currentCycle?: StudyCycle;
  cycleMetrics: CycleMetrics;
  availableBacklogItems: BacklogItem[];
  onCreateCycle: (cycleData: Partial<StudyCycle>) => void;
  onStartCycle: (cycleId: string) => void;
  onFinishCycle: (cycleId: string) => void;
  onCancelCycle: (cycleId: string) => void;
}

const CycleManager: React.FC<CycleManagerProps> = ({
  currentCycle,
  cycleMetrics,
  availableBacklogItems,
  onCreateCycle,
  onStartCycle,
  onFinishCycle,
  onCancelCycle
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  
  // Formulário de criação de ciclo
  const [cycleForm, setCycleForm] = useState({
    name: '',
    description: '',
    goal: '',
    duration: 7,
    selectedItems: [] as string[]
  });

  // Calcula estatísticas do ciclo atual
  const getCurrentCycleStats = () => {
    if (!currentCycle) return null;

    const totalItems = currentCycle.items.length;
    const completedItems = currentCycle.items.filter(item => item.status === 'concluido').length;
    const inProgressItems = currentCycle.items.filter(item => item.status === 'em_andamento').length;
    const blockedItems = currentCycle.items.filter(item => item.status === 'bloqueado').length;
    
    const daysElapsed = Math.ceil(
      (new Date().getTime() - new Date(currentCycle.startDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysRemaining = Math.max(0, currentCycle.duration - daysElapsed);
    
    return {
      totalItems,
      completedItems,
      inProgressItems,
      blockedItems,
      daysElapsed,
      daysRemaining,
      completionRate: totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
      hoursCompletionRate: currentCycle.totalEstimatedHours > 0 
        ? (currentCycle.totalCompletedHours / currentCycle.totalEstimatedHours) * 100 
        : 0
    };
  };

  const stats = getCurrentCycleStats();

  // Handlers
  const handleCreateCycle = () => {
    const estimatedHours = cycleForm.selectedItems.reduce((total, itemId) => {
      const item = availableBacklogItems.find(b => b.id === itemId);
      return total + (item?.estimatedHours || 0);
    }, 0);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + cycleForm.duration);

    onCreateCycle({
      name: cycleForm.name,
      description: cycleForm.description,
      goal: cycleForm.goal,
      duration: cycleForm.duration,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalEstimatedHours: estimatedHours,
      status: 'planejamento'
    });

    // Reset form
    setCycleForm({
      name: '',
      description: '',
      goal: '',
      duration: 7,
      selectedItems: []
    });
    setShowCreateModal(false);
  };

  const handleItemSelection = (itemId: string, selected: boolean) => {
    setCycleForm(prev => ({
      ...prev,
      selectedItems: selected 
        ? [...prev.selectedItems, itemId]
        : prev.selectedItems.filter(id => id !== itemId)
    }));
  };

  const getStatusColor = (status: StudyCycle['status']) => {
    switch (status) {
      case 'planejamento': return 'gray';
      case 'ativo': return 'blue';
      case 'concluido': return 'green';
      case 'cancelado': return 'red';
      default: return 'gray';
    }
  };

  // const getStatusIcon = (status: StudyCycle['status']) => {
  //   switch (status) {
  //     case 'planejamento': return HiCalendar;
  //     case 'ativo': return HiPlay;
  //     case 'concluido': return HiCheckCircle;
  //     case 'cancelado': return HiExclamationCircle;
  //     default: return HiCalendar;
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Header com métricas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <HiRefresh className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Ciclos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{cycleMetrics.totalCycles}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <HiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{cycleMetrics.completedCycles}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <HiTrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Média de Conclusão</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {cycleMetrics.averageCycleCompletion.toFixed(0)}%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
              <HiClock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Streak Atual</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {cycleMetrics.currentStreak} dias
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ciclo Atual */}
      {currentCycle ? (
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mr-3">
                  {currentCycle.name}
                </h2>
                <Badge color={getStatusColor(currentCycle.status)} size="sm">
                  {currentCycle.status}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {currentCycle.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <HiCalendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(currentCycle.startDate).toLocaleDateString()} - {' '}
                  {new Date(currentCycle.endDate).toLocaleDateString()}
                </span>
                {stats && (
                  <span className="ml-4">
                    {stats.daysRemaining > 0 ? `${stats.daysRemaining} dias restantes` : 'Prazo vencido'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {currentCycle.status === 'planejamento' && (
                <Button
                  color="blue"
                  onClick={() => onStartCycle(currentCycle.id)}
                >
                  <HiPlay className="mr-2 h-4 w-4" />
                  Iniciar Ciclo
                </Button>
              )}
              {currentCycle.status === 'ativo' && (
                <Button
                  color="green"
                  onClick={() => setShowFinishModal(true)}
                >
                  <HiCheckCircle className="mr-2 h-4 w-4" />
                  Finalizar Ciclo
                </Button>
              )}
              {(currentCycle.status === 'planejamento' || currentCycle.status === 'ativo') && (
                <Button
                  color="red"
                  onClick={() => onCancelCycle(currentCycle.id)}
                >
                  <HiStop className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              )}
            </div>
          </div>

          {/* Objetivo do Ciclo */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              🎯 Objetivo do Ciclo
            </h4>
            <p className="text-blue-800 dark:text-blue-200">
              {currentCycle.goal}
            </p>
          </div>

          {/* Estatísticas do Ciclo */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedItems}/{stats.totalItems}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Itens Concluídos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.inProgressItems}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Em Andamento</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.blockedItems}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bloqueados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {currentCycle.totalCompletedHours}h
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Horas Estudadas</p>
              </div>
            </div>
          )}

          {/* Barras de Progresso */}
          {stats && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progresso dos Itens</span>
                  <span className="text-gray-900 dark:text-white">{stats.completionRate.toFixed(0)}%</span>
                </div>
                <Progress progress={stats.completionRate} color="blue" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progresso das Horas</span>
                  <span className="text-gray-900 dark:text-white">{stats.hoursCompletionRate.toFixed(0)}%</span>
                </div>
                <Progress progress={stats.hoursCompletionRate} color="green" />
              </div>
            </div>
          )}
        </Card>
      ) : (
        /* Sem Ciclo Ativo */
        <Card>
          <div className="text-center py-8">
            <HiCalendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhum Ciclo Ativo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Crie um novo ciclo para começar a organizar seus estudos com a metodologia ágil.
            </p>
            <Button
              color="blue"
              onClick={() => setShowCreateModal(true)}
            >
              <HiPlus className="mr-2 h-4 w-4" />
              Criar Primeiro Ciclo
            </Button>
          </div>
        </Card>
      )}

      {/* Botão para criar novo ciclo */}
      {currentCycle?.status === 'concluido' && (
        <div className="text-center">
          <Button
            color="blue"
            size="lg"
            onClick={() => setShowCreateModal(true)}
          >
            <HiPlus className="mr-2 h-5 w-5" />
            Criar Próximo Ciclo
          </Button>
        </div>
      )}

      {/* Modal de Criação de Ciclo */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} size="2xl">
        <Modal.Header>Criar Novo Ciclo de Estudos</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome do Ciclo
              </label>
              <TextInput
                value={cycleForm.name}
                onChange={(e) => setCycleForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Ciclo 1 - Matemática Básica"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição
              </label>
              <Textarea
                value={cycleForm.description}
                onChange={(e) => setCycleForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o foco deste ciclo..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Objetivo Principal
              </label>
              <TextInput
                value={cycleForm.goal}
                onChange={(e) => setCycleForm(prev => ({ ...prev, goal: e.target.value }))}
                placeholder="Ex: Dominar conceitos de álgebra linear"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duração (dias)
              </label>
              <Select
                value={cycleForm.duration}
                onChange={(e) => setCycleForm(prev => ({ ...prev, duration: Number(e.target.value) }))}
              >
                <option value={3}>3 dias</option>
                <option value={5}>5 dias</option>
                <option value={7}>7 dias (recomendado)</option>
                <option value={10}>10 dias</option>
                <option value={14}>14 dias</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selecionar Itens do Backlog ({cycleForm.selectedItems.length} selecionados)
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                {availableBacklogItems.map((item) => (
                  <div key={item.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={cycleForm.selectedItems.includes(item.id)}
                      onChange={(e) => handleItemSelection(item.id, e.target.checked)}
                      className="mr-3"
                    />
                    <label htmlFor={item.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.discipline} • {item.contentType} • {item.estimatedHours}h
                          </p>
                        </div>
                        <Badge 
                          color={item.priority === 'alta' ? 'red' : 
                                 item.priority === 'media' ? 'yellow' : 'gray'}
                          size="xs"
                        >
                          {item.priority}
                        </Badge>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button 
            color="blue" 
            onClick={handleCreateCycle}
            disabled={!cycleForm.name || !cycleForm.goal || cycleForm.selectedItems.length === 0}
          >
            Criar Ciclo
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Finalização de Ciclo */}
      <Modal show={showFinishModal} onClose={() => setShowFinishModal(false)}>
        <Modal.Header>Finalizar Ciclo</Modal.Header>
        <Modal.Body>
          <p className="text-gray-600 dark:text-gray-400">
            Tem certeza que deseja finalizar o ciclo atual? Isso iniciará automaticamente a retrospectiva do ciclo.
          </p>
          {stats && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Resumo:</strong> {stats.completedItems} de {stats.totalItems} itens concluídos 
                ({stats.completionRate.toFixed(0)}% de conclusão)
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowFinishModal(false)}>
            Cancelar
          </Button>
          <Button 
            color="green" 
            onClick={() => {
              if (currentCycle) {
                onFinishCycle(currentCycle.id);
                setShowFinishModal(false);
              }
            }}
          >
            Finalizar Ciclo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CycleManager;