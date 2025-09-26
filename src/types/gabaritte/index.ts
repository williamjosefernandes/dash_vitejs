// Tipos específicos para o sistema Gabaritte

// ============= REVISÕES =============
export interface Review {
  id: string;
  subjectId: string;
  topicId: string;
  type: 'spaced_repetition' | 'quick_review' | 'deep_review' | 'practice';
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'completed' | 'skipped' | 'overdue';
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: 1 | 2 | 3 | 4 | 5; // 1 = muito difícil, 5 = muito fácil
  timeSpent: number; // em minutos
  nextReviewDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSession {
  id: string;
  date: string;
  reviews: Review[];
  totalTime: number;
  completedReviews: number;
  averageConfidence: number;
  status: 'active' | 'completed' | 'paused';
}

export interface SpacedRepetitionSettings {
  easyInterval: number; // dias
  mediumInterval: number;
  hardInterval: number;
  graduatingInterval: number;
  lapseInterval: number;
  maximumInterval: number;
}

// ============= TRILHAS =============
export interface Trail {
  id: string;
  title: string;
  description: string;
  category: 'enem' | 'vestibular' | 'concurso' | 'graduacao' | 'pos_graduacao' | 'certificacao';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string; // ex: "6 meses"
  totalHours: number;
  subjects: string[]; // IDs das disciplinas
  prerequisites?: string[];
  objectives: string[];
  targetAudience: string;
  isPublic: boolean;
  isCustomizable: boolean;
  rating: number;
  enrolledStudents: number;
  createdBy: string;
  tags: string[];
  thumbnail?: string;
  progress?: number; // para usuário logado
  enrolledAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrailStep {
  id: string;
  trailId: string;
  order: number;
  type: 'subject' | 'topic' | 'exercise' | 'assessment' | 'project';
  contentId: string;
  title: string;
  description: string;
  estimatedTime: number;
  isRequired: boolean;
  prerequisites?: string[];
  status: 'locked' | 'available' | 'in_progress' | 'completed';
}

// ============= CONTEÚDO =============
export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'article' | 'exercise' | 'quiz' | 'simulation' | 'infographic';
  category: string;
  subjects: string[]; // IDs das disciplinas
  topics: string[]; // IDs dos tópicos
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // em minutos
  fileUrl?: string;
  thumbnailUrl?: string;
  author: string;
  source: string;
  language: string;
  tags: string[];
  rating: number;
  views: number;
  downloads: number;
  isFree: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentFilter {
  subjects?: string[];
  topics?: string[];
  types?: Content['type'][];
  difficulty?: Content['difficulty'][];
  duration?: {
    min: number;
    max: number;
  };
  isFree?: boolean;
  isPremium?: boolean;
  rating?: number;
  search?: string;
}

// ============= RESUMOS =============
export interface Summary {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'mind_map' | 'flashcard' | 'outline' | 'concept_map';
  format: 'markdown' | 'html' | 'json' | 'pdf';
  subjectId: string;
  topicId?: string;
  tags: string[];
  isPublic: boolean;
  isAIGenerated: boolean;
  aiPrompt?: string;
  createdBy: string;
  sharedWith?: string[];
  rating?: number;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
}

export interface MindMap {
  id: string;
  summaryId: string;
  nodes: MindMapNode[];
  connections: MindMapConnection[];
  layout: 'radial' | 'tree' | 'force' | 'hierarchical';
  theme: string;
}

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  level: number;
  color: string;
  size: 'small' | 'medium' | 'large';
  shape: 'circle' | 'rectangle' | 'ellipse';
}

export interface MindMapConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'solid' | 'dashed' | 'dotted';
  color: string;
  label?: string;
}

// ============= SIMULADOS =============
export interface Simulation {
  id: string;
  title: string;
  description: string;
  type: 'complete' | 'custom' | 'subject_specific' | 'topic_specific';
  category: 'enem' | 'vestibular' | 'concurso' | 'certificacao';
  subjects: string[];
  topics?: string[];
  totalQuestions: number;
  duration: number; // em minutos
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
  questions: Question[];
  passingScore?: number;
  isPublic: boolean;
  createdBy: string;
  tags: string[];
  attempts: number;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'essay' | 'fill_blank' | 'matching';
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: QuestionOption[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  timeLimit?: number;
  tags: string[];
  source?: string;
  year?: number;
  createdAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface SimulationAttempt {
  id: string;
  simulationId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  answers: SimulationAnswer[];
  score: number;
  percentage: number;
  timeSpent: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  subjectScores: SubjectScore[];
}

export interface SimulationAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
  confidence?: 1 | 2 | 3 | 4 | 5;
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  averageTime: number;
}

export interface SimulationReport {
  attempt: SimulationAttempt;
  ranking?: {
    position: number;
    totalParticipants: number;
    percentile: number;
  };
  recommendations: string[];
  weakAreas: string[];
  strongAreas: string[];
  studyPlan?: string[];
}

// ============= INSIGHTS =============
export interface Insight {
  id: string;
  type: 'performance' | 'study_pattern' | 'recommendation' | 'warning' | 'achievement';
  title: string;
  description: string;
  data: any;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'study_time' | 'performance' | 'progress' | 'behavior' | 'goals';
  isRead: boolean;
  actionable: boolean;
  actions?: InsightAction[];
  generatedAt: string;
  expiresAt?: string;
}

export interface InsightAction {
  id: string;
  label: string;
  type: 'navigate' | 'create' | 'update' | 'schedule';
  target: string;
  params?: any;
}

export interface AIRecommendation {
  id: string;
  type: 'study_schedule' | 'content' | 'review' | 'break' | 'goal_adjustment';
  title: string;
  description: string;
  reasoning: string;
  confidence: number; // 0-1
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  estimatedBenefit: string;
  implementationSteps: string[];
  relatedSubjects?: string[];
  relatedTopics?: string[];
  createdAt: string;
  implementedAt?: string;
  feedback?: 'helpful' | 'not_helpful' | 'partially_helpful';
}

// ============= HISTÓRICO =============
export interface ActivityLog {
  id: string;
  userId: string;
  type: 'study' | 'review' | 'simulation' | 'content_access' | 'goal_update' | 'achievement';
  action: string;
  description: string;
  entityType: 'subject' | 'topic' | 'simulation' | 'content' | 'goal' | 'milestone';
  entityId: string;
  entityName: string;
  metadata: any;
  duration?: number;
  score?: number;
  timestamp: string;
}

export interface StudyStreak {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  currentDays: number;
  longestStreak: number;
  isActive: boolean;
  lastActivityDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'study_time' | 'consistency' | 'performance' | 'completion' | 'social';
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirements: AchievementRequirement[];
  reward?: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
}

export interface AchievementRequirement {
  type: 'study_hours' | 'streak_days' | 'simulation_score' | 'subjects_completed' | 'reviews_completed';
  target: number;
  current: number;
}

// ============= ESTATÍSTICAS =============
export interface DetailedStats {
  overview: {
    totalStudyTime: number;
    totalSessions: number;
    averageSessionTime: number;
    currentStreak: number;
    longestStreak: number;
    totalAchievements: number;
  };
  performance: {
    averageScore: number;
    simulationsCompleted: number;
    questionsAnswered: number;
    correctAnswerRate: number;
    improvementRate: number;
  };
  subjects: SubjectStats[];
  weekly: WeeklyStats[];
  monthly: MonthlyStats[];
  goals: GoalStats[];
}

export interface SubjectStats {
  subjectId: string;
  subjectName: string;
  totalTime: number;
  sessionsCount: number;
  averageScore: number;
  progress: number;
  lastStudied: string;
  strongTopics: string[];
  weakTopics: string[];
}

export interface WeeklyStats {
  week: string; // YYYY-WW
  totalTime: number;
  sessionsCount: number;
  averageScore: number;
  goalsCompleted: number;
  dailyBreakdown: DailyStats[];
}

export interface DailyStats {
  date: string;
  studyTime: number;
  sessionsCount: number;
  activitiesCompleted: number;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  totalTime: number;
  sessionsCount: number;
  averageScore: number;
  goalsCompleted: number;
  milestonesReached: number;
  weeklyBreakdown: WeeklyStats[];
}

export interface GoalStats {
  goalId: string;
  goalTitle: string;
  progress: number;
  targetDate: string;
  onTrack: boolean;
  estimatedCompletion: string;
  weeklyProgress: number[];
}

// ============= CONFIGURAÇÕES =============
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  location?: string;
  education: {
    level: 'fundamental' | 'medio' | 'superior' | 'pos_graduacao';
    institution?: string;
    course?: string;
    year?: number;
  };
  goals: {
    primary: string;
    secondary?: string[];
    targetExam?: string;
    targetDate?: string;
  };
  preferences: UserPreferences;
  subscription: {
    plan: 'free' | 'premium' | 'pro';
    status: 'active' | 'cancelled' | 'expired';
    startDate: string;
    endDate?: string;
    features: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    studyReminders: boolean;
    reviewReminders: boolean;
    goalDeadlines: boolean;
    achievements: boolean;
    weeklyReports: boolean;
  };
  study: {
    defaultSessionDuration: number;
    breakInterval: number;
    dailyGoal: number;
    preferredStudyTimes: string[];
    difficultyPreference: 'adaptive' | 'easy' | 'medium' | 'hard';
    reviewFrequency: 'daily' | 'weekly' | 'custom';
  };
  interface: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    compactMode: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    shareProgress: boolean;
    shareAchievements: boolean;
    allowRecommendations: boolean;
  };
}

export interface NotificationSettings {
  id: string;
  type: 'study_reminder' | 'review_reminder' | 'goal_deadline' | 'achievement' | 'weekly_report';
  enabled: boolean;
  channels: ('email' | 'push' | 'sms')[];
  schedule?: {
    time: string;
    days: number[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  customMessage?: string;
}

// ============= TIPOS AUXILIARES =============
export interface SearchFilters {
  query?: string;
  subjects?: string[];
  topics?: string[];
  difficulty?: string[];
  type?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'relevance' | 'date' | 'rating' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationParams;
}

export interface ErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: any;
}