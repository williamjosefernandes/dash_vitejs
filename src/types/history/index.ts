export interface HistoryRecord {
  id: string;
  date: string;
  time: string;
  category: 'study' | 'review' | 'simulation' | 'planning' | 'other';
  type: string;
  title: string;
  description: string;
  duration?: number; // em minutos
  subject?: string;
  status: 'completed' | 'in_progress' | 'cancelled';
  score?: number;
  notes?: string;
  tags?: string[];
}

export interface HistoryCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface HistoryFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  categories: string[];
  subjects: string[];
  status: string[];
  searchTerm: string;
}

export interface HistoryStats {
  totalRecords: number;
  totalStudyTime: number; // em minutos
  completedActivities: number;
  averageScore: number;
  mostStudiedSubject: string;
  streakDays: number;
}

export interface ExportOptions {
  format: 'csv' | 'pdf' | 'json';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  includeStats: boolean;
  categories: string[];
}

export interface HistoryPageProps {
  records: HistoryRecord[];
  categories: HistoryCategory[];
  filters: HistoryFilters;
  stats: HistoryStats;
  loading: boolean;
  onFilterChange: (filters: HistoryFilters) => void;
  onExport: (options: ExportOptions) => void;
  onRecordDelete: (recordId: string) => void;
  onRecordEdit: (record: HistoryRecord) => void;
}

export interface TimelineItem extends HistoryRecord {
  isToday?: boolean;
  isFirstOfMonth?: boolean;
  groupDate?: string;
}

export interface HistoryGroupedData {
  [date: string]: HistoryRecord[];
}