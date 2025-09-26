import { UserProfile, UserPreferences, NotificationSettings } from '../../types/gabaritte';

export const mockUserProfile: UserProfile = {
  id: 'user1',
  name: 'João Silva Santos',
  email: 'joao.silva@email.com',
  avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=3b82f6&color=fff',
  dateOfBirth: '2005-03-15',
  location: 'São Paulo, SP',
  education: {
    level: 'medio',
    institution: 'Colégio Estadual Prof. Maria José',
    course: 'Ensino Médio',
    year: 2024
  },
  goals: {
    primary: 'Aprovação no ENEM 2024',
    secondary: ['Vestibular USP', 'Vestibular UNICAMP'],
    targetExam: 'ENEM',
    targetDate: '2024-11-10'
  },
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false,
      studyReminders: true,
      reviewReminders: true,
      goalDeadlines: true,
      achievements: true,
      weeklyReports: true
    },
    study: {
      defaultSessionDuration: 60,
      breakInterval: 15,
      dailyGoal: 6,
      preferredStudyTimes: ['08:00', '14:00', '19:00'],
      difficultyPreference: 'adaptive',
      reviewFrequency: 'daily'
    },
    interface: {
      theme: 'light',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      compactMode: false
    },
    privacy: {
      profileVisibility: 'friends',
      shareProgress: true,
      shareAchievements: true,
      allowRecommendations: true
    }
  },
  subscription: {
    plan: 'premium',
    status: 'active',
    startDate: '2024-01-15T10:00:00Z',
    endDate: '2025-01-15T10:00:00Z',
    features: [
      'unlimited_simulations',
      'ai_recommendations',
      'advanced_analytics',
      'premium_content',
      'priority_support'
    ]
  },
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-02-01T14:30:00Z'
};

export const mockNotificationSettings: NotificationSettings[] = [
  {
    id: 'notif1',
    type: 'study_reminder',
    enabled: true,
    channels: ['push', 'email'],
    schedule: {
      time: '08:00',
      days: [1, 2, 3, 4, 5, 6], // Segunda a sábado
      frequency: 'daily'
    },
    customMessage: 'Hora de estudar! Vamos começar o dia com foco nos seus objetivos.'
  },
  {
    id: 'notif2',
    type: 'review_reminder',
    enabled: true,
    channels: ['push'],
    schedule: {
      time: '19:00',
      days: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
      frequency: 'daily'
    },
    customMessage: 'Que tal revisar o que você estudou hoje? A revisão é fundamental!'
  },
  {
    id: 'notif3',
    type: 'goal_deadline',
    enabled: true,
    channels: ['email', 'push'],
    schedule: {
      time: '10:00',
      days: [1], // Segundas-feiras
      frequency: 'weekly'
    },
    customMessage: 'Verificação semanal: como está o progresso das suas metas?'
  },
  {
    id: 'notif4',
    type: 'achievement',
    enabled: true,
    channels: ['push'],
    customMessage: 'Parabéns! Você desbloqueou uma nova conquista!'
  },
  {
    id: 'notif5',
    type: 'weekly_report',
    enabled: true,
    channels: ['email'],
    schedule: {
      time: '09:00',
      days: [0], // Domingos
      frequency: 'weekly'
    },
    customMessage: 'Seu relatório semanal de estudos está pronto!'
  }
];

// Dados para diferentes tipos de usuários
export const mockUserProfiles: UserProfile[] = [
  mockUserProfile,
  {
    id: 'user2',
    name: 'Maria Eduarda Costa',
    email: 'maria.eduarda@email.com',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Eduarda&background=10b981&color=fff',
    dateOfBirth: '2004-07-22',
    location: 'Rio de Janeiro, RJ',
    education: {
      level: 'superior',
      institution: 'Universidade Federal do Rio de Janeiro',
      course: 'Medicina',
      year: 2022
    },
    goals: {
      primary: 'Residência Médica',
      secondary: ['Especialização em Cardiologia'],
      targetExam: 'Residência Médica',
      targetDate: '2025-03-15'
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: true,
        studyReminders: true,
        reviewReminders: true,
        goalDeadlines: true,
        achievements: false,
        weeklyReports: true
      },
      study: {
        defaultSessionDuration: 90,
        breakInterval: 20,
        dailyGoal: 8,
        preferredStudyTimes: ['06:00', '13:00', '20:00'],
        difficultyPreference: 'hard',
        reviewFrequency: 'daily'
      },
      interface: {
        theme: 'dark',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        compactMode: true
      },
      privacy: {
        profileVisibility: 'private',
        shareProgress: false,
        shareAchievements: false,
        allowRecommendations: true
      }
    },
    subscription: {
      plan: 'pro',
      status: 'active',
      startDate: '2023-08-01T10:00:00Z',
      endDate: '2024-08-01T10:00:00Z',
      features: [
        'unlimited_simulations',
        'ai_recommendations',
        'advanced_analytics',
        'premium_content',
        'priority_support',
        'personal_tutor',
        'custom_study_plans'
      ]
    },
    createdAt: '2023-08-01T10:00:00Z',
    updatedAt: '2024-01-28T16:45:00Z'
  },
  {
    id: 'user3',
    name: 'Carlos Roberto Oliveira',
    email: 'carlos.oliveira@email.com',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Roberto&background=f59e0b&color=fff',
    dateOfBirth: '1985-11-08',
    location: 'Belo Horizonte, MG',
    education: {
      level: 'superior',
      institution: 'Universidade Federal de Minas Gerais',
      course: 'Administração',
      year: 2008
    },
    goals: {
      primary: 'Concurso Público Federal',
      secondary: ['Tribunal de Contas', 'Receita Federal'],
      targetExam: 'Concurso TCU',
      targetDate: '2024-09-30'
    },
    preferences: {
      notifications: {
        email: true,
        push: false,
        sms: false,
        studyReminders: true,
        reviewReminders: true,
        goalDeadlines: true,
        achievements: true,
        weeklyReports: false
      },
      study: {
        defaultSessionDuration: 45,
        breakInterval: 10,
        dailyGoal: 4,
        preferredStudyTimes: ['05:30', '12:00', '18:30'],
        difficultyPreference: 'medium',
        reviewFrequency: 'weekly'
      },
      interface: {
        theme: 'auto',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        compactMode: false
      },
      privacy: {
        profileVisibility: 'public',
        shareProgress: true,
        shareAchievements: true,
        allowRecommendations: true
      }
    },
    subscription: {
      plan: 'free',
      status: 'active',
      startDate: '2024-01-01T10:00:00Z',
      features: [
        'basic_simulations',
        'basic_content',
        'community_access'
      ]
    },
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-30T09:15:00Z'
  }
];

// Configurações padrão para novos usuários
export const defaultUserPreferences: UserPreferences = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    studyReminders: true,
    reviewReminders: true,
    goalDeadlines: true,
    achievements: true,
    weeklyReports: true
  },
  study: {
    defaultSessionDuration: 60,
    breakInterval: 15,
    dailyGoal: 4,
    preferredStudyTimes: ['09:00', '14:00', '19:00'],
    difficultyPreference: 'adaptive',
    reviewFrequency: 'daily'
  },
  interface: {
    theme: 'light',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    compactMode: false
  },
  privacy: {
    profileVisibility: 'friends',
    shareProgress: true,
    shareAchievements: true,
    allowRecommendations: true
  }
};

// Funções auxiliares
export const getUserById = (userId: string): UserProfile | null => {
  return mockUserProfiles.find(user => user.id === userId) || null;
};

export const getUsersBySubscriptionPlan = (plan: 'free' | 'premium' | 'pro'): UserProfile[] => {
  return mockUserProfiles.filter(user => user.subscription.plan === plan);
};

export const getUsersByEducationLevel = (level: UserProfile['education']['level']): UserProfile[] => {
  return mockUserProfiles.filter(user => user.education.level === level);
};

export const getActiveSubscriptions = (): UserProfile[] => {
  return mockUserProfiles.filter(user => user.subscription.status === 'active');
};

export const getUserNotificationSettings = (_userId: string): NotificationSettings[] => {
  // Em um cenário real, isso seria filtrado por userId
  return mockNotificationSettings;
};

export const getSubscriptionFeatures = (plan: 'free' | 'premium' | 'pro'): string[] => {
  const featureMap = {
    free: [
      'basic_simulations',
      'basic_content',
      'community_access'
    ],
    premium: [
      'unlimited_simulations',
      'ai_recommendations',
      'advanced_analytics',
      'premium_content',
      'priority_support'
    ],
    pro: [
      'unlimited_simulations',
      'ai_recommendations',
      'advanced_analytics',
      'premium_content',
      'priority_support',
      'personal_tutor',
      'custom_study_plans',
      'api_access'
    ]
  };

  return featureMap[plan] || featureMap.free;
};

export const validateUserPreferences = (preferences: Partial<UserPreferences>): boolean => {
  // Validações básicas
  if (preferences.study?.defaultSessionDuration && 
      (preferences.study.defaultSessionDuration < 15 || preferences.study.defaultSessionDuration > 180)) {
    return false;
  }

  if (preferences.study?.dailyGoal && 
      (preferences.study.dailyGoal < 1 || preferences.study.dailyGoal > 16)) {
    return false;
  }

  if (preferences.study?.breakInterval && 
      (preferences.study.breakInterval < 5 || preferences.study.breakInterval > 60)) {
    return false;
  }

  return true;
};

export const getUserStats = () => {
  const total = mockUserProfiles.length;
  const byPlan = mockUserProfiles.reduce((acc, user) => {
    acc[user.subscription.plan] = (acc[user.subscription.plan] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byEducationLevel = mockUserProfiles.reduce((acc, user) => {
    acc[user.education.level] = (acc[user.education.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const activeSubscriptions = getActiveSubscriptions().length;
  const averageAge = mockUserProfiles
    .filter(user => user.dateOfBirth)
    .reduce((sum, user) => {
      const age = new Date().getFullYear() - new Date(user.dateOfBirth!).getFullYear();
      return sum + age;
    }, 0) / mockUserProfiles.filter(user => user.dateOfBirth).length;

  return {
    total,
    byPlan,
    byEducationLevel,
    activeSubscriptions,
    averageAge: Math.round(averageAge)
  };
};