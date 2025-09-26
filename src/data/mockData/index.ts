import { PlanningSettings } from '../../types/planning';

// Exportações centralizadas dos dados mockados
export * from './events';
export * from './studyPlans';
export * from './reviews';
export * from './trails';
export * from './content';
export * from './summaries';
export * from './simulations';
export * from './insights';
export * from './history';
export * from './settings';

// Re-exportação dos tipos para facilitar importação
export type {
  Event,
  Participant,
  Resource,
  Reminder,
  StudyPlan,
  Subject,
  Topic,
  Exercise,
  Goal,
  Milestone,
  Metric,
  Instructor,
  StudyStats,
  PlanningSettings
} from '../../types/planning';

export type {
  Review,
  ReviewSession,
  SpacedRepetitionSettings,
  Trail,
  TrailStep,
  Content,
  ContentFilter,
  Summary,
  MindMap,
  MindMapNode,
  MindMapConnection,
  Simulation,
  Question,
  QuestionOption,
  SimulationAttempt,
  SimulationAnswer,
  SubjectScore,
  SimulationReport,
  Insight,
  InsightAction,
  AIRecommendation,
  ActivityLog,
  StudyStreak,
  Achievement,
  AchievementRequirement,
  DetailedStats,
  SubjectStats,
  WeeklyStats,
  DailyStats,
  MonthlyStats,
  GoalStats,
  UserProfile,
  UserPreferences,
  NotificationSettings,
  SearchFilters,
  PaginationParams,
  ApiResponse,
  ErrorResponse
} from '../../types/gabaritte';

// Dados consolidados para dashboard
export const getDashboardData = () => {
  return {
    totalEvents: 8,
    activeStudyPlans: 4,
    completedHours: 1250,
    averageScore: 8.3,
    upcomingDeadlines: 5,
    streakDays: 15
  };
};

// Configurações padrão do sistema
export const defaultPlanningSettings: PlanningSettings = {
  defaultStudyDuration: 120, // 2 horas em minutos
  breakInterval: 15, // 15 minutos
  reminderSettings: {
    enabled: true,
    defaultTime: 30, // 30 minutos antes
    types: ['push', 'email']
  },
  workingHours: {
    start: '08:00',
    end: '22:00',
    workingDays: [1, 2, 3, 4, 5, 6] // Segunda a sábado
  },
  preferences: {
    theme: 'light',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  }
};