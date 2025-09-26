import { 
  Simulation, 
  Question,
  SimulationAttempt,
  SimulationReport
} from '../../types/gabaritte';

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Qual é o determinante da matriz A = [[2, 1], [3, 4]]?',
    type: 'multiple_choice',
    subject: 'subj1',
    topic: 'topic1',
    difficulty: 'medium',
    options: [
      { id: 'opt1', text: '5', isCorrect: true },
      { id: 'opt2', text: '8', isCorrect: false },
      { id: 'opt3', text: '11', isCorrect: false },
      { id: 'opt4', text: '14', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    explanation: 'O determinante de uma matriz 2x2 é calculado como ad - bc. Portanto: (2×4) - (1×3) = 8 - 3 = 5.',
    points: 10,
    timeLimit: 120,
    tags: ['determinante', 'matriz', 'calculo'],
    source: 'ENEM 2023',
    year: 2023,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'q2',
    text: 'Um corpo de massa 2 kg está sujeito a uma força resultante de 10 N. Qual é a sua aceleração?',
    type: 'multiple_choice',
    subject: 'subj2',
    topic: 'topic2',
    difficulty: 'easy',
    options: [
      { id: 'opt1', text: '2 m/s²', isCorrect: false },
      { id: 'opt2', text: '5 m/s²', isCorrect: true },
      { id: 'opt3', text: '10 m/s²', isCorrect: false },
      { id: 'opt4', text: '20 m/s²', isCorrect: false }
    ],
    correctAnswer: 'opt2',
    explanation: 'Pela segunda lei de Newton, F = ma. Portanto, a = F/m = 10N / 2kg = 5 m/s².',
    points: 8,
    timeLimit: 90,
    tags: ['newton', 'forca', 'aceleracao'],
    source: 'Vestibular UNICAMP',
    year: 2023,
    createdAt: '2024-01-16T11:00:00Z'
  },
  {
    id: 'q3',
    text: 'Qual é a fórmula molecular do metano?',
    type: 'multiple_choice',
    subject: 'subj3',
    topic: 'topic3',
    difficulty: 'easy',
    options: [
      { id: 'opt1', text: 'CH₄', isCorrect: true },
      { id: 'opt2', text: 'C₂H₆', isCorrect: false },
      { id: 'opt3', text: 'C₃H₈', isCorrect: false },
      { id: 'opt4', text: 'C₄H₁₀', isCorrect: false }
    ],
    correctAnswer: 'opt1',
    explanation: 'O metano é o hidrocarboneto mais simples, formado por um átomo de carbono e quatro átomos de hidrogênio: CH₄.',
    points: 6,
    timeLimit: 60,
    tags: ['hidrocarboneto', 'metano', 'formula'],
    source: 'ENEM 2022',
    year: 2022,
    createdAt: '2024-01-17T12:00:00Z'
  },
  {
    id: 'q4',
    text: 'Quem é considerado o precursor do Romantismo no Brasil?',
    type: 'multiple_choice',
    subject: 'subj4',
    topic: 'topic4',
    difficulty: 'medium',
    options: [
      { id: 'opt1', text: 'Gonçalves Dias', isCorrect: false },
      { id: 'opt2', text: 'Gonçalves de Magalhães', isCorrect: true },
      { id: 'opt3', text: 'Álvares de Azevedo', isCorrect: false },
      { id: 'opt4', text: 'Castro Alves', isCorrect: false }
    ],
    correctAnswer: 'opt2',
    explanation: 'Gonçalves de Magalhães é considerado o precursor do Romantismo no Brasil com a obra "Suspiros Poéticos e Saudades" (1836).',
    points: 8,
    timeLimit: 90,
    tags: ['romantismo', 'literatura', 'precursor'],
    source: 'Vestibular FUVEST',
    year: 2023,
    createdAt: '2024-01-18T13:00:00Z'
  },
  {
    id: 'q5',
    text: 'Qual é a principal diferença entre DNA e RNA?',
    type: 'multiple_choice',
    subject: 'subj5',
    topic: 'topic5',
    difficulty: 'medium',
    options: [
      { id: 'opt1', text: 'DNA tem ribose, RNA tem desoxirribose', isCorrect: false },
      { id: 'opt2', text: 'DNA tem desoxirribose, RNA tem ribose', isCorrect: true },
      { id: 'opt3', text: 'DNA é simples fita, RNA é dupla fita', isCorrect: false },
      { id: 'opt4', text: 'Não há diferença estrutural', isCorrect: false }
    ],
    correctAnswer: 'opt2',
    explanation: 'A principal diferença estrutural é o açúcar: DNA contém desoxirribose e RNA contém ribose.',
    points: 10,
    timeLimit: 120,
    tags: ['dna', 'rna', 'acucar', 'estrutura'],
    source: 'ENEM 2023',
    year: 2023,
    createdAt: '2024-01-19T14:00:00Z'
  }
];

export const mockSimulations: Simulation[] = [
  {
    id: 'sim1',
    title: 'ENEM 2024 - Simulado Completo',
    description: 'Simulado completo do ENEM com 180 questões divididas em 4 áreas do conhecimento, seguindo o padrão oficial da prova.',
    type: 'complete',
    category: 'enem',
    subjects: ['subj1', 'subj2', 'subj3', 'subj4', 'subj5'],
    totalQuestions: 180,
    duration: 330, // 5h30min
    difficulty: 'mixed',
    questions: mockQuestions,
    passingScore: 500,
    isPublic: true,
    createdBy: 'Equipe Gabaritte',
    tags: ['enem', 'completo', 'oficial', '2024'],
    attempts: 2450,
    averageScore: 520,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-30T16:00:00Z'
  },
  {
    id: 'sim2',
    title: 'Matemática - Álgebra Linear',
    description: 'Simulado focado em álgebra linear com questões de matrizes, determinantes e sistemas lineares.',
    type: 'subject_specific',
    category: 'vestibular',
    subjects: ['subj1'],
    topics: ['topic1'],
    totalQuestions: 20,
    duration: 60,
    difficulty: 'medium',
    questions: [mockQuestions[0]],
    isPublic: true,
    createdBy: 'Prof. Ana Carolina Silva',
    tags: ['matematica', 'algebra', 'matrizes'],
    attempts: 890,
    averageScore: 75,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-25T12:00:00Z'
  },
  {
    id: 'sim3',
    title: 'Física - Mecânica Clássica',
    description: 'Questões sobre as leis de Newton, energia e movimento com foco em aplicações práticas.',
    type: 'topic_specific',
    category: 'vestibular',
    subjects: ['subj2'],
    topics: ['topic2'],
    totalQuestions: 15,
    duration: 45,
    difficulty: 'hard',
    questions: [mockQuestions[1]],
    isPublic: true,
    createdBy: 'Prof. Carlos Eduardo Mendes',
    tags: ['fisica', 'mecanica', 'newton'],
    attempts: 650,
    averageScore: 68,
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z'
  },
  {
    id: 'sim4',
    title: 'Concurso TJ-SP - Conhecimentos Gerais',
    description: 'Simulado baseado em provas anteriores do Tribunal de Justiça de São Paulo.',
    type: 'custom',
    category: 'concurso',
    subjects: ['subj6', 'subj4'],
    totalQuestions: 50,
    duration: 180,
    difficulty: 'mixed',
    questions: [mockQuestions[3]],
    passingScore: 70,
    isPublic: true,
    createdBy: 'Dr. Fernando Ribeiro',
    tags: ['concurso', 'tj-sp', 'direito', 'portugues'],
    attempts: 1200,
    averageScore: 65,
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-26T15:00:00Z'
  }
];

