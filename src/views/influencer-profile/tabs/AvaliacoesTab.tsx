import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { HiStar, HiCalendar, HiThumbUp, HiThumbDown, HiChat, HiTrendingUp, HiCheckCircle } from 'react-icons/hi';

interface Review {
  id: string;
  brandName: string;
  brandLogo: string;
  campaignTitle: string;
  rating: number;
  date: string;
  category: string;
  reviewText: string;
  highlights: string[];
  improvements: string[];
  wouldRecommend: boolean;
  professionalismRating: number;
  creativityRating: number;
  deliveryRating: number;
  communicationRating: number;
  verified: boolean;
}

const AvaliacoesTab: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const reviews: Review[] = [
    {
      id: '1',
      brandName: 'BeachWear Co.',
      brandLogo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=BW',
      campaignTitle: 'Campanha Verão 2024 - Moda Praia',
      rating: 5,
      date: '2024-02-20',
      category: 'Moda',
      reviewText: 'Trabalho excepcional! Maria demonstrou profissionalismo exemplar e criatividade única. As entregas foram pontuais e superaram nossas expectativas. O engajamento gerado foi impressionante e os resultados de vendas foram além do projetado.',
      highlights: [
        'Criatividade excepcional no conteúdo',
        'Entregas sempre pontuais',
        'Excelente engajamento com a audiência',
        'Resultados de vendas acima da meta'
      ],
      improvements: [],
      wouldRecommend: true,
      professionalismRating: 5,
      creativityRating: 5,
      deliveryRating: 5,
      communicationRating: 5,
      verified: true
    },
    {
      id: '2',
      brandName: 'FitLife Tech',
      brandLogo: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=FL',
      campaignTitle: 'Lançamento App FitLife',
      rating: 5,
      date: '2024-02-15',
      category: 'Tecnologia',
      reviewText: 'Parceria fantástica! Maria conseguiu explicar conceitos técnicos de forma acessível e envolvente. Sua autenticidade transpareceu em cada conteúdo, gerando confiança na nossa marca. Comunicação impecável durante todo o projeto.',
      highlights: [
        'Excelente comunicação técnica',
        'Autenticidade na apresentação do produto',
        'Feedback constante durante o projeto',
        'Adaptação rápida às necessidades da marca'
      ],
      improvements: [
        'Poderia incluir mais demonstrações práticas'
      ],
      wouldRecommend: true,
      professionalismRating: 5,
      creativityRating: 4,
      deliveryRating: 5,
      communicationRating: 5,
      verified: true
    },
    {
      id: '3',
      brandName: 'Beauty Plus',
      brandLogo: 'https://via.placeholder.com/40x40/EC4899/FFFFFF?text=BP',
      campaignTitle: 'Black Friday Cosméticos',
      rating: 5,
      date: '2023-12-05',
      category: 'Beleza',
      reviewText: 'Resultados extraordinários! Maria tem um talento natural para beauty content e conseguiu transmitir a qualidade dos nossos produtos de forma autêntica. O ROI da campanha foi o melhor que já tivemos.',
      highlights: [
        'Expertise em conteúdo de beleza',
        'ROI excepcional da campanha',
        'Conteúdo autêntico e convincente',
        'Boa relação com a audiência'
      ],
      improvements: [],
      wouldRecommend: true,
      professionalismRating: 5,
      creativityRating: 5,
      deliveryRating: 5,
      communicationRating: 4,
      verified: true
    },
    {
      id: '4',
      brandName: 'StyleTech',
      brandLogo: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=ST',
      campaignTitle: 'Lançamento Smartwatch Fashion',
      rating: 4,
      date: '2023-10-12',
      category: 'Tecnologia',
      reviewText: 'Ótima parceria! Maria mostrou versatilidade ao trabalhar com tech fashion. O conteúdo foi bem produzido e o engajamento foi satisfatório. Algumas entregas poderiam ter sido mais pontuais, mas o resultado final compensou.',
      highlights: [
        'Versatilidade em diferentes nichos',
        'Boa qualidade de produção',
        'Engajamento satisfatório'
      ],
      improvements: [
        'Melhorar pontualidade nas entregas',
        'Mais interação nos stories'
      ],
      wouldRecommend: true,
      professionalismRating: 4,
      creativityRating: 4,
      deliveryRating: 3,
      communicationRating: 4,
      verified: true
    },
    {
      id: '5',
      brandName: 'GreenLife',
      brandLogo: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=GL',
      campaignTitle: 'Produtos Sustentáveis',
      rating: 4,
      date: '2023-08-18',
      category: 'Sustentabilidade',
      reviewText: 'Trabalho consciente e bem executado. Maria demonstrou genuíno interesse pela causa sustentável, o que transpareceu no conteúdo. A audiência respondeu positivamente à mensagem ambiental.',
      highlights: [
        'Genuíno interesse pela causa',
        'Mensagem ambiental bem transmitida',
        'Resposta positiva da audiência',
        'Conteúdo educativo'
      ],
      improvements: [
        'Poderia explorar mais dados e estatísticas',
        'Mais call-to-actions para ação sustentável'
      ],
      wouldRecommend: true,
      professionalismRating: 4,
      creativityRating: 4,
      deliveryRating: 4,
      communicationRating: 4,
      verified: true
    }
  ];

  const getOverallStats = () => {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const recommendationRate = (reviews.filter(r => r.wouldRecommend).length / totalReviews) * 100;
    const verifiedReviews = reviews.filter(r => r.verified).length;

    const categoryStats = reviews.reduce((acc, review) => {
      acc[review.category] = (acc[review.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalReviews,
      averageRating,
      recommendationRate,
      verifiedReviews,
      categoryStats
    };
  };

  const getDetailedRatings = () => {
    const totalReviews = reviews.length;
    return {
      professionalism: reviews.reduce((sum, r) => sum + r.professionalismRating, 0) / totalReviews,
      creativity: reviews.reduce((sum, r) => sum + r.creativityRating, 0) / totalReviews,
      delivery: reviews.reduce((sum, r) => sum + r.deliveryRating, 0) / totalReviews,
      communication: reviews.reduce((sum, r) => sum + r.communicationRating, 0) / totalReviews
    };
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <HiStar
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = selectedRating 
    ? reviews.filter(review => review.rating === selectedRating)
    : reviews;

  const stats = getOverallStats();
  const detailedRatings = getDetailedRatings();

  return (
    <div className="space-y-6">
      {/* Estatísticas Gerais */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:star-rate" className="w-5 h-5 sm:w-6 sm:h-6" />
          Resumo das Avaliações
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(stats.averageRating), 'sm')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avaliação Média
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalReviews}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total de Avaliações
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.recommendationRate.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Taxa de Recomendação
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.verifiedReviews}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avaliações Verificadas
            </div>
          </div>
        </div>
      </div>

      {/* Avaliações Detalhadas por Categoria */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:analytics" className="w-5 h-5" />
          Avaliações por Categoria
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {detailedRatings.professionalism.toFixed(1)}
            </div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(detailedRatings.professionalism), 'sm')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Profissionalismo
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {detailedRatings.creativity.toFixed(1)}
            </div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(detailedRatings.creativity), 'sm')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Criatividade
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {detailedRatings.delivery.toFixed(1)}
            </div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(detailedRatings.delivery), 'sm')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pontualidade
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {detailedRatings.communication.toFixed(1)}
            </div>
            <div className="flex justify-center mb-1">
              {renderStars(Math.round(detailedRatings.communication), 'sm')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Comunicação
            </div>
          </div>
        </div>
      </div>

      {/* Filtros por Estrelas */}
      <div className="flex flex-wrap gap-2">
        <div
          onClick={() => setSelectedRating(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors text-center ${
            selectedRating === null
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Todas
        </div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors flex items-center gap-1 text-center ${
              selectedRating === rating
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {rating} <HiStar className="w-3 h-3" />
          </div>
        ))}
      </div>

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
          >
            {/* Header da Avaliação */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <img
                  src={review.brandLogo}
                  alt={review.brandName}
                  className="w-12 h-12 rounded-lg object-cover object-top"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {review.brandName}
                    </h4>
                    {review.verified && (
                      <HiCheckCircle className="w-4 h-4 text-green-500" title="Avaliação Verificada" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {review.campaignTitle} • {review.category}
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {review.rating}.0
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <HiCalendar className="w-4 h-4" />
                    <span>{new Date(review.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {review.wouldRecommend && (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                    <HiThumbUp className="w-4 h-4" />
                    <span>Recomenda</span>
                  </div>
                )}
              </div>
            </div>

            {/* Texto da Avaliação */}
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {review.reviewText}
              </p>
            </div>

            {/* Pontos Positivos */}
            {review.highlights.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                  <HiThumbUp className="w-4 h-4 text-green-500" />
                  Pontos Positivos
                </h5>
                <div className="space-y-1">
                  {review.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pontos de Melhoria */}
            {review.improvements.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                  <Icon icon="material-symbols:trending-up" className="w-4 h-4 text-orange-500" />
                  Pontos de Melhoria
                </h5>
                <div className="space-y-1">
                  {review.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Avaliações Detalhadas */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowDetails(showDetails === review.id ? null : review.id)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                {showDetails === review.id ? 'Ocultar detalhes' : 'Ver avaliação detalhada'}
              </button>
              
              {showDetails === review.id && (
                <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Profissionalismo
                    </div>
                    {renderStars(review.professionalismRating, 'sm')}
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {review.professionalismRating}.0
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Criatividade
                    </div>
                    {renderStars(review.creativityRating, 'sm')}
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {review.creativityRating}.0
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Pontualidade
                    </div>
                    {renderStars(review.deliveryRating, 'sm')}
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {review.deliveryRating}.0
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Comunicação
                    </div>
                    {renderStars(review.communicationRating, 'sm')}
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {review.communicationRating}.0
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="material-symbols:star-rate-outline" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma avaliação encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Não há avaliações com a classificação selecionada.
          </p>
        </div>
      )}
    </div>
  );
};

export default AvaliacoesTab;