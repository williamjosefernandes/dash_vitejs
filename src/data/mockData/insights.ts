import { Insight, AIRecommendation } from '../../types/gabaritte';

export const mockInsights: Insight[] = [
  {
    id: 'insight1',
    type: 'performance',
    title: 'Melhoria Significativa em Matemática',
    description: 'Sua performance em Matemática melhorou 25% nas últimas duas semanas. Continue focando em álgebra linear!',
    data: {
      subject: 'Matemática',
      improvement: 25,
      period: '2 semanas',
      strongTopics: ['Álgebra Linear', 'Matrizes'],
      weeklyScores: [65, 70, 75, 81]
    },
    priority: 'medium',
    category: 'performance',
    isRead: false,
    actionable: true,
    actions: [
      {
        id: 'action1',
        label: 'Ver Progresso Detalhado',
        type: 'navigate',
        target: '/statistics/subjects/subj1'
      },
      {
        id: 'action2',
        label: 'Fazer Simulado de Matemática',
        type: 'navigate',
        target: '/simulations/subject/subj1'
      }
    ],
    generatedAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 'insight2',
    type: 'warning',
    title: 'Química Precisa de Atenção',
    description: 'Você não estudou Química nos últimos 5 dias. Recomendamos revisar os conceitos de química orgânica.',
    data: {
      subject: 'Química',
      daysWithoutStudy: 5,
      lastStudyDate: '2024-01-27',
      missedTopics: ['Nomenclatura IUPAC', 'Grupos Funcionais']
    },
    priority: 'high',
    category: 'study_time',
    isRead: false,
    actionable: true,
    actions: [
      {
        id: 'action3',
        label: 'Agendar Revisão de Química',
        type: 'schedule',
        target: 'review_session',
        params: { subjectId: 'subj3', duration: 60 }
      },
      {
        id: 'action4',
        label: 'Acessar Conteúdo de Química',
        type: 'navigate',
        target: '/content/subject/subj3'
      }
    ],
    generatedAt: '2024-02-01T14:00:00Z'
  },
  {
    id: 'insight3',
    type: 'recommendation',
    title: 'Hora Ideal para Estudar Física',
    description: 'Baseado no seu histórico, você tem melhor performance em Física entre 14h e 16h.',
    data: {
      subject: 'Física',
      optimalTime: '14:00-16:00',
      performanceByHour: {
        '08:00': 65,
        '10:00': 70,
        '14:00': 85,
        '16:00': 82,
        '20:00': 68
      }
    },
    priority: 'low',
    category: 'behavior',
    isRead: true,
    actionable: true,
    actions: [
      {
        id: 'action5',
        label: 'Ajustar Cronograma',
        type: 'update',
        target: 'study_schedule',
        params: { subjectId: 'subj2', preferredTime: '14:00' }
      }
    ],
    generatedAt: '2024-01-30T10:00:00Z'
  },
  {
    id: 'insight4',
    type: 'achievement',
    title: 'Meta Semanal Atingida!',
    description: 'Parabéns! Você completou 42 horas de estudo esta semana, superando sua meta de 35 horas.',
    data: {
      weeklyGoal: 35,
      actualHours: 42,
      improvement: 20,
      streak: 3
    },
    priority: 'medium',
    category: 'goals',
    isRead: false,
    actionable: false,
    generatedAt: '2024-02-01T18:00:00Z'
  },
  {
    id: 'insight5',
    title: 'Padrão de Procrastinação Detectado',
    description: 'Identificamos que você tende a adiar estudos de Literatura. Que tal quebrar essa tarefa em partes menores?',
    type: 'warning',
    data: {
      subject: 'Literatura',
      procrastinationPattern: {
        averageDelay: 2.5, // dias
        frequency: 'weekly',
        commonExcuses: ['muito conteúdo', 'difícil concentração']
      },
      suggestedSolution: 'pomodoro_technique'
    },
    priority: 'medium',
    category: 'behavior',
    isRead: false,
    actionable: true,
    actions: [
      {
        id: 'action6',
        label: 'Configurar Sessões Pomodoro',
        type: 'create',
        target: 'pomodoro_session',
        params: { subjectId: 'subj4', duration: 25 }
      }
    ],
    generatedAt: '2024-02-01T11:00:00Z'
  }
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'rec1',
    type: 'study_schedule',
    title: 'Otimização do Cronograma de Estudos',
    description: 'Recomendamos ajustar seu cronograma para estudar Matemática pela manhã e Física à tarde.',
    reasoning: 'Análise dos seus dados mostra 23% melhor performance em Matemática no período matutino e 18% melhor em Física no período vespertino.',
    confidence: 0.87,
    impact: 'high',
    effort: 'low',
    estimatedBenefit: 'Aumento de 15-20% na retenção de conteúdo',
    implementationSteps: [
      'Mover sessões de Matemática para 8h-10h',
      'Agendar Física para 14h-16h',
      'Manter outras disciplinas nos horários atuais',
      'Testar por 2 semanas e avaliar resultados'
    ],
    relatedSubjects: ['subj1', 'subj2'],
    createdAt: '2024-02-01T08:00:00Z'
  },
  {
    id: 'rec2',
    type: 'content',
    title: 'Conteúdo Personalizado para Química',
    description: 'Baseado nas suas dificuldades, recomendamos focar em videoaulas de nomenclatura orgânica.',
    reasoning: 'Você teve 40% de erro em questões de nomenclatura nos últimos simulados. Conteúdo visual pode melhorar a compreensão.',
    confidence: 0.92,
    impact: 'medium',
    effort: 'medium',
    estimatedBenefit: 'Redução de 50% nos erros de nomenclatura',
    implementationSteps: [
      'Assistir 3 videoaulas sobre nomenclatura IUPAC',
      'Fazer exercícios práticos após cada vídeo',
      'Criar flashcards com exemplos',
      'Revisar semanalmente'
    ],
    relatedSubjects: ['subj3'],
    relatedTopics: ['topic3'],
    createdAt: '2024-02-01T12:00:00Z'
  },
  {
    id: 'rec3',
    type: 'review',
    title: 'Intensificar Revisões de Física',
    description: 'Seus dados indicam que você esquece conceitos de Física após 7 dias. Recomendamos revisões mais frequentes.',
    reasoning: 'Curva de esquecimento mostra declínio acentuado em Física. Revisões espaçadas podem melhorar a retenção.',
    confidence: 0.78,
    impact: 'high',
    effort: 'medium',
    estimatedBenefit: 'Melhoria de 30% na retenção de longo prazo',
    implementationSteps: [
      'Revisar conceitos de Física a cada 3 dias',
      'Usar técnica de repetição espaçada',
      'Fazer resumos após cada revisão',
      'Aplicar conceitos em exercícios práticos'
    ],
    relatedSubjects: ['subj2'],
    createdAt: '2024-01-31T16:00:00Z',
    implementedAt: '2024-02-01T09:00:00Z',
    feedback: 'helpful'
  },
  {
    id: 'rec4',
    type: 'break',
    title: 'Pausas Estratégicas Necessárias',
    description: 'Detectamos sinais de fadiga mental. Recomendamos pausas de 15 minutos a cada hora de estudo.',
    reasoning: 'Performance declina 35% após 60 minutos contínuos de estudo. Pausas regulares podem manter a eficiência.',
    confidence: 0.85,
    impact: 'medium',
    effort: 'low',
    estimatedBenefit: 'Manutenção de 90% da performance durante sessões longas',
    implementationSteps: [
      'Configurar timer para 60 minutos',
      'Fazer pausa de 15 minutos após cada sessão',
      'Durante a pausa: caminhar ou alongar',
      'Evitar telas durante as pausas'
    ],
    createdAt: '2024-02-01T15:00:00Z'
  },
  {
    id: 'rec5',
    type: 'goal_adjustment',
    title: 'Ajuste de Meta Semanal',
    description: 'Sua meta atual de 35h/semana está sendo consistentemente superada. Que tal aumentar para 40h?',
    reasoning: 'Você tem superado a meta em 20% nas últimas 4 semanas, indicando capacidade para maior volume de estudos.',
    confidence: 0.73,
    impact: 'medium',
    effort: 'low',
    estimatedBenefit: 'Aceleração de 15% no progresso geral',
    implementationSteps: [
      'Aumentar meta semanal para 40 horas',
      'Distribuir as 5 horas extras ao longo da semana',
      'Monitorar níveis de estresse e fadiga',
      'Ajustar se necessário após 2 semanas'
    ],
    createdAt: '2024-01-30T20:00:00Z'
  }
];

