import { 
  StudyPlan, 
  Subject, 
  Topic, 
  Exercise, 
  Goal, 
  Milestone, 
  Metric, 
  Instructor,
  StudyStats 
} from '../../types/planning';

// Instrutores mockados
export const mockInstructors: Instructor[] = [
  {
    id: 'inst1',
    name: 'Prof. Dr. Ana Carolina Silva',
    email: 'ana.silva@universidade.edu.br',
    specialization: ['Matemática', 'Estatística', 'Cálculo'],
    avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=3b82f6&color=fff',
    rating: 4.8,
    bio: 'Doutora em Matemática Aplicada com 15 anos de experiência em ensino superior. Especialista em métodos de ensino inovadores.'
  },
  {
    id: 'inst2',
    name: 'Prof. Carlos Eduardo Mendes',
    email: 'carlos.mendes@escola.edu.br',
    specialization: ['Física', 'Astronomia', 'Mecânica Quântica'],
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=10b981&color=fff',
    rating: 4.9,
    bio: 'Mestre em Física Teórica, professor há 12 anos. Apaixonado por tornar a física acessível e interessante para todos os alunos.'
  },
  {
    id: 'inst3',
    name: 'Dra. Maria Fernanda Santos',
    email: 'maria.santos@instituto.edu.br',
    specialization: ['Química', 'Bioquímica', 'Química Orgânica'],
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=f59e0b&color=fff',
    rating: 4.7,
    bio: 'Doutora em Química com foco em pesquisa aplicada. Experiência em laboratórios industriais e acadêmicos.'
  }
];

// Exercícios mockados
export const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    title: 'Lista de Exercícios - Matrizes',
    type: 'multiple_choice',
    difficulty: 'medium',
    estimatedTime: 45,
    points: 100,
    status: 'completed',
    dueDate: '2024-01-25',
    feedback: 'Excelente trabalho! Demonstrou boa compreensão dos conceitos.',
    score: 85
  },
  {
    id: 'ex2',
    title: 'Projeto Prático - Movimento Retilíneo',
    type: 'practical',
    difficulty: 'hard',
    estimatedTime: 120,
    points: 150,
    status: 'in_progress',
    dueDate: '2024-02-01'
  },
  {
    id: 'ex3',
    title: 'Redação - Análise Literária',
    type: 'essay',
    difficulty: 'medium',
    estimatedTime: 90,
    points: 120,
    status: 'not_started',
    dueDate: '2024-02-05'
  }
];

// Tópicos mockados
export const mockTopics: Topic[] = [
  {
    id: 'topic1',
    name: 'Álgebra Linear',
    description: 'Estudo de matrizes, determinantes, sistemas lineares e transformações lineares',
    estimatedHours: 20,
    completedHours: 15,
    progress: 75,
    status: 'in_progress',
    difficulty: 'medium',
    prerequisites: ['Álgebra Básica'],
    resources: [
      {
        id: 'res1',
        name: 'Livro: Álgebra Linear e Aplicações',
        type: 'book',
        description: 'Livro texto principal da disciplina',
        isRequired: true
      },
      {
        id: 'res2',
        name: 'Khan Academy - Linear Algebra',
        type: 'video',
        url: 'https://khanacademy.org/linear-algebra',
        description: 'Vídeos complementares',
        isRequired: false
      }
    ],
    exercises: [mockExercises[0]],
    deadline: '2024-02-15'
  },
  {
    id: 'topic2',
    name: 'Mecânica Clássica',
    description: 'Leis de Newton, energia, momento e movimento de corpos rígidos',
    estimatedHours: 25,
    completedHours: 8,
    progress: 32,
    status: 'in_progress',
    difficulty: 'hard',
    prerequisites: ['Cálculo I', 'Vetores'],
    resources: [
      {
        id: 'res3',
        name: 'Halliday & Resnick - Física I',
        type: 'book',
        description: 'Capítulos 1-10',
        isRequired: true
      }
    ],
    exercises: [mockExercises[1]],
    deadline: '2024-03-01'
  },
  {
    id: 'topic3',
    name: 'Química Orgânica',
    description: 'Estrutura, nomenclatura e reações de compostos orgânicos',
    estimatedHours: 30,
    completedHours: 22,
    progress: 73,
    status: 'in_progress',
    difficulty: 'hard',
    prerequisites: ['Química Geral'],
    resources: [
      {
        id: 'res4',
        name: 'Solomons - Química Orgânica',
        type: 'book',
        description: 'Volume 1 - Capítulos 1-8',
        isRequired: true
      }
    ],
    exercises: [],
    deadline: '2024-02-20'
  },
  {
    id: 'topic4',
    name: 'Literatura Brasileira - Romantismo',
    description: 'Características, autores e obras do movimento romântico no Brasil',
    estimatedHours: 15,
    completedHours: 12,
    progress: 80,
    status: 'in_progress',
    difficulty: 'medium',
    prerequisites: ['História do Brasil - Século XIX'],
    resources: [
      {
        id: 'res5',
        name: 'Antologia da Literatura Brasileira',
        type: 'book',
        description: 'Textos selecionados do Romantismo',
        isRequired: true
      }
    ],
    exercises: [mockExercises[2]],
    deadline: '2024-02-10'
  }
];

