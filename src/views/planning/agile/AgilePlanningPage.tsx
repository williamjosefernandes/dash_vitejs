import React, { useState, useEffect } from 'react';
import { Card, Badge, Tabs, Button } from 'flowbite-react';
import { 
  HiCalendar, HiChartBar, 
  HiViewGrid, HiPlus
} from 'react-icons/hi';
import { useNavigate } from 'react-router';

// Componentes da metodologia ágil
import StudyKanban from '../../../components/planning/agile/StudyKanban';
import CycleManager from '../../../components/planning/agile/CycleManager';
import DailyStandup from '../../../components/planning/agile/DailyStandup';
import CycleRetrospective from '../../../components/planning/agile/CycleRetrospective';

// Tipos
import { 
  StudyCycle, CycleItem, BacklogItem, DailyStandup as DailyStandupType,
  CycleMetrics, CycleRetrospective as CycleRetrospectiveType
} from '../../../types/planning';

const AgilePlanningPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados principais
  const [currentCycle, setCurrentCycle] = useState<StudyCycle | undefined>(undefined);
  const [cycleItems, setCycleItems] = useState<CycleItem[]>([]);
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([]);
  const [standups, setStandups] = useState<DailyStandupType[]>([]);
  const [, setRetrospectives] = useState<CycleRetrospectiveType[]>([]);
  const [cycleMetrics, setCycleMetrics] = useState<CycleMetrics>({
    totalCycles: 0,
    completedCycles: 0,
    averageCycleCompletion: 0,
    totalStudyHours: 0,
    averageHoursPerCycle: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyConsistency: 0,
    monthlyProgress: 0
  });

  // Configurações da metodologia ágil
  // Configurações do sistema ágil (não utilizadas atualmente)
  // const [agileSettings] = useState<AgileStudySettings>({
  //   defaultCycleDuration: 7,
  //   dailyStudyGoal: 4,
  //   enableDailyStandup: true,
  //   standupReminderTime: '09:00',
  //   enableRetrospectiveReminder: true,
  //   autoCreateNextCycle: false,
  //   maxItemsPerCycle: 10,
  //   priorityWeights: {
  //     alta: 3,
  //     media: 2,
  //     baixa: 1
  //   }
  // });

  // Mock data inicial
  useEffect(() => {
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    // Mock backlog items
    const mockBacklogItems: BacklogItem[] = [
      {
        id: 'backlog1',
        title: 'Álgebra Linear - Matrizes e Determinantes',
        description: 'Estudo completo sobre operações com matrizes e cálculo de determinantes',
        discipline: 'Matemática',
        subject: 'Matemática',
        contentType: 'aula',
        type: 'teoria',
        priority: 'alta',
        estimatedHours: 4,
        difficulty: 'medio',
        status: 'pendente',
        tags: ['algebra', 'matrizes', 'determinantes'],
        resources: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'backlog2',
        title: 'Física - Leis de Newton',
        description: 'Revisão das três leis de Newton e aplicações práticas',
        discipline: 'Física',
        subject: 'Física',
        contentType: 'revisao',
        type: 'revisao',
        priority: 'alta',
        estimatedHours: 3,
        difficulty: 'facil',
        status: 'pendente',
        tags: ['newton', 'dinamica', 'forcas'],
        resources: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'backlog3',
        title: 'Química Orgânica - Nomenclatura',
        description: 'Exercícios de nomenclatura de compostos orgânicos',
        discipline: 'Química',
        subject: 'Química',
        contentType: 'questao',
        type: 'exercicio',
        priority: 'media',
        estimatedHours: 2,
        difficulty: 'medio',
        status: 'pendente',
        tags: ['organica', 'nomenclatura'],
        resources: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'backlog4',
        title: 'Simulado ENEM - Matemática',
        description: 'Simulado completo de matemática do ENEM',
        discipline: 'Matemática',
        subject: 'Matemática',
        contentType: 'simulado',
        type: 'simulado',
        priority: 'alta',
        estimatedHours: 2,
        difficulty: 'dificil',
        status: 'pendente',
        tags: ['enem', 'simulado', 'matematica'],
        resources: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Mock cycle (concluído para testar retrospectiva)
    const mockCycle: StudyCycle = {
      id: 'cycle1',
      name: 'Ciclo de Matemática e Física - Sprint 1',
      description: 'Foco em álgebra linear e mecânica clássica',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias atrás
      endDate: new Date().toISOString(), // hoje
      duration: 7,
      status: 'concluido', // Alterado para 'concluido' para testar retrospectiva
      goal: 'Dominar conceitos fundamentais de álgebra linear e revisar leis de Newton',
      items: [
        {
          id: 'item1',
          backlogItemId: 'backlog1',
          cycleId: 'cycle1',
          status: 'concluido',
          position: 0
        },
        {
          id: 'item2',
          backlogItemId: 'backlog2',
          cycleId: 'cycle1',
          status: 'concluido',
          position: 1
        },
        {
          id: 'item3',
          backlogItemId: 'backlog3',
          cycleId: 'cycle1',
          status: 'pendente',
          position: 2
        }
      ],
      totalEstimatedHours: 20,
      totalCompletedHours: 18,
      completionPercentage: 75,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Mock cycle items
    const mockCycleItems: CycleItem[] = [
      {
        id: 'item1',
        backlogItemId: 'backlog1',
        cycleId: 'cycle1',
        status: 'concluido',
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        actualHours: 4.5,
        position: 0
      },
      {
        id: 'item2',
        backlogItemId: 'backlog2',
        cycleId: 'cycle1',
        status: 'em_andamento',
        startedAt: new Date().toISOString(),
        actualHours: 1.5,
        position: 1
      },
      {
        id: 'item3',
        backlogItemId: 'backlog3',
        cycleId: 'cycle1',
        status: 'pendente',
        position: 2
      },
      {
        id: 'item4',
        backlogItemId: 'backlog4',
        cycleId: 'cycle1',
        status: 'pendente',
        position: 3
      }
    ];

    // Mock standup
    const mockStandups: DailyStandupType[] = [
      {
        id: 'standup1',
        cycleId: 'cycle1',
        date: new Date().toISOString().split('T')[0],
        studiedYesterday: ['item1'],
        planToStudyToday: ['item2', 'item3'],
        blockers: [],
        mood: 'alto',
        energyLevel: 'alto',
        notes: 'Dia produtivo, consegui concluir o estudo de matrizes',
        createdAt: new Date().toISOString()
      }
    ];

    // Mock metrics
    const mockMetrics: CycleMetrics = {
      currentCycle: mockCycle,
      totalCycles: 3,
      completedCycles: 2,
      averageCycleCompletion: 85,
      totalStudyHours: 120,
      averageHoursPerCycle: 40,
      currentStreak: 5,
      longestStreak: 12,
      weeklyConsistency: 85,
      monthlyProgress: 75
    };

    setBacklogItems(mockBacklogItems);
    setCurrentCycle(mockCycle);
    setCycleItems(mockCycleItems);
    setStandups(mockStandups);
    setCycleMetrics(mockMetrics);
  };

  // Handlers para o Kanban
  const handleItemMove = (itemId: string, newStatus: CycleItem['status'], newPosition: number) => {
    setCycleItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status: newStatus, position: newPosition }
        : item
    ));
  };

  const handleItemStart = (itemId: string) => {
    setCycleItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status: 'em_andamento', startedAt: new Date().toISOString() }
        : item
    ));
  };

  const handleItemComplete = (itemId: string) => {
    setCycleItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: 'concluido', 
            completedAt: new Date().toISOString(),
            actualHours: (item.actualHours || 0) + 1 // Simula 1h adicional
          }
        : item
    ));
  };

  const handleItemEdit = (itemId: string) => {
    // Implementar edição de item
    console.log('Edit item:', itemId);
  };

  const handleAddItem = () => {
    // Implementar adição de item do backlog
    console.log('Add item from backlog');
  };

  // Handlers para Ciclos
  const handleCreateCycle = (cycleData: Partial<StudyCycle>) => {
    const newCycle: StudyCycle = {
      id: `cycle_${Date.now()}`,
      name: cycleData.name || '',
      description: cycleData.description || '',
      startDate: cycleData.startDate || new Date().toISOString(),
      endDate: cycleData.endDate || new Date().toISOString(),
      duration: cycleData.duration || 7,
      status: 'planejamento',
      goal: cycleData.goal || '',
      items: [],
      totalEstimatedHours: cycleData.totalEstimatedHours || 0,
      totalCompletedHours: 0,
      completionPercentage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setCurrentCycle(newCycle);
  };

  const handleStartCycle = (cycleId: string) => {
    if (currentCycle?.id === cycleId) {
      setCurrentCycle((prev: StudyCycle | undefined) => prev ? { ...prev, status: 'ativo' } : prev);
    }
  };

  const handleFinishCycle = (cycleId: string) => {
    if (currentCycle?.id === cycleId) {
      setCurrentCycle((prev: StudyCycle | undefined) => prev ? { ...prev, status: 'concluido' } : prev);
      // Ciclo finalizado, retrospectiva disponível na aba correspondente
    }
  };

  const handleCancelCycle = (cycleId: string) => {
    if (currentCycle?.id === cycleId) {
      setCurrentCycle((prev: StudyCycle | null) => prev ? { ...prev, status: 'cancelado' } : prev);
    }
  };

  // Handlers para Standup
  const handleSaveStandup = (standup: Omit<DailyStandupType, 'id' | 'createdAt'>) => {
    const newStandup: DailyStandupType = {
      ...standup,
      id: `standup_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setStandups(prev => [...prev, newStandup]);
  };

  const handleUpdateStandup = (standupId: string, updates: Partial<DailyStandupType>) => {
    setStandups(prev => prev.map(standup => 
      standup.id === standupId ? { ...standup, ...updates } : standup
    ));
  };

  // Handlers para Retrospectiva
  const handleSaveRetrospective = (retrospective: Omit<CycleRetrospectiveType, 'id' | 'createdAt'>) => {
    const newRetrospective: CycleRetrospectiveType = {
      ...retrospective,
      id: `retro_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setRetrospectives(prev => [...prev, newRetrospective]);
  };

  const handleCreateNextCycle = () => {
    // Lógica para sugerir próximo ciclo baseado na retrospectiva
  };

  // Standup de hoje
  const todayStandup = standups.find(s => s.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Planejamento Ágil - Metodologia de Ciclos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize seus estudos com a metodologia ágil adaptada para concursos
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Botão para criar novo ciclo */}
          <Button
            color="blue"
            onClick={() => navigate('/planning/create-cycle')}
            className="flex items-center gap-2"
          >
            <HiPlus className="w-4 h-4" />
            Criar Novo Ciclo
          </Button>
          
          {/* Status do ciclo atual */}
          {currentCycle && (
            <div className="flex items-center gap-3">
              <Badge 
                color={
                  currentCycle.status === 'ativo' ? 'blue' :
                  currentCycle.status === 'concluido' ? 'green' :
                  currentCycle.status === 'cancelado' ? 'red' : 'gray'
                }
                size="lg"
              >
                {currentCycle.status}
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentCycle.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentCycle.completionPercentage.toFixed(0)}% concluído
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs de navegação */}
      <Tabs
        aria-label="Metodologia Ágil"
      >
        <Tabs.Item title="Gestão de Ciclos" icon={HiCalendar}>
          <CycleManager
            currentCycle={currentCycle}
            cycleMetrics={cycleMetrics}
            availableBacklogItems={backlogItems}
            onCreateCycle={handleCreateCycle}
            onStartCycle={handleStartCycle}
            onFinishCycle={handleFinishCycle}
            onCancelCycle={handleCancelCycle}
          />
        </Tabs.Item>

        <Tabs.Item title="Quadro Kanban" icon={HiViewGrid}>
          {currentCycle && currentCycle.status === 'ativo' ? (
            <StudyKanban
              cycleItems={cycleItems}
              backlogItems={backlogItems}
              onItemMove={handleItemMove}
              onItemStart={handleItemStart}
              onItemComplete={handleItemComplete}
              onItemEdit={handleItemEdit}
              onAddItem={handleAddItem}
            />
          ) : (
            <div className="text-center py-12">
              <HiViewGrid className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Quadro Kanban Indisponível
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Inicie um ciclo para acessar o quadro Kanban
              </p>
            </div>
          )}
        </Tabs.Item>

        <Tabs.Item title="Daily Standup" icon={HiCalendar}>
          {currentCycle && currentCycle.status === 'ativo' ? (
            <DailyStandup
              currentCycleId={currentCycle.id}
              cycleItems={cycleItems}
              backlogItems={backlogItems}
              todayStandup={todayStandup}
              recentStandups={standups}
              onSaveStandup={handleSaveStandup}
              onUpdateStandup={handleUpdateStandup}
            />
          ) : (
            <div className="text-center py-12">
              <HiCalendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Daily Standup Indisponível
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Inicie um ciclo para fazer o check-in diário
              </p>
            </div>
          )}
        </Tabs.Item>

        <Tabs.Item title="Retrospectiva" icon={HiChartBar}>
          {currentCycle && currentCycle.status === 'concluido' ? (
            <CycleRetrospective
              cycle={currentCycle}
              cycleItems={cycleItems}
              backlogItems={backlogItems}
              standups={standups.filter(s => s.cycleId === currentCycle.id)}
              simulationScores={[75, 82, 78, 85]} // Mock scores
              onSaveRetrospective={handleSaveRetrospective}
              onCreateNextCycle={handleCreateNextCycle}
            />
          ) : (
            <div className="text-center py-12">
              <HiChartBar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Retrospectiva Indisponível
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Finalize um ciclo para acessar a retrospectiva
              </p>
            </div>
          )}
        </Tabs.Item>
      </Tabs>

      {/* Quick Stats */}
      {currentCycle && (
        <Card>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resumo Rápido
            </h3>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-gray-900 dark:text-white">
                  {cycleItems.filter(i => i.status === 'concluido').length}/{cycleItems.length}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Itens</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 dark:text-white">
                  {currentCycle.totalCompletedHours}h
                </p>
                <p className="text-gray-600 dark:text-gray-400">Estudadas</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 dark:text-white">
                  {Math.ceil((new Date(currentCycle.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Dias Restantes</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 dark:text-white">
                  {cycleMetrics.currentStreak}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Streak</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AgilePlanningPage;