import React from 'react';
import { Icon } from '@iconify/react';
import { HiExternalLink, HiTrendingUp, HiUsers, HiHeart, HiEye } from 'react-icons/hi';

interface SocialNetwork {
  id: string;
  name: string;
  platform: string;
  icon: string;
  followers: number;
  engagement: number;
  reach: number;
  posts: number;
  avgLikes: number;
  avgComments: number;
  growth: number;
  verified: boolean;
  url: string;
  color: string;
}

const RedesSociaisTab: React.FC = () => {
  const socialNetworks: SocialNetwork[] = [
    {
      id: '1',
      name: '@mariainfluencer',
      platform: 'Instagram',
      icon: 'mdi:instagram',
      followers: 850000,
      engagement: 4.2,
      reach: 2100000,
      posts: 1247,
      avgLikes: 35600,
      avgComments: 1250,
      growth: 12.5,
      verified: true,
      url: 'https://instagram.com/mariainfluencer',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: '2',
      name: '@mariainfluencer',
      platform: 'TikTok',
      icon: 'ic:baseline-tiktok',
      followers: 1200000,
      engagement: 6.8,
      reach: 5400000,
      posts: 892,
      avgLikes: 82000,
      avgComments: 3200,
      growth: 28.3,
      verified: true,
      url: 'https://tiktok.com/@mariainfluencer',
      color: 'from-black to-red-600'
    },
    {
      id: '3',
      name: 'Maria Silva',
      platform: 'YouTube',
      icon: 'mdi:youtube',
      followers: 450000,
      engagement: 3.9,
      reach: 1800000,
      posts: 156,
      avgLikes: 18500,
      avgComments: 890,
      growth: 8.7,
      verified: true,
      url: 'https://youtube.com/@mariasilva',
      color: 'from-red-500 to-red-700'
    },
    {
      id: '4',
      name: 'Maria Silva',
      platform: 'Facebook',
      icon: 'mdi:facebook',
      followers: 320000,
      engagement: 2.1,
      reach: 980000,
      posts: 543,
      avgLikes: 6700,
      avgComments: 340,
      growth: 3.2,
      verified: false,
      url: 'https://facebook.com/mariasilva',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: '5',
      name: '@mariainfluencer',
      platform: 'Twitter',
      icon: 'mdi:twitter',
      followers: 180000,
      engagement: 1.8,
      reach: 650000,
      posts: 2341,
      avgLikes: 3200,
      avgComments: 180,
      growth: -2.1,
      verified: true,
      url: 'https://twitter.com/mariainfluencer',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getTotalMetrics = () => {
    return {
      totalFollowers: socialNetworks.reduce((sum, network) => sum + network.followers, 0),
      avgEngagement: socialNetworks.reduce((sum, network) => sum + network.engagement, 0) / socialNetworks.length,
      totalReach: socialNetworks.reduce((sum, network) => sum + network.reach, 0),
      totalPosts: socialNetworks.reduce((sum, network) => sum + network.posts, 0)
    };
  };

  const totalMetrics = getTotalMetrics();

  return (
    <div className="space-y-6">
      {/* Métricas Gerais */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:analytics" className="w-5 h-5 sm:w-6 sm:h-6" />
          Resumo Geral das Redes Sociais
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatNumber(totalMetrics.totalFollowers)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total de Seguidores
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
              {totalMetrics.avgEngagement.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Engajamento Médio
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {formatNumber(totalMetrics.totalReach)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Alcance Total
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">
              {totalMetrics.totalPosts}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total de Posts
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Redes Sociais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Icon icon="material-symbols:share" className="w-5 h-5" />
          Plataformas Conectadas
        </h3>

        <div className="grid gap-4">
          {socialNetworks.map((network) => (
            <div
              key={network.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* Header da Rede Social */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${network.color} flex items-center justify-center`}>
                    <Icon icon={network.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {network.platform}
                      </h4>
                      {network.verified && (
                        <Icon icon="material-symbols:verified" className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {network.name}
                    </p>
                  </div>
                </div>
                
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200 whitespace-nowrap min-w-0 flex-shrink-0"
                  title={`Visitar perfil ${network.platform}`}
                >
                  <span className="truncate">Visitar Perfil</span>
                  <HiExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>

              {/* Métricas da Rede Social */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiUsers className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(network.followers)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Seguidores
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiTrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {network.engagement}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Engajamento
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiEye className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(network.reach)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Alcance
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Icon icon="material-symbols:post-add" className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {network.posts}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Posts
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiHeart className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatNumber(network.avgLikes)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Likes Médios
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className={`flex items-center justify-center ${network.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <HiTrendingUp className={`w-4 h-4 ${network.growth < 0 ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${network.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {network.growth > 0 ? '+' : ''}{network.growth}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Crescimento
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights e Recomendações */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:lightbulb" className="w-5 h-5" />
          Insights e Recomendações
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>TikTok</strong> apresenta o maior crescimento (+28.3%) e engajamento (6.8%). 
              Recomendamos focar mais conteúdo nesta plataforma.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Twitter</strong> está com crescimento negativo (-2.1%). 
              Considere revisar a estratégia de conteúdo para esta plataforma.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Instagram</strong> mantém boa performance com 4.2% de engajamento. 
              Continue investindo em Stories e Reels para maximizar o alcance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedesSociaisTab;