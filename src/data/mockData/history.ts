import { 
  ActivityLog, 
  StudyStreak, 
  Achievement, 
  DetailedStats
} from '../../types/gabaritte';

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log1',
    userId: 'user1',
    type: 'study',
    action: 'completed_topic',
    description: 'Completou o tópico "Álgebra Linear" em Matemática',
    entityType: 'topic',
    entityId: 'topic1',
    entityName: 'Álgebra Linear',
    metadata: {
      subjectId: 'subj1',
      progress: 100,
      timeSpent: 120
    },
    duration: 120,
    timestamp: '2024-02-01T10:30:00Z'
  },
  {
    id: 'log2',
    userId: 'user1',
    type: 'simulation',
    action: 'completed_simulation',
    description: 'Completou simulado "ENEM 2024 - Matemática"',
    entityType: 'simulation',
    entityId: 'sim2',
    entityName: 'ENEM 2024 - Matemática',
    metadata: {
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: 55
    },
    duration: 55,
    score: 85,
    timestamp: '2024-02-01T15:45:00Z'
  },
  {
    id: 'log3',
    userId: 'user1',
    type: 'review',
    action: 'completed_review',
    description: 'Revisou conceitos de Mecânica Clássica',
    entityType: 'topic',
    entityId: 'topic2',
    entityName: 'Mecânica Clássica',
    metadata: {
      reviewType: 'spaced_repetition',
      confidence: 4,
      nextReview: '2024-02-05T14:00:00Z'
    },
    duration: 30,
    timestamp: '2024-02-01T14:00:00Z'
  },
  {
    id: 'log4',
    userId: 'user1',
    type: 'content_access',
    action: 'watched_video',
    description: 'Assistiu videoaula "Química Orgânica - Nomenclatura"',
    entityType: 'content',
    entityId: 'content3',
    entityName: 'Química Orgânica - Nomenclatura',
    metadata: {
      contentType: 'video',
      watchPercentage: 95,
      rating: 5
    },
    duration: 45,
    timestamp: '2024-01-31T16:20:00Z'
  },
  {
    id: 'log5',
    userId: 'user1',
    type: 'goal_update',
    action: 'achieved_milestone',
    description: 'Atingiu marco "Primeira Avaliação"',
    entityType: 'milestone',
    entityId: 'mile1',
    entityName: 'Primeira Avaliação',
    metadata: {
      goalId: 'goal1',
      progress: 100,
      reward: 'Certificado de Excelência'
    },
    timestamp: '2024-01-30T18:00:00Z'
  }
];

export const mockStudyStreaks: StudyStreak[] = [
  {
    id: 'streak1',
    userId: 'user1',
    startDate: '2024-01-15',
    currentDays: 17,
    longestStreak: 25,
    isActive: true,
    lastActivityDate: '2024-02-01'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'Primeiro Passo',
    description: 'Complete sua primeira sessão de estudos',
    icon: 'solar:medal-star-bold',
    category: 'study_time',
    type: 'bronze',
    requirements: [
      {
        type: 'study_hours',
        target: 1,
        current: 1
      }
    ],
    reward: '10 pontos XP',
    isUnlocked: true,
    unlockedAt: '2024-01-15T10:00:00Z',
    progress: 100
  },
  {
    id: 'ach2',
    title: 'Maratonista',
    description: 'Estude por 100 horas no total',
    icon: 'solar:cup-star-bold',
    category: 'study_time',
    type: 'gold',
    requirements: [
      {
        type: 'study_hours',
        target: 100,
        current: 87
      }
    ],
    reward: '500 pontos XP + Badge Especial',
    isUnlocked: false,
    progress: 87
  },
  {
    id: 'ach3',
    title: 'Consistência',
    description: 'Mantenha uma sequência de 30 dias estudando',
    icon: 'solar:calendar-mark-bold',
    category: 'consistency',
    type: 'silver',
    requirements: [
      {
        type: 'streak_days',
        target: 30,
        current: 17
      }
    ],
    reward: '200 pontos XP',
    isUnlocked: false,
    progress: 57
  },
  {
    id: 'ach4',
    title: 'Nota Máxima',
    description: 'Obtenha 100% de acerto em um simulado',
    icon: 'solar:star-bold',
    category: 'performance',
    type: 'platinum',
    requirements: [
      {
        type: 'simulation_score',
        target: 100,
        current: 95
      }
    ],
    reward: '1000 pontos XP + Título Especial',
    isUnlocked: false,
    progress: 95
  },
  {
    id: 'ach5',
    title: 'Explorador',
    description: 'Complete 5 disciplinas diferentes',
    icon: 'solar:compass-bold',
    category: 'completion',
    type: 'silver',
    requirements: [
      {
        type: 'subjects_completed',
        target: 5,
        current: 3
      }
    ],
    reward: '300 pontos XP',
    isUnlocked: false,
    progress: 60
  }
];

export const mockDetailedStats: DetailedStats = {
  overview: {
    totalStudyTime: 1250, // horas
    totalSessions: 156,
    averageSessionTime: 48, // minutos
    currentStreak: 17,
    longestStreak: 25,
    totalAchievements: 8
  },
  performance: {
    averageScore: 78.5,
    simulationsCompleted: 23,
    questionsAnswered: 1450,
    correctAnswerRate: 76.2,
    improvementRate: 12.5 // % melhoria no último mês
  },
  subjects: [
    {
      subjectId: 'subj1',
      subjectName: 'Matemática',
      totalTime: 320,
      sessionsCount: 42,
      averageScore: 82.3,
      progress: 75,
      lastStudied: '2024-02-01',
      strongTopics: ['Álgebra Linear', 'Matrizes'],
      weakTopics: ['Cálculo Integral']
    },
    {
      subjectId: 'subj2',
      subjectName: 'Física',
      totalTime: 280,
      sessionsCount: 35,
      averageScore: 76.8,
      progress: 68,
      lastStudied: '2024-01-31',
      strongTopics: ['Mecânica Clássica'],
      weakTopics: ['Eletromagnetismo', 'Óptica']
    },
    {
      subjectId: 'subj3',
      subjectName: 'Química',
      totalTime: 250,
      sessionsCount: 32,
      averageScore: 71.2,
      progress: 62,
      lastStudied: '2024-01-30',
      strongTopics: ['Química Inorgânica'],
      weakTopics: ['Nomenclatura Orgânica', 'Estequiometria']
    },
    {
      subjectId: 'subj4',
      subjectName: 'Literatura',
      totalTime: 200,
      sessionsCount: 28,
      averageScore: 85.1,
      progress: 80,
      lastStudied: '2024-02-01',
      strongTopics: ['Romantismo', 'Modernismo'],
      weakTopics: ['Barroco']
    },
    {
      subjectId: 'subj5',
      subjectName: 'Biologia',
      totalTime: 200,
      sessionsCount: 19,
      averageScore: 79.4,
      progress: 55,
      lastStudied: '2024-01-29',
      strongTopics: ['Biologia Molecular'],
      weakTopics: ['Ecologia', 'Evolução']
    }
  ],
  weekly: [
    {
      week: '2024-W05',
      totalTime: 42,
      sessionsCount: 12,
      averageScore: 81.2,
      goalsCompleted: 3,
      dailyBreakdown: [
        { date: '2024-01-29', studyTime: 6, sessionsCount: 2, activitiesCompleted: 4 },
        { date: '2024-01-30', studyTime: 8, sessionsCount: 2, activitiesCompleted: 5 },
        { date: '2024-01-31', studyTime: 5, sessionsCount: 1, activitiesCompleted: 3 },
        { date: '2024-02-01', studyTime: 7, sessionsCount: 2, activitiesCompleted: 6 },
        { date: '2024-02-02', studyTime: 6, sessionsCount: 2, activitiesCompleted: 4 },
        { date: '2024-02-03', studyTime: 5, sessionsCount: 2, activitiesCompleted: 3 },
        { date: '2024-02-04', studyTime: 5, sessionsCount: 1, activitiesCompleted: 2 }
      ]
    },
    {
      week: '2024-W04',
      totalTime: 38,
      sessionsCount: 11,
      averageScore: 76.8,
      goalsCompleted: 2,
      dailyBreakdown: [
        { date: '2024-01-22', studyTime: 5, sessionsCount: 2, activitiesCompleted: 3 },
        { date: '2024-01-23', studyTime: 6, sessionsCount: 2, activitiesCompleted: 4 },
        { date: '2024-01-24', studyTime: 4, sessionsCount: 1, activitiesCompleted: 2 },
        { date: '2024-01-25', studyTime: 7, sessionsCount: 2, activitiesCompleted: 5 },
        { date: '2024-01-26', studyTime: 6, sessionsCount: 2, activitiesCompleted: 4 },
        { date: '2024-01-27', studyTime: 5, sessionsCount: 1, activitiesCompleted: 3 },
        { date: '2024-01-28', studyTime: 5, sessionsCount: 1, activitiesCompleted: 2 }
      ]
    }
  ],
  monthly: [
    {
      month: '2024-02',
      totalTime: 42,
      sessionsCount: 12,
      averageScore: 81.2,
      goalsCompleted: 3,
      milestonesReached: 1,
      weeklyBreakdown: [
        {
          week: '2024-W05',
          totalTime: 42,
          sessionsCount: 12,
          averageScore: 81.2,
          goalsCompleted: 3,
          dailyBreakdown: []
        }
      ]
    },
    {
      month: '2024-01',
      totalTime: 165,
      sessionsCount: 48,
      averageScore: 77.8,
      goalsCompleted: 8,
      milestonesReached: 2,
      weeklyBreakdown: []
    }
  ],
  goals: [
    {
      goalId: 'goal1',
      goalTitle: 'Dominar Álgebra Linear',
      progress: 75,
      targetDate: '2024-02-15',
      onTrack: true,
      estimatedCompletion: '2024-02-12',
      weeklyProgress: [60, 65, 70, 75]
    },
    {
      goalId: 'goal2',
      goalTitle: 'Aprovação no ENEM',
      progress: 35,
      targetDate: '2024-11-30',
      onTrack: true,
      estimatedCompletion: '2024-11-25',
      weeklyProgress: [30, 32, 33, 35]
    }
  ]
};

