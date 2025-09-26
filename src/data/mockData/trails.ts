import { 
  Trail, 
  TrailSubject, 
  TrailMilestone, 
  TrailObjective, 
  TrailPrerequisite, 
  TrailResource, 
  TrailStats,
  TrailCategory,
  TrailDifficulty,
  TrailStatus
} from '../../types/trails';

// Recursos comuns para trilhas
export const mockTrailResources: TrailResource[] = [
  {
    id: 'res1',
    name: 'Apostila Completa ENEM',
    type: 'documento',
    description: 'Material completo com teoria e exercícios',
    isRequired: true,
    estimatedTime: 120,
    cost: 0,
    provider: 'MEC'
  },
  {
    id: 'res2',
    name: 'Videoaulas de Matemática',
    type: 'video',
    url: 'https://example.com/videos',
    description: 'Série completa de videoaulas',
    isRequired: true,
    estimatedTime: 180,
    cost: 0,
    provider: 'Khan Academy'
  },
  {
    id: 'res3',
    name: 'Simulados ENEM',
    type: 'simulado',
    description: 'Simulados das últimas 5 edições',
    isRequired: true,
    estimatedTime: 60,
    cost: 0,
    provider: 'INEP'
  }
];

// Pré-requisitos comuns
export const mockTrailPrerequisites: TrailPrerequisite[] = [
  {
    id: 'prereq1',
    title: 'Ensino Médio Completo',
    description: 'Ter concluído o ensino médio ou estar cursando o 3º ano',
    isRequired: true,
    type: 'certification'
  },
  {
    id: 'prereq2',
    title: 'Matemática Básica',
    description: 'Conhecimentos básicos de álgebra e geometria',
    isRequired: true,
    type: 'knowledge'
  },
  {
    id: 'prereq3',
    title: 'Leitura e Interpretação',
    description: 'Capacidade de leitura e interpretação de textos',
    isRequired: true,
    type: 'skill'
  }
];

// Objetivos comuns
export const mockTrailObjectives: TrailObjective[] = [
  {
    id: 'obj1',
    title: 'Aprovação no ENEM',
    description: 'Obter pontuação suficiente para ingresso no ensino superior',
    type: 'score',
    measurable: true,
    target: '600+ pontos'
  },
  {
    id: 'obj2',
    title: 'Domínio das Competências',
    description: 'Desenvolver todas as competências avaliadas no ENEM',
    type: 'skill',
    measurable: true,
    target: '80% de acertos'
  },
  {
    id: 'obj3',
    title: 'Redação Nota 800+',
    description: 'Alcançar nota superior a 800 na redação',
    type: 'score',
    measurable: true,
    target: '800+ pontos'
  }
];

// Disciplinas para trilhas
export const mockTrailSubjects: TrailSubject[] = [
  {
    id: 'subj1',
    name: 'Matemática e suas Tecnologias',
    description: 'Álgebra, geometria, estatística e probabilidade',
    color: 'blue',
    icon: 'solar:calculator-bold-duotone',
    estimatedHours: 120,
    difficulty: 'intermediario',
    topics: ['Álgebra', 'Geometria', 'Estatística', 'Funções'],
    order: 1
  },
  {
    id: 'subj2',
    name: 'Ciências da Natureza',
    description: 'Física, Química e Biologia',
    color: 'green',
    icon: 'solar:atom-bold-duotone',
    estimatedHours: 150,
    difficulty: 'intermediario',
    topics: ['Mecânica', 'Química Orgânica', 'Genética', 'Ecologia'],
    order: 2
  },
  {
    id: 'subj3',
    name: 'Linguagens e Códigos',
    description: 'Português, Literatura, Inglês e Artes',
    color: 'purple',
    icon: 'solar:book-bold-duotone',
    estimatedHours: 100,
    difficulty: 'intermediario',
    topics: ['Gramática', 'Literatura', 'Interpretação', 'Inglês'],
    order: 3
  },
  {
    id: 'subj4',
    name: 'Ciências Humanas',
    description: 'História, Geografia, Filosofia e Sociologia',
    color: 'amber',
    icon: 'solar:global-bold-duotone',
    estimatedHours: 110,
    difficulty: 'intermediario',
    topics: ['História do Brasil', 'Geografia', 'Filosofia', 'Sociologia'],
    order: 4
  },
  {
    id: 'subj5',
    name: 'Redação',
    description: 'Produção textual dissertativo-argumentativa',
    color: 'red',
    icon: 'solar:pen-bold-duotone',
    estimatedHours: 60,
    difficulty: 'avancado',
    topics: ['Estrutura textual', 'Argumentação', 'Coesão', 'Coerência'],
    order: 5
  }
];