// Funções auxiliares
export const getInsightsByType = (type: Insight['type']): Insight[] => {
  return mockInsights.filter(insight => insight.type === type);
};

export const getInsightsByPriority = (priority: Insight['priority']): Insight[] => {
  return mockInsights.filter(insight => insight.priority === priority);
};

export const getUnreadInsights = (): Insight[] => {
  return mockInsights.filter(insight => !insight.isRead);
};

export const getActionableInsights = (): Insight[] => {
  return mockInsights.filter(insight => insight.actionable);
};

export const getRecommendationsByType = (type: AIRecommendation['type']): AIRecommendation[] => {
  return mockAIRecommendations.filter(rec => rec.type === type);
};

export const getHighConfidenceRecommendations = (): AIRecommendation[] => {
  return mockAIRecommendations.filter(rec => rec.confidence >= 0.8);
};

export const getImplementedRecommendations = (): AIRecommendation[] => {
  return mockAIRecommendations.filter(rec => rec.implementedAt);
};

export const getRecommendationsBySubject = (subjectId: string): AIRecommendation[] => {
  return mockAIRecommendations.filter(rec => 
    rec.relatedSubjects?.includes(subjectId)
  );
};

export const getInsightStats = () => {
  const total = mockInsights.length;
  const unread = getUnreadInsights().length;
  const actionable = getActionableInsights().length;
  
  const byType = mockInsights.reduce((acc, insight) => {
    acc[insight.type] = (acc[insight.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byPriority = mockInsights.reduce((acc, insight) => {
    acc[insight.priority] = (acc[insight.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    unread,
    actionable,
    byType,
    byPriority
  };
};

export const getRecommendationStats = () => {
  const total = mockAIRecommendations.length;
  const implemented = getImplementedRecommendations().length;
  const highConfidence = getHighConfidenceRecommendations().length;
  
  const byType = mockAIRecommendations.reduce((acc, rec) => {
    acc[rec.type] = (acc[rec.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byImpact = mockAIRecommendations.reduce((acc, rec) => {
    acc[rec.impact] = (acc[rec.impact] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageConfidence = mockAIRecommendations.reduce((sum, rec) => sum + rec.confidence, 0) / total;

  return {
    total,
    implemented,
    highConfidence,
    byType,
    byImpact,
    averageConfidence: Math.round(averageConfidence * 100) / 100,
    implementationRate: (implemented / total) * 100
  };
};