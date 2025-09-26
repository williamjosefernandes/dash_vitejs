// Tipos para Eventos e Atividades
export interface Event {
  id: string;
  title: string;
  type: 'study' | 'class' | 'exam' | 'review' | 'assignment' | 'meeting' | 'workshop' | 'seminar';
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
  location: string;
  color: string;
  participants?: Participant[];
  resources?: Resource[];
  reminders?: Reminder[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Tipos para Participantes
export interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'tutor' | 'coordinator' | 'guest';
  avatar?: string;
  status: 'confirmed' | 'pending' | 'declined';
}

// Tipos para Recursos
export interface Resource {
  id: string;
  name: string;
  type: 'book' | 'video' | 'document' | 'link' | 'software' | 'equipment';
  url?: string;
  description?: string;
  isRequired: boolean;
}

// Tipos para Lembretes
export interface Reminder {
  id: string;
  type: 'email' | 'push' | 'sms';
  time: number; // minutos antes do evento
  message?: string;
}

// Tipos para Planos de Estudo
export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  subjects: Subject[];
  duration: string;
  progress: number;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  dailyHours: number;
  weeklyGoal: number;
  totalHours: number;
  completedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goals: Goal[];
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

// Tipos para Disciplinas/Matérias
export interface Subject {
  id: string;
  name: string;
  code?: string;
  description?: string;
  color: string;
  icon: string;
  topics: Topic[];
  progress: number;
  totalHours: number;
  completedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  priority: 'low' | 'medium' | 'high';
  instructor?: Instructor;
}

// Tipos para Tópicos
export interface Topic {
  id: string;
  name: string;
  description?: string;
  estimatedHours: number;
  completedHours: number;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'review_needed';
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites?: string[];
  resources: Resource[];
  exercises?: Exercise[];
  deadline?: string;
}

// Tipos para Exercícios
export interface Exercise {
  id: string;
  title: string;
  type: 'multiple_choice' | 'essay' | 'practical' | 'project';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // em minutos
  points: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'reviewed';
  dueDate?: string;
  feedback?: string;
  score?: number;
}

// Tipos para Objetivos
export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'short_term' | 'medium_term' | 'long_term';
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  metrics: Metric[];
}

// Tipos para Marcos/Milestones
export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  requirements: string[];
  reward?: string;
}

// Tipos para Métricas
export interface Metric {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  type: 'hours' | 'exercises' | 'score' | 'percentage';
}

// Tipos para Instrutores
export interface Instructor {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  avatar?: string;
  rating?: number;
  bio?: string;
}

// Tipos para Estatísticas
export interface StudyStats {
  totalStudyHours: number;
  weeklyAverage: number;
  monthlyAverage: number;
  completedEvents: number;
  pendingEvents: number;
  subjectsInProgress: number;
  completedSubjects: number;
  averageScore: number;
  streakDays: number;
  productivityScore: number;
}

// Tipos para Configurações de Planejamento
export interface PlanningSettings {
  defaultStudyDuration: number;
  breakInterval: number;
  reminderSettings: {
    enabled: boolean;
    defaultTime: number;
    types: ('email' | 'push' | 'sms')[];
  };
  workingHours: {
    start: string;
    end: string;
    workingDays: number[];
  };
  preferences: {
    theme: string;
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
  };
}

// ========== METODOLOGIA ÁGIL - CICLOS ==========

// Item do Backlog de Conteúdos
export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  discipline?: string;
  subject: string;
  contentType?: 'aula' | 'resumo' | 'questao' | 'simulado' | 'revisao' | 'projeto';
  type: 'teoria' | 'exercicio' | 'revisao' | 'simulado';
  priority: 'alta' | 'media' | 'baixa';
  estimatedHours: number;
  difficulty?: 'facil' | 'medio' | 'dificil';
  status: 'pendente' | 'em_andamento' | 'concluido';
  tags: string[];
  prerequisites?: string[]; // IDs de outros itens do backlog
  resources?: Resource[];
  createdAt: Date | string;
  updatedAt?: Date | string;
}

