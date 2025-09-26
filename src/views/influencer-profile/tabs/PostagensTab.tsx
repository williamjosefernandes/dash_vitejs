import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Badge, 
  Modal, 
  Select, 
  TextInput
} from 'flowbite-react';
import { 
  HiHeart, 
  HiChat, 
  HiEye, 
  HiShare, 
  HiPlay, 
  HiSearch,
  HiExternalLink,
  HiClipboardCopy,
  HiTrendingUp,
  HiCalendar
} from 'react-icons/hi';
import { 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaTwitter 
} from 'react-icons/fa';

// Mock data para as postagens
const postagensData = [
  {
    id: 1,
    title: "Look do dia: Tendências de Outono 2024 🍂",
    platform: "instagram",
    date: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
    type: "image",
    hashtags: ["#lookdodia", "#moda", "#outono2024", "#tendencias"],
    metrics: {
      likes: 15420,
      comments: 342,
      views: 45600,
      shares: 128,
      engagement: 8.5
    },
    link: "https://instagram.com/p/example1"
  },
  {
    id: 2,
    title: "Tutorial: Maquiagem natural para o dia a dia",
    platform: "tiktok",
    date: "2024-01-12",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
    type: "video",
    hashtags: ["#makeup", "#tutorial", "#natural", "#diaadia"],
    metrics: {
      likes: 28900,
      comments: 567,
      views: 125000,
      shares: 890,
      engagement: 12.3
    },
    link: "https://tiktok.com/@example/video/123"
  },
  {
    id: 3,
    title: "Vlog: Minha rotina matinal de skincare",
    platform: "youtube",
    date: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    type: "video",
    hashtags: ["#skincare", "#rotina", "#vlog", "#beleza"],
    metrics: {
      likes: 8750,
      comments: 234,
      views: 67800,
      shares: 156,
      engagement: 6.8
    },
    link: "https://youtube.com/watch?v=example"
  },
  {
    id: 4,
    title: "Dicas de styling para o verão",
    platform: "instagram",
    date: "2024-01-08",
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop",
    type: "carousel",
    hashtags: ["#styling", "#verao", "#dicas", "#moda"],
    metrics: {
      likes: 12300,
      comments: 189,
      views: 34500,
      shares: 67,
      engagement: 7.2
    },
    link: "https://instagram.com/p/example2"
  }
];

const PostagensTab: React.FC = () => {
  const [postagens, setPostagens] = useState(postagensData);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: <FaInstagram className="w-4 h-4 text-pink-500" />,
      tiktok: <FaTiktok className="w-4 h-4 text-black dark:text-white" />,
      youtube: <FaYoutube className="w-4 h-4 text-red-500" />,
      twitter: <FaTwitter className="w-4 h-4 text-blue-500" />
    };
    return icons[platform as keyof typeof icons] || icons.instagram;
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 10) return 'success';
    if (engagement >= 7) return 'warning';
    return 'failure';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...postagens];
    
    switch (value) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'engagement':
        sorted.sort((a, b) => b.metrics.engagement - a.metrics.engagement);
        break;
      case 'likes':
        sorted.sort((a, b) => b.metrics.likes - a.metrics.likes);
        break;
      case 'comments':
        sorted.sort((a, b) => b.metrics.comments - a.metrics.comments);
        break;
    }
    
    setPostagens(sorted);
  };

  const filteredPostagens = postagens.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Seção */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Postagens
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Veja as publicações mais recentes do influenciador e seus resultados de engajamento.
        </p>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <TextInput
              icon={HiSearch}
              placeholder="Pesquisar por hashtag ou palavra-chave"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="recent">Mais recentes</option>
              <option value="engagement">Maior engajamento</option>
              <option value="likes">Mais curtidas</option>
              <option value="comments">Mais comentários</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid de Postagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPostagens.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Área da Mídia */}
            <div className="relative">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover object-top"
              />
              
              {/* Ícone da Rede Social */}
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
                {getPlatformIcon(post.platform)}
              </div>

              {/* Overlay para Vídeos */}
              {(post.type === 'video' || post.type === 'carousel') && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <HiPlay className="w-12 h-12 text-white" />
                </div>
              )}
            </div>

            {/* Área de Informações */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <HiCalendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('pt-BR')}
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {post.hashtags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} color="gray" size="sm">
                    {tag}
                  </Badge>
                ))}
                {post.hashtags.length > 3 && (
                  <Badge color="gray" size="sm">
                    +{post.hashtags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiHeart className="w-4 h-4 text-red-500" />
                  {formatNumber(post.metrics.likes)}
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiChat className="w-4 h-4 text-blue-500" />
                  {formatNumber(post.metrics.comments)}
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiEye className="w-4 h-4 text-green-500" />
                  {formatNumber(post.metrics.views)}
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiShare className="w-4 h-4 text-purple-500" />
                  {formatNumber(post.metrics.shares)}
                </div>
              </div>

              {/* Taxa de Engajamento */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Taxa de Engajamento:
                </span>
                <Badge color={getEngagementColor(post.metrics.engagement)}>
                  {post.metrics.engagement}%
                </Badge>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post);
                    setShowModal(true);
                  }}
                  className="flex-1"
                >
                  Ver Detalhes
                </Button>
                <Button
                  size="sm"
                  color="gray"
                  onClick={() => copyLink(post.link)}
                >
                  <HiClipboardCopy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="4xl"
      >
        <Modal.Header>
          Detalhes da Postagem
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <div className="space-y-6">
              {/* Cabeçalho */}
              <div className="flex items-start gap-4">
                <img
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  className="w-32 h-32 object-cover object-top rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {getPlatformIcon(selectedPost.platform)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(selectedPost.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.hashtags.map((tag: string, index: number) => (
                      <Badge key={index} color="blue" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Métricas Detalhadas */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiHeart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPost.metrics.likes.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Curtidas</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiChat className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPost.metrics.comments.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comentários</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiEye className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPost.metrics.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Visualizações</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiShare className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPost.metrics.shares.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Compartilhamentos</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiTrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPost.metrics.engagement}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Engajamento</div>
                </div>
              </div>

              {/* Link da Postagem */}
              <div className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <HiExternalLink className="w-5 h-5 text-gray-500" />
                <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                  {selectedPost.link}
                </span>
                <Button
                  size="sm"
                  color="gray"
                  onClick={() => copyLink(selectedPost.link)}
                >
                  Copiar
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.open(selectedPost.link, '_blank')}
                >
                  Abrir
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostagensTab;