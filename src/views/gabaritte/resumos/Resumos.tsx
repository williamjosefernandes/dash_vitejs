import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, TextInput, Label, Select, Textarea, Progress, Tabs } from 'flowbite-react';

const Resumos = () => {
  const [activeTab, setActiveTab] = useState('meus-resumos');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Dados simulados de resumos
  const summaries = [
    {
      id: 1,
      title: 'Funções Quadráticas - Resumo Completo',
      content: 'Uma função quadrática é uma função polinomial de segundo grau, expressa na forma f(x) = ax² + bx + c, onde a ≠ 0...',
      fullContent: `# Funções Quadráticas

## Definição
Uma função quadrática é uma função polinomial de segundo grau, expressa na forma:
**f(x) = ax² + bx + c**

Onde:
- a, b, c são números reais
- a ≠ 0 (coeficiente principal)

## Características Principais

### Gráfico
- O gráfico é uma **parábola**
- Se a > 0: parábola com concavidade para cima
- Se a < 0: parábola com concavidade para baixo

### Vértice
Coordenadas do vértice: V(xv, yv)
- xv = -b/2a
- yv = f(xv) = -Δ/4a

### Discriminante (Δ)
Δ = b² - 4ac

- Δ > 0: duas raízes reais distintas
- Δ = 0: uma raiz real (raiz dupla)
- Δ < 0: não possui raízes reais

## Aplicações
- Movimento uniformemente variado
- Problemas de otimização
- Análise de lucro e receita`,
      subject: 'Matemática',
      topic: 'Funções Quadráticas',
      type: 'ai_generated',
      difficulty: 'medium',
      readingTime: 8,
      createdAt: '2024-09-15',
      updatedAt: '2024-09-15',
      tags: ['Funções', 'Álgebra', 'Gráficos', 'Parábola'],
      source: 'Livro de Matemática - Cap. 5',
      aiModel: 'GPT-4',
      quality: 95,
      wordCount: 245,
      status: 'completed',
      category: 'Teoria',
      views: 156,
      likes: 23,
      shared: 8,
      bookmarked: true
    },
    {
      id: 2,
      title: 'Leis de Newton - Síntese',
      content: 'As três leis de Newton formam a base da mecânica clássica e descrevem a relação entre forças e movimento...',
      fullContent: `# Leis de Newton

## 1ª Lei - Lei da Inércia
**"Todo corpo permanece em repouso ou em movimento retilíneo uniforme, a menos que seja obrigado a mudar seu estado por forças aplicadas sobre ele."**

### Conceitos:
- **Inércia**: tendência dos corpos de manter seu estado de movimento
- **Referencial inercial**: sistema onde a 1ª lei é válida

## 2ª Lei - Princípio Fundamental
**F = m × a**

Onde:
- F = força resultante (N)
- m = massa (kg)
- a = aceleração (m/s²)

### Características:
- A aceleração é diretamente proporcional à força
- A aceleração é inversamente proporcional à massa

## 3ª Lei - Ação e Reação
**"Para toda ação há sempre uma reação oposta e de igual intensidade."**

### Características:
- As forças atuam em corpos diferentes
- Têm mesma intensidade e direção
- Sentidos opostos
- Atuam simultaneamente

## Aplicações
- Análise de movimento de veículos
- Projetos de foguetes
- Estudo de colisões`,
      subject: 'Física',
      topic: 'Leis de Newton',
      type: 'ai_generated',
      difficulty: 'easy',
      readingTime: 6,
      createdAt: '2024-09-14',
      updatedAt: '2024-09-14',
      tags: ['Mecânica', 'Forças', 'Movimento', 'Inércia'],
      source: 'Aula de Física - Mecânica',
      aiModel: 'GPT-4',
      quality: 92,
      wordCount: 198,
      status: 'completed',
      category: 'Conceitos',
      views: 134,
      likes: 19,
      shared: 5,
      bookmarked: false
    },
    {
      id: 3,
      title: 'Química Orgânica - Grupos Funcionais',
      content: 'Os grupos funcionais são arranjos específicos de átomos que conferem propriedades características às moléculas orgânicas...',
      fullContent: `# Grupos Funcionais em Química Orgânica

## Definição
Grupos funcionais são arranjos específicos de átomos que conferem propriedades características às moléculas orgânicas.

## Principais Grupos Funcionais

### Álcoois (-OH)
- **Fórmula geral**: R-OH
- **Nomenclatura**: sufixo -ol
- **Exemplo**: Etanol (C₂H₅OH)
- **Propriedades**: Polares, formam ligações de hidrogênio

### Aldeídos (-CHO)
- **Fórmula geral**: R-CHO
- **Nomenclatura**: sufixo -al
- **Exemplo**: Formaldeído (HCHO)
- **Propriedades**: Grupo carbonila terminal

### Cetonas (C=O)
- **Fórmula geral**: R-CO-R'
- **Nomenclatura**: sufixo -ona
- **Exemplo**: Acetona (CH₃COCH₃)
- **Propriedades**: Grupo carbonila interno

### Ácidos Carboxílicos (-COOH)
- **Fórmula geral**: R-COOH
- **Nomenclatura**: ácido...óico
- **Exemplo**: Ácido acético (CH₃COOH)
- **Propriedades**: Caráter ácido, ionizáveis

### Ésteres (-COO-)
- **Fórmula geral**: R-COO-R'
- **Nomenclatura**: ...ato de ...ila
- **Exemplo**: Acetato de etila
- **Propriedades**: Aromas característicos

## Reações Características
Cada grupo funcional possui reações específicas que permitem sua identificação e transformação.`,
      subject: 'Química',
      topic: 'Grupos Funcionais',
      type: 'ai_generated',
      difficulty: 'hard',
      readingTime: 12,
      createdAt: '2024-09-13',
      updatedAt: '2024-09-13',
      tags: ['Química Orgânica', 'Grupos Funcionais', 'Nomenclatura', 'Reações'],
      source: 'Apostila de Química Orgânica',
      aiModel: 'GPT-4',
      quality: 97,
      wordCount: 312,
      status: 'completed',
      category: 'Classificação',
      views: 89,
      likes: 15,
      shared: 3,
      bookmarked: true
    },
    {
      id: 4,
      title: 'História do Brasil - Era Vargas',
      content: 'A Era Vargas (1930-1945 e 1951-1954) foi um período marcante da história brasileira, caracterizado por transformações políticas, econômicas e sociais...',
      fullContent: `# Era Vargas (1930-1954)

## Contextos Históricos

### Revolução de 1930
- **Causas**: Crise de 1929, política do café com leite
- **Consequências**: Fim da República Velha
- **Protagonistas**: Getúlio Vargas, Tenentes

## Períodos da Era Vargas

### Governo Provisório (1930-1934)
- Centralização do poder
- Criação de ministérios
- Código Eleitoral de 1932
- Revolução Constitucionalista

### Governo Constitucional (1934-1937)
- Constituição de 1934
- Crescimento do integralismo e comunismo
- Intentona Comunista (1935)
- Plano Cohen

### Estado Novo (1937-1945)
- **Características**: Ditadura, centralização
- **Constituição de 1937**: "Polaca"
- **Economia**: Industrialização, CSN
- **Trabalhismo**: CLT, sindicatos
- **Propaganda**: DIP, Hora do Brasil

### Segundo Governo (1951-1954)
- Retorno democrático
- Campanha "O petróleo é nosso"
- Criação da Petrobras
- Crise política e suicídio

## Legado
- Consolidação da indústria nacional
- Legislação trabalhista
- Fortalecimento do Estado
- Populismo brasileiro`,
      subject: 'História',
      topic: 'Era Vargas',
      type: 'ai_generated',
      difficulty: 'medium',
      readingTime: 10,
      createdAt: '2024-09-12',
      updatedAt: '2024-09-12',
      tags: ['História do Brasil', 'Era Vargas', 'Estado Novo', 'República'],
      source: 'Livro de História do Brasil',
      aiModel: 'GPT-4',
      quality: 94,
      wordCount: 267,
      status: 'completed',
      category: 'Período Histórico',
      views: 112,
      likes: 21,
      shared: 7,
      bookmarked: false
    },
    {
      id: 5,
      title: 'Biologia Celular - Mitose',
      content: 'A mitose é um processo de divisão celular que resulta na formação de duas células filhas geneticamente idênticas à célula mãe...',
      fullContent: `# Mitose - Divisão Celular

## Definição
A mitose é um processo de divisão celular que resulta na formação de duas células filhas geneticamente idênticas à célula mãe.

## Fases da Mitose

### Prófase
- **Condensação cromossômica**: Cromatina → Cromossomos
- **Desintegração do nucléolo**
- **Formação do fuso mitótico**
- **Início da fragmentação da carioteca**

### Metáfase
- **Cromossomos no equador**: Placa equatorial
- **Máxima condensação cromossômica**
- **Carioteca completamente fragmentada**
- **Checkpoint do fuso**: Verificação de ligações

### Anáfase
- **Separação das cromátides-irmãs**
- **Migração para polos opostos**
- **Anáfase A**: Movimento dos cromossomos
- **Anáfase B**: Alongamento do fuso

### Telófase
- **Descondensação cromossômica**
- **Reconstituição da carioteca**
- **Reaparecimento do nucléolo**
- **Desorganização do fuso mitótico**

## Citocinese
- **Células animais**: Anel contrátil de actina-miosina
- **Células vegetais**: Formação da lamela média

## Importância Biológica
- Crescimento dos organismos
- Regeneração de tecidos
- Reprodução assexuada
- Manutenção do número cromossômico`,
      subject: 'Biologia',
      topic: 'Mitose',
      type: 'ai_generated',
      difficulty: 'medium',
      readingTime: 9,
      createdAt: '2024-09-11',
      updatedAt: '2024-09-11',
      tags: ['Biologia Celular', 'Mitose', 'Divisão Celular', 'Cromossomos'],
      source: 'Livro de Biologia Celular',
      aiModel: 'GPT-4',
      quality: 96,
      wordCount: 234,
      status: 'completed',
      category: 'Processo Biológico',
      views: 98,
      likes: 17,
      shared: 4,
      bookmarked: true
    },
    {
      id: 6,
      title: 'Resumo em Progresso - Termodinâmica',
      content: 'Gerando resumo inteligente sobre as leis da termodinâmica...',
      fullContent: '',
      subject: 'Física',
      topic: 'Termodinâmica',
      type: 'ai_generated',
      difficulty: 'hard',
      readingTime: 0,
      createdAt: '2024-09-16',
      updatedAt: '2024-09-16',
      tags: ['Física', 'Termodinâmica', 'Leis', 'Energia'],
      source: 'Apostila de Física Térmica',
      aiModel: 'GPT-4',
      quality: 0,
      wordCount: 0,
      status: 'generating',
      category: 'Teoria',
      views: 0,
      likes: 0,
      shared: 0,
      bookmarked: false,
      progress: 65
    }
  ];

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
      case 'completed': return 'Concluído';
      case 'generating': return 'Gerando...';
      case 'draft': return 'Rascunho';
      case 'reviewing': return 'Revisando';
      default: return 'Disponível';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'generating': return 'info';
      case 'draft': return 'warning';
      case 'reviewing': return 'purple';
      default: return 'gray';
    }
  };

  const filteredSummaries = summaries.filter(summary => {
    const matchesSubject = filterSubject === 'all' || summary.subject === filterSubject;
    const matchesType = filterType === 'all' || summary.type === filterType;
    return matchesSubject && matchesType;
  });

  const getSummariesByTab = () => {
    switch (activeTab) {
      case 'meus-resumos':
        return filteredSummaries.filter(s => s.status === 'completed');
      case 'em-progresso':
        return filteredSummaries.filter(s => s.status === 'generating' || s.status === 'draft');
      case 'favoritos':
        return filteredSummaries.filter(s => s.bookmarked);
      case 'todos':
      default:
        return filteredSummaries;
    }
  };

  const stats = {
    total: summaries.length,
    completed: summaries.filter(s => s.status === 'completed').length,
    generating: summaries.filter(s => s.status === 'generating').length,
    bookmarked: summaries.filter(s => s.bookmarked).length,
    totalWords: summaries.reduce((sum, s) => sum + s.wordCount, 0),
    averageQuality: Math.round(summaries.filter(s => s.quality > 0).reduce((sum, s) => sum + s.quality, 0) / summaries.filter(s => s.quality > 0).length)
  };

  const handleSummaryClick = (summary: any) => {
    setSelectedSummary(summary);
    setShowModal(true);
  };

  const handleCreateSummary = () => {
    setShowCreateModal(true);
  };

  const handleDownload = (summary: any) => {
    console.log('Baixando resumo:', summary.title);
  };

  const handleShare = (summary: any) => {
    console.log('Compartilhando resumo:', summary.title);
  };

  const handleBookmark = (summary: any) => {
    console.log('Favoritando resumo:', summary.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Resumos Inteligentes 📝
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Ferramenta de resumos automáticos gerados por IA para otimizar seus estudos
            </p>
          </div>
          <Button color="primary" onClick={handleCreateSummary}>
            <Icon icon="solar:magic-stick-3-bold-duotone" className="w-5 h-5 mr-2" />
            Criar Resumo
          </Button>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:notes-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.completed}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Concluídos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:refresh-circle-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.generating}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Gerando</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:bookmark-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.bookmarked}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Favoritos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:text-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalWords.toLocaleString()}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Palavras</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.averageQuality}%</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Qualidade</p>
        </CardBox>
      </div>

      {/* Filtros */}
      <CardBox>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48">
            <Label htmlFor="subject" value="Disciplina" />
            <Select id="subject" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="all">Todas as disciplinas</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biologia">Biologia</option>
              <option value="História">História</option>
              <option value="Geografia">Geografia</option>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Label htmlFor="type" value="Tipo" />
            <Select id="type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Todos os tipos</option>
              <option value="ai_generated">Gerado por IA</option>
              <option value="manual">Manual</option>
              <option value="imported">Importado</option>
            </Select>
          </div>
        </div>
      </CardBox>

      {/* Tabs de Resumos */}
      <TitleCard title="Meus Resumos">
        <Tabs aria-label="Resumos tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'meus-resumos'} 
            title="Meus Resumos" 
            icon={() => <Icon icon="solar:notes-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('meus-resumos')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSummariesByTab().map((summary) => (
                <div key={summary.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{summary.title}</h3>
                        {summary.bookmarked && (
                          <Icon icon="solar:bookmark-bold-duotone" className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{summary.topic}</p>
                    </div>
                    <Badge color={getStatusColor(summary.status)} size="sm">
                      {getStatusText(summary.status)}
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {summary.content}
                  </p>

                  {/* Progresso para resumos sendo gerados */}
                  {summary.status === 'generating' && summary.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gerando resumo...</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{summary.progress}%</span>
                      </div>
                      <Progress progress={summary.progress} color="blue" size="sm" />
                    </div>
                  )}

                  {/* Informações do resumo */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{summary.readingTime}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">min leitura</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{summary.wordCount}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">palavras</div>
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:book-bold-duotone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300">{summary.subject}</span>
                      </div>
                      <Badge color={getDifficultyColor(summary.difficulty)} size="sm">
                        {getDifficultyText(summary.difficulty)}
                      </Badge>
                    </div>

                    {summary.quality > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:star-bold-duotone" className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600 dark:text-gray-300">Qualidade: {summary.quality}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">{summary.views}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {new Date(summary.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    {summary.source && (
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:document-bold-duotone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-300 text-xs">{summary.source}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {summary.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} color="light" size="sm">
                        {tag}
                      </Badge>
                    ))}
                    {summary.tags.length > 3 && (
                      <Badge color="light" size="sm">
                        +{summary.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    {summary.status === 'completed' ? (
                      <>
                        <Button size="sm" color="primary" onClick={() => handleSummaryClick(summary)} className="flex-1">
                          <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                          Ler
                        </Button>
                        <Button size="sm" color="secondary" onClick={() => handleDownload(summary)}>
                          <Icon icon="solar:download-bold-duotone" className="w-4 h-4" />
                        </Button>
                        <Button size="sm" color="secondary" onClick={() => handleShare(summary)}>
                          <Icon icon="solar:share-bold-duotone" className="w-4 h-4" />
                        </Button>
                        <Button size="sm" color="secondary" onClick={() => handleBookmark(summary)}>
                          <Icon icon={summary.bookmarked ? "solar:bookmark-bold-duotone" : "solar:bookmark-outline"} className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" color="gray" disabled className="flex-1">
                        <Icon icon="solar:refresh-circle-bold-duotone" className="w-4 h-4 mr-1 animate-spin" />
                        Gerando...
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'em-progresso'} 
            title="Em Progresso" 
            icon={() => <Icon icon="solar:refresh-circle-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('em-progresso')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSummariesByTab().map((summary) => (
                <div key={summary.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{summary.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{summary.topic}</p>
                    </div>
                    <Badge color={getStatusColor(summary.status)} size="sm">
                      {getStatusText(summary.status)}
                    </Badge>
                  </div>

                  {summary.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progresso</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{summary.progress}%</span>
                      </div>
                      <Progress progress={summary.progress} color="blue" size="sm" />
                    </div>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {summary.content}
                  </p>
                </div>
              ))}
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'favoritos'} 
            title="Favoritos" 
            icon={() => <Icon icon="solar:bookmark-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('favoritos')}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSummariesByTab().map((summary) => (
                <div key={summary.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{summary.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{summary.topic}</p>
                    </div>
                    <Icon icon="solar:bookmark-bold-duotone" className="w-5 h-5 text-yellow-500" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {summary.content}
                  </p>

                  <div className="flex gap-2">
                    <Button size="sm" color="primary" onClick={() => handleSummaryClick(summary)} className="flex-1">
                      <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                      Ler
                    </Button>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {getSummariesByTab().map((summary) => (
                <div key={summary.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{summary.title}</h3>
                        {summary.bookmarked && (
                          <Icon icon="solar:bookmark-bold-duotone" className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{summary.topic}</p>
                    </div>
                    <Badge color={getStatusColor(summary.status)} size="sm">
                      {getStatusText(summary.status)}
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {summary.content}
                  </p>

                  <div className="flex gap-2">
                    {summary.status === 'completed' ? (
                      <Button size="sm" color="primary" onClick={() => handleSummaryClick(summary)} className="flex-1">
                        <Icon icon="solar:eye-bold-duotone" className="w-4 h-4 mr-1" />
                        Ler
                      </Button>
                    ) : (
                      <Button size="sm" color="gray" disabled className="flex-1">
                        <Icon icon="solar:refresh-circle-bold-duotone" className="w-4 h-4 mr-1 animate-spin" />
                        Gerando...
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>

      {/* Modal de Visualização */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <span>{selectedSummary?.title}</span>
            {selectedSummary?.bookmarked && (
              <Icon icon="solar:bookmark-bold-duotone" className="w-5 h-5 text-yellow-500" />
            )}
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedSummary && (
            <div className="space-y-6">
              {/* Informações do resumo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSummary.readingTime} min</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tempo de Leitura</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSummary.wordCount}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Palavras</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSummary.quality}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Qualidade IA</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{selectedSummary.views}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Visualizações</div>
                </div>
              </div>

              {/* Conteúdo do resumo */}
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {selectedSummary.fullContent}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label value="Tags" className="text-lg font-semibold mb-3 block" />
                <div className="flex flex-wrap gap-2">
                  {selectedSummary.tags.map((tag: string, index: number) => (
                    <Badge key={index} color="light">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Disciplina:</strong> {selectedSummary.subject}
                </div>
                <div>
                  <strong>Dificuldade:</strong> {getDifficultyText(selectedSummary.difficulty)}
                </div>
                <div>
                  <strong>Fonte:</strong> {selectedSummary.source}
                </div>
                <div>
                  <strong>Modelo IA:</strong> {selectedSummary.aiModel}
                </div>
                <div>
                  <strong>Criado em:</strong> {new Date(selectedSummary.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div>
                  <strong>Atualizado em:</strong> {new Date(selectedSummary.updatedAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => handleDownload(selectedSummary)}>
            <Icon icon="solar:download-bold-duotone" className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
          <Button color="secondary" onClick={() => handleShare(selectedSummary)}>
            <Icon icon="solar:share-bold-duotone" className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button color="secondary" onClick={() => handleBookmark(selectedSummary)}>
            <Icon icon={selectedSummary?.bookmarked ? "solar:bookmark-bold-duotone" : "solar:bookmark-outline"} className="w-4 h-4 mr-2" />
            {selectedSummary?.bookmarked ? 'Remover Favorito' : 'Favoritar'}
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Criar Resumo */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} size="lg">
        <Modal.Header>
          Criar Novo Resumo com IA
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" value="Título do Resumo" />
              <TextInput id="title" placeholder="Ex: Funções Quadráticas - Resumo Completo" />
            </div>

            <div>
              <Label htmlFor="topic" value="Tópico ou Assunto" />
              <TextInput id="topic" placeholder="Ex: Funções quadráticas, gráficos e aplicações" />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="difficulty" value="Nível de Dificuldade" />
                <Select id="difficulty">
                  <option value="easy">Fácil</option>
                  <option value="medium">Médio</option>
                  <option value="hard">Difícil</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="source" value="Fonte do Conteúdo" />
              <TextInput id="source" placeholder="Ex: Livro de Matemática - Capítulo 5" />
            </div>

            <div>
              <Label htmlFor="content" value="Conteúdo para Resumir" />
              <Textarea 
                id="content" 
                rows={6}
                placeholder="Cole aqui o texto que deseja resumir ou descreva os pontos principais que devem ser abordados..."
              />
            </div>

            <div>
              <Label htmlFor="instructions" value="Instruções Especiais (Opcional)" />
              <Textarea 
                id="instructions" 
                rows={3}
                placeholder="Ex: Foque em fórmulas e exemplos práticos, inclua gráficos explicativos..."
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary">
            <Icon icon="solar:magic-stick-3-bold-duotone" className="w-4 h-4 mr-2" />
            Gerar Resumo
          </Button>
          <Button color="gray" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Resumos;