import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, TextInput, Label, Select, Textarea, Tabs } from 'flowbite-react';

const Conteudo = () => {
  const [activeTab, setActiveTab] = useState('recomendados');
  const [filterType, setFilterType] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // Dados simulados de conteúdos
  const contents = [
    {
      id: 1,
      title: 'Funções Quadráticas - Conceitos Fundamentais',
      description: 'Explicação completa sobre funções quadráticas, incluindo gráficos, vértices e aplicações práticas.',
      type: 'video',
      subject: 'Matemática',
      difficulty: 'medium',
      duration: 25,
      aiGenerated: true,
      personalizedFor: 'Suas dificuldades em álgebra',
      tags: ['Funções', 'Álgebra', 'Gráficos', 'ENEM'],
      rating: 4.8,
      views: 1250,
      createdAt: '2024-09-15',
      thumbnail: 'https://via.placeholder.com/300x200?text=Funções+Quadráticas',
      author: 'IA Gabaritte',
      estimatedTime: 25,
      category: 'Teoria',
      status: 'new',
      relevanceScore: 95
    },
    {
      id: 2,
      title: 'Exercícios Práticos - Leis de Newton',
      description: 'Lista de exercícios personalizados baseada no seu desempenho em mecânica clássica.',
      type: 'exercise',
      subject: 'Física',
      difficulty: 'easy',
      duration: 40,
      aiGenerated: true,
      personalizedFor: 'Seu nível atual em física',
      tags: ['Mecânica', 'Leis de Newton', 'Exercícios', 'Prática'],
      rating: 4.6,
      views: 890,
      createdAt: '2024-09-14',
      thumbnail: 'https://via.placeholder.com/300x200?text=Leis+de+Newton',
      author: 'IA Gabaritte',
      estimatedTime: 40,
      category: 'Prática',
      status: 'recommended',
      relevanceScore: 88
    },
    {
      id: 3,
      title: 'Resumo Inteligente - Química Orgânica',
      description: 'Resumo adaptativo dos principais grupos funcionais e reações orgânicas.',
      type: 'summary',
      subject: 'Química',
      difficulty: 'hard',
      duration: 15,
      aiGenerated: true,
      personalizedFor: 'Sua preparação para vestibular',
      tags: ['Química Orgânica', 'Grupos Funcionais', 'Reações', 'Resumo'],
      rating: 4.9,
      views: 650,
      createdAt: '2024-09-13',
      thumbnail: 'https://via.placeholder.com/300x200?text=Química+Orgânica',
      author: 'IA Gabaritte',
      estimatedTime: 15,
      category: 'Resumo',
      status: 'trending',
      relevanceScore: 92
    },
    {
      id: 4,
      title: 'Simulado Personalizado - História do Brasil',
      description: 'Questões geradas especificamente para suas lacunas de conhecimento em história.',
      type: 'quiz',
      subject: 'História',
      difficulty: 'medium',
      duration: 60,
      aiGenerated: true,
      personalizedFor: 'Suas áreas de melhoria',
      tags: ['História do Brasil', 'República', 'Simulado', 'Questões'],
      rating: 4.7,
      views: 1100,
      createdAt: '2024-09-12',
      thumbnail: 'https://via.placeholder.com/300x200?text=História+Brasil',
      author: 'IA Gabaritte',
      estimatedTime: 60,
      category: 'Avaliação',
      status: 'popular',
      relevanceScore: 85
    },
    {
      id: 5,
      title: 'Mapa Mental - Biologia Celular',
      description: 'Mapa mental interativo sobre estruturas celulares e processos metabólicos.',
      type: 'mindmap',
      subject: 'Biologia',
      difficulty: 'medium',
      duration: 20,
      aiGenerated: true,
      personalizedFor: 'Seu estilo de aprendizagem visual',
      tags: ['Biologia Celular', 'Mapa Mental', 'Metabolismo', 'Estruturas'],
      rating: 4.8,
      views: 780,
      createdAt: '2024-09-11',
      thumbnail: 'https://via.placeholder.com/300x200?text=Biologia+Celular',
      author: 'IA Gabaritte',
      estimatedTime: 20,
      category: 'Visual',
      status: 'new',
      relevanceScore: 90
    },
    {
      id: 6,
      title: 'Flashcards Inteligentes - Inglês Vocabulário',
      description: 'Flashcards adaptativos com palavras mais relevantes para seu nível.',
      type: 'flashcard',
      subject: 'Inglês',
      difficulty: 'easy',
      duration: 30,
      aiGenerated: true,
      personalizedFor: 'Seu vocabulário atual',
      tags: ['Inglês', 'Vocabulário', 'Flashcards', 'Memorização'],
      rating: 4.5,
      views: 920,
      createdAt: '2024-09-10',
      thumbnail: 'https://via.placeholder.com/300x200?text=English+Vocabulary',
      author: 'IA Gabaritte',
      estimatedTime: 30,
      category: 'Memorização',
      status: 'recommended',
      relevanceScore: 87
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return 'solar:play-circle-bold-duotone';
      case 'exercise': return 'solar:document-text-bold-duotone';
      case 'summary': return 'solar:notes-bold-duotone';
      case 'quiz': return 'solar:question-circle-bold-duotone';
      case 'mindmap': return 'solar:mind-bold-duotone';
      case 'flashcard': return 'solar:card-bold-duotone';
      default: return 'solar:document-bold-duotone';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'video': return 'Vídeo';
      case 'exercise': return 'Exercício';
      case 'summary': return 'Resumo';
      case 'quiz': return 'Quiz';
      case 'mindmap': return 'Mapa Mental';
      case 'flashcard': return 'Flashcard';
      default: return 'Conteúdo';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'red';
      case 'exercise': return 'blue';
      case 'summary': return 'green';
      case 'quiz': return 'purple';
      case 'mindmap': return 'orange';
      case 'flashcard': return 'pink';
      default: return 'gray';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'failure';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'recommended': return 'Recomendado';
      case 'trending': return 'Em Alta';
      case 'popular': return 'Popular';
      default: return 'Disponível';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'info';
      case 'recommended': return 'success';
      case 'trending': return 'warning';
      case 'popular': return 'purple';
      default: return 'gray';
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesSubject = filterSubject === 'all' || content.subject === filterSubject;
    return matchesType && matchesSubject;
  });

  const getContentsByTab = () => {
    switch (activeTab) {
      case 'recomendados':
        return filteredContents.filter(c => c.status === 'recommended' || c.relevanceScore >= 90);
      case 'novos':
        return filteredContents.filter(c => c.status === 'new');
      case 'populares':
        return filteredContents.filter(c => c.status === 'popular' || c.views > 1000);
      case 'todos':
      default:
        return filteredContents;
    }
  };

  const stats = {
    total: contents.length,
    videos: contents.filter(c => c.type === 'video').length,
    exercises: contents.filter(c => c.type === 'exercise').length,
    summaries: contents.filter(c => c.type === 'summary').length,
    aiGenerated: contents.filter(c => c.aiGenerated).length,
    averageRating: (contents.reduce((sum, c) => sum + c.rating, 0) / contents.length).toFixed(1)
  };

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  const handleGenerateContent = () => {
    setShowGenerateModal(true);
  };

  const handleStartContent = (content: any) => {
    console.log('Iniciando conteúdo:', content.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conteúdo Inteligente 🤖
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Conteúdos personalizados gerados por IA baseados no seu perfil de aprendizagem
            </p>
          </div>
          <Button color="primary" onClick={handleGenerateContent}>
            <Icon icon="solar:magic-stick-3-bold-duotone" className="w-5 h-5 mr-2" />
            Gerar Conteúdo
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:document-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:play-circle-bold-duotone" className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.videos}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Vídeos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:document-text-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.exercises}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Exercícios</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:notes-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.summaries}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Resumos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:magic-stick-3-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.aiGenerated}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">IA Gerados</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageRating}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Avaliação</p>
        </CardBox>
      </div>

      {/* Filtros */}
      <CardBox>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48">
            <Label htmlFor="type" value="Tipo de Conteúdo" />
            <Select id="type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Todos os tipos</option>
              <option value="video">Vídeos</option>
              <option value="exercise">Exercícios</option>
              <option value="summary">Resumos</option>
              <option value="quiz">Quiz</option>
              <option value="mindmap">Mapas Mentais</option>
              <option value="flashcard">Flashcards</option>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Label htmlFor="subject" value="Disciplina" />
            <Select id="subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="all">Todas as disciplinas</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biologia">Biologia</option>
              <option value="História">História</option>
              <option value="Inglês">Inglês</option>
            </Select>
          </div>
        </div>
      </CardBox>

      {/* Tabs de Conteúdo */}
      <TitleCard title="Conteúdos Disponíveis">
        <Tabs aria-label="Conteúdo tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'recomendados'} 
            title="Recomendados" 
            icon={() => <Icon icon="solar:star-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('recomendados')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {getContentsByTab().map((content) => (
                <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge color={getStatusColor(content.status)} size="sm">
                        {getStatusText(content.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge color={getTypeColor(content.type)} size="sm">
                        <Icon icon={getTypeIcon(content.type)} className="w-3 h-3 mr-1" />
                        {getTypeText(content.type)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {content.estimatedTime} min
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {content.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {content.description}
                    </p>

                    {/* Personalização IA */}
                    {content.aiGenerated && (
                      <div className="mb-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:magic-stick-3-bold-duotone" className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs text-purple-700 dark:text-purple-300">
                            Personalizado para: {content.personalizedFor}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Informações */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:book-bold-duotone" className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">{content.subject}</span>
                        </div>
                        <Badge color={getDifficultyColor(content.difficulty)} size="sm">
                          {getDifficultyText(content.difficulty)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:star-bold-duotone" className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600 dark:text-gray-300">{content.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">{content.views}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon icon="solar:user-bold-duotone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{content.author}</span>
                      </div>

                      {content.aiGenerated && (
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:target-bold-duotone" className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Relevância: {content.relevanceScore}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {content.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} color="light" size="sm">
                          {tag}
                        </Badge>
                      ))}
                      {content.tags.length > 3 && (
                        <Badge color="light" size="sm">
                          +{content.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Button size="sm" color="primary" onClick={() => handleStartContent(content)} className="flex-1">
                        <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                      <Button size="sm" color="secondary" onClick={() => handleContentClick(content)} className="flex-1">
                        <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'novos'} 
            title="Novos" 
            icon={() => <Icon icon="solar:add-circle-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('novos')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {getContentsByTab().map((content) => (
                <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Mesmo layout do card anterior */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge color={getStatusColor(content.status)} size="sm">
                        {getStatusText(content.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge color={getTypeColor(content.type)} size="sm">
                        <Icon icon={getTypeIcon(content.type)} className="w-3 h-3 mr-1" />
                        {getTypeText(content.type)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {content.estimatedTime} min
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {content.description}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" color="primary" onClick={() => handleStartContent(content)} className="flex-1">
                        <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                      <Button size="sm" color="secondary" onClick={() => handleContentClick(content)} className="flex-1">
                        <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'populares'} 
            title="Populares" 
            icon={() => <Icon icon="solar:fire-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('populares')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {getContentsByTab().map((content) => (
                <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Mesmo layout do card anterior */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge color={getStatusColor(content.status)} size="sm">
                        {getStatusText(content.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge color={getTypeColor(content.type)} size="sm">
                        <Icon icon={getTypeIcon(content.type)} className="w-3 h-3 mr-1" />
                        {getTypeText(content.type)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {content.estimatedTime} min
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {content.description}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" color="primary" onClick={() => handleStartContent(content)} className="flex-1">
                        <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                      <Button size="sm" color="secondary" onClick={() => handleContentClick(content)} className="flex-1">
                        <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'todos'} 
            title="Todos" 
            icon={() => <Icon icon="solar:list-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('todos')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {getContentsByTab().map((content) => (
                <div key={content.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Mesmo layout do card anterior */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge color={getStatusColor(content.status)} size="sm">
                        {getStatusText(content.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge color={getTypeColor(content.type)} size="sm">
                        <Icon icon={getTypeIcon(content.type)} className="w-3 h-3 mr-1" />
                        {getTypeText(content.type)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {content.estimatedTime} min
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {content.description}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" color="primary" onClick={() => handleStartContent(content)} className="flex-1">
                        <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-1" />
                        Iniciar
                      </Button>
                      <Button size="sm" color="secondary" onClick={() => handleContentClick(content)} className="flex-1">
                        <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Header>
          {selectedContent?.title}
        </Modal.Header>
        <Modal.Body>
          {selectedContent && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedContent.thumbnail} 
                    alt={selectedContent.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div>
                  <Label value="Informações Gerais" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Tipo:</strong> {getTypeText(selectedContent.type)}</div>
                    <div><strong>Disciplina:</strong> {selectedContent.subject}</div>
                    <div><strong>Dificuldade:</strong> {getDifficultyText(selectedContent.difficulty)}</div>
                    <div><strong>Duração:</strong> {selectedContent.estimatedTime} minutos</div>
                    <div><strong>Autor:</strong> {selectedContent.author}</div>
                  </div>
                </div>
              </div>

              <div>
                <Label value="Descrição" className="text-lg font-semibold mb-3 block" />
                <p className="text-gray-600 dark:text-gray-300">{selectedContent.description}</p>
              </div>

              {selectedContent.aiGenerated && (
                <div>
                  <Label value="Personalização IA" className="text-lg font-semibold mb-3 block" />
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:magic-stick-3-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-medium">Conteúdo Gerado por IA</span>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Este conteúdo foi personalizado especificamente para: {selectedContent.personalizedFor}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">Relevância: {selectedContent.relevanceScore}%</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label value="Métricas" className="text-lg font-semibold mb-3 block" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedContent.rating}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Avaliação</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedContent.views}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Visualizações</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedContent.estimatedTime}min</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Duração</div>
                  </div>
                </div>
              </div>

              <div>
                <Label value="Tags" className="text-lg font-semibold mb-3 block" />
                <div className="flex flex-wrap gap-2">
                  {selectedContent.tags.map((tag: string, index: number) => (
                    <Badge key={index} color="light">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => handleStartContent(selectedContent)}>
            <Icon icon="solar:play-circle-bold-duotone" className="w-4 h-4 mr-2" />
            Iniciar Conteúdo
          </Button>
          <Button color="secondary">
            <Icon icon="solar:bookmark-bold-duotone" className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Gerar Conteúdo */}
      <Modal show={showGenerateModal} onClose={() => setShowGenerateModal(false)} size="lg">
        <Modal.Header>
          Gerar Novo Conteúdo com IA
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic" value="Tópico ou Assunto" />
              <TextInput id="topic" placeholder="Ex: Funções quadráticas, Leis de Newton..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contentType" value="Tipo de Conteúdo" />
                <Select id="contentType">
                  <option value="video">Vídeo Explicativo</option>
                  <option value="exercise">Lista de Exercícios</option>
                  <option value="summary">Resumo</option>
                  <option value="quiz">Quiz/Simulado</option>
                  <option value="mindmap">Mapa Mental</option>
                  <option value="flashcard">Flashcards</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty" value="Nível de Dificuldade" />
                <Select id="difficulty">
                  <option value="easy">Fácil</option>
                  <option value="medium">Médio</option>
                  <option value="hard">Difícil</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="subject" value="Disciplina" />
              <Select id="subject">
                <option value="Matemática">Matemática</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Biologia">Biologia</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Português">Português</option>
                <option value="Inglês">Inglês</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="preferences" value="Preferências Adicionais" />
              <Textarea 
                id="preferences" 
                rows={3}
                placeholder="Descreva suas preferências, dificuldades específicas ou objetivos..."
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            <Icon icon="solar:magic-stick-3-bold-duotone" className="w-4 h-4 mr-2" />
            Gerar Conteúdo
          </Button>
          <Button color="gray" onClick={() => setShowGenerateModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Conteudo;