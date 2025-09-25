import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Badge, 
  Modal, 
  Select, 
  TextInput,
  Avatar,
  Progress
} from 'flowbite-react';
import { 
  HiHeart, 
  HiChat, 
  HiEye, 
  HiShare, 
  HiSearch,
  HiCalendar,
  HiTrendingUp,
  HiLocationMarker,
  HiDocumentText,
  HiStar,
  HiExternalLink,
  HiClipboardList
} from 'react-icons/hi';
import { 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaTwitter 
} from 'react-icons/fa';

// Mock data para as campanhas
const campanhasData = [
  {
    id: 1,
    name: "#Verão2025 – Coleção de Moda",
    brand: {
      name: "Fashion Brand",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop"
    },
    description: "Divulgação de lançamento da nova coleção de verão em Instagram e TikTok",
    objective: "Aumentar reconhecimento de marca",
    period: {
      start: "2024-01-01",
      end: "2024-01-31"
    },
    status: "completed",
    platforms: ["instagram", "tiktok"],
    metrics: {
      totalReach: 150000,
      totalLikes: 45600,
      totalComments: 2340,
      totalShares: 890,
      averageEngagement: 8.7,
      roi: 15.2
    },
    posts: [
      {
        platform: "instagram",
        url: "https://instagram.com/p/example1",
        thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop"
      },
      {
        platform: "tiktok",
        url: "https://tiktok.com/@example/video/123",
        thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop"
      }
    ],
    feedback: {
      rating: 4.8,
      comment: "Excelente trabalho! Superou nossas expectativas de engajamento."
    },
    deliverables: [
      "2 posts no Instagram",
      "3 vídeos no TikTok",
      "Stories promocionais"
    ]
  },
  {
    id: 2,
    name: "Lançamento Produto Skincare",
    brand: {
      name: "Beauty Co.",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop"
    },
    description: "Campanha de lançamento de nova linha de produtos para cuidados com a pele",
    objective: "Gerar conversões e vendas",
    period: {
      start: "2024-02-01",
      end: "2024-02-15"
    },
    status: "in_progress",
    platforms: ["instagram", "youtube"],
    metrics: {
      totalReach: 89000,
      totalLikes: 23400,
      totalComments: 1200,
      totalShares: 450,
      averageEngagement: 9.2,
      roi: null
    },
    posts: [
      {
        platform: "instagram",
        url: "https://instagram.com/p/example2",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop"
      }
    ],
    feedback: null,
    deliverables: [
      "1 post no Instagram",
      "1 vídeo review no YouTube",
      "Stories com tutorial"
    ]
  },
  {
    id: 3,
    name: "Campanha Fitness Primavera",
    brand: {
      name: "FitLife",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop"
    },
    description: "Promoção de produtos fitness e suplementos para a temporada de primavera",
    objective: "Aumentar awareness e engajamento",
    period: {
      start: "2024-03-01",
      end: "2024-03-31"
    },
    status: "pending",
    platforms: ["instagram", "tiktok", "youtube"],
    metrics: {
      totalReach: 0,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      averageEngagement: 0,
      roi: null
    },
    posts: [],
    feedback: null,
    deliverables: [
      "3 posts no Instagram",
      "5 vídeos no TikTok",
      "1 vídeo longo no YouTube",
      "Stories diários"
    ]
  },
  {
    id: 4,
    name: "Black Friday Tech",
    brand: {
      name: "TechStore",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop"
    },
    description: "Promoção especial de Black Friday para produtos tecnológicos",
    objective: "Maximizar conversões durante a Black Friday",
    period: {
      start: "2023-11-20",
      end: "2023-11-30"
    },
    status: "cancelled",
    platforms: ["instagram", "youtube"],
    metrics: {
      totalReach: 0,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      averageEngagement: 0,
      roi: null
    },
    posts: [],
    feedback: null,
    deliverables: []
  }
];

