import { Content, ContentFilter } from '../../types/gabaritte';

export const mockContent: Content[] = [
  {
    id: 'content1',
    title: 'Álgebra Linear - Matrizes e Determinantes',
    description: 'Videoaula completa sobre operações com matrizes, cálculo de determinantes e aplicações práticas.',
    type: 'video',
    category: 'Matemática',
    subjects: ['subj1'],
    topics: ['topic1'],
    difficulty: 'intermediate',
    duration: 45,
    fileUrl: 'https://example.com/videos/algebra-linear-matrizes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    author: 'Prof. Ana Carolina Silva',
    source: 'Gabaritte Academy',
    language: 'pt-BR',
    tags: ['matrizes', 'determinantes', 'algebra', 'matematica'],
    rating: 4.8,
    views: 12450,
    downloads: 3200,
    isFree: true,
    isPremium: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'content2',
    title: 'Mecânica Clássica - Leis de Newton',
    description: 'PDF completo com teoria, exemplos resolvidos e exercícios sobre as três leis de Newton.',
    type: 'pdf',
    category: 'Física',
    subjects: ['subj2'],
    topics: ['topic2'],
    difficulty: 'intermediate',
    duration: 60,
    fileUrl: 'https://example.com/pdfs/mecanica-leis-newton.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
    author: 'Prof. Carlos Eduardo Mendes',
    source: 'Física Aplicada',
    language: 'pt-BR',
    tags: ['newton', 'mecanica', 'fisica', 'leis'],
    rating: 4.9,
    views: 8750,
    downloads: 5600,
    isFree: false,
    isPremium: true,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z'
  },
  {
    id: 'content3',
    title: 'Química Orgânica - Nomenclatura IUPAC',
    description: 'Artigo detalhado sobre as regras de nomenclatura IUPAC para compostos orgânicos.',
    type: 'article',
    category: 'Química',
    subjects: ['subj3'],
    topics: ['topic3'],
    difficulty: 'beginner',
    duration: 30,
    fileUrl: 'https://example.com/articles/nomenclatura-iupac.html',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
    author: 'Dra. Maria Fernanda Santos',
    source: 'Química Moderna',
    language: 'pt-BR',
    tags: ['nomenclatura', 'iupac', 'organica', 'quimica'],
    rating: 4.6,
    views: 15200,
    downloads: 8900,
    isFree: true,
    isPremium: false,
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-18T10:30:00Z'
  },
  {
    id: 'content4',
    title: 'Literatura Brasileira - Romantismo',
    description: 'Simulação interativa sobre as características do movimento romântico no Brasil.',
    type: 'simulation',
    category: 'Literatura',
    subjects: ['subj4'],
    topics: ['topic4'],
    difficulty: 'intermediate',
    duration: 40,
    fileUrl: 'https://example.com/simulations/romantismo-brasileiro',
    thumbnailUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    author: 'Prof. João Pedro Costa',
    source: 'Literatura Interativa',
    language: 'pt-BR',
    tags: ['romantismo', 'literatura', 'brasil', 'movimento'],
    rating: 4.7,
    views: 6800,
    downloads: 2100,
    isFree: false,
    isPremium: true,
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z'
  },
  {
    id: 'content5',
    title: 'Biologia Molecular - DNA e RNA',
    description: 'Infográfico detalhado sobre estrutura e função dos ácidos nucleicos.',
    type: 'infographic',
    category: 'Biologia',
    subjects: ['subj5'],
    topics: ['topic5'],
    difficulty: 'advanced',
    duration: 25,
    fileUrl: 'https://example.com/infographics/dna-rna.svg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
    author: 'Dra. Patricia Almeida',
    source: 'BioVisual',
    language: 'pt-BR',
    tags: ['dna', 'rna', 'biologia', 'molecular'],
    rating: 4.9,
    views: 9500,
    downloads: 4200,
    isFree: true,
    isPremium: false,
    createdAt: '2024-01-08T16:00:00Z',
    updatedAt: '2024-01-28T09:00:00Z'
  },
  {
    id: 'content6',
    title: 'Exercícios de Cálculo Diferencial',
    description: 'Conjunto de exercícios progressivos sobre derivadas e suas aplicações.',
    type: 'exercise',
    category: 'Matemática',
    subjects: ['subj1'],
    topics: ['topic1'],
    difficulty: 'advanced',
    duration: 90,
    fileUrl: 'https://example.com/exercises/calculo-diferencial',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400',
    author: 'Prof. Ana Carolina Silva',
    source: 'Matemática Avançada',
    language: 'pt-BR',
    tags: ['calculo', 'derivadas', 'exercicios', 'matematica'],
    rating: 4.5,
    views: 7200,
    downloads: 3800,
    isFree: false,
    isPremium: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-30T15:00:00Z'
  },
  {
    id: 'content7',
    title: 'Quiz - Termodinâmica Básica',
    description: 'Quiz interativo com 20 questões sobre conceitos fundamentais de termodinâmica.',
    type: 'quiz',
    category: 'Física',
    subjects: ['subj2'],
    topics: ['topic2'],
    difficulty: 'beginner',
    duration: 20,
    fileUrl: 'https://example.com/quizzes/termodinamica-basica',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400',
    author: 'Prof. Carlos Eduardo Mendes',
    source: 'Física Interativa',
    language: 'pt-BR',
    tags: ['termodinamica', 'quiz', 'fisica', 'basico'],
    rating: 4.4,
    views: 11200,
    downloads: 6700,
    isFree: true,
    isPremium: false,
    createdAt: '2024-01-25T12:00:00Z',
    updatedAt: '2024-01-29T14:00:00Z'
  },
  {
    id: 'content8',
    title: 'Direito Constitucional - Princípios Fundamentais',
    description: 'Videoaula sobre os princípios fundamentais da Constituição Federal de 1988.',
    type: 'video',
    category: 'Direito',
    subjects: ['subj6'],
    topics: ['topic6'],
    difficulty: 'intermediate',
    duration: 55,
    fileUrl: 'https://example.com/videos/direito-constitucional-principios.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    author: 'Dr. Fernando Ribeiro',
    source: 'Direito Aplicado',
    language: 'pt-BR',
    tags: ['constituicao', 'principios', 'direito', 'fundamental'],
    rating: 4.8,
    views: 13500,
    downloads: 7200,
    isFree: false,
    isPremium: true,
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-27T11:00:00Z'
  }
];

// Funções auxiliares para filtros e buscas
export const filterContent = (filters: ContentFilter): Content[] => {
  let filtered = [...mockContent];

  if (filters.subjects && filters.subjects.length > 0) {
    filtered = filtered.filter(content => 
      content.subjects.some(subject => filters.subjects!.includes(subject))
    );
  }

  if (filters.topics && filters.topics.length > 0) {
    filtered = filtered.filter(content => 
      content.topics.some(topic => filters.topics!.includes(topic))
    );
  }

  if (filters.types && filters.types.length > 0) {
    filtered = filtered.filter(content => 
      filters.types!.includes(content.type)
    );
  }

  if (filters.difficulty && filters.difficulty.length > 0) {
    filtered = filtered.filter(content => 
      filters.difficulty!.includes(content.difficulty)
    );
  }

  if (filters.duration) {
    filtered = filtered.filter(content => 
      content.duration >= filters.duration!.min && 
      content.duration <= filters.duration!.max
    );
  }

  if (filters.isFree !== undefined) {
    filtered = filtered.filter(content => content.isFree === filters.isFree);
  }

  if (filters.isPremium !== undefined) {
    filtered = filtered.filter(content => content.isPremium === filters.isPremium);
  }

  if (filters.rating) {
    filtered = filtered.filter(content => content.rating >= filters.rating!);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(content => 
      content.title.toLowerCase().includes(searchTerm) ||
      content.description.toLowerCase().includes(searchTerm) ||
      content.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  return filtered;
};

export const getContentByType = (type: Content['type']): Content[] => {
  return mockContent.filter(content => content.type === type);
};

export const getContentBySubject = (subjectId: string): Content[] => {
  return mockContent.filter(content => content.subjects.includes(subjectId));
};

export const getPopularContent = (): Content[] => {
  return mockContent
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
};

export const getFreeContent = (): Content[] => {
  return mockContent.filter(content => content.isFree);
};

export const getPremiumContent = (): Content[] => {
  return mockContent.filter(content => content.isPremium);
};

export const getRecentContent = (): Content[] => {
  return mockContent
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);
};

export const getContentStats = () => {
  const total = mockContent.length;
  const byType = mockContent.reduce((acc, content) => {
    acc[content.type] = (acc[content.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byDifficulty = mockContent.reduce((acc, content) => {
    acc[content.difficulty] = (acc[content.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const freeCount = mockContent.filter(c => c.isFree).length;
  const premiumCount = mockContent.filter(c => c.isPremium).length;
  const averageRating = mockContent.reduce((sum, c) => sum + c.rating, 0) / total;
  const totalViews = mockContent.reduce((sum, c) => sum + c.views, 0);

  return {
    total,
    byType,
    byDifficulty,
    freeCount,
    premiumCount,
    averageRating: Math.round(averageRating * 10) / 10,
    totalViews
  };
};