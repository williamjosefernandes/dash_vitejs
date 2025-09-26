import { StudyPlan, StudyPlanSubject, StudyTopic, StudyResource, Exercise, StudyPlanGoal, StudyPlanMilestone, StudyPlanStats } from '../../types/studyPlans';

// Recursos de estudo
const mockResources: StudyResource[] = [
  {
    id: 'res1',
    name: 'Curso Completo de JavaScript',
    type: 'curso',
    url: 'https://example.com/javascript',
    description: 'Curso completo do básico ao avançado',
    isRequired: true,
    estimatedTime: 40
  },
  {
    id: 'res2',
    name: 'Livro: Clean Code',
    type: 'livro',
    description: 'Princípios de código limpo e boas práticas',
    isRequired: true,
    estimatedTime: 20
  },
  {
    id: 'res3',
    name: 'Documentação React',
    type: 'site',
    url: 'https://react.dev',
    description: 'Documentação oficial do React',
    isRequired: true,
    estimatedTime: 15
  },
  {
    id: 'res4',
    name: 'Constituição Federal Comentada',
    type: 'livro',
    description: 'Texto constitucional com comentários jurídicos',
    isRequired: true,
    estimatedTime: 60
  },
  {
    id: 'res5',
    name: 'English Grammar in Use',
    type: 'livro',
    description: 'Gramática inglesa com exercícios práticos',
    isRequired: true,
    estimatedTime: 30
  },
  {
    id: 'res6',
    name: 'Duolingo',
    type: 'site',
    url: 'https://duolingo.com',
    description: 'Aplicativo para prática diária de idiomas',
    isRequired: false,
    estimatedTime: 10
  }
];

// Exercícios
const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    title: 'Projeto: Todo List em React',
    type: 'pratica',
    difficulty: 'intermediario',
    estimatedTime: 180,
    points: 100,
    isCompleted: true,
    score: 95,
    feedback: 'Excelente implementação! Código bem estruturado.'
  },
  {
    id: 'ex2',
    title: 'Quiz: Direito Constitucional',
    type: 'multipla_escolha',
    difficulty: 'avancado',
    estimatedTime: 60,
    points: 50,
    isCompleted: false
  },
  {
    id: 'ex3',
    title: 'Conversação em Inglês',
    type: 'pratica',
    difficulty: 'intermediario',
    estimatedTime: 30,
    points: 25,
    isCompleted: true,
    score: 80
  },
  {
    id: 'ex4',
    title: 'Simulado ENEM - Matemática',
    type: 'simulado',
    difficulty: 'avancado',
    estimatedTime: 120,
    points: 200,
    isCompleted: false
  }
];

// Tópicos de estudo
const mockTopics: StudyTopic[] = [
  {
    id: 'topic1',
    name: 'Fundamentos do JavaScript',
    description: 'Variáveis, funções, objetos e arrays',
    estimatedHours: 20,
    completedHours: 18,
    progress: 90,
    isCompleted: false,
    difficulty: 'iniciante',
    resources: [mockResources[0]],
    exercises: [mockExercises[0]]
  },
  {
    id: 'topic2',
    name: 'React Hooks',
    description: 'useState, useEffect e hooks customizados',
    estimatedHours: 15,
    completedHours: 10,
    progress: 67,
    isCompleted: false,
    difficulty: 'intermediario',
    resources: [mockResources[2]],
    exercises: []
  },
  {
    id: 'topic3',
    name: 'Direitos Fundamentais',
    description: 'Direitos individuais e coletivos na Constituição',
    estimatedHours: 25,
    completedHours: 20,
    progress: 80,
    isCompleted: false,
    difficulty: 'avancado',
    resources: [mockResources[3]],
    exercises: [mockExercises[1]]
  },
  {
    id: 'topic4',
    name: 'Grammar Essentials',
    description: 'Tempos verbais e estruturas básicas',
    estimatedHours: 12,
    completedHours: 12,
    progress: 100,
    isCompleted: true,
    difficulty: 'intermediario',
    resources: [mockResources[4], mockResources[5]],
    exercises: [mockExercises[2]]
  },
  {
    id: 'topic5',
    name: 'Álgebra e Geometria',
    description: 'Equações, funções e geometria plana',
    estimatedHours: 30,
    completedHours: 15,
    progress: 50,
    isCompleted: false,
    difficulty: 'intermediario',
    resources: [],
    exercises: [mockExercises[3]]
  }
];

