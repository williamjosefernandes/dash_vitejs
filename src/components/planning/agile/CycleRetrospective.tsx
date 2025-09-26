import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Textarea, Alert } from 'flowbite-react';
import { 
  HiCheckCircle, HiLightBulb, HiTrendingUp, 
  HiClock, HiAcademicCap, HiChartBar,
  HiArrowRight, HiRefresh, HiStar
} from 'react-icons/hi';
import { CycleRetrospective as CycleRetrospectiveType, StudyCycle, CycleItem, BacklogItem, DailyStandup } from '../../../types/planning';

interface CycleRetrospectiveProps {
  cycle: StudyCycle;
  cycleItems: CycleItem[];
  backlogItems: BacklogItem[];
  standups: DailyStandup[];
  simulationScores?: number[];
  onSaveRetrospective: (retrospective: Omit<CycleRetrospectiveType, 'id' | 'createdAt'>) => void;
  onCreateNextCycle: () => void;
}

const CycleRetrospective: React.FC<CycleRetrospectiveProps> = ({
  cycle,
  cycleItems,
  backlogItems,
  standups,
  simulationScores = [],
  onSaveRetrospective,
  onCreateNextCycle
}) => {
  const [showRetrospectiveModal, setShowRetrospectiveModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retrospectiveForm, setRetrospectiveForm] = useState({
    whatWentWell: [] as string[],
    whatCouldImprove: [] as string[],
    lessonsLearned: [] as string[],
    actionItemsNextCycle: [] as string[]
  });

  // Campos temporários para adicionar novos itens
  const [newWentWell, setNewWentWell] = useState('');
  const [newCouldImprove, setNewCouldImprove] = useState('');
  const [newLessonLearned, setNewLessonLearned] = useState('');
  const [newActionItem, setNewActionItem] = useState('');

  // Estados para scores editáveis
  const [productivityScore, setProductivityScore] = useState(0);
  const [consistencyScore, setConsistencyScore] = useState(0);
  const [focusScore, setFocusScore] = useState(0);

  // Validação do formulário
  const isFormValid = () => {
    return retrospectiveForm.whatWentWell.length > 0 || 
           retrospectiveForm.whatCouldImprove.length > 0 || 
           retrospectiveForm.lessonsLearned.length > 0 || 
           retrospectiveForm.actionItemsNextCycle.length > 0;
  };

  // Calcula métricas do ciclo
  const calculateCycleMetrics = () => {
    const completedItems = cycleItems.filter(item => item.status === 'concluido').length;
    const pendingItems = cycleItems.filter(item => item.status !== 'concluido').length;
    
    const totalHoursStudied = cycleItems.reduce((sum, item) => sum + (item.actualHours || 0), 0);
    const averageDailyHours = standups.length > 0 ? totalHoursStudied / standups.length : 0;
    
    const averageSimulationScore = simulationScores.length > 0 
      ? simulationScores.reduce((sum, score) => sum + score, 0) / simulationScores.length 
      : 0;

    const completedDisciplines = [...new Set(
      cycleItems
        .filter(item => item.status === 'concluido')
        .map(item => {
          const backlogData = backlogItems.find(b => b.id === item.backlogItemId);
          return backlogData?.discipline;
        })
        .filter(Boolean)
    )];

    // Calcula scores de produtividade
    const productivityScore = cycleItems.length > 0 ? (completedItems / cycleItems.length) * 100 : 0;
    
    const consistencyScore = standups.length > 0 
      ? (standups.filter(s => s.studiedYesterday.length > 0 || s.planToStudyToday.length > 0).length / standups.length) * 100 
      : 0;

    const focusScore = cycleItems.length > 0 
      ? (cycleItems.filter(item => item.status === 'concluido' && item.startedAt).length / cycleItems.length) * 100 
      : 0;

    return {
      completedItems,
      pendingItems,
      totalHoursStudied,
      averageDailyHours,
      averageSimulationScore,
      completedDisciplines,
      productivityScore,
      consistencyScore,
      focusScore
    };
  };

  const metrics = calculateCycleMetrics();

  // Gera recomendações da IA baseadas nas métricas
  const generateAIRecommendations = () => {
    const recommendations: string[] = [];
    const adjustments: CycleRetrospectiveType['suggestedAdjustments'] = {};

    // Análise de produtividade
    if (metrics.productivityScore < 70) {
      recommendations.push('Considere reduzir o número de itens no próximo ciclo para melhorar a taxa de conclusão');
      adjustments.dailyHours = Math.max(2, metrics.averageDailyHours * 0.8);
    } else if (metrics.productivityScore > 90) {
      recommendations.push('Excelente produtividade! Você pode considerar adicionar mais itens no próximo ciclo');
    }

    // Análise de consistência
    if (metrics.consistencyScore < 60) {
      recommendations.push('Tente manter uma rotina mais consistente de estudos diários');
      recommendations.push('Configure lembretes para fazer o check-in diário');
    }

    // Análise de foco
    if (metrics.focusScore < 70) {
      recommendations.push('Evite iniciar muitos itens ao mesmo tempo. Foque em concluir antes de iniciar novos');
    }

    // Análise de horas de estudo
    if (metrics.averageDailyHours < 2) {
      recommendations.push('Considere aumentar gradualmente o tempo diário de estudos');
      adjustments.dailyHours = metrics.averageDailyHours + 0.5;
    } else if (metrics.averageDailyHours > 6) {
      recommendations.push('Cuidado com o excesso de horas. Qualidade é mais importante que quantidade');
      adjustments.dailyHours = Math.min(6, metrics.averageDailyHours);
    }

    // Análise de simulados
    if (simulationScores.length > 0) {
      if (metrics.averageSimulationScore < 60) {
        recommendations.push('Foque mais em exercícios práticos e revisão de conceitos fundamentais');
        adjustments.priorityFocus = ['questao', 'revisao'];
      } else if (metrics.averageSimulationScore > 80) {
        recommendations.push('Ótimo desempenho nos simulados! Continue praticando para manter o nível');
      }
    } else {
      recommendations.push('Inclua mais simulados no próximo ciclo para avaliar seu progresso');
      adjustments.priorityFocus = ['simulado'];
    }

    // Análise de disciplinas
    if (metrics.completedDisciplines.length < 2) {
      recommendations.push('Tente diversificar mais as disciplinas estudadas no próximo ciclo');
    }

    return { recommendations, adjustments };
  };

  const aiAnalysis = generateAIRecommendations();

  // Handlers para adicionar itens às listas
  const addToList = (listName: keyof typeof retrospectiveForm, value: string, setValue: (val: string) => void) => {
    if (value.trim()) {
      setRetrospectiveForm(prev => ({
        ...prev,
        [listName]: [...prev[listName], value.trim()]
      }));
      setValue('');
    }
  };

  const removeFromList = (listName: keyof typeof retrospectiveForm, index: number) => {
    setRetrospectiveForm(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }));
  };

  const handleSaveRetrospective = async () => {
    if (!isFormValid()) {
      alert('Por favor, adicione pelo menos um item em qualquer seção da retrospectiva.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const retrospectiveData: Omit<CycleRetrospectiveType, 'id' | 'createdAt'> = {
        cycleId: cycle.id,
        completedItems: metrics.completedItems,
        pendingItems: metrics.pendingItems,
        totalHoursStudied: metrics.totalHoursStudied,
        averageDailyHours: metrics.averageDailyHours,
        simulationScores,
        averageSimulationScore: metrics.averageSimulationScore,
        completedDisciplines: (metrics.completedDisciplines || []).filter((d): d is string => d !== undefined),
        whatWentWell: retrospectiveForm.whatWentWell,
        whatCouldImprove: retrospectiveForm.whatCouldImprove,
        lessonsLearned: retrospectiveForm.lessonsLearned,
        actionItemsNextCycle: retrospectiveForm.actionItemsNextCycle,
        productivityScore: metrics.productivityScore,
        consistencyScore: metrics.consistencyScore,
        focusScore: metrics.focusScore,
        aiRecommendations: aiAnalysis.recommendations,
        suggestedAdjustments: aiAnalysis.adjustments
      };

      await onSaveRetrospective(retrospectiveData);
      setShowRetrospectiveModal(false);
      
      // Reset form after successful save
      setRetrospectiveForm({
        whatWentWell: [],
        whatCouldImprove: [],
        lessonsLearned: [],
        actionItemsNextCycle: []
      });
    } catch (error) {
      console.error('Erro ao salvar retrospectiva:', error);
      alert('Erro ao salvar retrospectiva. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // const getScoreColor = (score: number) => {
  //   if (score >= 80) return 'text-green-600 dark:text-green-400';
  //   if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
  //   return 'text-red-600 dark:text-red-400';
  // };

  return (
    <div className="space-y-8">
      {/* Header com gradiente melhorado */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <HiChartBar className="h-8 w-8" />
              Retrospectiva do Ciclo
            </h2>
            <p className="text-blue-100 text-lg">{cycle.name}</p>
            <p className="text-blue-200 text-sm mt-1">
              {new Date(cycle.startDate).toLocaleDateString('pt-BR')} - {new Date(cycle.endDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold">{((metrics.completedItems / cycleItems.length) * 100).toFixed(0)}%</p>
              <p className="text-blue-100 text-sm">Conclusão</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas principais com cards melhorados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Itens Concluídos</p>
              <p className="text-2xl font-bold text-green-700">{metrics.completedItems}/{cycleItems.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <HiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Horas Estudadas</p>
              <p className="text-2xl font-bold text-blue-700">{metrics.totalHoursStudied.toFixed(1)}h</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <HiClock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Disciplinas</p>
              <p className="text-2xl font-bold text-purple-700">{metrics.completedDisciplines.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <HiAcademicCap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Média Diária</p>
              <p className="text-2xl font-bold text-orange-700">{metrics.averageDailyHours.toFixed(1)}h</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <HiTrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Seção de Performance com design melhorado */}
      <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HiStar className="h-6 w-6 text-yellow-500" />
            Avaliação de Performance
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Produtividade */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-700">Produtividade</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setProductivityScore(star)}
                      className={`transition-colors duration-200 ${
                        star <= productivityScore 
                          ? 'text-yellow-400 hover:text-yellow-500' 
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <HiStar className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(productivityScore / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{productivityScore}/5 estrelas</p>
            </div>

            {/* Consistência */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-700">Consistência</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setConsistencyScore(star)}
                      className={`transition-colors duration-200 ${
                        star <= consistencyScore 
                          ? 'text-blue-400 hover:text-blue-500' 
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <HiStar className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(consistencyScore / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{consistencyScore}/5 estrelas</p>
            </div>

            {/* Foco */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-700">Foco</h4>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFocusScore(star)}
                      className={`transition-colors duration-200 ${
                        star <= focusScore 
                          ? 'text-purple-400 hover:text-purple-500' 
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <HiStar className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(focusScore / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{focusScore}/5 estrelas</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recomendações da IA */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <HiLightBulb className="h-5 w-5 text-yellow-500 mr-2" />
          Recomendações Inteligentes
        </h3>
        <div className="space-y-3">
          {aiAnalysis.recommendations.map((recommendation, index) => (
            <Alert key={index} color="info" className="border-l-4">
              <HiLightBulb className="h-4 w-4" />
              <span className="ml-2">{recommendation}</span>
            </Alert>
          ))}
        </div>

        {Object.keys(aiAnalysis.adjustments).length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Ajustes Sugeridos para o Próximo Ciclo:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              {aiAnalysis.adjustments.dailyHours && (
                <li>• Horas diárias: {aiAnalysis.adjustments.dailyHours}h</li>
              )}
              {aiAnalysis.adjustments.cycleDuration && (
                <li>• Duração do ciclo: {aiAnalysis.adjustments.cycleDuration} dias</li>
              )}
              {aiAnalysis.adjustments.priorityFocus && (
                <li>• Focar em: {aiAnalysis.adjustments.priorityFocus.join(', ')}</li>
              )}
            </ul>
          </div>
        )}
      </Card>

      {/* Detalhamento dos Itens */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detalhamento dos Itens do Ciclo
        </h3>
        <div className="space-y-3">
          {cycleItems.map(item => {
            const backlogData = backlogItems.find(b => b.id === item.backlogItemId);
            if (!backlogData) return null;

            return (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {backlogData.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {backlogData.discipline} • {backlogData.contentType}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.actualHours || 0}h / {backlogData.estimatedHours}h
                    </p>
                    {item.actualHours && backlogData.estimatedHours && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {((item.actualHours / backlogData.estimatedHours) * 100).toFixed(0)}% do estimado
                      </p>
                    )}
                  </div>
                  <Badge 
                    color={
                      item.status === 'concluido' ? 'green' :
                      item.status === 'em_andamento' ? 'blue' :
                      item.status === 'bloqueado' ? 'red' : 'gray'
                    }
                    size="sm"
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Ação para próximo ciclo */}
      <div className="text-center">
        <Button
          color="green"
          size="lg"
          onClick={onCreateNextCycle}
        >
          <HiRefresh className="mr-2 h-5 w-5" />
          Criar Próximo Ciclo
        </Button>
      </div>

      {/* Modal de Retrospectiva */}
      <Modal show={showRetrospectiveModal} onClose={() => setShowRetrospectiveModal(false)} size="4xl">
        <Modal.Header>Retrospectiva do Ciclo - {cycle.name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* O que deu certo */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                O que deu certo neste ciclo?
              </h4>
              <div className="space-y-2 mb-3">
                {retrospectiveForm.whatWentWell.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="text-sm text-green-900 dark:text-green-100">{item}</span>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => removeFromList('whatWentWell', index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newWentWell}
                  onChange={(e) => setNewWentWell(e.target.value)}
                  placeholder="Ex: Consegui manter consistência nos estudos diários..."
                  rows={2}
                  className="flex-1"
                />
                <Button
                  color="green"
                  onClick={() => addToList('whatWentWell', newWentWell, setNewWentWell)}
                  disabled={!newWentWell.trim()}
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* O que pode melhorar */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiTrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                O que pode melhorar no próximo ciclo?
              </h4>
              <div className="space-y-2 mb-3">
                {retrospectiveForm.whatCouldImprove.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <span className="text-sm text-orange-900 dark:text-orange-100">{item}</span>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => removeFromList('whatCouldImprove', index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newCouldImprove}
                  onChange={(e) => setNewCouldImprove(e.target.value)}
                  placeholder="Ex: Preciso melhorar o gerenciamento de tempo..."
                  rows={2}
                  className="flex-1"
                />
                <Button
                  color="orange"
                  onClick={() => addToList('whatCouldImprove', newCouldImprove, setNewCouldImprove)}
                  disabled={!newCouldImprove.trim()}
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Lições aprendidas */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiLightBulb className="h-5 w-5 text-yellow-600 mr-2" />
                Principais lições aprendidas
              </h4>
              <div className="space-y-2 mb-3">
                {retrospectiveForm.lessonsLearned.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <span className="text-sm text-yellow-900 dark:text-yellow-100">{item}</span>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => removeFromList('lessonsLearned', index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newLessonLearned}
                  onChange={(e) => setNewLessonLearned(e.target.value)}
                  placeholder="Ex: Estudar em blocos menores é mais efetivo..."
                  rows={2}
                  className="flex-1"
                />
                <Button
                  color="yellow"
                  onClick={() => addToList('lessonsLearned', newLessonLearned, setNewLessonLearned)}
                  disabled={!newLessonLearned.trim()}
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Ações para o próximo ciclo */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <HiArrowRight className="h-5 w-5 text-blue-600 mr-2" />
                Ações para o próximo ciclo
              </h4>
              <div className="space-y-2 mb-3">
                {retrospectiveForm.actionItemsNextCycle.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <span className="text-sm text-blue-900 dark:text-blue-100">{item}</span>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => removeFromList('actionItemsNextCycle', index)}
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newActionItem}
                  onChange={(e) => setNewActionItem(e.target.value)}
                  placeholder="Ex: Implementar técnica Pomodoro nos estudos..."
                  rows={2}
                  className="flex-1"
                />
                <Button
                  color="blue"
                  onClick={() => addToList('actionItemsNextCycle', newActionItem, setNewActionItem)}
                  disabled={!newActionItem.trim()}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowRetrospectiveModal(false)}>
            Cancelar
          </Button>
          <Button 
            color="blue" 
            onClick={handleSaveRetrospective}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Retrospectiva'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CycleRetrospective;