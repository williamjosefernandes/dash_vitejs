// Centralized exports for all mock data
export * from './studyPlans';
export * from './events';
export * from './content';
export * from './history';
export * from './insights';
export * from './reviews';
export * from './settings';
export * from './simulations';
export * from './summaries';
export * from './trails';

// Importações necessárias para a função getDashboardData
import { mockSubjects, mockStudyStats } from './studyPlans';
import { mockEvents } from './events';

// Re-exportação dos tipos para facilitar importação
export type {
  StudyPlan,
  Subject,
  Topic,
  Exercise,
  Goal,
  Milestone,
  Metric,
  Instructor,
  StudyStats,
  Resource
} from './studyPlans';

export type {
  Event,
  Participant,
  Reminder
} from './events';

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

// Função para obter dados do dashboard
export const getDashboardData = () => {
  return {
    totalSubjects: mockSubjects.length,
    completedSubjects: mockSubjects.filter(s => s.progress === 100).length,
    totalStudyHours: mockStudyStats.totalStudyHours,
    weeklyAverage: mockStudyStats.weeklyAverage,
    upcomingEvents: mockEvents.filter(e => e.status === 'scheduled').slice(0, 5)
  };
};