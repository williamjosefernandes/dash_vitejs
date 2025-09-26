export interface StudySession {
  id: string;
  disciplineId: string;
  disciplineName: string;
  contentId: string;
  contentName: string;
  contentType: 'topic' | 'subtopic' | 'exercise' | 'review';
  startTime: Date;
  endTime?: Date;
  duration: number; // em segundos
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyItem {
  id: string;
  disciplineId: string;
  disciplineName: string;
  contentId: string;
  contentName: string;
  contentType: 'topic' | 'subtopic' | 'exercise' | 'review';
  description?: string;
  estimatedDuration?: number; // em minutos
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  totalTimeSpent: number; // em segundos
  sessions: StudySession[];
  scheduledDate?: string;
  dueDate?: string;
  tags?: string[];
  progress: number; // 0-100
}

export interface StudyProgress {
  disciplineId: string;
  disciplineName: string;
  totalItems: number;
  completedItems: number;
  totalTimeSpent: number; // em segundos
  averageSessionTime: number; // em segundos
  lastStudyDate?: Date;
  streak: number; // dias consecutivos de estudo
  weeklyGoal: number; // horas por semana
  weeklyProgress: number; // horas estudadas na semana atual
}

export interface StudyStats {
  totalTimeToday: number;
  totalTimeWeek: number;
  totalTimeMonth: number;
  sessionsToday: number;
  sessionsWeek: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionTime: number;
  mostStudiedDiscipline: string;
  completionRate: number;
}