const CampanhasTab: React.FC = () => {
  const [campanhas, setCampanhas] = useState(campanhasData);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  const getPlatformIcon = (platform: string, size: string = 'w-4 h-4') => {
    const icons = {
      instagram: <FaInstagram className={`${size} text-pink-500`} />,
      tiktok: <FaTiktok className={`${size} text-black dark:text-white`} />,
      youtube: <FaYoutube className={`${size} text-red-500`} />,
      twitter: <FaTwitter className={`${size} text-blue-500`} />
    };
    return icons[platform as keyof typeof icons] || icons.instagram;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'success', label: 'Concluída' },
      in_progress: { color: 'info', label: 'Em andamento' },
      pending: { color: 'warning', label: 'Pendente' },
      cancelled: { color: 'failure', label: 'Cancelada' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge color={config.color}>{config.label}</Badge>;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredCampanhas = campanhas.filter(campanha => {
    const matchesSearch = campanha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campanha.brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campanha.status === statusFilter;
    
    let matchesPeriod = true;
    if (periodFilter !== 'all') {
      const now = new Date();
      const campaignEnd = new Date(campanha.period.end);
      
      switch (periodFilter) {
        case '30days':
          matchesPeriod = (now.getTime() - campaignEnd.getTime()) <= (30 * 24 * 60 * 60 * 1000);
          break;
        case '6months':
          matchesPeriod = (now.getTime() - campaignEnd.getTime()) <= (6 * 30 * 24 * 60 * 60 * 1000);
          break;
        case '1year':
          matchesPeriod = (now.getTime() - campaignEnd.getTime()) <= (365 * 24 * 60 * 60 * 1000);
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  // Estatísticas resumidas
  const totalCampanhas = campanhas.length;
  const campanhasConcluidas = campanhas.filter(c => c.status === 'completed').length;
  const sucessRate = totalCampanhas > 0 ? ((campanhasConcluidas / totalCampanhas) * 100).toFixed(1) : '0';
  const averageRating = campanhas
    .filter(c => c.feedback?.rating)
    .reduce((sum, c) => sum + (c.feedback?.rating || 0), 0) / 
    campanhas.filter(c => c.feedback?.rating).length || 0;

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Seção */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Campanhas
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Acompanhe as campanhas em que o influenciador participou e seus resultados de desempenho.
        </p>

        {/* Resumo de Performance */}
        <Card className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalCampanhas}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total de Campanhas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sucessRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Taxa de Sucesso
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-1">
                {averageRating.toFixed(1)}
                <HiStar className="w-5 h-5" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avaliação Média
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                Instagram
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Rede Mais Utilizada
              </div>
            </div>
          </div>
        </Card>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <TextInput
            icon={HiSearch}
            placeholder="Pesquisar por campanha ou marca"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os Status</option>
            <option value="completed">Concluídas</option>
            <option value="in_progress">Em andamento</option>
            <option value="pending">Pendentes</option>
            <option value="cancelled">Canceladas</option>
          </Select>
          <Select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
          >
            <option value="all">Todos os Períodos</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="6months">Últimos 6 meses</option>
            <option value="1year">Último ano</option>
          </Select>
          <div></div> {/* Espaço vazio para alinhamento */}
        </div>
      </div>

      {/* Grid de Campanhas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampanhas.map((campanha) => (
          <Card key={campanha.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cabeçalho do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar
                  img={campanha.brand.logo}
                  size="md"
                  rounded
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {campanha.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {campanha.brand.name}
                  </p>
                </div>
              </div>
              {getStatusBadge(campanha.status)}
            </div>

            {/* Período */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <HiCalendar className="w-4 h-4" />
              {formatDate(campanha.period.start)} - {formatDate(campanha.period.end)}
            </div>

            {/* Descrição */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
              {campanha.description}
            </p>

            {/* Objetivo */}
            <div className="flex items-center gap-2 mb-4">
              <HiLocationMarker className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {campanha.objective}
              </span>
            </div>

            {/* Redes Sociais */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Redes:</span>
              <div className="flex gap-2">
                {campanha.platforms.map((platform, index) => (
                  <div key={index} className="p-1 bg-gray-100 dark:bg-gray-800 rounded">
                    {getPlatformIcon(platform)}
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas (apenas para campanhas concluídas) */}
            {campanha.status === 'completed' && (
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiEye className="w-4 h-4 text-green-500" />
                  {formatNumber(campanha.metrics.totalReach)} alcance
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiHeart className="w-4 h-4 text-red-500" />
                  {formatNumber(campanha.metrics.totalLikes)} curtidas
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiChat className="w-4 h-4 text-blue-500" />
                  {formatNumber(campanha.metrics.totalComments)} comentários
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <HiTrendingUp className="w-4 h-4 text-orange-500" />
                  {campanha.metrics.averageEngagement}% engajamento
                </div>
              </div>
            )}

            {/* Avaliação (se disponível) */}
            {campanha.feedback && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(campanha.feedback.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {campanha.feedback.rating}/5
                </span>
              </div>
            )}

            {/* Ações */}
            <Button
              onClick={() => {
                setSelectedCampaign(campanha);
                setShowModal(true);
              }}
              className="w-full"
            >
              Ver Detalhes
            </Button>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="5xl"
      >
        <Modal.Header>
          <div className="flex items-center gap-3">
            {selectedCampaign && (
              <>
                <Avatar
                  img={selectedCampaign.brand.logo}
                  size="sm"
                  rounded
                />
                {selectedCampaign.name}
              </>
            )}
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedCampaign && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Informações da Campanha</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Marca:</strong> {selectedCampaign.brand.name}</div>
                    <div><strong>Período:</strong> {formatDate(selectedCampaign.period.start)} - {formatDate(selectedCampaign.period.end)}</div>
                    <div><strong>Status:</strong> {getStatusBadge(selectedCampaign.status)}</div>
                    <div><strong>Objetivo:</strong> {selectedCampaign.objective}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Entregas</h4>
                  <ul className="space-y-1 text-sm">
                    {selectedCampaign.deliverables.map((deliverable: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <HiClipboardList className="w-4 h-4 text-blue-500" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Métricas Detalhadas */}
              {selectedCampaign.status === 'completed' && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Relatório de Desempenho</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <HiEye className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{selectedCampaign.metrics.totalReach.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Alcance Total</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <HiHeart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{selectedCampaign.metrics.totalLikes.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Curtidas</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <HiChat className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{selectedCampaign.metrics.totalComments.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Comentários</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <HiShare className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{selectedCampaign.metrics.totalShares.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Compartilhamentos</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <HiTrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{selectedCampaign.metrics.averageEngagement}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Engajamento</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Posts da Campanha */}
              {selectedCampaign.posts.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Posts da Campanha</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCampaign.posts.map((post: any, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={post.thumbnail}
                          alt={`Post ${index + 1}`}
                          className="w-full h-32 object-cover object-top rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          {getPlatformIcon(post.platform)}
                        </div>
                        <Button
                          size="sm"
                          className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(post.url, '_blank')}
                        >
                          <HiExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback do Anunciante */}
              {selectedCampaign.feedback && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Feedback do Anunciante</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedCampaign.feedback.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{selectedCampaign.feedback.rating}/5</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      "{selectedCampaign.feedback.comment}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CampanhasTab;