// Item de Ciclo (tarefa selecionada do backlog para o ciclo atual)
export interface CycleItem {
  id: string;
  backlogItemId: string;
  cycleId: string;
  status: 'pendente' | 'em_andamento' | 'concluido' | 'bloqueado';
  startedAt?: string;
  completedAt?: string;
  actualHours?: number;
  notes?: string;
  blockers?: string[]; // Descrição dos bloqueios
  position: number; // Para ordenação no Kanban
}

// Ciclo (equivalente a Sprint do Scrum)
export interface StudyCycle {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number; // em dias (padrão 7)
  status: 'planejamento' | 'ativo' | 'concluido' | 'cancelado';
  goal: string; // Objetivo principal do ciclo
  items: CycleItem[];
  totalEstimatedHours: number;
  totalCompletedHours: number;
  completionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// Daily Standup (Check-in Diário)
export interface DailyStandup {
  id: string;
  cycleId: string;
  date: string;
  studiedYesterday: string[]; // IDs dos itens estudados ontem
  planToStudyToday: string[]; // IDs dos itens planejados para hoje
  blockers: DailyBlocker[];
  mood: 'muito_baixo' | 'baixo' | 'neutro' | 'alto' | 'muito_alto';
  energyLevel: 'muito_baixo' | 'baixo' | 'neutro' | 'alto' | 'muito_alto';
  notes?: string;
  createdAt: string;
}

// Bloqueio identificado no Daily Standup
export interface DailyBlocker {
  id: string;
  description: string;
  type: 'tecnico' | 'motivacional' | 'tempo' | 'recurso' | 'saude' | 'outro';
  severity: 'baixa' | 'media' | 'alta' | 'critica';
  solution?: string;
  resolvedAt?: string;
}

// Retrospectiva do Ciclo
export interface CycleRetrospective {
  id: string;
  cycleId: string;
  completedItems: number;
  pendingItems: number;
  totalHoursStudied: number;
  averageDailyHours: number;
  simulationScores: number[];
  averageSimulationScore: number;
  completedDisciplines: string[];
  
  // Análise qualitativa
  whatWentWell: string[];
  whatCouldImprove: string[];
  lessonsLearned: string[];
  actionItemsNextCycle: string[];
  
  // Métricas de desempenho
  productivityScore: number; // 0-100
  consistencyScore: number; // 0-100 (baseado na regularidade dos estudos)
  focusScore: number; // 0-100 (baseado na conclusão de itens iniciados)
  
  // Recomendações da IA
  aiRecommendations: string[];
  suggestedAdjustments: {
    dailyHours?: number;
    cycleDuration?: number;
    priorityFocus?: string[];
  };
  
  createdAt: string;
}

// Backlog de Conteúdos (lista completa)
export interface StudyBacklog {
  id: string;
  name: string;
  description: string;
  items: BacklogItem[];
  totalItems: number;
  completedItems: number;
  estimatedTotalHours: number;
  completedHours: number;
  disciplines: string[];
  createdAt: string;
  updatedAt: string;
}

// Métricas do Ciclo para Dashboard
export interface CycleMetrics {
  currentCycle?: StudyCycle;
  totalCycles: number;
  completedCycles: number;
  averageCycleCompletion: number;
  totalStudyHours: number;
  averageHoursPerCycle: number;
  currentStreak: number; // dias consecutivos de estudo
  longestStreak: number;
  weeklyConsistency: number; // 0-100
  monthlyProgress: number; // 0-100
}

// Configurações da Metodologia Ágil
export interface AgileStudySettings {
  defaultCycleDuration: number; // em dias
  dailyStudyGoal: number; // em horas
  enableDailyStandup: boolean;
  standupReminderTime: string; // HH:MM
  enableRetrospectiveReminder: boolean;
  autoCreateNextCycle: boolean;
  maxItemsPerCycle: number;
  priorityWeights: {
    alta: number;
    media: number;
    baixa: number;
  };
}