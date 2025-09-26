// Tipos específicos para a funcionalidade de Planos de Estudo

export type StudyPlanCategory = 'concursos' | 'idiomas' | 'tecnologia' | 'academico' | 'certificacoes';

export type StudyPlanStatus = 'ativo' | 'pausado' | 'concluido' | 'cancelado';

export type DifficultyLevel = 'iniciante' | 'intermediario' | 'avancado';

export type Priority = 'baixa' | 'media' | 'alta';

export interface StudyPlanGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  isCompleted: boolean;
  progress: number;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  estimatedHours: number;
  completedHours: number;
  progress: number;
  difficulty: DifficultyLevel;
  priority: Priority;
  topics: StudyTopic[];
  resources: StudyResource[];
}

export interface StudyTopic {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  completedHours: number;
  progress: number;
  isCompleted: boolean;
  difficulty: DifficultyLevel;
  resources: StudyResource[];
  exercises: Exercise[];
}

export interface StudyResource {
  id: string;
  name: string;
  type: 'livro' | 'video' | 'artigo' | 'curso' | 'documento' | 'site';
  url?: string;
  description: string;
  isRequired: boolean;
  estimatedTime?: number;
}

export interface Exercise {
  id: string;
  title: string;
  type: 'multipla_escolha' | 'dissertativa' | 'pratica' | 'simulado';
  difficulty: DifficultyLevel;
  estimatedTime: number;
  points: number;
  isCompleted: boolean;
  score?: number;
  feedback?: string;
}

export interface StudyPlanMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  isCompleted: boolean;
  requirements: string[];
  reward?: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  category: StudyPlanCategory;
  status: StudyPlanStatus;
  difficulty: DifficultyLevel;
  
  // Datas
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  
  // Progresso
  progress: number;
  totalHours: number;
  completedHours: number;
  dailyHours: number;
  weeklyGoal: number;
  
  // Conteúdo
  subjects: StudyPlanSubject[];
  goals: StudyPlanGoal[];
  milestones: StudyPlanMilestone[];
  
  // Configurações
  color: string;
  icon: string;
  tags: string[];
  
  // Estatísticas
  streakDays: number;
  averageScore: number;
  completedExercises: number;
  totalExercises: number;
}

export interface StudyPlanStats {
  totalPlans: number;
  activePlans: number;
  completedPlans: number;
  totalStudyHours: number;
  weeklyAverage: number;
  monthlyAverage: number;
  overallProgress: number;
  streakDays: number;
  averageScore: number;
}

export interface StudyPlanFilters {
  category?: StudyPlanCategory;
  status?: StudyPlanStatus;
  difficulty?: DifficultyLevel;
  searchTerm?: string;
  sortBy?: 'title' | 'progress' | 'startDate' | 'endDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export interface StudySession {
  id: string;
  studyPlanId: string;
  subjectId: string;
  topicId?: string;
  startTime: string;
  endTime?: string;
  duration: number; // em minutos
  notes?: string;
  productivity: number; // 1-5
  mood: 'excelente' | 'bom' | 'regular' | 'ruim';
}