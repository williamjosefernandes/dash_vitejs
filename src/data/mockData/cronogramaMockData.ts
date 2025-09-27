import { StudyDisciplineWithTopics, StudyTopic, StudyTopicSession, StudyTopicStats } from '../../types/cronograma/studyTopic';

// Função para gerar IDs únicos
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Função para gerar datas aleatórias nos últimos 30 dias
const getRandomDate = (daysAgo: number = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

// Função para gerar sessões de estudo mockadas
const generateMockSessions = (topicId: string, count: number = 3): StudyTopicSession[] => {
  const sessions: StudyTopicSession[] = [];
  
  for (let i = 0; i < count; i++) {
    const startTime = Date.now() - (Math.random() * 7 * 24 * 60 * 60 * 1000); // Últimos 7 dias
    const duration = (15 + Math.random() * 90) * 60 * 1000; // 15-105 minutos
    const endTime = startTime + duration;
    
    sessions.push({
      id: generateId(),
      topicId,
      startTime,
      endTime,
      duration,
      date: new Date(startTime).toISOString().split('T')[0],
      notes: Math.random() > 0.7 ? 'Sessão produtiva, conceitos bem compreendidos.' : undefined,
    });
  }
  
  return sessions.sort((a, b) => b.startTime - a.startTime);
};

// Tópicos mockados para Matemática
const mathTopics: StudyTopic[] = [
  {
    id: generateId(),
    name: 'Equações do 2º Grau',
    description: 'Resolução de equações quadráticas usando fórmula de Bhaskara e outros métodos',
    disciplineId: 'math-001',
    status: 'completed',
    totalStudyTime: 4.5 * 60 * 60 * 1000, // 4.5 horas
    targetHours: 5,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(20),
    updatedAt: getRandomDate(2),
    order: 0,
  },
  {
    id: generateId(),
    name: 'Funções Trigonométricas',
    description: 'Seno, cosseno, tangente e suas aplicações',
    disciplineId: 'math-001',
    status: 'in_progress',
    totalStudyTime: 2.3 * 60 * 60 * 1000, // 2.3 horas
    targetHours: 6,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(15),
    updatedAt: getRandomDate(1),
    order: 1,
  },
  {
    id: generateId(),
    name: 'Logaritmos',
    description: 'Propriedades dos logaritmos e mudança de base',
    disciplineId: 'math-001',
    status: 'not_studied',
    totalStudyTime: 0,
    targetHours: 4,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(10),
    updatedAt: getRandomDate(10),
    order: 2,
  },
  {
    id: generateId(),
    name: 'Geometria Analítica',
    description: 'Estudo de pontos, retas e circunferências no plano cartesiano',
    disciplineId: 'math-001',
    status: 'in_progress',
    totalStudyTime: 1.8 * 60 * 60 * 1000, // 1.8 horas
    targetHours: 8,
    isTimerRunning: true,
    currentSessionStart: Date.now() - (25 * 60 * 1000), // 25 minutos atrás
    sessions: [],
    createdAt: getRandomDate(12),
    updatedAt: getRandomDate(0),
    order: 3,
  },
];

// Tópicos mockados para Física
const physicsTopics: StudyTopic[] = [
  {
    id: generateId(),
    name: 'Cinemática',
    description: 'Movimento uniforme e uniformemente variado',
    disciplineId: 'physics-001',
    status: 'completed',
    totalStudyTime: 3.2 * 60 * 60 * 1000, // 3.2 horas
    targetHours: 4,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(25),
    updatedAt: getRandomDate(5),
    order: 0,
  },
  {
    id: generateId(),
    name: 'Dinâmica',
    description: 'Leis de Newton e suas aplicações',
    disciplineId: 'physics-001',
    status: 'in_progress',
    totalStudyTime: 2.7 * 60 * 60 * 1000, // 2.7 horas
    targetHours: 6,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(18),
    updatedAt: getRandomDate(3),
    order: 1,
  },
  {
    id: generateId(),
    name: 'Termodinâmica',
    description: 'Leis da termodinâmica e processos térmicos',
    disciplineId: 'physics-001',
    status: 'not_studied',
    totalStudyTime: 0,
    targetHours: 5,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(8),
    updatedAt: getRandomDate(8),
    order: 2,
  },
];

// Tópicos mockados para Química
const chemistryTopics: StudyTopic[] = [
  {
    id: generateId(),
    name: 'Tabela Periódica',
    description: 'Propriedades periódicas e classificação dos elementos',
    disciplineId: 'chemistry-001',
    status: 'completed',
    totalStudyTime: 2.8 * 60 * 60 * 1000, // 2.8 horas
    targetHours: 3,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(22),
    updatedAt: getRandomDate(7),
    order: 0,
  },
  {
    id: generateId(),
    name: 'Ligações Químicas',
    description: 'Ligações iônicas, covalentes e metálicas',
    disciplineId: 'chemistry-001',
    status: 'in_progress',
    totalStudyTime: 1.5 * 60 * 60 * 1000, // 1.5 horas
    targetHours: 4,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(14),
    updatedAt: getRandomDate(2),
    order: 1,
  },
  {
    id: generateId(),
    name: 'Estequiometria',
    description: 'Cálculos químicos e balanceamento de equações',
    disciplineId: 'chemistry-001',
    status: 'not_studied',
    totalStudyTime: 0,
    targetHours: 5,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(6),
    updatedAt: getRandomDate(6),
    order: 2,
  },
];

// Tópicos mockados para História
const historyTopics: StudyTopic[] = [
  {
    id: generateId(),
    name: 'Brasil Colonial',
    description: 'Período colonial brasileiro: economia, sociedade e política',
    disciplineId: 'history-001',
    status: 'completed',
    totalStudyTime: 4.1 * 60 * 60 * 1000, // 4.1 horas
    targetHours: 4,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(28),
    updatedAt: getRandomDate(8),
    order: 0,
  },
  {
    id: generateId(),
    name: 'Revolução Industrial',
    description: 'Transformações econômicas e sociais dos séculos XVIII e XIX',
    disciplineId: 'history-001',
    status: 'in_progress',
    totalStudyTime: 2.2 * 60 * 60 * 1000, // 2.2 horas
    targetHours: 5,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(16),
    updatedAt: getRandomDate(4),
    order: 1,
  },
];

// Tópicos mockados para Literatura
const literatureTopics: StudyTopic[] = [
  {
    id: generateId(),
    name: 'Romantismo',
    description: 'Características do movimento romântico na literatura brasileira',
    disciplineId: 'literature-001',
    status: 'in_progress',
    totalStudyTime: 3.5 * 60 * 60 * 1000, // 3.5 horas
    targetHours: 6,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(20),
    updatedAt: getRandomDate(1),
    order: 0,
  },
  {
    id: generateId(),
    name: 'Realismo',
    description: 'Machado de Assis e as características do realismo',
    disciplineId: 'literature-001',
    status: 'not_studied',
    totalStudyTime: 0,
    targetHours: 4,
    isTimerRunning: false,
    sessions: [],
    createdAt: getRandomDate(5),
    updatedAt: getRandomDate(5),
    order: 1,
  },
];

// Adicionar sessões aos tópicos
mathTopics.forEach(topic => {
  if (topic.totalStudyTime > 0) {
    topic.sessions = generateMockSessions(topic.id, Math.floor(topic.totalStudyTime / (60 * 60 * 1000)) + 1);
  }
});

physicsTopics.forEach(topic => {
  if (topic.totalStudyTime > 0) {
    topic.sessions = generateMockSessions(topic.id, Math.floor(topic.totalStudyTime / (60 * 60 * 1000)) + 1);
  }
});

chemistryTopics.forEach(topic => {
  if (topic.totalStudyTime > 0) {
    topic.sessions = generateMockSessions(topic.id, Math.floor(topic.totalStudyTime / (60 * 60 * 1000)) + 1);
  }
});

historyTopics.forEach(topic => {
  if (topic.totalStudyTime > 0) {
    topic.sessions = generateMockSessions(topic.id, Math.floor(topic.totalStudyTime / (60 * 60 * 1000)) + 1);
  }
});

literatureTopics.forEach(topic => {
  if (topic.totalStudyTime > 0) {
    topic.sessions = generateMockSessions(topic.id, Math.floor(topic.totalStudyTime / (60 * 60 * 1000)) + 1);
  }
});

// Disciplinas mockadas
export const mockDisciplines: StudyDisciplineWithTopics[] = [
  {
    id: 'math-001',
    name: 'Matemática',
    description: 'Álgebra, geometria e trigonometria para vestibular',
    color: '#3B82F6', // Blue
    priority: 'Alta',
    status: 'Ativo',
    topics: mathTopics,
    totalStudyTime: mathTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
    targetHours: 23,
    createdAt: getRandomDate(30),
    updatedAt: getRandomDate(0),
    isExpanded: false,
  },
  {
    id: 'physics-001',
    name: 'Física',
    description: 'Mecânica, termodinâmica e eletromagnetismo',
    color: '#10B981', // Green
    priority: 'Alta',
    status: 'Ativo',
    topics: physicsTopics,
    totalStudyTime: physicsTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
    targetHours: 15,
    createdAt: getRandomDate(28),
    updatedAt: getRandomDate(3),
    isExpanded: false,
  },
  {
    id: 'chemistry-001',
    name: 'Química',
    description: 'Química geral, orgânica e inorgânica',
    color: '#F59E0B', // Yellow
    priority: 'Média',
    status: 'Ativo',
    topics: chemistryTopics,
    totalStudyTime: chemistryTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
    targetHours: 12,
    createdAt: getRandomDate(25),
    updatedAt: getRandomDate(2),
    isExpanded: false,
  },
  {
    id: 'history-001',
    name: 'História',
    description: 'História do Brasil e história geral',
    color: '#8B5CF6', // Purple
    priority: 'Média',
    status: 'Ativo',
    topics: historyTopics,
    totalStudyTime: historyTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
    targetHours: 9,
    createdAt: getRandomDate(30),
    updatedAt: getRandomDate(4),
    isExpanded: false,
  },
  {
    id: 'literature-001',
    name: 'Literatura',
    description: 'Literatura brasileira e portuguesa',
    color: '#EF4444', // Red
    priority: 'Baixa',
    status: 'Pausado',
    topics: literatureTopics,
    totalStudyTime: literatureTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
    targetHours: 10,
    createdAt: getRandomDate(22),
    updatedAt: getRandomDate(6),
    isExpanded: false,
  },
];

// Estatísticas mockadas
export const mockStats: StudyTopicStats = {
  totalTopics: mockDisciplines.reduce((sum, discipline) => sum + discipline.topics.length, 0),
  notStudiedTopics: mockDisciplines.reduce((sum, discipline) => 
    sum + discipline.topics.filter(topic => topic.status === 'not_studied').length, 0),
  inProgressTopics: mockDisciplines.reduce((sum, discipline) => 
    sum + discipline.topics.filter(topic => topic.status === 'in_progress').length, 0),
  completedTopics: mockDisciplines.reduce((sum, discipline) => 
    sum + discipline.topics.filter(topic => topic.status === 'completed').length, 0),
  totalStudyTime: mockDisciplines.reduce((sum, discipline) => sum + discipline.totalStudyTime, 0),
  todayStudyTime: 2.5 * 60 * 60 * 1000, // 2.5 horas hoje
  weekStudyTime: 18.3 * 60 * 60 * 1000, // 18.3 horas esta semana
  averageSessionTime: 45 * 60 * 1000, // 45 minutos por sessão
  totalSessions: 47,
  disciplineStats: {
    'math-001': {
      totalTime: mathTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
      completedTopics: mathTopics.filter(topic => topic.status === 'completed').length,
      totalTopics: mathTopics.length,
      progress: (mathTopics.filter(topic => topic.status === 'completed').length / mathTopics.length) * 100,
    },
    'physics-001': {
      totalTime: physicsTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
      completedTopics: physicsTopics.filter(topic => topic.status === 'completed').length,
      totalTopics: physicsTopics.length,
      progress: (physicsTopics.filter(topic => topic.status === 'completed').length / physicsTopics.length) * 100,
    },
    'chemistry-001': {
      totalTime: chemistryTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
      completedTopics: chemistryTopics.filter(topic => topic.status === 'completed').length,
      totalTopics: chemistryTopics.length,
      progress: (chemistryTopics.filter(topic => topic.status === 'completed').length / chemistryTopics.length) * 100,
    },
    'history-001': {
      totalTime: historyTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
      completedTopics: historyTopics.filter(topic => topic.status === 'completed').length,
      totalTopics: historyTopics.length,
      progress: (historyTopics.filter(topic => topic.status === 'completed').length / historyTopics.length) * 100,
    },
    'literature-001': {
      totalTime: literatureTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0),
      completedTopics: literatureTopics.filter(topic => topic.status === 'completed').length,
      totalTopics: literatureTopics.length,
      progress: (literatureTopics.filter(topic => topic.status === 'completed').length / literatureTopics.length) * 100,
    },
  },
};