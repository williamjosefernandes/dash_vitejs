export type StudyTopicStatus = 'not_studied' | 'in_progress' | 'completed';

export interface StudyTopic {
  id: string;
  name: string;
  description?: string;
  disciplineId: string;
  status: StudyTopicStatus;
  totalStudyTime: number; // tempo total em milissegundos
  targetHours?: number; // meta de horas para este tópico
  isTimerRunning: boolean;
  currentSessionStart?: number; // timestamp do início da sessão atual
  sessions: StudyTopicSession[];
  createdAt: string;
  updatedAt: string;
  order: number; // ordem dentro da disciplina
}

export interface StudyTopicSession {
  id: string;
  topicId: string;
  startTime: number;
  endTime: number;
  duration: number; // duração em milissegundos
  date: string; // formato YYYY-MM-DD
  notes?: string;
}

export interface StudyDisciplineWithTopics {
  id: string;
  name: string;
  description?: string;
  color: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  status: 'Ativo' | 'Pausado' | 'Concluído';
  topics: StudyTopic[];
  totalStudyTime: number; // soma de todos os tópicos
  targetHours?: number; // meta total da disciplina
  createdAt: string;
  updatedAt: string;
  isExpanded?: boolean; // para controle de expansão na UI
}

export interface StudyTopicStats {
  totalTopics: number;
  notStudiedTopics: number;
  inProgressTopics: number;
  completedTopics: number;
  totalStudyTime: number;
  todayStudyTime: number;
  weekStudyTime: number;
  averageSessionTime: number;
  totalSessions: number;
  disciplineStats: {
    [disciplineId: string]: {
      totalTime: number;
      completedTopics: number;
      totalTopics: number;
      progress: number; // percentual de conclusão
    };
  };
}