export interface Step {
  number: number;
  title?: string;
  completed?: boolean;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  selected?: boolean;
}

export interface Subtopic {
  id: string;
  title: string;
  type: string;
  selected?: boolean;
  expanded?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  subtopics?: Subtopic[];
  selected?: boolean;
  expanded?: boolean;
}

export interface Discipline {
  id: string;
  title: string;
  topics?: Topic[];
  selected?: boolean;
  expanded?: boolean;
}

export interface WeekScheduleDay {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  totalHours: string;
}

export interface ScheduleSubject {
  name: string;
  time: string;
  duration: string;
  type: string;
  content: string;
  contentType: string;
}

export interface StudySequenceItem {
  id: string;
  order: number;
  title: string;
  type: string;
  duration: string;
}

export interface ScheduleDataItem {
  date: string;
  subjects: ScheduleSubject[];
}

export interface ScheduleData extends Array<ScheduleDataItem> {}

export interface DetailedScheduleItem {
  id: string;
  time: string;
  subject: string;
  content: string;
  duration: string;
  status: 'Concluído' | 'Em andamento' | 'Pendente' | 'Agendado';
  type: string;
}

export interface DetailedSchedule extends Array<DetailedScheduleItem> {}

export interface SubjectColors {
  [key: string]: {
    bg: string;
    border: string;
    text: string;
  };
}

export interface ScheduleMode {
  type: string;
  selectedOption: string;
}

export interface DisciplineTableData {
  id: string;
  name: string;
  totalContent: number;
  completionDate: string;
  studyPlans: string[];
}

export interface CronogramaItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Ativo' | 'Pausado' | 'Concluído' | 'Cancelado';
  priority: 'Alta' | 'Média' | 'Baixa';
  totalHours: number;
  completedHours: number;
  subjects: string[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface CronogramaFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Ativo' | 'Pausado' | 'Concluído' | 'Cancelado';
  priority: 'Alta' | 'Média' | 'Baixa';
  totalHours: number;
  subjects: string[];
}

// Tipos para o sistema de cronômetro de estudos
export interface StudyTimer {
  id: string;
  disciplineId: string;
  isRunning: boolean;
  startTime: number | null;
  totalTime: number; // tempo total em milissegundos
  sessions: StudySession[];
}

export interface StudySession {
  id: string;
  startTime: number;
  endTime: number;
  duration: number; // duração em milissegundos
  date: string; // formato YYYY-MM-DD
}

export interface StudyDiscipline {
  id: string;
  name: string;
  content: string[];
  color: string;
  totalStudyTime: number; // tempo total estudado em milissegundos
  targetHours?: number; // meta de horas de estudo
  priority: 'Alta' | 'Média' | 'Baixa';
  status: 'Ativo' | 'Pausado' | 'Concluído';
  createdAt: string;
  updatedAt: string;
}

export interface StudyStats {
  totalTime: number;
  todayTime: number;
  weekTime: number;
  monthTime: number;
  averageSessionTime: number;
  totalSessions: number;
  disciplineStats: {
    [disciplineId: string]: {
      totalTime: number;
      sessions: number;
      lastStudied: string;
    };
  };
}

export interface CriarCronogramaPageProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  courses: Course[];
  disciplines: Discipline[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  contentSearchTerm: string;
  setContentSearchTerm: (term: string) => void;
  scheduleMode: ScheduleMode;
  setScheduleMode: (mode: ScheduleMode) => void;
  scheduleName: string;
  setScheduleName: (name: string) => void;
  dailyWorkload: string;
  setDailyWorkload: (workload: string) => void;
  timeSuggestions: string[];
  copyFromDay: string;
  setCopyFromDay: (day: string) => void;
  copyToDay: string;
  setCopyToDay: (day: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  currentYear: string;
  setCurrentYear: (year: string) => void;
  mockScheduleData: ScheduleData;
  mockDetailedSchedule: DetailedSchedule;
  disciplinesTableData: DisciplineTableData[];
  subjectColors: SubjectColors;
  studyStartDate: string;
  setStudyStartDate: (date: string) => void;
  studyEndDate: string;
  setStudyEndDate: (date: string) => void;
  weekSchedule: WeekScheduleDay[];
  setWeekSchedule: (schedule: WeekScheduleDay[] | ((prev: WeekScheduleDay[]) => WeekScheduleDay[])) => void;
  studySequence: StudySequenceItem[];
  setStudySequence: (sequence: StudySequenceItem[] | ((prev: StudySequenceItem[]) => StudySequenceItem[])) => void;
  toggleCourseSelection: (courseId: string) => void;
  toggleDisciplineExpansion: (disciplineId: string) => void;
  toggleDisciplineSelection: (disciplineId: string) => void;
  toggleTopicExpansion: (disciplineId: string, topicId: string) => void;
  toggleTopicSelection: (disciplineId: string, topicId: string) => void;
  toggleSubtopicSelection: (disciplineId: string, topicId: string, subtopicId: string) => void;
  updateScheduleTime: (index: string, field: string, value: string) => void;
  getContentIcon: (type: string) => string;
  getContentInfo: (id: string | any) => any;
  draggedItem: StudySequenceItem | null;
  setDraggedItem: (item: StudySequenceItem | null) => void;
  reviewFrequency?: string;
  setReviewFrequency?: (frequency: string) => void;
  reviewDay?: string;
  setReviewDay?: (day: string) => void;
  reviewWorkload?: string;
  setReviewWorkload?: (workload: string) => void;
}