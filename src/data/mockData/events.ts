import { Event, Participant, Resource, Reminder } from '../../types/planning';

// Participantes mockados
export const mockParticipants: Participant[] = [
  {
    id: 'p1',
    name: 'Prof. Ana Silva',
    email: 'ana.silva@escola.edu.br',
    role: 'teacher',
    avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=3b82f6&color=fff',
    status: 'confirmed'
  },
  {
    id: 'p2',
    name: 'Dr. Carlos Mendes',
    email: 'carlos.mendes@universidade.edu.br',
    role: 'teacher',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=10b981&color=fff',
    status: 'confirmed'
  },
  {
    id: 'p3',
    name: 'Maria Santos',
    email: 'maria.santos@estudante.edu.br',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=f59e0b&color=fff',
    status: 'confirmed'
  },
  {
    id: 'p4',
    name: 'João Oliveira',
    email: 'joao.oliveira@estudante.edu.br',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=João+Oliveira&background=ef4444&color=fff',
    status: 'pending'
  },
  {
    id: 'p5',
    name: 'Dra. Lucia Ferreira',
    email: 'lucia.ferreira@tutor.edu.br',
    role: 'tutor',
    avatar: 'https://ui-avatars.com/api/?name=Lucia+Ferreira&background=8b5cf6&color=fff',
    status: 'confirmed'
  }
];

// Recursos mockados
export const mockResources: Resource[] = [
  {
    id: 'r1',
    name: 'Livro: Fundamentos de Matemática',
    type: 'book',
    description: 'Capítulos 5-7: Álgebra Linear',
    isRequired: true
  },
  {
    id: 'r2',
    name: 'Vídeo Aula: Matrizes e Determinantes',
    type: 'video',
    url: 'https://youtube.com/watch?v=exemplo',
    description: 'Aula complementar sobre o tema',
    isRequired: false
  },
  {
    id: 'r3',
    name: 'Calculadora Científica',
    type: 'equipment',
    description: 'Necessária para os cálculos práticos',
    isRequired: true
  },
  {
    id: 'r4',
    name: 'Apostila de Exercícios',
    type: 'document',
    url: 'https://drive.google.com/file/exemplo',
    description: 'Lista de exercícios para prática',
    isRequired: true
  }
];

// Lembretes mockados
export const mockReminders: Reminder[] = [
  {
    id: 'rem1',
    type: 'push',
    time: 30,
    message: 'Sua aula começará em 30 minutos!'
  },
  {
    id: 'rem2',
    type: 'email',
    time: 60,
    message: 'Lembrete: Você tem uma aula em 1 hora'
  }
];

