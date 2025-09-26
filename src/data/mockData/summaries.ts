import { Summary, MindMap } from '../../types/gabaritte';

export const mockSummaries: Summary[] = [
  {
    id: 'summary1',
    title: 'Álgebra Linear - Conceitos Fundamentais',
    content: `# Álgebra Linear - Conceitos Fundamentais

## Matrizes
- **Definição**: Arranjo retangular de números organizados em linhas e colunas
- **Tipos**: Quadrada, retangular, identidade, nula, triangular
- **Operações**: Adição, subtração, multiplicação, transposição

## Determinantes
- **Conceito**: Número associado a uma matriz quadrada
- **Propriedades**: Det(AB) = Det(A) × Det(B)
- **Cálculo**: Regra de Sarrus (3x3), Expansão de Laplace

## Sistemas Lineares
- **Forma matricial**: Ax = b
- **Métodos de resolução**: Eliminação de Gauss, Regra de Cramer
- **Classificação**: SPD, SPI, SI

## Transformações Lineares
- **Definição**: Função que preserva operações de adição e multiplicação escalar
- **Matriz associada**: Representação matricial da transformação
- **Núcleo e imagem**: Subespaços fundamentais`,
    type: 'text',
    format: 'markdown',
    subjectId: 'subj1',
    topicId: 'topic1',
    tags: ['algebra', 'matrizes', 'determinantes', 'sistemas'],
    isPublic: true,
    isAIGenerated: false,
    createdBy: 'user1',
    sharedWith: ['user2', 'user3'],
    rating: 4.7,
    views: 1250,
    favorites: 89,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-25T14:30:00Z'
  },
  {
    id: 'summary2',
    title: 'Leis de Newton - Mapa Mental',
    content: '{"mindmap_id": "mindmap1"}',
    type: 'mind_map',
    format: 'json',
    subjectId: 'subj2',
    topicId: 'topic2',
    tags: ['newton', 'mecanica', 'fisica', 'leis'],
    isPublic: true,
    isAIGenerated: true,
    aiPrompt: 'Crie um mapa mental sobre as três leis de Newton com exemplos práticos',
    createdBy: 'ai_assistant',
    rating: 4.9,
    views: 2100,
    favorites: 156,
    createdAt: '2024-01-18T15:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z'
  },
  {
    id: 'summary3',
    title: 'Química Orgânica - Flashcards',
    content: `[
      {
        "front": "O que é um hidrocarboneto?",
        "back": "Composto orgânico formado apenas por átomos de carbono e hidrogênio"
      },
      {
        "front": "Qual a fórmula geral dos alcanos?",
        "back": "CnH2n+2"
      },
      {
        "front": "O que caracteriza um alceno?",
        "back": "Presença de pelo menos uma ligação dupla C=C"
      },
      {
        "front": "Como identificar um grupo funcional álcool?",
        "back": "Presença do grupo hidroxila (-OH) ligado a carbono saturado"
      }
    ]`,
    type: 'flashcard',
    format: 'json',
    subjectId: 'subj3',
    topicId: 'topic3',
    tags: ['organica', 'nomenclatura', 'grupos-funcionais'],
    isPublic: false,
    isAIGenerated: false,
    createdBy: 'user1',
    views: 450,
    favorites: 23,
    createdAt: '2024-01-22T11:00:00Z',
    updatedAt: '2024-01-28T16:00:00Z'
  },
  {
    id: 'summary4',
    title: 'Romantismo Brasileiro - Esquema',
    content: `# Romantismo Brasileiro (1836-1881)

## I. Contexto Histórico
- Independência do Brasil (1822)
- Formação da identidade nacional
- Influência do Romantismo europeu

## II. Características Gerais
### A. Temáticas
1. **Nacionalismo**
   - Exaltação da natureza brasileira
   - Valorização do índio como herói nacional
   - Crítica ao colonizador português

2. **Sentimentalismo**
   - Expressão de emoções intensas
   - Amor idealizado
   - Melancolia e sofrimento

### B. Estilo
- Subjetivismo
- Linguagem emotiva
- Liberdade formal

## III. Gerações
### 1ª Geração - Nacionalista (1836-1850)
- **Principais autores**: Gonçalves Dias, Gonçalves de Magalhães
- **Características**: Indianismo, exaltação da pátria

### 2ª Geração - Ultrarromântica (1850-1860)
- **Principais autores**: Álvares de Azevedo, Casimiro de Abreu
- **Características**: Mal do século, byronismo, pessimismo

### 3ª Geração - Condoreira (1860-1881)
- **Principais autores**: Castro Alves, Tobias Barreto
- **Características**: Poesia social, abolicionismo`,
    type: 'outline',
    format: 'markdown',
    subjectId: 'subj4',
    topicId: 'topic4',
    tags: ['romantismo', 'literatura', 'brasil', 'geracoes'],
    isPublic: true,
    isAIGenerated: false,
    createdBy: 'user2',
    sharedWith: ['user1'],
    rating: 4.8,
    views: 890,
    favorites: 67,
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'summary5',
    title: 'DNA e RNA - Mapa Conceitual',
    content: '{"concept_map_id": "conceptmap1"}',
    type: 'concept_map',
    format: 'json',
    subjectId: 'subj5',
    topicId: 'topic5',
    tags: ['dna', 'rna', 'biologia-molecular', 'acidos-nucleicos'],
    isPublic: true,
    isAIGenerated: true,
    aiPrompt: 'Crie um mapa conceitual mostrando as diferenças e semelhanças entre DNA e RNA',
    createdBy: 'ai_assistant',
    rating: 4.6,
    views: 1680,
    favorites: 112,
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-01-30T11:00:00Z'
  }
];