// Funções auxiliares
export const getActivityLogsByType = (type: ActivityLog['type']): ActivityLog[] => {
  return mockActivityLogs.filter(log => log.type === type);
};

export const getActivityLogsByDate = (date: string): ActivityLog[] => {
  return mockActivityLogs.filter(log => log.timestamp.startsWith(date));
};

export const getRecentActivities = (limit: number = 10): ActivityLog[] => {
  return mockActivityLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getUnlockedAchievements = (): Achievement[] => {
  return mockAchievements.filter(ach => ach.isUnlocked);
};

export const getAchievementsByCategory = (category: Achievement['category']): Achievement[] => {
  return mockAchievements.filter(ach => ach.category === category);
};

export const getAchievementsNearCompletion = (threshold: number = 80): Achievement[] => {
  return mockAchievements.filter(ach => !ach.isUnlocked && ach.progress >= threshold);
};

export const getCurrentStreak = (): StudyStreak | null => {
  return mockStudyStreaks.find(streak => streak.isActive) || null;
};

export const getStudyTimeByPeriod = (period: 'week' | 'month' | 'year'): number => {
  const now = new Date();
  const logs = mockActivityLogs.filter(log => log.type === 'study');
  
  switch (period) {
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return logs
        .filter(log => new Date(log.timestamp) >= weekAgo)
        .reduce((sum, log) => sum + (log.duration || 0), 0);
    
    case 'month':
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return logs
        .filter(log => new Date(log.timestamp) >= monthAgo)
        .reduce((sum, log) => sum + (log.duration || 0), 0);
    
    case 'year':
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      return logs
        .filter(log => new Date(log.timestamp) >= yearAgo)
        .reduce((sum, log) => sum + (log.duration || 0), 0);
    
    default:
      return 0;
  }
};

export const getPerformanceTrend = (): 'improving' | 'stable' | 'declining' => {
  const recentScores = mockActivityLogs
    .filter(log => log.score !== undefined)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)
    .map(log => log.score!);

  if (recentScores.length < 3) return 'stable';

  const firstHalf = recentScores.slice(0, Math.floor(recentScores.length / 2));
  const secondHalf = recentScores.slice(Math.floor(recentScores.length / 2));

  const firstAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;

  const difference = firstAvg - secondAvg;

  if (difference > 5) return 'improving';
  if (difference < -5) return 'declining';
  return 'stable';
};

export const getActivityStats = () => {
  const total = mockActivityLogs.length;
  const byType = mockActivityLogs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalStudyTime = mockActivityLogs
    .filter(log => log.type === 'study')
    .reduce((sum, log) => sum + (log.duration || 0), 0);

  const averageScore = mockActivityLogs
    .filter(log => log.score !== undefined)
    .reduce((sum, log) => sum + log.score!, 0) / 
    mockActivityLogs.filter(log => log.score !== undefined).length;

  return {
    total,
    byType,
    totalStudyTime,
    averageScore: Math.round(averageScore * 10) / 10,
    unlockedAchievements: getUnlockedAchievements().length,
    currentStreak: getCurrentStreak()?.currentDays || 0
  };
};