// Eventos mockados com dados realistas para a semana atual
export const mockEvents: Event[] = [
  // QUARTA-FEIRA - 25/09/2025 (HOJE)
  {
    id: 'evt1',
    title: 'Aula de Cálculo I - Derivadas',
    type: 'class',
    subject: 'Matemática',
    date: '2025-09-25',
    startTime: '08:00',
    endTime: '10:00',
    description: 'Aula sobre regras de derivação: regra da cadeia, produto e quociente. Exercícios práticos com funções compostas e aplicações em problemas de otimização.',
    priority: 'high',
    status: 'scheduled',
    location: 'Sala 201 - Bloco de Exatas',
    color: 'blue',
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3]],
    resources: [mockResources[0], mockResources[2]],
    reminders: [mockReminders[0]],
    tags: ['matemática', 'cálculo', 'derivadas', 'aula-presencial'],
    createdAt: '2025-09-20T10:00:00Z',
    updatedAt: '2025-09-24T15:30:00Z'
  },
  {
    id: 'evt2',
    title: 'Estudo Individual - Física Quântica',
    type: 'study',
    subject: 'Física',
    date: '2025-09-25',
    startTime: '14:00',
    endTime: '16:00',
    description: 'Revisão dos conceitos fundamentais de mecânica quântica: princípio da incerteza, dualidade onda-partícula e equação de Schrödinger.',
    priority: 'medium',
    status: 'in_progress',
    location: 'Casa - Quarto de Estudos',
    color: 'green',
    participants: [mockParticipants[4]],
    resources: [mockResources[0], mockResources[1]],
    reminders: [],
    tags: ['física', 'quântica', 'estudo-individual', 'revisão'],
    createdAt: '2025-09-24T18:00:00Z',
    updatedAt: '2025-09-25T14:30:00Z'
  },
  {
    id: 'evt3',
    title: 'Reunião de Projeto - Sistema Web',
    type: 'meeting',
    subject: 'Programação',
    date: '2025-09-25',
    startTime: '19:00',
    endTime: '20:30',
    description: 'Reunião da equipe para definir os requisitos do sistema de gestão acadêmica. Discussão sobre arquitetura, tecnologias e cronograma de desenvolvimento.',
    priority: 'high',
    status: 'scheduled',
    location: 'Online - Google Meet',
    color: 'purple',
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3]],
    resources: [
      {
        id: 'r13',
        name: 'Documento de Requisitos',
        type: 'document',
        url: 'https://drive.google.com/docs/exemplo',
        description: 'Especificação inicial do projeto',
        isRequired: true
      }
    ],
    reminders: [mockReminders[0]],
    tags: ['programação', 'projeto', 'reunião', 'equipe'],
    createdAt: '2025-09-23T16:00:00Z',
    updatedAt: '2025-09-25T10:00:00Z'
  },

  // QUINTA-FEIRA - 26/09/2025
  {
    id: 'evt4',
    title: 'Prova de Química Orgânica',
    type: 'exam',
    subject: 'Química',
    date: '2025-09-26',
    startTime: '08:00',
    endTime: '10:00',
    description: 'Avaliação sobre reações orgânicas, mecanismos de substituição nucleofílica e eletrofílica, e síntese de compostos orgânicos.',
    priority: 'urgent',
    status: 'scheduled',
    location: 'Auditório Principal - Campus Central',
    color: 'red',
    participants: [mockParticipants[0]],
    resources: [mockResources[2], mockResources[3]],
    reminders: [
      { id: 'rem3', type: 'push', time: 120, message: 'Prova em 2 horas! Boa sorte!' },
      { id: 'rem4', type: 'email', time: 1440, message: 'Lembrete: Prova de Química amanhã às 8h' }
    ],
    tags: ['química', 'orgânica', 'prova', 'avaliação'],
    createdAt: '2025-09-10T14:00:00Z',
    updatedAt: '2025-09-25T20:00:00Z'
  },
  {
    id: 'evt5',
    title: 'Seminário de Literatura - Machado de Assis',
    type: 'seminar',
    subject: 'Português',
    date: '2025-09-26',
    startTime: '14:30',
    endTime: '16:30',
    description: 'Apresentação sobre a obra "Dom Casmurro" e análise dos recursos narrativos utilizados por Machado de Assis. Discussão sobre o narrador não-confiável.',
    priority: 'medium',
    status: 'scheduled',
    location: 'Sala 105 - Bloco de Humanas',
    color: 'amber',
    participants: [mockParticipants[0], mockParticipants[2], mockParticipants[3]],
    resources: [
      {
        id: 'r14',
        name: 'Dom Casmurro - Machado de Assis',
        type: 'book',
        description: 'Obra principal para análise',
        isRequired: true
      }
    ],
    reminders: [mockReminders[1]],
    tags: ['português', 'literatura', 'machado-de-assis', 'seminário'],
    createdAt: '2025-09-18T11:00:00Z',
    updatedAt: '2025-09-25T16:00:00Z'
  },

  // SEXTA-FEIRA - 27/09/2025
  {
    id: 'evt6',
    title: 'Workshop de Python - Data Science',
    type: 'workshop',
    subject: 'Programação',
    date: '2025-09-27',
    startTime: '09:00',
    endTime: '12:00',
    description: 'Workshop prático sobre análise de dados com Python. Uso das bibliotecas Pandas, NumPy e Matplotlib para manipulação e visualização de dados.',
    priority: 'medium',
    status: 'scheduled',
    location: 'Laboratório de Informática - Sala 301',
    color: 'indigo',
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3], mockParticipants[4]],
    resources: [
      {
        id: 'r15',
        name: 'Jupyter Notebook',
        type: 'software',
        description: 'Ambiente para desenvolvimento em Python',
        isRequired: true
      },
      {
        id: 'r16',
        name: 'Dataset - Vendas 2025',
        type: 'document',
        url: 'https://kaggle.com/dataset/exemplo',
        description: 'Base de dados para exercícios práticos',
        isRequired: true
      }
    ],
    reminders: [
      { id: 'rem5', type: 'push', time: 60, message: 'Workshop de Python em 1 hora!' }
    ],
    tags: ['programação', 'python', 'data-science', 'workshop'],
    createdAt: '2025-09-22T13:00:00Z',
    updatedAt: '2025-09-26T16:00:00Z'
  },
  {
    id: 'evt7',
    title: 'Revisão de Biologia - Genética',
    type: 'review',
    subject: 'Biologia',
    date: '2025-09-27',
    startTime: '15:00',
    endTime: '17:00',
    description: 'Sessão de revisão sobre genética mendeliana, herança ligada ao sexo e engenharia genética. Resolução de exercícios de vestibular.',
    priority: 'medium',
    status: 'scheduled',
    location: 'Biblioteca - Sala de Estudos 2',
    color: 'emerald',
    participants: [mockParticipants[4], mockParticipants[2]],
    resources: [
      {
        id: 'r17',
        name: 'Livro: Biologia Molecular',
        type: 'book',
        description: 'Capítulos sobre genética e biotecnologia',
        isRequired: true
      }
    ],
    reminders: [mockReminders[0]],
    tags: ['biologia', 'genética', 'revisão', 'vestibular'],
    createdAt: '2025-09-24T16:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z'
  },

  // SÁBADO - 28/09/2025
  {
    id: 'evt8',
    title: 'Trabalho de História - República Velha',
    type: 'assignment',
    subject: 'História',
    date: '2025-09-28',
    startTime: '10:00',
    endTime: '14:00',
    description: 'Finalização do trabalho sobre a República Velha no Brasil (1889-1930). Análise dos aspectos políticos, econômicos e sociais do período.',
    priority: 'high',
    status: 'scheduled',
    location: 'Casa - Escritório',
    color: 'orange',
    participants: [],
    resources: [
      {
        id: 'r18',
        name: 'História do Brasil - Boris Fausto',
        type: 'book',
        description: 'Capítulos sobre a República Velha',
        isRequired: true
      },
      {
        id: 'r19',
        name: 'Artigos CPDOC-FGV',
        type: 'document',
        url: 'https://cpdoc.fgv.br/exemplo',
        description: 'Documentos históricos do período',
        isRequired: true
      }
    ],
    reminders: [mockReminders[0]],
    tags: ['história', 'república-velha', 'trabalho', 'pesquisa'],
    createdAt: '2025-09-20T20:00:00Z',
    updatedAt: '2025-09-27T18:30:00Z'
  },

  // DOMINGO - 29/09/2025
  {
    id: 'evt9',
    title: 'Estudo de Inglês - TOEFL Preparation',
    type: 'study',
    subject: 'Inglês',
    date: '2025-09-29',
    startTime: '09:00',
    endTime: '11:00',
    description: 'Preparação para o exame TOEFL: prática de reading comprehension, listening e writing. Simulado de questões recentes.',
    priority: 'medium',
    status: 'scheduled',
    location: 'Casa - Sala de Estudos',
    color: 'cyan',
    participants: [],
    resources: [
      {
        id: 'r20',
        name: 'TOEFL Official Guide',
        type: 'book',
        description: 'Guia oficial com exercícios e dicas',
        isRequired: true
      },
      {
        id: 'r21',
        name: 'TOEFL Practice Online',
        type: 'software',
        url: 'https://toeflpractice.ets.org',
        description: 'Plataforma oficial de prática',
        isRequired: true
      }
    ],
    reminders: [mockReminders[0]],
    tags: ['inglês', 'toefl', 'preparação', 'simulado'],
    createdAt: '2025-09-26T15:00:00Z',
    updatedAt: '2025-09-28T20:00:00Z'
  },

  // SEGUNDA-FEIRA - 30/09/2025
  {
    id: 'evt10',
    title: 'Aula de Estatística - Distribuições',
    type: 'class',
    subject: 'Matemática',
    date: '2025-09-30',
    startTime: '08:00',
    endTime: '10:00',
    description: 'Aula sobre distribuições de probabilidade: normal, binomial e Poisson. Aplicações práticas em análise de dados e inferência estatística.',
    priority: 'high',
    status: 'scheduled',
    location: 'Sala 203 - Bloco de Exatas',
    color: 'blue',
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3]],
    resources: [mockResources[0], mockResources[2]],
    reminders: [mockReminders[0], mockReminders[1]],
    tags: ['matemática', 'estatística', 'distribuições', 'probabilidade'],
    createdAt: '2025-09-25T14:00:00Z',
    updatedAt: '2025-09-29T16:00:00Z'
  },
  {
    id: 'evt11',
    title: 'Orientação de TCC - Metodologia',
    type: 'meeting',
    subject: 'Orientação Acadêmica',
    date: '2025-09-30',
    startTime: '16:00',
    endTime: '17:00',
    description: 'Reunião com orientador para discussão da metodologia de pesquisa do TCC. Definição dos instrumentos de coleta de dados e cronograma.',
    priority: 'high',
    status: 'scheduled',
    location: 'Sala do Professor - Bloco Administrativo',
    color: 'teal',
    participants: [
      {
        id: 'p6',
        name: 'Prof. Dr. Roberto Lima',
        email: 'roberto.lima@orientador.edu.br',
        role: 'teacher',
        avatar: 'https://ui-avatars.com/api/?name=Roberto+Lima&background=0d9488&color=fff',
        status: 'confirmed'
      }
    ],
    resources: [
      {
        id: 'r22',
        name: 'Projeto de Pesquisa - Versão 2.0',
        type: 'document',
        description: 'Versão atualizada do projeto para revisão',
        isRequired: true
      }
    ],
    reminders: [mockReminders[0], mockReminders[1]],
    tags: ['tcc', 'orientação', 'metodologia', 'pesquisa'],
    createdAt: '2025-09-28T14:00:00Z',
    updatedAt: '2025-09-29T11:00:00Z'
  },

  // TERÇA-FEIRA - 01/10/2025
  {
    id: 'evt12',
    title: 'Laboratório de Física - Óptica',
    type: 'workshop',
    subject: 'Física',
    date: '2025-10-01',
    startTime: '14:00',
    endTime: '17:00',
    description: 'Experimentos práticos sobre óptica geométrica: leis da reflexão e refração, lentes convergentes e divergentes, formação de imagens.',
    priority: 'medium',
    status: 'scheduled',
    location: 'Laboratório de Física - Bloco B',
    color: 'green',
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3]],
    resources: [
      {
        id: 'r23',
        name: 'Kit de Óptica',
        type: 'equipment',
        description: 'Lentes, espelhos e fonte de luz',
        isRequired: true
      },
      {
        id: 'r24',
        name: 'Roteiro do Experimento',
        type: 'document',
        description: 'Procedimentos e questões do laboratório',
        isRequired: true
      }
    ],
    reminders: [mockReminders[0]],
    tags: ['física', 'óptica', 'laboratório', 'experimento'],
    createdAt: '2025-09-27T10:00:00Z',
    updatedAt: '2025-09-30T14:00:00Z'
  },

  // Eventos antigos mantidos para histórico
  {
    id: 'evt_old1',
    title: 'Física - Mecânica Clássica',
    type: 'class',
    subject: 'Física',
    date: '2024-01-26',
    startTime: '10:00',
    endTime: '12:00',
    description: 'Aula teórica sobre as Leis de Newton e suas aplicações. Demonstrações práticas com experimentos simples e resolução de problemas contextualizados.',
    priority: 'medium',
    status: 'completed',
    location: 'Laboratório de Física - Bloco B, Sala 201',
    color: 'green',
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3]],
    resources: [mockResources[2]],
    reminders: [mockReminders[0], mockReminders[1]],
    tags: ['física', 'mecânica', 'newton', 'aula-presencial'],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-25T12:00:00Z'
  }
];

// Função para obter eventos por data
export const getEventsByDate = (date: Date): Event[] => {
  const dateString = date.toISOString().split('T')[0];
  return mockEvents.filter(event => event.date === dateString);
};

// Função para obter eventos por status
export const getEventsByStatus = (status: Event['status']): Event[] => {
  return mockEvents.filter(event => event.status === status);
};

// Função para obter eventos por prioridade
export const getEventsByPriority = (priority: Event['priority']): Event[] => {
  return mockEvents.filter(event => event.priority === priority);
};

// Função para obter eventos da semana
export const getWeekEvents = (startDate: Date): Event[] => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  return mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
};