export const mockMindMaps: MindMap[] = [
  {
    id: 'mindmap1',
    summaryId: 'summary2',
    nodes: [
      {
        id: 'node1',
        text: 'Leis de Newton',
        x: 400,
        y: 300,
        level: 0,
        color: '#3b82f6',
        size: 'large',
        shape: 'circle'
      },
      {
        id: 'node2',
        text: '1ª Lei - Inércia',
        x: 200,
        y: 200,
        level: 1,
        color: '#10b981',
        size: 'medium',
        shape: 'rectangle'
      },
      {
        id: 'node3',
        text: '2ª Lei - F = ma',
        x: 400,
        y: 150,
        level: 1,
        color: '#f59e0b',
        size: 'medium',
        shape: 'rectangle'
      },
      {
        id: 'node4',
        text: '3ª Lei - Ação e Reação',
        x: 600,
        y: 200,
        level: 1,
        color: '#ef4444',
        size: 'medium',
        shape: 'rectangle'
      },
      {
        id: 'node5',
        text: 'Corpo em repouso permanece em repouso',
        x: 100,
        y: 100,
        level: 2,
        color: '#10b981',
        size: 'small',
        shape: 'ellipse'
      },
      {
        id: 'node6',
        text: 'Corpo em movimento permanece em movimento',
        x: 300,
        y: 100,
        level: 2,
        color: '#10b981',
        size: 'small',
        shape: 'ellipse'
      },
      {
        id: 'node7',
        text: 'Aceleração proporcional à força',
        x: 350,
        y: 50,
        level: 2,
        color: '#f59e0b',
        size: 'small',
        shape: 'ellipse'
      },
      {
        id: 'node8',
        text: 'Forças sempre em pares',
        x: 650,
        y: 100,
        level: 2,
        color: '#ef4444',
        size: 'small',
        shape: 'ellipse'
      }
    ],
    connections: [
      {
        id: 'conn1',
        sourceId: 'node1',
        targetId: 'node2',
        type: 'solid',
        color: '#10b981'
      },
      {
        id: 'conn2',
        sourceId: 'node1',
        targetId: 'node3',
        type: 'solid',
        color: '#f59e0b'
      },
      {
        id: 'conn3',
        sourceId: 'node1',
        targetId: 'node4',
        type: 'solid',
        color: '#ef4444'
      },
      {
        id: 'conn4',
        sourceId: 'node2',
        targetId: 'node5',
        type: 'dashed',
        color: '#10b981'
      },
      {
        id: 'conn5',
        sourceId: 'node2',
        targetId: 'node6',
        type: 'dashed',
        color: '#10b981'
      },
      {
        id: 'conn6',
        sourceId: 'node3',
        targetId: 'node7',
        type: 'dashed',
        color: '#f59e0b'
      },
      {
        id: 'conn7',
        sourceId: 'node4',
        targetId: 'node8',
        type: 'dashed',
        color: '#ef4444'
      }
    ],
    layout: 'radial',
    theme: 'modern'
  }
];

// Funções auxiliares
export const getSummariesBySubject = (subjectId: string): Summary[] => {
  return mockSummaries.filter(summary => summary.subjectId === subjectId);
};

export const getSummariesByType = (type: Summary['type']): Summary[] => {
  return mockSummaries.filter(summary => summary.type === type);
};

export const getPublicSummaries = (): Summary[] => {
  return mockSummaries.filter(summary => summary.isPublic);
};

export const getAIGeneratedSummaries = (): Summary[] => {
  return mockSummaries.filter(summary => summary.isAIGenerated);
};

export const getUserSummaries = (userId: string): Summary[] => {
  return mockSummaries.filter(summary => summary.createdBy === userId);
};

export const getPopularSummaries = (): Summary[] => {
  return mockSummaries
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
};

export const getFavoriteSummaries = (): Summary[] => {
  return mockSummaries
    .sort((a, b) => b.favorites - a.favorites)
    .slice(0, 10);
};

export const searchSummaries = (query: string): Summary[] => {
  const searchTerm = query.toLowerCase();
  return mockSummaries.filter(summary => 
    summary.title.toLowerCase().includes(searchTerm) ||
    summary.content.toLowerCase().includes(searchTerm) ||
    summary.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getSummaryStats = () => {
  const total = mockSummaries.length;
  const byType = mockSummaries.reduce((acc, summary) => {
    acc[summary.type] = (acc[summary.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const publicCount = mockSummaries.filter(s => s.isPublic).length;
  const aiGeneratedCount = mockSummaries.filter(s => s.isAIGenerated).length;
  const totalViews = mockSummaries.reduce((sum, s) => sum + s.views, 0);
  const totalFavorites = mockSummaries.reduce((sum, s) => sum + s.favorites, 0);
  const averageRating = mockSummaries
    .filter(s => s.rating)
    .reduce((sum, s) => sum + (s.rating || 0), 0) / mockSummaries.filter(s => s.rating).length;

  return {
    total,
    byType,
    publicCount,
    aiGeneratedCount,
    totalViews,
    totalFavorites,
    averageRating: Math.round(averageRating * 10) / 10
  };
};