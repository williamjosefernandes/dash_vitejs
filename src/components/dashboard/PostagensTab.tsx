import React, { useState } from 'react';
import { Modal, Badge, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';

interface Post {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  data: string;
  plataforma: string;
  tipo: 'foto' | 'video' | 'carrossel' | 'story';
  metricas: {
    curtidas: number;
    comentarios: number;
    compartilhamentos: number;
    visualizacoes?: number;
    alcance: number;
    engajamento: number;
  };
  hashtags: string[];
  status: 'publicado' | 'agendado' | 'rascunho';
}

const PostagensTab: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filtroPlataforma, setFiltroPlataforma] = useState<string>('todas');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<string>('data');
  const [busca, setBusca] = useState<string>('');

  const mockPosts: Post[] = [
    {
      id: 1,
      titulo: "Look do Dia: Tendências Outono/Inverno",
      descricao: "Compartilhando as principais tendências da estação com vocês! Este look combina conforto e elegância.",
      imagem: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      data: "2024-01-15",
      plataforma: "Instagram",
      tipo: "foto",
      metricas: {
        curtidas: 15420,
        comentarios: 234,
        compartilhamentos: 89,
        alcance: 45230,
        engajamento: 8.2
      },
      hashtags: ["#lookdodia", "#moda", "#tendencias", "#outono2024"],
      status: "publicado"
    },
    {
      id: 2,
      titulo: "Tutorial: Maquiagem Natural para o Dia",
      descricao: "Passo a passo de uma maquiagem natural e rápida para o dia a dia. Produtos acessíveis e resultado incrível!",
      imagem: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      data: "2024-01-12",
      plataforma: "YouTube",
      tipo: "video",
      metricas: {
        curtidas: 8930,
        comentarios: 156,
        compartilhamentos: 45,
        visualizacoes: 23450,
        alcance: 23450,
        engajamento: 6.8
      },
      hashtags: ["#maquiagem", "#tutorial", "#beleza", "#natural"],
      status: "publicado"
    },
    {
      id: 3,
      titulo: "Rotina Matinal de Skincare",
      descricao: "Minha rotina completa de cuidados com a pele pela manhã. Produtos testados e aprovados!",
      imagem: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      data: "2024-01-10",
      plataforma: "TikTok",
      tipo: "video",
      metricas: {
        curtidas: 34200,
        comentarios: 567,
        compartilhamentos: 234,
        visualizacoes: 89340,
        alcance: 89340,
        engajamento: 12.4
      },
      hashtags: ["#skincare", "#rotina", "#beleza", "#cuidados"],
      status: "publicado"
    },
    {
      id: 4,
      titulo: "Haul: Compras da Semana",
      descricao: "Mostrando todas as minhas comprinhas da semana! Tem moda, beleza e lifestyle.",
      imagem: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      data: "2024-01-08",
      plataforma: "Instagram",
      tipo: "carrossel",
      metricas: {
        curtidas: 12340,
        comentarios: 189,
        compartilhamentos: 67,
        alcance: 38920,
        engajamento: 7.1
      },
      hashtags: ["#haul", "#compras", "#moda", "#lifestyle"],
      status: "publicado"
    },
    {
      id: 5,
      titulo: "Dicas de Organização: Closet",
      descricao: "Como organizar seu guarda-roupa de forma prática e funcional. Dicas que realmente funcionam!",
      imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      data: "2024-01-20",
      plataforma: "Instagram",
      tipo: "foto",
      metricas: {
        curtidas: 0,
        comentarios: 0,
        compartilhamentos: 0,
        alcance: 0,
        engajamento: 0
      },
      hashtags: ["#organizacao", "#closet", "#dicas", "#lifestyle"],
      status: "agendado"
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getPlataformaIcon = (plataforma: string) => {
    switch (plataforma) {
      case 'Instagram': return 'mdi:instagram';
      case 'TikTok': return 'ic:baseline-tiktok';
      case 'YouTube': return 'mdi:youtube';
      default: return 'mdi:web';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'foto': return 'solar:camera-bold-duotone';
      case 'video': return 'solar:video-camera-bold-duotone';
      case 'carrossel': return 'solar:gallery-bold-duotone';
      case 'story': return 'solar:story-bold-duotone';
      default: return 'solar:document-bold-duotone';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publicado': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'agendado': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rascunho': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const postsFiltrados = mockPosts
    .filter(post => {
      const matchPlataforma = filtroPlataforma === 'todas' || post.plataforma === filtroPlataforma;
      const matchTipo = filtroTipo === 'todos' || post.tipo === filtroTipo;
      const matchBusca = post.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                        post.descricao.toLowerCase().includes(busca.toLowerCase());
      return matchPlataforma && matchTipo && matchBusca;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case 'data':
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        case 'engajamento':
          return b.metricas.engajamento - a.metricas.engajamento;
        case 'curtidas':
          return b.metricas.curtidas - a.metricas.curtidas;
        default:
          return 0;
      }
    });

  const totalPosts = mockPosts.length;
  const totalCurtidas = mockPosts.reduce((sum, post) => sum + post.metricas.curtidas, 0);
  const totalComentarios = mockPosts.reduce((sum, post) => sum + post.metricas.comentarios, 0);
  const engajamentoMedio = mockPosts.reduce((sum, post) => sum + post.metricas.engajamento, 0) / totalPosts;

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Postagens
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie e acompanhe o desempenho das suas publicações
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Icon icon="solar:magnifer-bold-duotone" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar postagens..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <select
              value={filtroPlataforma}
              onChange={(e) => setFiltroPlataforma(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todas">Todas as Plataformas</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
            </select>
            
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="foto">Foto</option>
              <option value="video">Vídeo</option>
              <option value="carrossel">Carrossel</option>
              <option value="story">Story</option>
            </select>
            
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="data">Mais Recentes</option>
              <option value="engajamento">Maior Engajamento</option>
              <option value="curtidas">Mais Curtidas</option>
            </select>
          </div>
        </div>

        {/* Resumo de Performance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Posts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPosts}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:document-bold-duotone" className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Curtidas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(totalCurtidas)}</p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:heart-bold-duotone" className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comentários</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(totalComentarios)}</p>
              </div>
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:chat-round-bold-duotone" className="w-5 h-5 text-info" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Engajamento Médio</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{engajamentoMedio.toFixed(1)}%</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:chart-bold-duotone" className="w-5 h-5 text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsFiltrados.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            {/* Imagem */}
            <div className="relative aspect-square">
              <img
                src={post.imagem}
                alt={post.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={getStatusColor(post.status)}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                  <Icon icon={getPlataformaIcon(post.plataforma)} className="w-4 h-4 text-white" />
                </div>
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                  <Icon icon={getTipoIcon(post.tipo)} className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.titulo}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {post.descricao}
              </p>

              {/* Data */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 mr-1" />
                {new Date(post.data).toLocaleDateString('pt-BR')}
              </div>

              {/* Métricas */}
              {post.status === 'publicado' && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-semibold text-secondary">
                      {formatNumber(post.metricas.curtidas)}
                    </div>
                    <div className="text-xs text-gray-500">Curtidas</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-info">
                      {formatNumber(post.metricas.comentarios)}
                    </div>
                    <div className="text-xs text-gray-500">Comentários</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-success">
                      {post.metricas.engajamento.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Engajamento</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal show={selectedPost !== null} onClose={() => setSelectedPost(null)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Icon icon={getTipoIcon(selectedPost?.tipo || '')} className="w-6 h-6 text-primary" />
            <span>{selectedPost?.titulo}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <div className="space-y-6">
              {/* Imagem */}
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedPost.imagem}
                  alt={selectedPost.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Informações da Postagem
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon icon={getPlataformaIcon(selectedPost.plataforma)} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300">{selectedPost.plataforma}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {new Date(selectedPost.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedPost.status)}>
                        {selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Métricas Detalhadas */}
                {selectedPost.status === 'publicado' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Métricas de Performance
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-secondary">
                          {formatNumber(selectedPost.metricas.curtidas)}
                        </div>
                        <div className="text-sm text-gray-600">Curtidas</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-info">
                          {formatNumber(selectedPost.metricas.comentarios)}
                        </div>
                        <div className="text-sm text-gray-600">Comentários</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-warning">
                          {formatNumber(selectedPost.metricas.compartilhamentos)}
                        </div>
                        <div className="text-sm text-gray-600">Compartilhamentos</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-success">
                          {selectedPost.metricas.engajamento.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Engajamento</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Descrição */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Descrição
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedPost.descricao}
                </p>
              </div>

              {/* Hashtags */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Hashtags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.hashtags.map((hashtag, index) => (
                    <Badge key={index} color="gray">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setSelectedPost(null)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostagensTab;