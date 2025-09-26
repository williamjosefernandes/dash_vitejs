import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { HiCalendar, HiCurrencyDollar, HiTrendingUp, HiEye, HiHeart, HiShare, HiCheckCircle, HiClock, HiExclamationCircle } from 'react-icons/hi';

interface Campaign {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  category: string;
  status: 'completed' | 'active' | 'pending' | 'cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  platforms: string[];
  deliverables: {
    type: string;
    quantity: number;
    completed: number;
  }[];
  performance: {
    reach: number;
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
    roi: number;
  };
  rating: number;
  description: string;
}

const CampanhasTab: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [, setSelectedCampaign] = useState<Campaign | null>(null);

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Campanha Verão 2024 - Moda Praia',
      brand: 'BeachWear Co.',
      brandLogo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=BW',
      category: 'Moda',
      status: 'completed',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 15000,
      platforms: ['Instagram', 'TikTok'],
      deliverables: [
        { type: 'Posts no Feed', quantity: 6, completed: 6 },
        { type: 'Stories', quantity: 12, completed: 12 },
        { type: 'Reels', quantity: 4, completed: 4 }
      ],
      performance: {
        reach: 850000,
        impressions: 2100000,
        engagement: 89000,
        clicks: 12500,
        conversions: 890,
        roi: 4.2
      },
      rating: 4.8,
      description: 'Campanha focada em moda praia para o verão 2024, destacando a versatilidade e qualidade dos produtos.'
    },
    {
      id: '2',
      title: 'Lançamento App FitLife',
      brand: 'FitLife Tech',
      brandLogo: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=FL',
      category: 'Tecnologia',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      budget: 25000,
      platforms: ['Instagram', 'YouTube', 'TikTok'],
      deliverables: [
        { type: 'Posts no Feed', quantity: 8, completed: 5 },
        { type: 'Stories', quantity: 15, completed: 10 },
        { type: 'Vídeos YouTube', quantity: 2, completed: 1 },
        { type: 'TikToks', quantity: 6, completed: 4 }
      ],
      performance: {
        reach: 1200000,
        impressions: 3200000,
        engagement: 156000,
        clicks: 18900,
        conversions: 1250,
        roi: 5.1
      },
      rating: 4.9,
      description: 'Campanha de lançamento do aplicativo FitLife, focando em funcionalidades de treino e nutrição.'
    },
    {
      id: '3',
      title: 'Black Friday Cosméticos',
      brand: 'Beauty Plus',
      brandLogo: 'https://via.placeholder.com/40x40/EC4899/FFFFFF?text=BP',
      category: 'Beleza',
      status: 'completed',
      startDate: '2023-11-20',
      endDate: '2023-11-30',
      budget: 20000,
      platforms: ['Instagram', 'TikTok', 'YouTube'],
      deliverables: [
        { type: 'Posts no Feed', quantity: 10, completed: 10 },
        { type: 'Stories', quantity: 20, completed: 20 },
        { type: 'Reels', quantity: 8, completed: 8 },
        { type: 'Vídeo YouTube', quantity: 1, completed: 1 }
      ],
      performance: {
        reach: 950000,
        impressions: 2800000,
        engagement: 125000,
        clicks: 22000,
        conversions: 1890,
        roi: 6.8
      },
      rating: 5.0,
      description: 'Campanha especial de Black Friday com foco em produtos de beleza e skincare.'
    },
    {
      id: '4',
      title: 'Parceria Sustentabilidade',
      brand: 'EcoFashion',
      brandLogo: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=EF',
      category: 'Sustentabilidade',
      status: 'pending',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      budget: 18000,
      platforms: ['Instagram', 'TikTok'],
      deliverables: [
        { type: 'Posts no Feed', quantity: 6, completed: 0 },
        { type: 'Stories', quantity: 12, completed: 0 },
        { type: 'Reels', quantity: 4, completed: 0 }
      ],
      performance: {
        reach: 0,
        impressions: 0,
        engagement: 0,
        clicks: 0,
        conversions: 0,
        roi: 0
      },
      rating: 0,
      description: 'Campanha focada em moda sustentável e conscientização ambiental.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <HiCheckCircle className="w-4 h-4" />;
      case 'active': return <HiClock className="w-4 h-4" />;
      case 'pending': return <HiExclamationCircle className="w-4 h-4" />;
      case 'cancelled': return <HiExclamationCircle className="w-4 h-4" />;
      default: return <HiClock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'active': return 'Ativa';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredCampaigns = selectedStatus === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === selectedStatus);

  const totalStats = {
    totalCampaigns: campaigns.length,
    completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    avgRating: campaigns.filter(c => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) / campaigns.filter(c => c.rating > 0).length
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:campaign" className="w-5 h-5 sm:w-6 sm:h-6" />
          Resumo das Campanhas
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {totalStats.totalCampaigns}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total de Campanhas
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
              {totalStats.completedCampaigns}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Campanhas Concluídas
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalStats.totalBudget)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Valor Total
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {totalStats.avgRating.toFixed(1)} ⭐
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avaliação Média
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <div
          onClick={() => setSelectedStatus('all')}
          className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors text-center ${
            selectedStatus === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Todas
        </div>
        <div
          onClick={() => setSelectedStatus('active')}
          className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors text-center ${
            selectedStatus === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Ativas
        </div>
        <div
          onClick={() => setSelectedStatus('completed')}
          className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors text-center ${
            selectedStatus === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Concluídas
        </div>
        <div
          onClick={() => setSelectedStatus('pending')}
          className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors text-center ${
            selectedStatus === 'pending'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Pendentes
        </div>
      </div>

      {/* Lista de Campanhas */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedCampaign(campaign)}
          >
            {/* Header da Campanha */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <img
                  src={campaign.brandLogo}
                  alt={campaign.brand}
                  className="w-12 h-12 rounded-lg object-cover object-top"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {campaign.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {campaign.brand} • {campaign.category}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      {getStatusText(campaign.status)}
                    </span>
                    {campaign.rating > 0 && (
                      <span className="text-sm text-yellow-600 dark:text-yellow-400">
                        {campaign.rating} ⭐
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <HiCalendar className="w-4 h-4" />
                      <span>{new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiCurrencyDollar className="w-4 h-4" />
                      <span>{formatCurrency(campaign.budget)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plataformas */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Plataformas:</span>
              <div className="flex gap-2">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Entregas */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Entregas:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {campaign.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{deliverable.type}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {deliverable.completed}/{deliverable.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance (apenas para campanhas com dados) */}
            {campaign.performance.reach > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiEye className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(campaign.performance.reach)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Alcance
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiHeart className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(campaign.performance.engagement)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Engajamento
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiShare className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(campaign.performance.clicks)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Cliques
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon icon="material-symbols:conversion-path" className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(campaign.performance.conversions)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Conversões
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiTrendingUp className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {campaign.performance.roi.toFixed(1)}x
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    ROI
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon icon="material-symbols:visibility" className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(campaign.performance.impressions)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Impressões
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="material-symbols:campaign-outline" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma campanha encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Não há campanhas com o status selecionado.
          </p>
        </div>
      )}
    </div>
  );
};

export default CampanhasTab;