export const mockSimulationAttempts: SimulationAttempt[] = [
  {
    id: 'attempt1',
    simulationId: 'sim1',
    userId: 'user1',
    startedAt: '2024-02-01T09:00:00Z',
    completedAt: '2024-02-01T14:30:00Z',
    status: 'completed',
    answers: [
      {
        questionId: 'q1',
        answer: 'opt1',
        isCorrect: true,
        timeSpent: 95,
        confidence: 4
      },
      {
        questionId: 'q2',
        answer: 'opt2',
        isCorrect: true,
        timeSpent: 75,
        confidence: 5
      },
      {
        questionId: 'q3',
        answer: 'opt2',
        isCorrect: false,
        timeSpent: 45,
        confidence: 2
      }
    ],
    score: 540,
    percentage: 67.5,
    timeSpent: 315,
    correctAnswers: 2,
    wrongAnswers: 1,
    skippedAnswers: 0,
    subjectScores: [
      {
        subjectId: 'subj1',
        subjectName: 'Matemática',
        totalQuestions: 1,
        correctAnswers: 1,
        percentage: 100,
        averageTime: 95
      },
      {
        subjectId: 'subj2',
        subjectName: 'Física',
        totalQuestions: 1,
        correctAnswers: 1,
        percentage: 100,
        averageTime: 75
      },
      {
        subjectId: 'subj3',
        subjectName: 'Química',
        totalQuestions: 1,
        correctAnswers: 0,
        percentage: 0,
        averageTime: 45
      }
    ]
  },
  {
    id: 'attempt2',
    simulationId: 'sim2',
    userId: 'user1',
    startedAt: '2024-02-02T10:00:00Z',
    completedAt: '2024-02-02T11:00:00Z',
    status: 'completed',
    answers: [
      {
        questionId: 'q1',
        answer: 'opt1',
        isCorrect: true,
        timeSpent: 90,
        confidence: 4
      }
    ],
    score: 85,
    percentage: 85,
    timeSpent: 55,
    correctAnswers: 1,
    wrongAnswers: 0,
    skippedAnswers: 0,
    subjectScores: [
      {
        subjectId: 'subj1',
        subjectName: 'Matemática',
        totalQuestions: 1,
        correctAnswers: 1,
        percentage: 100,
        averageTime: 90
      }
    ]
  }
];

export const mockSimulationReports: SimulationReport[] = [
  {
    attempt: mockSimulationAttempts[0],
    ranking: {
      position: 1250,
      totalParticipants: 2450,
      percentile: 49
    },
    recommendations: [
      'Revisar conceitos de Química Orgânica',
      'Praticar mais exercícios de nomenclatura',
      'Focar em questões de tempo médio de resolução'
    ],
    weakAreas: [
      'Química Orgânica - Nomenclatura',
      'Gestão de tempo em questões complexas'
    ],
    strongAreas: [
      'Matemática - Álgebra Linear',
      'Física - Mecânica Clássica'
    ],
    studyPlan: [
      'Dedicar 2 horas semanais à Química Orgânica',
      'Resolver 10 questões de nomenclatura por dia',
      'Praticar simulados cronometrados'
    ]
  }
];

// Funções auxiliares
export const getSimulationsByCategory = (category: Simulation['category']): Simulation[] => {
  return mockSimulations.filter(sim => sim.category === category);
};

export const getSimulationsByType = (type: Simulation['type']): Simulation[] => {
  return mockSimulations.filter(sim => sim.type === type);
};

export const getSimulationsBySubject = (subjectId: string): Simulation[] => {
  return mockSimulations.filter(sim => sim.subjects.includes(subjectId));
};

export const getPopularSimulations = (): Simulation[] => {
  return mockSimulations
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 10);
};

export const getUserAttempts = (userId: string): SimulationAttempt[] => {
  return mockSimulationAttempts.filter(attempt => attempt.userId === userId);
};

export const getSimulationAttempts = (simulationId: string): SimulationAttempt[] => {
  return mockSimulationAttempts.filter(attempt => attempt.simulationId === simulationId);
};

export const calculateSimulationStats = (simulationId: string) => {
  const attempts = getSimulationAttempts(simulationId);
  const completedAttempts = attempts.filter(a => a.status === 'completed');
  
  if (completedAttempts.length === 0) {
    return {
      totalAttempts: attempts.length,
      completedAttempts: 0,
      averageScore: 0,
      averageTime: 0,
      passRate: 0
    };
  }

  const totalScore = completedAttempts.reduce((sum, a) => sum + a.score, 0);
  const totalTime = completedAttempts.reduce((sum, a) => sum + a.timeSpent, 0);
  const simulation = mockSimulations.find(s => s.id === simulationId);
  const passedAttempts = simulation?.passingScore 
    ? completedAttempts.filter(a => a.score >= simulation.passingScore!).length 
    : 0;

  return {
    totalAttempts: attempts.length,
    completedAttempts: completedAttempts.length,
    averageScore: Math.round(totalScore / completedAttempts.length),
    averageTime: Math.round(totalTime / completedAttempts.length),
    passRate: simulation?.passingScore ? (passedAttempts / completedAttempts.length) * 100 : 0
  };
};

export const getQuestionsByDifficulty = (difficulty: Question['difficulty']): Question[] => {
  return mockQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsBySubject = (subjectId: string): Question[] => {
  return mockQuestions.filter(q => q.subject === subjectId);
};