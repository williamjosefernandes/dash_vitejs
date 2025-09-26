// Tipos específicos para a funcionalidade de Trilhas

export type TrailCategory = 'enem' | 'vestibular' | 'concurso' | 'graduacao' | 'pos_graduacao' | 'certificacao' | 'idiomas' | 'tecnologia';

export type TrailDifficulty = 'iniciante' | 'intermediario' | 'avancado';

export type TrailStatus = 'ativo' | 'pausado' | 'descontinuado' | 'em_desenvolvimento';

export interface TrailSubject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  estimatedHours: number;
  difficulty: TrailDifficulty;
  topics: string[];
  order: number;
}

export interface TrailMilestone {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedWeeks: number;
  subjects: string[];
  requirements: string[];
}

export interface TrailPrerequisite {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  type: 'knowledge' | 'skill' | 'certification' | 'experience';
}

export interface TrailResource {
  id: string;
  name: string;
  type: 'livro' | 'video' | 'artigo' | 'curso' | 'documento' | 'site' | 'simulado';
  url?: string;
  description: string;
  isRequired: boolean;
  estimatedTime?: number;
  cost?: number;
  provider?: string;
}

export interface TrailObjective {
  id: string;
  title: string;
  description: string;
  type: 'knowledge' | 'skill' | 'certification' | 'score';
  measurable: boolean;
  target?: string;
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: TrailCategory;
  difficulty: TrailDifficulty;
  status: TrailStatus;
  
  // Informações básicas
  estimatedDuration: string; // ex: "6 meses"
  totalHours: number;
  weeklyHours: number;
  
  // Conteúdo
  subjects: TrailSubject[];
  milestones: TrailMilestone[];
  objectives: TrailObjective[];
  prerequisites: TrailPrerequisite[];
  resources: TrailResource[];
  
  // Metadados
  targetAudience: string;
  successRate: number; // percentual de sucesso dos usuários
  enrolledStudents: number;
  completedStudents: number;
  rating: number;
  reviewsCount: number;
  
  // Visual
  color: string;
  icon: string;
  thumbnail?: string;
  tags: string[];
  
  // Configurações
  isPublic: boolean;
  isCustomizable: boolean;
  allowsModification: boolean;
  
  // Criação e atualização
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  
  // Estatísticas de uso
  views: number;
  plansCreated: number;
  lastUsed?: string;
}

export interface TrailStats {
  totalTrails: number;
  activeTrails: number;
  popularTrails: number;
  totalEnrollments: number;
  averageRating: number;
  averageCompletionRate: number;
  totalPlansCreated: number;
  categoriesCount: {
    [key in TrailCategory]: number;
  };
}

export interface TrailFilters {
  category?: TrailCategory;
  difficulty?: TrailDifficulty;
  status?: TrailStatus;
  searchTerm?: string;
  minRating?: number;
  maxDuration?: number;
  tags?: string[];
  sortBy?: 'title' | 'rating' | 'popularity' | 'duration' | 'createdAt' | 'enrollments';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateStudyPlanFromTrail {
  trailId: string;
  customizations?: {
    title?: string;
    startDate?: string;
    endDate?: string;
    dailyHours?: number;
    excludeSubjects?: string[];
    additionalSubjects?: string[];
    modifySchedule?: boolean;
  };
}

export interface TrailUsageAnalytics {
  trailId: string;
  views: number;
  plansCreated: number;
  completionRate: number;
  averageStudyTime: number;
  popularSubjects: string[];
  commonCustomizations: string[];
  userFeedback: {
    rating: number;
    comments: string[];
  };
}