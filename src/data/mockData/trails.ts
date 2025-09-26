import { Trail, TrailStep } from '../../types/gabaritte';

export const mockTrails: Trail[] = [
  {
    id: 'trail1',
    title: 'ENEM 2024 - Preparação Completa',
    description: 'Trilha completa para preparação do ENEM 2024, cobrindo todas as áreas do conhecimento com foco em questões anteriores e simulados.',
    category: 'enem',
    difficulty: 'intermediate',
    estimatedDuration: '8 meses',
    totalHours: 480,
    subjects: ['subj1', 'subj2', 'subj3', 'subj4', 'subj5'],
    prerequisites: ['Ensino Médio Completo'],
    objectives: [
      'Dominar todas as competências do ENEM',
      'Atingir nota mínima de 700 pontos',
      'Desenvolver estratégias de resolução',
      'Melhorar gestão de tempo na prova'
    ],
    targetAudience: 'Estudantes do 3º ano do Ensino Médio e vestibulandos',
    isPublic: true,
    isCustomizable: true,
    rating: 4.8,
    enrolledStudents: 15420,
    createdBy: 'Equipe Gabaritte',
    tags: ['enem', 'vestibular', 'ensino-medio', 'preparatorio'],
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    progress: 65,
    enrolledAt: '2024-01-15T10:00:00Z',
    createdAt: '2023-12-01T08:00:00Z',
    updatedAt: '2024-01-30T14:00:00Z'
  },
  {
    id: 'trail2',
    title: 'Medicina - Vestibular USP/UNICAMP',
    description: 'Preparação específica para vestibulares de Medicina das principais universidades públicas de São Paulo.',
    category: 'vestibular',
    difficulty: 'advanced',
    estimatedDuration: '12 meses',
    totalHours: 720,
    subjects: ['subj2', 'subj3', 'subj5'],
    prerequisites: ['Ensino Médio Completo', 'Base sólida em Ciências'],
    objectives: [
      'Aprovação em vestibulares concorridos',
      'Domínio de questões discursivas',
      'Excelência em Biologia e Química',
      'Preparação para provas de segunda fase'
    ],
    targetAudience: 'Candidatos a cursos de Medicina',
    isPublic: true,
    isCustomizable: false,
    rating: 4.9,
    enrolledStudents: 8750,
    createdBy: 'Prof. Dr. Ricardo Medeiros',
    tags: ['medicina', 'vestibular', 'usp', 'unicamp', 'fuvest'],
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    progress: 42,
    enrolledAt: '2024-02-01T09:00:00Z',
    createdAt: '2023-11-15T10:00:00Z',
    updatedAt: '2024-01-28T16:00:00Z'
  },
  {
    id: 'trail3',
    title: 'Concurso Público - Técnico Judiciário',
    description: 'Preparação completa para concursos de Técnico Judiciário com foco em Direito, Português e Conhecimentos Gerais.',
    category: 'concurso',
    difficulty: 'intermediate',
    estimatedDuration: '10 meses',
    totalHours: 600,
    subjects: ['subj6', 'subj4'],
    prerequisites: ['Ensino Médio Completo'],
    objectives: [
      'Aprovação em concursos públicos',
      'Domínio da legislação específica',
      'Excelência em Português',
      'Conhecimento de jurisprudência'
    ],
    targetAudience: 'Candidatos a cargos públicos no Poder Judiciário',
    isPublic: true,
    isCustomizable: true,
    rating: 4.7,
    enrolledStudents: 12300,
    createdBy: 'Prof. Fernando Ribeiro',
    tags: ['concurso', 'direito', 'tecnico-judiciario', 'publico'],
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    progress: 78,
    enrolledAt: '2023-12-01T14:00:00Z',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z'
  },
  {
    id: 'trail4',
    title: 'Engenharia - Primeiro Semestre',
    description: 'Trilha para estudantes de Engenharia focada nas disciplinas básicas do primeiro semestre.',
    category: 'graduacao',
    difficulty: 'intermediate',
    estimatedDuration: '6 meses',
    totalHours: 360,
    subjects: ['subj1', 'subj2', 'subj3'],
    prerequisites: ['Ingresso em curso de Engenharia'],
    objectives: [
      'Aprovação nas disciplinas básicas',
      'Base sólida para semestres seguintes',
      'Desenvolvimento de raciocínio lógico',
      'Preparação para disciplinas específicas'
    ],
    targetAudience: 'Estudantes de Engenharia - 1º semestre',
    isPublic: true,
    isCustomizable: true,
    rating: 4.6,
    enrolledStudents: 5680,
    createdBy: 'Prof. Ana Carolina Silva',
    tags: ['engenharia', 'graduacao', 'calculo', 'fisica', 'quimica'],
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    progress: 25,
    enrolledAt: '2024-02-05T08:00:00Z',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-02-01T15:00:00Z'
  },
  {
    id: 'trail5',
    title: 'Certificação PMP - Gestão de Projetos',
    description: 'Preparação para a certificação PMP (Project Management Professional) do PMI.',
    category: 'certificacao',
    difficulty: 'advanced',
    estimatedDuration: '4 meses',
    totalHours: 200,
    subjects: [],
    prerequisites: ['Experiência em gestão de projetos', 'Graduação completa'],
    objectives: [
      'Aprovação no exame PMP',
      'Domínio do PMBOK Guide',
      'Aplicação prática de metodologias',
      'Desenvolvimento de competências gerenciais'
    ],
    targetAudience: 'Profissionais de gestão de projetos',
    isPublic: true,
    isCustomizable: false,
    rating: 4.8,
    enrolledStudents: 3250,
    createdBy: 'Instituto de Gestão',
    tags: ['pmp', 'gestao', 'projetos', 'certificacao', 'pmi'],
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    createdAt: '2023-09-01T09:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z'
  }
];

export const mockTrailSteps: TrailStep[] = [
  // Steps para ENEM 2024
  {
    id: 'step1',
    trailId: 'trail1',
    order: 1,
    type: 'subject',
    contentId: 'subj1',
    title: 'Matemática e suas Tecnologias',
    description: 'Fundamentos de matemática para o ENEM',
    estimatedTime: 120,
    isRequired: true,
    status: 'completed'
  },
  {
    id: 'step2',
    trailId: 'trail1',
    order: 2,
    type: 'subject',
    contentId: 'subj2',
    title: 'Ciências da Natureza - Física',
    description: 'Física aplicada ao ENEM',
    estimatedTime: 100,
    isRequired: true,
    prerequisites: ['step1'],
    status: 'in_progress'
  },
  {
    id: 'step3',
    trailId: 'trail1',
    order: 3,
    type: 'assessment',
    contentId: 'sim1',
    title: 'Simulado ENEM - 1ª Aplicação',
    description: 'Primeiro simulado completo do ENEM',
    estimatedTime: 330,
    isRequired: true,
    prerequisites: ['step1', 'step2'],
    status: 'available'
  },
  
  // Steps para Medicina
  {
    id: 'step4',
    trailId: 'trail2',
    order: 1,
    type: 'subject',
    contentId: 'subj5',
    title: 'Biologia Molecular Avançada',
    description: 'Biologia para vestibulares de Medicina',
    estimatedTime: 150,
    isRequired: true,
    status: 'completed'
  },
  {
    id: 'step5',
    trailId: 'trail2',
    order: 2,
    type: 'subject',
    contentId: 'subj3',
    title: 'Química Orgânica e Bioquímica',
    description: 'Química aplicada à Medicina',
    estimatedTime: 140,
    isRequired: true,
    prerequisites: ['step4'],
    status: 'in_progress'
  },
  
  // Steps para Concurso
  {
    id: 'step6',
    trailId: 'trail3',
    order: 1,
    type: 'subject',
    contentId: 'subj6',
    title: 'Direito Constitucional',
    description: 'Base constitucional para concursos',
    estimatedTime: 180,
    isRequired: true,
    status: 'completed'
  },
  {
    id: 'step7',
    trailId: 'trail3',
    order: 2,
    type: 'exercise',
    contentId: 'ex_direito1',
    title: 'Exercícios de Direito Constitucional',
    description: 'Questões práticas de concursos anteriores',
    estimatedTime: 60,
    isRequired: true,
    prerequisites: ['step6'],
    status: 'completed'
  }
];

// Funções auxiliares
export const getTrailsByCategory = (category: Trail['category']): Trail[] => {
  return mockTrails.filter(trail => trail.category === category);
};

export const getTrailsByDifficulty = (difficulty: Trail['difficulty']): Trail[] => {
  return mockTrails.filter(trail => trail.difficulty === difficulty);
};

export const getPopularTrails = (): Trail[] => {
  return mockTrails
    .sort((a, b) => b.enrolledStudents - a.enrolledStudents)
    .slice(0, 5);
};

export const getTrailSteps = (trailId: string): TrailStep[] => {
  return mockTrailSteps
    .filter(step => step.trailId === trailId)
    .sort((a, b) => a.order - b.order);
};

export const getTrailProgress = (trailId: string): number => {
  const steps = getTrailSteps(trailId);
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;
};