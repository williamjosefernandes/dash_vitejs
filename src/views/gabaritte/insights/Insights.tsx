import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, Progress, Tabs } from 'flowbite-react';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('desempenho');
  const [showModal, setShowModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);

  // Dados simulados de insights
  const insights = {
    performance: [
      {
        id: 1,
        type: 'strength',
        title: 'Forte em Matemática',
        description: 'Você tem excelente desempenho em funções quadráticas e trigonometria',
        impact: 'high',
        confidence: 92,
        subjects: ['Matemática'],
        recommendation: 'Continue praticando problemas mais complexos para manter o nível',
        data: {
          averageScore: 88,
          improvement: '+12%',
          timeSpent: '45h',
          topics: ['Funções Quadráticas', 'Trigonometria', 'Geometria Analítica']
        }
      },
      {
        id: 2,
        type: 'weakness',
        title: 'Dificuldade em Química Orgânica',
        description: 'Identificamos que você tem dificuldades com nomenclatura e reações orgânicas',
        impact: 'high',
        confidence: 87,
        subjects: ['Química'],
        recommendation: 'Recomendamos focar em exercícios de nomenclatura e mecanismos de reação',
        data: {
          averageScore: 62,
          improvement: '-5%',
          timeSpent: '23h',
          topics: ['Nomenclatura', 'Reações Orgânicas', 'Isomeria']
        }
      },
      {
        id: 3,
        type: 'opportunity',
        title: 'Potencial em Física Moderna',
        description: 'Você mostra bom entendimento conceitual, mas precisa praticar mais cálculos',
        impact: 'medium',
        confidence: 78,
        subjects: ['Física'],
        recommendation: 'Pratique mais exercícios quantitativos de física quântica e relatividade',
        data: {
          averageScore: 74,
          improvement: '+8%',
          timeSpent: '18h',
          topics: ['Física Quântica', 'Relatividade', 'Efeito Fotoelétrico']
        }
      }
    ],
    learning: [
      {
        id: 4,
        type: 'pattern',
        title: 'Melhor Performance pela Manhã',
        description: 'Seus melhores resultados acontecem entre 8h e 11h',
        impact: 'medium',
        confidence: 85,
        recommendation: 'Agende estudos mais difíceis para o período matutino',
        data: {
          morningScore: 82,
          afternoonScore: 76,
          eveningScore: 71,
          optimalTime: '8h-11h'
        }
      },
      {
        id: 5,
        type: 'habit',
        title: 'Sessões Curtas Mais Eficazes',
        description: 'Você aprende melhor em sessões de 25-45 minutos com pausas',
        impact: 'high',
        confidence: 91,
        recommendation: 'Use a técnica Pomodoro para maximizar o aprendizado',
        data: {
          optimalDuration: '35 min',
          efficiency: '+23%',
          retention: '+18%',
          sessions: 156
        }
      },
      {
        id: 6,
        type: 'progress',
        title: 'Evolução Consistente',
        description: 'Você mantém um ritmo constante de melhoria nas últimas 4 semanas',
        impact: 'high',
        confidence: 94,
        recommendation: 'Continue com a rotina atual, está funcionando muito bem',
        data: {
          weeklyImprovement: '+3.2%',
          consistency: '89%',
          streak: '28 dias',
          totalProgress: '+15%'
        }
      }
    ],
    predictions: [
      {
        id: 7,
        type: 'exam_readiness',
        title: 'Preparação para ENEM',
        description: 'Com base no seu progresso atual, você estará 85% preparado para o ENEM',
        impact: 'high',
        confidence: 88,
        subjects: ['Todas'],
        recommendation: 'Foque nas áreas de menor desempenho nos próximos 2 meses',
        data: {
          currentReadiness: '72%',
          projectedReadiness: '85%',
          timeToGoal: '8 semanas',
          criticalAreas: ['Química Orgânica', 'Literatura']
        }
      },
      {
        id: 8,
        type: 'goal_achievement',
        title: 'Meta de Nota Alcançável',
        description: 'Você tem 78% de chance de atingir sua meta de 750 pontos no ENEM',
        impact: 'high',
        confidence: 82,
        recommendation: 'Intensifique os estudos em redação para aumentar suas chances',
        data: {
          currentAverage: 680,
          targetScore: 750,
          probability: '78%',
          requiredImprovement: '+70 pontos'
        }
      }
    ]
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return 'solar:star-bold-duotone';
      case 'weakness': return 'solar:danger-triangle-bold-duotone';
      case 'opportunity': return 'solar:target-bold-duotone';
      case 'pattern': return 'solar:chart-2-bold-duotone';
      case 'habit': return 'solar:refresh-circle-bold-duotone';
      case 'progress': return 'solar:graph-up-bold-duotone';
      case 'exam_readiness': return 'solar:diploma-bold-duotone';
      case 'goal_achievement': return 'solar:cup-star-bold-duotone';
      default: return 'solar:lightbulb-bolt-bold-duotone';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'success';
      case 'weakness': return 'failure';
      case 'opportunity': return 'warning';
      case 'pattern': return 'info';
      case 'habit': return 'purple';
      case 'progress': return 'success';
      case 'exam_readiness': return 'info';
      case 'goal_achievement': return 'warning';
      default: return 'gray';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return 'Alto Impacto';
      case 'medium': return 'Médio Impacto';
      case 'low': return 'Baixo Impacto';
      default: return 'Impacto';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'failure';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'gray';
    }
  };

  const handleInsightClick = (insight: any) => {
    setSelectedInsight(insight);
    setShowModal(true);
  };

  const stats = {
    totalInsights: Object.values(insights).flat().length,
    highImpact: Object.values(insights).flat().filter((i: any) => i.impact === 'high').length,
    averageConfidence: Math.round(Object.values(insights).flat().reduce((sum: number, i: any) => sum + i.confidence, 0) / Object.values(insights).flat().length),
    actionableItems: Object.values(insights).flat().filter((i: any) => i.recommendation).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Insights Inteligentes 🧠
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Análises personalizadas e recomendações baseadas em IA para otimizar seus estudos
            </p>
          </div>
          <Button color="primary">
            <Icon icon="solar:refresh-bold-duotone" className="w-5 h-5 mr-2" />
            Atualizar Análises
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:lightbulb-bolt-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalInsights}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total de Insights</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:danger-triangle-bold-duotone" className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.highImpact}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Alto Impacto</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:verified-check-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageConfidence}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Confiança Média</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:checklist-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.actionableItems}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Ações Recomendadas</p>
        </CardBox>
      </div>

      {/* Tabs de Insights */}
      <TitleCard title="Análises Personalizadas">
        <Tabs aria-label="Insights tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'desempenho'} 
            title="Desempenho" 
            icon={() => <Icon icon="solar:chart-2-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('desempenho')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {insights.performance.map((insight) => (
                <div key={insight.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleInsightClick(insight)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 bg-${getInsightColor(insight.type)}-100 dark:bg-${getInsightColor(insight.type)}-900 rounded-lg`}>
                        <Icon icon={getInsightIcon(insight.type)} className={`w-5 h-5 text-${getInsightColor(insight.type)}-600 dark:text-${getInsightColor(insight.type)}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge color={getImpactColor(insight.impact)} size="sm">
                            {getImpactText(insight.impact)}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {insight.confidence}% confiança
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {insight.description}
                  </p>

                  {/* Dados específicos */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{insight.data.averageScore}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Média</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`text-lg font-semibold ${insight.data.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.data.improvement}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Evolução</div>
                    </div>
                  </div>

                  {/* Disciplinas */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {insight.subjects.map((subject, index) => (
                      <Badge key={index} color="light" size="sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  {/* Recomendação */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon icon="solar:lightbulb-bolt-bold-duotone" className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'aprendizado'} 
            title="Padrões de Aprendizado" 
            icon={() => <Icon icon="solar:brain-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('aprendizado')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {insights.learning.map((insight) => (
                <div key={insight.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleInsightClick(insight)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 bg-${getInsightColor(insight.type)}-100 dark:bg-${getInsightColor(insight.type)}-900 rounded-lg`}>
                        <Icon icon={getInsightIcon(insight.type)} className={`w-5 h-5 text-${getInsightColor(insight.type)}-600 dark:text-${getInsightColor(insight.type)}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge color={getImpactColor(insight.impact)} size="sm">
                            {getImpactText(insight.impact)}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {insight.confidence}% confiança
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {insight.description}
                  </p>

                  {/* Dados específicos baseados no tipo */}
                  {insight.type === 'pattern' && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <div className="text-sm font-semibold text-green-700 dark:text-green-300">{insight.data.morningScore}%</div>
                        <div className="text-xs text-green-600 dark:text-green-400">Manhã</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <div className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">{insight.data.afternoonScore}%</div>
                        <div className="text-xs text-yellow-600 dark:text-yellow-400">Tarde</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">{insight.data.eveningScore}%</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">Noite</div>
                      </div>
                    </div>
                  )}

                  {insight.type === 'habit' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{insight.data.optimalDuration}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Duração Ideal</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">{insight.data.efficiency}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Eficiência</div>
                      </div>
                    </div>
                  )}

                  {insight.type === 'progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso Semanal</span>
                        <span className="text-sm text-green-600 dark:text-green-400">{insight.data.weeklyImprovement}</span>
                      </div>
                      <Progress progress={89} color="green" size="sm" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Consistência: {insight.data.consistency}</span>
                        <span>Sequência: {insight.data.streak}</span>
                      </div>
                    </div>
                  )}

                  {/* Recomendação */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon icon="solar:lightbulb-bolt-bold-duotone" className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'previsões'} 
            title="Previsões" 
            icon={() => <Icon icon="solar:crystal-ball-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('previsões')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {insights.predictions.map((insight) => (
                <div key={insight.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleInsightClick(insight)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 bg-${getInsightColor(insight.type)}-100 dark:bg-${getInsightColor(insight.type)}-900 rounded-lg`}>
                        <Icon icon={getInsightIcon(insight.type)} className={`w-5 h-5 text-${getInsightColor(insight.type)}-600 dark:text-${getInsightColor(insight.type)}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge color={getImpactColor(insight.impact)} size="sm">
                            {getImpactText(insight.impact)}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {insight.confidence}% confiança
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {insight.description}
                  </p>

                  {/* Dados de previsão */}
                  {insight.type === 'exam_readiness' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preparação Atual</span>
                        <span className="text-sm text-blue-600 dark:text-blue-400">{insight.data.currentReadiness}</span>
                      </div>
                      <Progress progress={72} color="blue" size="sm" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>Meta: {insight.data.projectedReadiness}</span>
                        <span>Tempo: {insight.data.timeToGoal}</span>
                      </div>
                    </div>
                  )}

                  {insight.type === 'goal_achievement' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{insight.data.currentAverage}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Média Atual</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">{insight.data.probability}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Probabilidade</div>
                      </div>
                    </div>
                  )}

                  {/* Disciplinas */}
                  {insight.subjects && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {insight.subjects.map((subject, index) => (
                        <Badge key={index} color="light" size="sm">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Recomendação */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon icon="solar:lightbulb-bolt-bold-duotone" className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Icon icon={getInsightIcon(selectedInsight?.type)} className="w-6 h-6" />
            <span>{selectedInsight?.title}</span>
            <Badge color={getImpactColor(selectedInsight?.impact)} size="sm">
              {getImpactText(selectedInsight?.impact)}
            </Badge>
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedInsight && (
            <div className="space-y-6">
              {/* Confiança */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nível de Confiança</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">{selectedInsight.confidence}%</span>
                </div>
                <Progress progress={selectedInsight.confidence} color="blue" size="sm" />
              </div>

              {/* Descrição detalhada */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Análise Detalhada</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedInsight.description}</p>
              </div>

              {/* Dados específicos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dados de Suporte</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedInsight.data).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendação */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recomendação</h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon icon="solar:lightbulb-bolt-bold-duotone" className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-blue-800 dark:text-blue-200">
                      {selectedInsight.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Disciplinas relacionadas */}
              {selectedInsight.subjects && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Disciplinas Relacionadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInsight.subjects.map((subject: string, index: number) => (
                      <Badge key={index} color="light">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            <Icon icon="solar:bookmark-bold-duotone" className="w-4 h-4 mr-2" />
            Salvar Insight
          </Button>
          <Button color="secondary">
            <Icon icon="solar:share-bold-duotone" className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Insights;