import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Textarea, Select } from 'flowbite-react';
import { 
  HiCheckCircle, HiClock, HiExclamationCircle, HiEmojiHappy, 
  HiLightBulb, HiCalendar, HiPlus 
} from 'react-icons/hi';
import { DailyStandup as DailyStandupType, DailyBlocker, CycleItem, BacklogItem } from '../../../types/planning';

interface DailyStandupProps {
  currentCycleId?: string;
  cycleItems: CycleItem[];
  backlogItems: BacklogItem[];
  todayStandup?: DailyStandupType;
  recentStandups: DailyStandupType[];
  onSaveStandup: (standup: Omit<DailyStandupType, 'id' | 'createdAt'>) => void;
  onUpdateStandup: (standupId: string, updates: Partial<DailyStandupType>) => void;
}

const DailyStandup: React.FC<DailyStandupProps> = ({
  currentCycleId,
  cycleItems,
  backlogItems,
  todayStandup,
  recentStandups,
  onSaveStandup,
  onUpdateStandup
}) => {
  const [showStandupModal, setShowStandupModal] = useState(false);
  const [showBlockerModal, setShowBlockerModal] = useState(false);
  
  // Formulário do standup
  const [standupForm, setStandupForm] = useState({
    studiedYesterday: [] as string[],
    planToStudyToday: [] as string[],
    blockers: [] as DailyBlocker[],
    mood: 'neutro' as DailyStandupType['mood'],
    energyLevel: 'neutro' as DailyStandupType['energyLevel'],
    notes: ''
  });

  // Formulário de bloqueio
  const [blockerForm, setBlockerForm] = useState({
    description: '',
    type: 'tecnico' as DailyBlocker['type'],
    severity: 'media' as DailyBlocker['severity'],
    solution: ''
  });

  // Inicializa formulário com dados existentes
  useEffect(() => {
    if (todayStandup) {
      setStandupForm({
        studiedYesterday: todayStandup.studiedYesterday,
        planToStudyToday: todayStandup.planToStudyToday,
        blockers: todayStandup.blockers,
        mood: todayStandup.mood,
        energyLevel: todayStandup.energyLevel,
        notes: todayStandup.notes || ''
      });
    }
  }, [todayStandup]);

  // Encontra dados do backlog para um item
  const getBacklogData = (backlogItemId: string): BacklogItem | undefined => {
    return backlogItems.find(item => item.id === backlogItemId);
  };

  // Encontra item do ciclo
  const getCycleItem = (itemId: string): CycleItem | undefined => {
    return cycleItems.find(item => item.id === itemId);
  };

  // Calcula estatísticas dos standups recentes
  const getStandupStats = () => {
    if (recentStandups.length === 0) return null;

    const last7Days = recentStandups.slice(-7);
    const totalDays = last7Days.length;
    
    const moodAverage = last7Days.reduce((sum, standup) => {
      const moodValue = {
        'muito_baixo': 1, 'baixo': 2, 'neutro': 3, 'alto': 4, 'muito_alto': 5
      }[standup.mood];
      return sum + moodValue;
    }, 0) / totalDays;

    const energyAverage = last7Days.reduce((sum, standup) => {
      const energyValue = {
        'muito_baixo': 1, 'baixo': 2, 'neutro': 3, 'alto': 4, 'muito_alto': 5
      }[standup.energyLevel];
      return sum + energyValue;
    }, 0) / totalDays;

    const totalBlockers = last7Days.reduce((sum, standup) => sum + standup.blockers.length, 0);
    const resolvedBlockers = last7Days.reduce((sum, standup) => 
      sum + standup.blockers.filter(b => b.resolvedAt).length, 0
    );

    return {
      totalDays,
      moodAverage,
      energyAverage,
      totalBlockers,
      resolvedBlockers,
      blockerResolutionRate: totalBlockers > 0 ? (resolvedBlockers / totalBlockers) * 100 : 0
    };
  };

  const stats = getStandupStats();

  // Handlers
  const handleSaveStandup = () => {
    if (!currentCycleId) return;

    const standupData = {
      cycleId: currentCycleId,
      date: new Date().toISOString().split('T')[0],
      ...standupForm
    };

    if (todayStandup) {
      onUpdateStandup(todayStandup.id, standupData);
    } else {
      onSaveStandup(standupData);
    }

    setShowStandupModal(false);
  };

  const handleAddBlocker = () => {
    const newBlocker: DailyBlocker = {
      id: Date.now().toString(),
      ...blockerForm
    };

    setStandupForm(prev => ({
      ...prev,
      blockers: [...prev.blockers, newBlocker]
    }));

    setBlockerForm({
      description: '',
      type: 'tecnico',
      severity: 'media',
      solution: ''
    });

    setShowBlockerModal(false);
  };

  const handleRemoveBlocker = (blockerId: string) => {
    setStandupForm(prev => ({
      ...prev,
      blockers: prev.blockers.filter(b => b.id !== blockerId)
    }));
  };

  const handleToggleItemSelection = (itemId: string, field: 'studiedYesterday' | 'planToStudyToday') => {
    setStandupForm(prev => ({
      ...prev,
      [field]: prev[field].includes(itemId)
        ? prev[field].filter(id => id !== itemId)
        : [...prev[field], itemId]
    }));
  };

  // Componentes de UI
  const MoodIcon = ({ mood }: { mood: DailyStandupType['mood'] }) => {
    const icons = {
      'muito_baixo': '😞', 'baixo': '😕', 'neutro': '😐', 'alto': '😊', 'muito_alto': '😄'
    };
    return <span className="text-2xl">{icons[mood]}</span>;
  };

  const EnergyIcon = ({ energy }: { energy: DailyStandupType['energyLevel'] }) => {
    const colors = {
      'muito_baixo': 'text-red-500', 'baixo': 'text-orange-500', 'neutro': 'text-yellow-500', 
      'alto': 'text-green-500', 'muito_alto': 'text-blue-500'
    };
    return <HiLightBulb className={`h-6 w-6 ${colors[energy]}`} />;
  };

  // const _today = new Date().toISOString().split('T')[0];
  const hasStandupToday = !!todayStandup;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Standup</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check-in diário para acompanhar seu progresso
          </p>
        </div>
        <Button
          color={hasStandupToday ? 'gray' : 'blue'}
          onClick={() => setShowStandupModal(true)}
        >
          <HiCalendar className="mr-2 h-4 w-4" />
          {hasStandupToday ? 'Editar Standup de Hoje' : 'Fazer Standup de Hoje'}
        </Button>
      </div>

      {/* Estatísticas dos últimos 7 dias */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <HiCalendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Dias Ativos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDays}/7</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <HiEmojiHappy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Humor Médio</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.moodAverage.toFixed(1)}/5
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <HiLightBulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Energia Média</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.energyAverage.toFixed(1)}/5
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <HiExclamationCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bloqueios Resolvidos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.blockerResolutionRate.toFixed(0)}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Standup de Hoje */}
      {hasStandupToday && todayStandup && (
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Standup de Hoje ({new Date().toLocaleDateString()})
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Humor:</span>
                <MoodIcon mood={todayStandup.mood} />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Energia:</span>
                <EnergyIcon energy={todayStandup.energyLevel} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* O que estudei ontem */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                O que estudei ontem ({todayStandup.studiedYesterday.length} itens)
              </h4>
              <div className="space-y-2">
                {todayStandup.studiedYesterday.map(itemId => {
                  const cycleItem = getCycleItem(itemId);
                  const backlogData = cycleItem ? getBacklogData(cycleItem.backlogItemId) : null;
                  return backlogData ? (
                    <div key={itemId} className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        {backlogData.title}
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        {backlogData.discipline} • {backlogData.contentType}
                      </p>
                    </div>
                  ) : null;
                })}
                {todayStandup.studiedYesterday.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Nenhum item estudado ontem
                  </p>
                )}
              </div>
            </div>

            {/* O que vou estudar hoje */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiClock className="h-5 w-5 text-blue-600 mr-2" />
                O que vou estudar hoje ({todayStandup.planToStudyToday.length} itens)
              </h4>
              <div className="space-y-2">
                {todayStandup.planToStudyToday.map(itemId => {
                  const cycleItem = getCycleItem(itemId);
                  const backlogData = cycleItem ? getBacklogData(cycleItem.backlogItemId) : null;
                  return backlogData ? (
                    <div key={itemId} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        {backlogData.title}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {backlogData.discipline} • {backlogData.contentType} • {backlogData.estimatedHours}h
                      </p>
                    </div>
                  ) : null;
                })}
                {todayStandup.planToStudyToday.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Nenhum item planejado para hoje
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bloqueios */}
          {todayStandup.blockers.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiExclamationCircle className="h-5 w-5 text-red-600 mr-2" />
                Bloqueios Identificados ({todayStandup.blockers.length})
              </h4>
              <div className="space-y-2">
                {todayStandup.blockers.map(blocker => (
                  <div key={blocker.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-400">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-900 dark:text-red-100">
                          {blocker.description}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge color="red" size="xs">{blocker.type}</Badge>
                          <Badge 
                            color={blocker.severity === 'critica' ? 'red' : 
                                   blocker.severity === 'alta' ? 'orange' : 
                                   blocker.severity === 'media' ? 'yellow' : 'gray'}
                            size="xs"
                          >
                            {blocker.severity}
                          </Badge>
                          {blocker.resolvedAt && (
                            <Badge color="green" size="xs">Resolvido</Badge>
                          )}
                        </div>
                        {blocker.solution && (
                          <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                            <strong>Solução:</strong> {blocker.solution}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notas */}
          {todayStandup.notes && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Observações</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                {todayStandup.notes}
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Histórico dos últimos standups */}
      {recentStandups.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Histórico dos Últimos Standups
          </h3>
          <div className="space-y-3">
            {recentStandups.slice(-5).reverse().map(standup => (
              <div key={standup.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(standup.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {standup.studiedYesterday.length} estudados • {standup.planToStudyToday.length} planejados
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <MoodIcon mood={standup.mood} />
                  </div>
                  <div className="flex items-center">
                    <EnergyIcon energy={standup.energyLevel} />
                  </div>
                  {standup.blockers.length > 0 && (
                    <Badge color="red" size="xs">
                      {standup.blockers.length} bloqueios
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Modal do Standup */}
      <Modal show={showStandupModal} onClose={() => setShowStandupModal(false)} size="3xl">
        <Modal.Header>
          {hasStandupToday ? 'Editar Standup de Hoje' : 'Daily Standup - Check-in Diário'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* Seleção de itens estudados ontem */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                O que você estudou ontem?
              </h4>
              <div className="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-3">
                {cycleItems.filter(item => item.status === 'concluido').map(item => {
                  const backlogData = getBacklogData(item.backlogItemId);
                  return backlogData ? (
                    <div key={item.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`yesterday-${item.id}`}
                        checked={standupForm.studiedYesterday.includes(item.id)}
                        onChange={(_e) => handleToggleItemSelection(item.id, 'studiedYesterday')}
                        className="mr-3"
                      />
                      <label htmlFor={`yesterday-${item.id}`} className="flex-1 cursor-pointer text-sm">
                        {backlogData.title} ({backlogData.discipline})
                      </label>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Seleção de itens para estudar hoje */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                O que você planeja estudar hoje?
              </h4>
              <div className="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-3">
                {cycleItems.filter(item => ['pendente', 'em_andamento'].includes(item.status)).map(item => {
                  const backlogData = getBacklogData(item.backlogItemId);
                  return backlogData ? (
                    <div key={item.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`today-${item.id}`}
                        checked={standupForm.planToStudyToday.includes(item.id)}
                        onChange={(_e) => handleToggleItemSelection(item.id, 'planToStudyToday')}
                        className="mr-3"
                      />
                      <label htmlFor={`today-${item.id}`} className="flex-1 cursor-pointer text-sm">
                        {backlogData.title} ({backlogData.discipline}) - {backlogData.estimatedHours}h
                      </label>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Humor e Energia */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Como está seu humor hoje?
                </label>
                <Select
                  value={standupForm.mood}
                  onChange={(e) => setStandupForm(prev => ({ ...prev, mood: e.target.value as DailyStandupType['mood'] }))}
                >
                  <option value="muito_baixo">😞 Muito Baixo</option>
                  <option value="baixo">😕 Baixo</option>
                  <option value="neutro">😐 Neutro</option>
                  <option value="alto">😊 Alto</option>
                  <option value="muito_alto">😄 Muito Alto</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Como está seu nível de energia?
                </label>
                <Select
                  value={standupForm.energyLevel}
                  onChange={(e) => setStandupForm(prev => ({ ...prev, energyLevel: e.target.value as DailyStandupType['energyLevel'] }))}
                >
                  <option value="muito_baixo">🔋 Muito Baixo</option>
                  <option value="baixo">🔋 Baixo</option>
                  <option value="neutro">🔋 Neutro</option>
                  <option value="alto">🔋 Alto</option>
                  <option value="muito_alto">🔋 Muito Alto</option>
                </Select>
              </div>
            </div>

            {/* Bloqueios */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Há algum bloqueio ou dificuldade?
                </h4>
                <Button
                  size="xs"
                  color="red"
                  onClick={() => setShowBlockerModal(true)}
                >
                  <HiPlus className="mr-1 h-3 w-3" />
                  Adicionar Bloqueio
                </Button>
              </div>
              {standupForm.blockers.length > 0 && (
                <div className="space-y-2">
                  {standupForm.blockers.map(blocker => (
                    <div key={blocker.id} className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <div>
                        <p className="text-sm font-medium text-red-900 dark:text-red-100">
                          {blocker.description}
                        </p>
                        <div className="flex gap-1 mt-1">
                          <Badge color="red" size="xs">{blocker.type}</Badge>
                          <Badge color="orange" size="xs">{blocker.severity}</Badge>
                        </div>
                      </div>
                      <Button
                        size="xs"
                        color="red"
                        onClick={() => handleRemoveBlocker(blocker.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Observações adicionais (opcional)
              </label>
              <Textarea
                value={standupForm.notes}
                onChange={(e) => setStandupForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Alguma observação sobre seu dia de estudos..."
                rows={3}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowStandupModal(false)}>
            Cancelar
          </Button>
          <Button color="blue" onClick={handleSaveStandup}>
            {hasStandupToday ? 'Atualizar Standup' : 'Salvar Standup'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Bloqueio */}
      <Modal show={showBlockerModal} onClose={() => setShowBlockerModal(false)}>
        <Modal.Header>Adicionar Bloqueio</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição do bloqueio
              </label>
              <Textarea
                value={blockerForm.description}
                onChange={(e) => setBlockerForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o que está impedindo seu progresso..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo do bloqueio
                </label>
                <Select
                  value={blockerForm.type}
                  onChange={(e) => setBlockerForm(prev => ({ ...prev, type: e.target.value as DailyBlocker['type'] }))}
                >
                  <option value="tecnico">Técnico</option>
                  <option value="motivacional">Motivacional</option>
                  <option value="tempo">Falta de Tempo</option>
                  <option value="recurso">Falta de Recurso</option>
                  <option value="saude">Saúde</option>
                  <option value="outro">Outro</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Severidade
                </label>
                <Select
                  value={blockerForm.severity}
                  onChange={(e) => setBlockerForm(prev => ({ ...prev, severity: e.target.value as DailyBlocker['severity'] }))}
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Possível solução (opcional)
              </label>
              <Textarea
                value={blockerForm.solution}
                onChange={(e) => setBlockerForm(prev => ({ ...prev, solution: e.target.value }))}
                placeholder="Como você pretende resolver este bloqueio?"
                rows={2}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowBlockerModal(false)}>
            Cancelar
          </Button>
          <Button 
            color="red" 
            onClick={handleAddBlocker}
            disabled={!blockerForm.description}
          >
            Adicionar Bloqueio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DailyStandup;