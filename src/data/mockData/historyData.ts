import { HistoryRecord, HistoryCategory, HistoryStats } from '../../types/history';

export const mockHistoryCategories: HistoryCategory[] = [
  {
    id: 'study',
    name: 'Estudos',
    icon: 'HiBookOpen',
    color: 'blue',
    count: 45
  },
  {
    id: 'review',
    name: 'Revisões',
    icon: 'HiRefresh',
    color: 'green',
    count: 23
  },
  {
    id: 'simulation',
    name: 'Simulados',
    icon: 'HiClipboardCheck',
    color: 'purple',
    count: 12
  },
  {
    id: 'planning',
    name: 'Planejamento',
    icon: 'HiCalendar',
    color: 'orange',
    count: 8
  },
  {
    id: 'other',
    name: 'Outros',
    icon: 'HiDotsHorizontal',
    color: 'gray',
    count: 5
  }
];

export const mockHistoryRecords: HistoryRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '14:30',
    category: 'study',
    type: 'Aula Teórica',
    title: 'Direito Constitucional - Princípios Fundamentais',
    description: 'Estudo dos princípios fundamentais da Constituição Federal',
    duration: 120,
    subject: 'Direito Constitucional',
    status: 'completed',
    notes: 'Conteúdo bem assimilado, fazer revisão em 3 dias',
    tags: ['constitucional', 'princípios', 'teoria']
  },
  {
    id: '2',
    date: '2024-01-15',
    time: '16:45',
    category: 'review',
    type: 'Revisão',
    title: 'Revisão de Direito Penal - Crimes contra a Pessoa',
    description: 'Revisão dos principais crimes contra a pessoa',
    duration: 60,
    subject: 'Direito Penal',
    status: 'completed',
    score: 85,
    notes: 'Boa fixação do conteúdo',
    tags: ['penal', 'crimes', 'revisão']
  },
  {
    id: '3',
    date: '2024-01-14',
    time: '09:00',
    category: 'simulation',
    type: 'Simulado',
    title: 'Simulado OAB - 1ª Fase',
    description: 'Simulado completo da primeira fase do exame da OAB',
    duration: 300,
    subject: 'Geral',
    status: 'completed',
    score: 78,
    notes: 'Preciso melhorar em Direito Tributário',
    tags: ['oab', 'simulado', 'primeira-fase']
  },
  {
    id: '4',
    date: '2024-01-14',
    time: '15:20',
    category: 'study',
    type: 'Exercícios',
    title: 'Exercícios de Direito Administrativo',
    description: 'Resolução de questões sobre atos administrativos',
    duration: 90,
    subject: 'Direito Administrativo',
    status: 'completed',
    score: 92,
    tags: ['administrativo', 'exercícios', 'atos']
  },
  {
    id: '5',
    date: '2024-01-13',
    time: '10:15',
    category: 'planning',
    type: 'Planejamento',
    title: 'Organização do Cronograma Semanal',
    description: 'Planejamento das atividades de estudo para a semana',
    duration: 45,
    status: 'completed',
    tags: ['cronograma', 'planejamento', 'organização']
  },
  {
    id: '6',
    date: '2024-01-13',
    time: '14:00',
    category: 'study',
    type: 'Videoaula',
    title: 'Direito Civil - Contratos',
    description: 'Videoaula sobre teoria geral dos contratos',
    duration: 150,
    subject: 'Direito Civil',
    status: 'completed',
    notes: 'Conteúdo extenso, dividir em duas sessões na próxima vez',
    tags: ['civil', 'contratos', 'videoaula']
  },
  {
    id: '7',
    date: '2024-01-12',
    time: '16:30',
    category: 'review',
    type: 'Flashcards',
    title: 'Revisão com Flashcards - Direito Processual Civil',
    description: 'Revisão rápida usando flashcards dos principais conceitos',
    duration: 30,
    subject: 'Direito Processual Civil',
    status: 'completed',
    score: 88,
    tags: ['processual-civil', 'flashcards', 'revisão-rápida']
  },
  {
    id: '8',
    date: '2024-01-12',
    time: '08:45',
    category: 'study',
    type: 'Leitura',
    title: 'Leitura de Doutrina - Direito Empresarial',
    description: 'Leitura de capítulo sobre sociedades empresárias',
    duration: 105,
    subject: 'Direito Empresarial',
    status: 'completed',
    tags: ['empresarial', 'doutrina', 'sociedades']
  }
];

export const mockHistoryStats: HistoryStats = {
  totalRecords: 93,
  totalStudyTime: 2340, // em minutos (39 horas)
  completedActivities: 88,
  averageScore: 84.5,
  mostStudiedSubject: 'Direito Constitucional',
  streakDays: 12
};