// Disciplinas/Matérias
const mockSubjects: StudyPlanSubject[] = [
  {
    id: 'subj1',
    name: 'JavaScript Avançado',
    description: 'Programação JavaScript do básico ao avançado',
    color: 'yellow',
    icon: 'solar:code-bold-duotone',
    estimatedHours: 80,
    completedHours: 65,
    progress: 81,
    difficulty: 'intermediario',
    priority: 'alta',
    topics: [mockTopics[0], mockTopics[1]],
    resources: [mockResources[0], mockResources[1]]
  },
  {
    id: 'subj2',
    name: 'Direito Constitucional',
    description: 'Princípios constitucionais e direitos fundamentais',
    color: 'blue',
    icon: 'solar:scale-bold-duotone',
    estimatedHours: 60,
    completedHours: 45,
    progress: 75,
    difficulty: 'avancado',
    priority: 'alta',
    topics: [mockTopics[2]],
    resources: [mockResources[3]]
  },
  {
    id: 'subj3',
    name: 'Inglês Intermediário',
    description: 'Gramática, vocabulário e conversação',
    color: 'green',
    icon: 'solar:global-bold-duotone',
    estimatedHours: 40,
    completedHours: 35,
    progress: 88,
    difficulty: 'intermediario',
    priority: 'media',
    topics: [mockTopics[3]],
    resources: [mockResources[4], mockResources[5]]
  },
  {
    id: 'subj4',
    name: 'Matemática ENEM',
    description: 'Álgebra, geometria e estatística para o ENEM',
    color: 'red',
    icon: 'solar:calculator-bold-duotone',
    estimatedHours: 100,
    completedHours: 50,
    progress: 50,
    difficulty: 'intermediario',
    priority: 'alta',
    topics: [mockTopics[4]],
    resources: []
  },
  {
    id: 'subj5',
    name: 'React Development',
    description: 'Desenvolvimento de aplicações com React',
    color: 'cyan',
    icon: 'solar:widget-bold-duotone',
    estimatedHours: 50,
    completedHours: 30,
    progress: 60,
    difficulty: 'intermediario',
    priority: 'alta',
    topics: [mockTopics[1]],
    resources: [mockResources[2]]
  }
];

// Objetivos/Metas
const mockGoals: StudyPlanGoal[] = [
  {
    id: 'goal1',
    title: 'Dominar JavaScript ES6+',
    description: 'Aprender todas as funcionalidades modernas do JavaScript',
    targetDate: '2024-06-30',
    isCompleted: false,
    progress: 75
  },
  {
    id: 'goal2',
    title: 'Aprovação no Concurso',
    description: 'Obter nota suficiente para aprovação no concurso público',
    targetDate: '2024-12-15',
    isCompleted: false,
    progress: 60
  },
  {
    id: 'goal3',
    title: 'Certificação B2 em Inglês',
    description: 'Alcançar nível B2 no exame de proficiência',
    targetDate: '2024-08-30',
    isCompleted: false,
    progress: 80
  },
  {
    id: 'goal4',
    title: 'Nota 900+ no ENEM',
    description: 'Atingir pontuação superior a 900 pontos',
    targetDate: '2024-11-30',
    isCompleted: false,
    progress: 45
  }
];

// Marcos/Milestones
const mockMilestones: StudyPlanMilestone[] = [
  {
    id: 'mile1',
    title: 'Primeiro Projeto React',
    description: 'Completar primeiro projeto prático em React',
    targetDate: '2024-04-15',
    completedDate: '2024-04-12',
    isCompleted: true,
    requirements: ['Conhecer JSX', 'Entender componentes', 'Usar hooks básicos'],
    reward: 'Certificado de conclusão'
  },
  {
    id: 'mile2',
    title: 'Simulado de Direito',
    description: 'Atingir 80% de acertos no simulado',
    targetDate: '2024-05-30',
    isCompleted: false,
    requirements: ['Estudar 40h de teoria', 'Resolver 200 questões', 'Revisar jurisprudência'],
    reward: 'Acesso a material exclusivo'
  },
  {
    id: 'mile3',
    title: 'Conversação Fluente',
    description: 'Manter conversa de 30min em inglês',
    targetDate: '2024-07-15',
    isCompleted: false,
    requirements: ['Vocabulário de 2000 palavras', 'Gramática intermediária', '20h de prática oral']
  },
  {
    id: 'mile4',
    title: 'Simulado ENEM',
    description: 'Primeira tentativa completa do simulado',
    targetDate: '2024-09-30',
    isCompleted: false,
    requirements: ['Revisar todo conteúdo', 'Resolver provas anteriores', 'Treinar redação']
  }
];

// Planos de Estudo
export const mockStudyPlansNew: StudyPlan[] = [
  {
    id: 'plan1',
    title: 'Desenvolvedor Full Stack',
    description: 'Formação completa em desenvolvimento web com JavaScript, React, Node.js e banco de dados',
    category: 'tecnologia',
    status: 'ativo',
    difficulty: 'intermediario',
    startDate: '2024-01-15',
    endDate: '2024-08-15',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-01T15:30:00Z',
    progress: 68,
    totalHours: 300,
    completedHours: 204,
    dailyHours: 3,
    weeklyGoal: 21,
    subjects: [mockSubjects[0], mockSubjects[4]],
    goals: [mockGoals[0]],
    milestones: [mockMilestones[0]],
    color: 'blue',
    icon: 'solar:code-bold-duotone',
    tags: ['javascript', 'react', 'frontend', 'backend'],
    streakDays: 12,
    averageScore: 87,
    completedExercises: 8,
    totalExercises: 15
  },
  {
    id: 'plan2',
    title: 'Concurso Técnico Judiciário TRT',
    description: 'Preparação completa para concurso de Técnico Judiciário com foco em Direito, Português e Conhecimentos Gerais',
    category: 'concursos',
    status: 'ativo',
    difficulty: 'avancado',
    startDate: '2024-02-01',
    endDate: '2024-12-15',
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
    progress: 55,
    totalHours: 800,
    completedHours: 440,
    dailyHours: 4,
    weeklyGoal: 28,
    subjects: [mockSubjects[1]],
    goals: [mockGoals[1]],
    milestones: [mockMilestones[1]],
    color: 'amber',
    icon: 'solar:scale-bold-duotone',
    tags: ['direito', 'concurso', 'publico', 'trt'],
    streakDays: 8,
    averageScore: 78,
    completedExercises: 25,
    totalExercises: 50
  },
  {
    id: 'plan3',
    title: 'Inglês para Negócios',
    description: 'Curso intensivo de inglês focado em comunicação empresarial e certificação internacional',
    category: 'idiomas',
    status: 'ativo',
    difficulty: 'intermediario',
    startDate: '2024-01-20',
    endDate: '2024-08-30',
    createdAt: '2024-01-15T16:00:00Z',
    updatedAt: '2024-02-01T12:00:00Z',
    progress: 72,
    totalHours: 200,
    completedHours: 144,
    dailyHours: 2,
    weeklyGoal: 14,
    subjects: [mockSubjects[2]],
    goals: [mockGoals[2]],
    milestones: [mockMilestones[2]],
    color: 'green',
    icon: 'solar:global-bold-duotone',
    tags: ['ingles', 'business', 'certificacao', 'toefl'],
    streakDays: 15,
    averageScore: 85,
    completedExercises: 12,
    totalExercises: 20
  },
  {
    id: 'plan4',
    title: 'ENEM 2024 - Exatas',
    description: 'Preparação intensiva para o ENEM com foco em Matemática, Física e Química',
    category: 'academico',
    status: 'ativo',
    difficulty: 'intermediario',
    startDate: '2024-03-01',
    endDate: '2024-11-30',
    createdAt: '2024-02-25T08:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    progress: 35,
    totalHours: 600,
    completedHours: 210,
    dailyHours: 5,
    weeklyGoal: 35,
    subjects: [mockSubjects[3]],
    goals: [mockGoals[3]],
    milestones: [mockMilestones[3]],
    color: 'red',
    icon: 'solar:calculator-bold-duotone',
    tags: ['enem', 'matematica', 'vestibular', 'universidade'],
    streakDays: 5,
    averageScore: 72,
    completedExercises: 15,
    totalExercises: 40
  },
  {
    id: 'plan5',
    title: 'AWS Cloud Practitioner',
    description: 'Certificação AWS Cloud Practitioner com foco em fundamentos de computação em nuvem',
    category: 'certificacoes',
    status: 'pausado',
    difficulty: 'intermediario',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    createdAt: '2023-12-20T14:00:00Z',
    updatedAt: '2024-01-30T16:00:00Z',
    progress: 25,
    totalHours: 120,
    completedHours: 30,
    dailyHours: 2,
    weeklyGoal: 14,
    subjects: [],
    goals: [],
    milestones: [],
    color: 'orange',
    icon: 'solar:cloud-bold-duotone',
    tags: ['aws', 'cloud', 'certificacao', 'devops'],
    streakDays: 0,
    averageScore: 0,
    completedExercises: 0,
    totalExercises: 0
  },
  {
    id: 'plan6',
    title: 'Espanhol Básico',
    description: 'Curso básico de espanhol para iniciantes com foco em conversação',
    category: 'idiomas',
    status: 'concluido',
    difficulty: 'iniciante',
    startDate: '2023-09-01',
    endDate: '2023-12-31',
    createdAt: '2023-08-25T10:00:00Z',
    updatedAt: '2024-01-05T14:00:00Z',
    progress: 100,
    totalHours: 80,
    completedHours: 80,
    dailyHours: 1,
    weeklyGoal: 7,
    subjects: [],
    goals: [],
    milestones: [],
    color: 'purple',
    icon: 'solar:global-bold-duotone',
    tags: ['espanhol', 'basico', 'conversacao'],
    streakDays: 0,
    averageScore: 92,
    completedExercises: 20,
    totalExercises: 20
  }
];

// Estatísticas gerais
export const mockStudyPlanStats: StudyPlanStats = {
  totalPlans: 6,
  activePlans: 4,
  completedPlans: 1,
  totalStudyHours: 1380,
  weeklyAverage: 32,
  monthlyAverage: 128,
  overallProgress: 59,
  streakDays: 15,
  averageScore: 82
};

// Funções utilitárias
export const getStudyPlansByCategory = (category: string) => {
  return mockStudyPlansNew.filter(plan => plan.category === category);
};

export const getActiveStudyPlans = () => {
  return mockStudyPlansNew.filter(plan => plan.status === 'ativo');
};

export const getStudyPlanById = (id: string) => {
  return mockStudyPlansNew.find(plan => plan.id === id);
};

export const getStudyPlansByStatus = (status: string) => {
  return mockStudyPlansNew.filter(plan => plan.status === status);
};