// Marcos para trilhas
export const mockTrailMilestones: TrailMilestone[] = [
  {
    id: 'mile1',
    title: 'Fundamentos Consolidados',
    description: 'Domínio dos conceitos básicos de todas as áreas',
    order: 1,
    estimatedWeeks: 8,
    subjects: ['subj1', 'subj2', 'subj3', 'subj4'],
    requirements: ['Completar 70% dos exercícios básicos', 'Nota mínima 7.0 nas avaliações']
  },
  {
    id: 'mile2',
    title: 'Nível Intermediário',
    description: 'Aplicação dos conhecimentos em questões de nível médio',
    order: 2,
    estimatedWeeks: 12,
    subjects: ['subj1', 'subj2', 'subj3', 'subj4', 'subj5'],
    requirements: ['Resolver 500 questões', 'Escrever 10 redações']
  },
  {
    id: 'mile3',
    title: 'Preparação Final',
    description: 'Simulados e revisão intensiva para o exame',
    order: 3,
    estimatedWeeks: 6,
    subjects: ['subj1', 'subj2', 'subj3', 'subj4', 'subj5'],
    requirements: ['Realizar 5 simulados completos', 'Média superior a 600 pontos']
  }
];

export const mockTrails: Trail[] = [
  {
    id: 'trail1',
    title: 'ENEM 2024 - Preparação Completa',
    description: 'Trilha completa de preparação para o ENEM 2024, cobrindo todas as áreas do conhecimento com foco em questões recentes e estratégias de resolução. Inclui cronograma de estudos, simulados semanais e acompanhamento de desempenho.',
    shortDescription: 'Preparação completa para o ENEM com todas as disciplinas e simulados',
    category: 'enem',
    difficulty: 'intermediario',
    status: 'ativo',
    estimatedDuration: '8 meses',
    totalHours: 540,
    weeklyHours: 18,
    subjects: mockTrailSubjects,
    milestones: mockTrailMilestones,
    objectives: mockTrailObjectives,
    prerequisites: mockTrailPrerequisites,
    resources: mockTrailResources,
    targetAudience: 'Estudantes do ensino médio e candidatos ao ENEM',
    successRate: 78,
    enrolledStudents: 15420,
    completedStudents: 12028,
    rating: 4.7,
    reviewsCount: 2847,
    color: 'blue',
    icon: 'solar:graduation-bold-duotone',
    thumbnail: '/images/trails/enem-2024.jpg',
    tags: ['ENEM', 'Vestibular', 'Ensino Superior', 'Preparação'],
    isPublic: true,
    isCustomizable: true,
    allowsModification: true,
    createdBy: 'Sistema',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-30T10:00:00Z',
    views: 45230,
    plansCreated: 8934,
    lastUsed: '2024-01-30T15:30:00Z'
  },
  {
    id: 'trail2',
    title: 'Vestibular Medicina - Preparação Intensiva',
    description: 'Trilha especializada para vestibulares de Medicina das principais universidades do país. Foco em questões de alta complexidade, biologia avançada e redação científica. Inclui simulados específicos e análise de provas anteriores.',
    shortDescription: 'Preparação intensiva para vestibulares de Medicina',
    category: 'vestibular',
    difficulty: 'avancado',
    status: 'ativo',
    estimatedDuration: '12 meses',
    totalHours: 720,
    weeklyHours: 24,
    subjects: [
      mockTrailSubjects[1], // Ciências da Natureza
      mockTrailSubjects[0], // Matemática
      mockTrailSubjects[2], // Linguagens
      mockTrailSubjects[4]  // Redação
    ],
    milestones: mockTrailMilestones,
    objectives: [
      {
        id: 'obj4',
        title: 'Aprovação em Medicina',
        description: 'Classificação para o curso de Medicina',
        type: 'certification',
        measurable: true,
        target: 'Top 50 colocações'
      }
    ],
    prerequisites: [
      mockTrailPrerequisites[0],
      {
        id: 'prereq4',
        title: 'Conhecimentos Avançados em Biologia',
        description: 'Domínio de biologia celular, genética e fisiologia',
        isRequired: true,
        type: 'knowledge'
      }
    ],
    resources: mockTrailResources,
    targetAudience: 'Candidatos a vestibulares de Medicina',
    successRate: 65,
    enrolledStudents: 8750,
    completedStudents: 5688,
    rating: 4.9,
    reviewsCount: 1456,
    color: 'red',
    icon: 'solar:health-bold-duotone',
    tags: ['Medicina', 'Vestibular', 'Biologia', 'Intensivo'],
    isPublic: true,
    isCustomizable: true,
    allowsModification: false,
    createdBy: 'Dr. Ana Silva',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-25T14:00:00Z',
    views: 32150,
    plansCreated: 5234,
    lastUsed: '2024-01-30T12:45:00Z'
  },
  {
    id: 'trail3',
    title: 'Concurso Público - Técnico Judiciário',
    description: 'Trilha focada em concursos para Técnico Judiciário dos Tribunais Regionais Federais. Aborda Direito Constitucional, Administrativo, Processual, além de Português, Matemática e Conhecimentos Gerais.',
    shortDescription: 'Preparação para concursos de Técnico Judiciário',
    category: 'concurso',
    difficulty: 'intermediario',
    status: 'ativo',
    estimatedDuration: '10 meses',
    totalHours: 600,
    weeklyHours: 20,
    subjects: [
      {
        id: 'subj6',
        name: 'Direito Constitucional',
        description: 'Princípios constitucionais e direitos fundamentais',
        color: 'amber',
        icon: 'solar:scale-bold-duotone',
        estimatedHours: 120,
        difficulty: 'avancado',
        topics: ['Direitos Fundamentais', 'Organização do Estado', 'Controle de Constitucionalidade'],
        order: 1
      },
      {
        id: 'subj7',
        name: 'Direito Administrativo',
        description: 'Atos administrativos, licitações e contratos',
        color: 'indigo',
        icon: 'solar:buildings-bold-duotone',
        estimatedHours: 100,
        difficulty: 'avancado',
        topics: ['Atos Administrativos', 'Licitações', 'Servidores Públicos'],
        order: 2
      },
      mockTrailSubjects[2], // Português
      {
        id: 'subj8',
        name: 'Matemática para Concursos',
        description: 'Matemática básica e raciocínio lógico',
        color: 'blue',
        icon: 'solar:calculator-bold-duotone',
        estimatedHours: 80,
        difficulty: 'intermediario',
        topics: ['Porcentagem', 'Regra de Três', 'Raciocínio Lógico'],
        order: 4
      }
    ],
    milestones: [
      {
        id: 'mile4',
        title: 'Base Jurídica',
        description: 'Domínio dos conceitos fundamentais do Direito',
        order: 1,
        estimatedWeeks: 16,
        subjects: ['subj6', 'subj7'],
        requirements: ['Completar 80% da teoria', 'Resolver 300 questões']
      }
    ],
    objectives: [
      {
        id: 'obj5',
        title: 'Aprovação no Concurso',
        description: 'Classificação dentro das vagas oferecidas',
        type: 'certification',
        measurable: true,
        target: 'Nota mínima 70%'
      }
    ],
    prerequisites: [
      {
        id: 'prereq5',
        title: 'Ensino Médio Completo',
        description: 'Certificado de conclusão do ensino médio',
        isRequired: true,
        type: 'certification'
      }
    ],
    resources: [
      {
        id: 'res4',
        name: 'Constituição Federal Comentada',
        type: 'livro',
        description: 'Texto constitucional com comentários doutrinários',
        isRequired: true,
        estimatedTime: 200,
        cost: 89.90,
        provider: 'Editora Saraiva'
      }
    ],
    targetAudience: 'Candidatos a concursos públicos da área judiciária',
    successRate: 72,
    enrolledStudents: 12340,
    completedStudents: 8885,
    rating: 4.6,
    reviewsCount: 1987,
    color: 'amber',
    icon: 'solar:scale-bold-duotone',
    tags: ['Concurso', 'Direito', 'Técnico Judiciário', 'TRF'],
    isPublic: true,
    isCustomizable: true,
    allowsModification: true,
    createdBy: 'Prof. Carlos Mendes',
    createdAt: '2023-11-15T00:00:00Z',
    updatedAt: '2024-01-20T16:30:00Z',
    views: 28750,
    plansCreated: 6789,
    lastUsed: '2024-01-30T09:15:00Z'
  },
  {
    id: 'trail4',
    title: 'Inglês para Certificação Internacional',
    description: 'Trilha completa para preparação para certificações internacionais de inglês como TOEFL, IELTS e Cambridge. Foco nas quatro habilidades: reading, writing, listening e speaking.',
    shortDescription: 'Preparação para certificações internacionais de inglês',
    category: 'idiomas',
    difficulty: 'intermediario',
    status: 'ativo',
    estimatedDuration: '6 meses',
    totalHours: 360,
    weeklyHours: 15,
    subjects: [
      {
        id: 'subj9',
        name: 'Reading Comprehension',
        description: 'Compreensão e interpretação de textos em inglês',
        color: 'green',
        icon: 'solar:book-open-bold-duotone',
        estimatedHours: 90,
        difficulty: 'intermediario',
        topics: ['Academic Reading', 'Business Texts', 'Literature'],
        order: 1
      },
      {
        id: 'subj10',
        name: 'Writing Skills',
        description: 'Produção de textos acadêmicos e profissionais',
        color: 'blue',
        icon: 'solar:pen-new-square-bold-duotone',
        estimatedHours: 90,
        difficulty: 'avancado',
        topics: ['Essays', 'Reports', 'Formal Letters'],
        order: 2
      }
    ],
    milestones: [
      {
        id: 'mile5',
        title: 'Nível Intermediário',
        description: 'Alcançar nível B2 do CEFR',
        order: 1,
        estimatedWeeks: 12,
        subjects: ['subj9', 'subj10'],
        requirements: ['Score 70+ em mock tests', 'Completar 50 essays']
      }
    ],
    objectives: [
      {
        id: 'obj6',
        title: 'Certificação Internacional',
        description: 'Obter certificação TOEFL/IELTS',
        type: 'certification',
        measurable: true,
        target: 'Score 90+ TOEFL ou 7.0+ IELTS'
      }
    ],
    prerequisites: [
      {
        id: 'prereq6',
        title: 'Inglês Básico',
        description: 'Conhecimento básico de gramática e vocabulário',
        isRequired: true,
        type: 'knowledge'
      }
    ],
    resources: [
      {
        id: 'res5',
        name: 'Cambridge English Course',
        type: 'curso',
        url: 'https://cambridge.org/english',
        description: 'Curso oficial Cambridge para certificações',
        isRequired: true,
        estimatedTime: 120,
        cost: 299.90,
        provider: 'Cambridge University Press'
      }
    ],
    targetAudience: 'Estudantes e profissionais que buscam certificação internacional',
    successRate: 85,
    enrolledStudents: 6780,
    completedStudents: 5763,
    rating: 4.8,
    reviewsCount: 892,
    color: 'emerald',
    icon: 'solar:global-bold-duotone',
    tags: ['Inglês', 'TOEFL', 'IELTS', 'Cambridge', 'Certificação'],
    isPublic: true,
    isCustomizable: true,
    allowsModification: true,
    createdBy: 'Prof. Maria Santos',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-28T11:20:00Z',
    views: 18950,
    plansCreated: 3456,
    lastUsed: '2024-01-30T14:10:00Z'
  },
  {
    id: 'trail5',
    title: 'Desenvolvimento Web Full Stack',
    description: 'Trilha completa para se tornar um desenvolvedor web full stack. Aborda HTML, CSS, JavaScript, React, Node.js, bancos de dados e deploy. Inclui projetos práticos e portfolio.',
    shortDescription: 'Formação completa em desenvolvimento web full stack',
    category: 'tecnologia',
    difficulty: 'intermediario',
    status: 'ativo',
    estimatedDuration: '9 meses',
    totalHours: 450,
    weeklyHours: 12,
    subjects: [
      {
        id: 'subj11',
        name: 'Frontend Development',
        description: 'HTML, CSS, JavaScript e React',
        color: 'cyan',
        icon: 'solar:code-bold-duotone',
        estimatedHours: 180,
        difficulty: 'intermediario',
        topics: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React'],
        order: 1
      },
      {
        id: 'subj12',
        name: 'Backend Development',
        description: 'Node.js, APIs REST e bancos de dados',
        color: 'violet',
        icon: 'solar:server-bold-duotone',
        estimatedHours: 150,
        difficulty: 'avancado',
        topics: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
        order: 2
      }
    ],
    milestones: [
      {
        id: 'mile6',
        title: 'Frontend Completo',
        description: 'Domínio completo do desenvolvimento frontend',
        order: 1,
        estimatedWeeks: 16,
        subjects: ['subj11'],
        requirements: ['Criar 3 projetos frontend', 'Deploy em produção']
      }
    ],
    objectives: [
      {
        id: 'obj7',
        title: 'Portfolio Profissional',
        description: 'Criar portfolio com projetos reais',
        type: 'skill',
        measurable: true,
        target: '5 projetos completos'
      }
    ],
    prerequisites: [
      {
        id: 'prereq7',
        title: 'Lógica de Programação',
        description: 'Conhecimentos básicos de programação',
        isRequired: true,
        type: 'knowledge'
      }
    ],
    resources: [
      {
        id: 'res6',
        name: 'MDN Web Docs',
        type: 'site',
        url: 'https://developer.mozilla.org',
        description: 'Documentação oficial para tecnologias web',
        isRequired: true,
        estimatedTime: 0,
        cost: 0,
        provider: 'Mozilla'
      }
    ],
    targetAudience: 'Iniciantes em programação e profissionais em transição de carreira',
    successRate: 68,
    enrolledStudents: 9850,
    completedStudents: 6698,
    rating: 4.5,
    reviewsCount: 1234,
    color: 'cyan',
    icon: 'solar:code-bold-duotone',
    tags: ['Programação', 'Web Development', 'React', 'Node.js', 'Full Stack'],
    isPublic: true,
    isCustomizable: true,
    allowsModification: true,
    createdBy: 'Tech Academy',
    createdAt: '2023-10-01T00:00:00Z',
    updatedAt: '2024-01-25T13:45:00Z',
    views: 35670,
    plansCreated: 7890,
    lastUsed: '2024-01-30T16:20:00Z'
  },
  {
    id: 'trail6',
    title: 'MBA Executivo - Preparação',
    description: 'Trilha de preparação para processos seletivos de MBA Executivo. Foca em conhecimentos de gestão, liderança, finanças e estratégia empresarial.',
    shortDescription: 'Preparação para processos seletivos de MBA Executivo',
    category: 'pos_graduacao',
    difficulty: 'avancado',
    status: 'ativo',
    estimatedDuration: '4 meses',
    totalHours: 240,
    weeklyHours: 15,
    subjects: [
      {
        id: 'subj13',
        name: 'Gestão e Liderança',
        description: 'Fundamentos de gestão e desenvolvimento de liderança',
        color: 'orange',
        icon: 'solar:users-group-two-rounded-bold-duotone',
        estimatedHours: 80,
        difficulty: 'avancado',
        topics: ['Liderança', 'Gestão de Equipes', 'Comunicação'],
        order: 1
      },
      {
        id: 'subj14',
        name: 'Finanças Corporativas',
        description: 'Análise financeira e tomada de decisões',
        color: 'green',
        icon: 'solar:chart-bold-duotone',
        estimatedHours: 80,
        difficulty: 'avancado',
        topics: ['Análise Financeira', 'Investimentos', 'Valuation'],
        order: 2
      }
    ],
    milestones: [
      {
        id: 'mile7',
        title: 'Fundamentos de Gestão',
        description: 'Domínio dos conceitos básicos de gestão',
        order: 1,
        estimatedWeeks: 8,
        subjects: ['subj13'],
        requirements: ['Completar cases de estudo', 'Apresentação final']
      }
    ],
    objectives: [
      {
        id: 'obj8',
        title: 'Aprovação no MBA',
        description: 'Ser aprovado em processo seletivo de MBA',
        type: 'certification',
        measurable: true,
        target: 'Aprovação em escola top 10'
      }
    ],
    prerequisites: [
      {
        id: 'prereq8',
        title: 'Graduação Completa',
        description: 'Diploma de ensino superior',
        isRequired: true,
        type: 'certification'
      },
      {
        id: 'prereq9',
        title: 'Experiência Profissional',
        description: 'Mínimo 3 anos de experiência',
        isRequired: true,
        type: 'experience'
      }
    ],
    resources: [
      {
        id: 'res7',
        name: 'Harvard Business Review',
        type: 'artigo',
        url: 'https://hbr.org',
        description: 'Artigos sobre gestão e estratégia',
        isRequired: false,
        estimatedTime: 60,
        cost: 19.90,
        provider: 'Harvard Business School'
      }
    ],
    targetAudience: 'Executivos e profissionais com experiência em gestão',
    successRate: 82,
    enrolledStudents: 2340,
    completedStudents: 1919,
    rating: 4.9,
    reviewsCount: 456,
    color: 'orange',
    icon: 'solar:case-round-bold-duotone',
    tags: ['MBA', 'Gestão', 'Liderança', 'Executivo', 'Pós-graduação'],
    isPublic: true,
    isCustomizable: false,
    allowsModification: false,
    createdBy: 'Business School',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-29T10:15:00Z',
    views: 12450,
    plansCreated: 1876,
    lastUsed: '2024-01-30T11:30:00Z'
  }
];

// Estatísticas das trilhas
export const mockTrailStats: TrailStats = {
  totalTrails: mockTrails.length,
  activeTrails: mockTrails.filter(t => t.status === 'ativo').length,
  popularTrails: mockTrails.filter(t => t.rating >= 4.5).length,
  totalEnrollments: mockTrails.reduce((sum, trail) => sum + trail.enrolledStudents, 0),
  averageRating: mockTrails.reduce((sum, trail) => sum + trail.rating, 0) / mockTrails.length,
  averageCompletionRate: mockTrails.reduce((sum, trail) => sum + trail.successRate, 0) / mockTrails.length,
  totalPlansCreated: mockTrails.reduce((sum, trail) => sum + trail.plansCreated, 0),
  categoriesCount: {
    enem: mockTrails.filter(t => t.category === 'enem').length,
    vestibular: mockTrails.filter(t => t.category === 'vestibular').length,
    concurso: mockTrails.filter(t => t.category === 'concurso').length,
    graduacao: mockTrails.filter(t => t.category === 'graduacao').length,
    pos_graduacao: mockTrails.filter(t => t.category === 'pos_graduacao').length,
    certificacao: mockTrails.filter(t => t.category === 'certificacao').length,
    idiomas: mockTrails.filter(t => t.category === 'idiomas').length,
    tecnologia: mockTrails.filter(t => t.category === 'tecnologia').length
  }
};

// Funções utilitárias
export const getTrailsByCategory = (category: TrailCategory): Trail[] => {
  return mockTrails.filter(trail => trail.category === category);
};

export const getTrailsByDifficulty = (difficulty: TrailDifficulty): Trail[] => {
  return mockTrails.filter(trail => trail.difficulty === difficulty);
};

export const getPopularTrails = (limit: number = 5): Trail[] => {
  return mockTrails
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getRecentTrails = (limit: number = 5): Trail[] => {
  return mockTrails
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
};

export const searchTrails = (searchTerm: string): Trail[] => {
  const term = searchTerm.toLowerCase();
  return mockTrails.filter(trail => 
    trail.title.toLowerCase().includes(term) ||
    trail.description.toLowerCase().includes(term) ||
    trail.tags.some(tag => tag.toLowerCase().includes(term))
  );
};