// Disciplinas mockadas
export const mockSubjects: Subject[] = [
  {
    id: 'subj1',
    name: 'Matemática Avançada',
    code: 'MAT301',
    description: 'Disciplina focada em álgebra linear, cálculo diferencial e integral',
    color: 'blue',
    icon: 'solar:calculator-bold-duotone',
    topics: [mockTopics[0]],
    progress: 75,
    totalHours: 60,
    completedHours: 45,
    difficulty: 'advanced',
    priority: 'high',
    instructor: mockInstructors[0]
  },
  {
    id: 'subj2',
    name: 'Física I',
    code: 'FIS101',
    description: 'Mecânica clássica, termodinâmica e ondas',
    color: 'green',
    icon: 'solar:atom-bold-duotone',
    topics: [mockTopics[1]],
    progress: 32,
    totalHours: 80,
    completedHours: 26,
    difficulty: 'advanced',
    priority: 'high',
    instructor: mockInstructors[1]
  },
  {
    id: 'subj3',
    name: 'Química Orgânica',
    code: 'QUI201',
    description: 'Estudo dos compostos de carbono e suas reações',
    color: 'red',
    icon: 'solar:test-tube-bold-duotone',
    topics: [mockTopics[2]],
    progress: 73,
    totalHours: 70,
    completedHours: 51,
    difficulty: 'advanced',
    priority: 'medium',
    instructor: mockInstructors[2]
  },
  {
    id: 'subj4',
    name: 'Literatura Brasileira',
    code: 'LET150',
    description: 'Panorama da literatura brasileira do século XIX ao XXI',
    color: 'purple',
    icon: 'solar:book-bold-duotone',
    topics: [mockTopics[3]],
    progress: 80,
    totalHours: 40,
    completedHours: 32,
    difficulty: 'intermediate',
    priority: 'medium',
    instructor: {
      id: 'inst4',
      name: 'Prof. João Pedro Costa',
      email: 'joao.costa@letras.edu.br',
      specialization: ['Literatura Brasileira', 'Teoria Literária'],
      avatar: 'https://ui-avatars.com/api/?name=João+Costa&background=8b5cf6&color=fff',
      rating: 4.6
    }
  },
  {
    id: 'subj5',
    name: 'Biologia Molecular',
    code: 'BIO301',
    description: 'Estrutura e função de biomoléculas, genética molecular',
    color: 'emerald',
    icon: 'solar:dna-bold-duotone',
    topics: [
      {
        id: 'topic5',
        name: 'Genética Molecular',
        description: 'DNA, RNA, síntese proteica e regulação gênica',
        estimatedHours: 35,
        completedHours: 28,
        progress: 80,
        status: 'in_progress',
        difficulty: 'hard',
        prerequisites: ['Biologia Celular'],
        resources: [
          {
            id: 'res6',
            name: 'Alberts - Biologia Molecular da Célula',
            type: 'book',
            description: 'Capítulos sobre genética molecular',
            isRequired: true
          }
        ],
        exercises: [],
        deadline: '2024-03-15'
      }
    ],
    progress: 80,
    totalHours: 50,
    completedHours: 40,
    difficulty: 'advanced',
    priority: 'high',
    instructor: {
      id: 'inst5',
      name: 'Dra. Patricia Almeida',
      email: 'patricia.almeida@bio.edu.br',
      specialization: ['Biologia Molecular', 'Genética'],
      avatar: 'https://ui-avatars.com/api/?name=Patricia+Almeida&background=10b981&color=fff',
      rating: 4.9
    }
  }
];

// Métricas mockadas
export const mockMetrics: Metric[] = [
  {
    id: 'met1',
    name: 'Horas de Estudo',
    currentValue: 120,
    targetValue: 200,
    unit: 'horas',
    type: 'hours'
  },
  {
    id: 'met2',
    name: 'Exercícios Completados',
    currentValue: 45,
    targetValue: 80,
    unit: 'exercícios',
    type: 'exercises'
  },
  {
    id: 'met3',
    name: 'Média de Notas',
    currentValue: 8.5,
    targetValue: 9.0,
    unit: 'pontos',
    type: 'score'
  }
];

// Objetivos mockados
export const mockGoals: Goal[] = [
  {
    id: 'goal1',
    title: 'Dominar Álgebra Linear',
    description: 'Completar todos os tópicos de álgebra linear com nota mínima 8.0',
    type: 'short_term',
    targetDate: '2024-02-15',
    progress: 75,
    status: 'active',
    metrics: [mockMetrics[0], mockMetrics[2]]
  },
  {
    id: 'goal2',
    title: 'Aprovação no ENEM',
    description: 'Obter pontuação suficiente para ingresso no curso desejado',
    type: 'long_term',
    targetDate: '2024-11-30',
    progress: 35,
    status: 'active',
    metrics: mockMetrics
  },
  {
    id: 'goal3',
    title: 'Completar Curso de Física',
    description: 'Finalizar todas as disciplinas de física com aproveitamento superior a 80%',
    type: 'medium_term',
    targetDate: '2024-07-30',
    progress: 45,
    status: 'active',
    metrics: [mockMetrics[0], mockMetrics[1]]
  }
];

// Marcos/Milestones mockados
export const mockMilestones: Milestone[] = [
  {
    id: 'mile1',
    title: 'Primeira Avaliação',
    description: 'Completar primeira rodada de avaliações com média 8.0',
    targetDate: '2024-02-28',
    status: 'pending',
    requirements: [
      'Completar 80% dos exercícios',
      'Participar de todas as aulas',
      'Entregar trabalhos no prazo'
    ],
    reward: 'Certificado de Excelência Acadêmica'
  },
  {
    id: 'mile2',
    title: 'Meio do Semestre',
    description: 'Atingir 50% de progresso em todas as disciplinas',
    targetDate: '2024-04-15',
    status: 'in_progress',
    requirements: [
      'Completar metade do conteúdo programático',
      'Manter frequência acima de 90%',
      'Nota mínima 7.0 em todas as avaliações'
    ]
  },
  {
    id: 'mile3',
    title: 'Projeto Final',
    description: 'Apresentar projeto integrador com nota superior a 9.0',
    targetDate: '2024-06-30',
    completedDate: '2024-06-28',
    status: 'completed',
    requirements: [
      'Desenvolver projeto original',
      'Apresentação de 30 minutos',
      'Documentação completa'
    ],
    reward: 'Publicação no repositório institucional'
  }
];

// Planos de Estudo mockados
export const mockStudyPlans: StudyPlan[] = [
  {
    id: 'plan1',
    title: 'Preparação ENEM 2024 - Exatas',
    description: 'Plano intensivo focado em Matemática, Física e Química para o ENEM 2024. Inclui revisão teórica, resolução de questões anteriores e simulados semanais.',
    subjects: [mockSubjects[0], mockSubjects[1], mockSubjects[2]],
    duration: '8 meses',
    progress: 65,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-09-15',
    dailyHours: 6,
    weeklyGoal: 42,
    totalHours: 1200,
    completedHours: 780,
    difficulty: 'advanced',
    goals: [mockGoals[1]],
    milestones: [mockMilestones[0], mockMilestones[1]],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-25T15:30:00Z'
  },
  {
    id: 'plan2',
    title: 'Vestibular Medicina - USP',
    description: 'Preparação completa para o vestibular de Medicina da USP. Foco em Biologia, Química, Física, Matemática e Português, com ênfase em questões discursivas.',
    subjects: [mockSubjects[1], mockSubjects[2], mockSubjects[4]],
    duration: '12 meses',
    progress: 42,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    dailyHours: 8,
    weeklyGoal: 56,
    totalHours: 2000,
    completedHours: 840,
    difficulty: 'advanced',
    goals: [mockGoals[0], mockGoals[2]],
    milestones: [mockMilestones[0], mockMilestones[1], mockMilestones[2]],
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-01-30T09:00:00Z'
  },
  {
    id: 'plan3',
    title: 'Concurso Público - Técnico Judiciário',
    description: 'Preparação para concurso de Técnico Judiciário com foco em Direito, Português, Matemática e Conhecimentos Gerais. Inclui legislação específica e jurisprudência.',
    subjects: [
      {
        id: 'subj6',
        name: 'Direito Constitucional',
        code: 'DIR101',
        description: 'Princípios constitucionais, direitos fundamentais e organização do Estado',
        color: 'amber',
        icon: 'solar:scale-bold-duotone',
        topics: [
          {
            id: 'topic6',
            name: 'Direitos Fundamentais',
            description: 'Direitos individuais, coletivos e sociais na Constituição',
            estimatedHours: 40,
            completedHours: 35,
            progress: 87,
            status: 'in_progress',
            difficulty: 'hard',
            prerequisites: ['Teoria Geral do Direito'],
            resources: [
              {
                id: 'res7',
                name: 'Constituição Federal Comentada',
                type: 'book',
                description: 'Texto constitucional com comentários',
                isRequired: true
              }
            ],
            exercises: [],
            deadline: '2024-03-30'
          }
        ],
        progress: 87,
        totalHours: 120,
        completedHours: 104,
        difficulty: 'advanced',
        priority: 'high',
        instructor: {
          id: 'inst6',
          name: 'Dr. Fernando Ribeiro',
          email: 'fernando.ribeiro@direito.edu.br',
          specialization: ['Direito Constitucional', 'Direito Administrativo'],
          avatar: 'https://ui-avatars.com/api/?name=Fernando+Ribeiro&background=f59e0b&color=fff',
          rating: 4.8
        }
      },
      mockSubjects[3]
    ],
    duration: '10 meses',
    progress: 78,
    status: 'active',
    startDate: '2023-12-01',
    endDate: '2024-10-01',
    dailyHours: 5,
    weeklyGoal: 35,
    totalHours: 1400,
    completedHours: 1092,
    difficulty: 'intermediate',
    goals: [mockGoals[2]],
    milestones: [mockMilestones[2]],
    createdAt: '2023-11-25T16:00:00Z',
    updatedAt: '2024-01-30T12:00:00Z'
  },
  {
    id: 'plan4',
    title: 'Graduação em Engenharia - 1º Semestre',
    description: 'Plano de estudos para o primeiro semestre do curso de Engenharia. Foco em disciplinas básicas: Cálculo, Física, Química e Desenho Técnico.',
    subjects: [mockSubjects[0], mockSubjects[1], mockSubjects[2]],
    duration: '6 meses',
    progress: 25,
    status: 'active',
    startDate: '2024-02-05',
    endDate: '2024-08-05',
    dailyHours: 4,
    weeklyGoal: 28,
    totalHours: 600,
    completedHours: 150,
    difficulty: 'intermediate',
    goals: [mockGoals[0]],
    milestones: [mockMilestones[0]],
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  }
];

// Estatísticas de Estudo mockadas
export const mockStudyStats: StudyStats = {
  totalStudyHours: 1250,
  weeklyAverage: 35,
  monthlyAverage: 140,
  completedEvents: 89,
  pendingEvents: 23,
  subjectsInProgress: 5,
  completedSubjects: 12,
  averageScore: 8.3,
  streakDays: 15,
  productivityScore: 87
};

// Funções utilitárias
export const getStudyPlansByStatus = (status: StudyPlan['status']): StudyPlan[] => {
  return mockStudyPlans.filter(plan => plan.status === status);
};

export const getSubjectsByDifficulty = (difficulty: Subject['difficulty']): Subject[] => {
  return mockSubjects.filter(subject => subject.difficulty === difficulty);
};

export const getTopicsByStatus = (status: Topic['status']): Topic[] => {
  return mockTopics.filter(topic => topic.status === status);
};

export const getActiveGoals = (): Goal[] => {
  return mockGoals.filter(goal => goal.status === 'active');
};

export const getUpcomingMilestones = (): Milestone[] => {
  const today = new Date();
  return mockMilestones.filter(milestone => {
    const targetDate = new Date(milestone.targetDate);
    return targetDate > today && milestone.status !== 'completed';
  }).sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
};

export const calculateOverallProgress = (): number => {
  const totalProgress = mockStudyPlans.reduce((sum, plan) => sum + plan.progress, 0);
  return Math.round(totalProgress / mockStudyPlans.length);
};