import React, { useState, useEffect, useRef } from 'react';
import { Card, Tabs, Avatar, Badge, Button } from 'flowbite-react';
import { 
  HiUser, 
  HiPhotograph, 
  HiGlobe, 
  HiBriefcase, 
  HiStar,
  HiLocationMarker,
  HiCalendar,
  HiUsers,
  HiHeart,
  HiChat,
  HiShare,
  HiPlay,
  HiEye,
  HiPlus,
  HiDotsHorizontal,
  HiX,
  HiChevronUp,
  HiChevronDown,
  HiVolumeUp,
  HiVolumeOff
} from 'react-icons/hi';
import { Icon } from '@iconify/react';
import CardBox from 'src/components/shared/CardBox';
import PostagensTab from './tabs/PostagensTab';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import LazyImage from 'src/components/shared/LazyImage';
import RedesSociaisTab from './tabs/RedesSociaisTab';
import CampanhasTab from './tabs/CampanhasTab';
import AvaliacoesTab from './tabs/AvaliacoesTab';

// Mock data para o perfil do influenciador
const influencerData = {
  id: 1,
  name: "Ana Silva",
  username: "@anasilva_oficial",
  bio: "Criadora de conteúdo lifestyle e moda. Apaixonada por inspirar pessoas através do meu dia a dia! ✨",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop",
  location: "São Paulo, Brasil",
  joinDate: "Janeiro 2020",
  category: "Lifestyle & Moda",
  totalFollowers: 125300,
  totalCampaigns: 47,
  averageRating: 4.8,
  verified: true,
  following: 892,
  posts: 1247,
  isFollowing: false
};

// Mock data para stories em destaque
const storiesData = [
  {
    id: 1,
    title: "Looks",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&h=80&fit=crop&crop=face",
    count: 12
  },
  {
    id: 2,
    title: "Viagens",
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=80&h=80&fit=crop",
    count: 8
  },
  {
    id: 3,
    title: "Beleza",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop",
    count: 15
  },
  {
    id: 4,
    title: "Casa",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop",
    count: 6
  },
  {
    id: 5,
    title: "Receitas",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop",
    count: 10
  }
];

// Mock data para posts em grid
const postsGridData = [
  {
    id: 1,
    type: 'photo',
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop",
    likes: 15420,
    comments: 234,
    isVideo: false
  },
  {
    id: 2,
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    likes: 22100,
    comments: 456,
    isVideo: true,
    duration: "0:45"
  },
  {
    id: 3,
    type: 'carousel',
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop",
    likes: 18750,
    comments: 312,
    isCarousel: true
  },
  {
    id: 4,
    type: 'photo',
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop",
    likes: 12890,
    comments: 189,
    isVideo: false
  },
  {
    id: 5,
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
    likes: 31200,
    comments: 678,
    isVideo: true,
    duration: "1:23"
  },
  {
    id: 6,
    type: 'photo',
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
    likes: 9876,
    comments: 145,
    isVideo: false
  }
];

const InfluencerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [displayedPosts, setDisplayedPosts] = useState(postsGridData.slice(0, 6));
  const [displayedVideos, setDisplayedVideos] = useState(postsGridData.filter(p => p.isVideo).slice(0, 3));
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sistema de rolagem infinita para posts
  const loadMorePosts = async () => {
    // Simula carregamento de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentLength = displayedPosts.length;
    const newPosts = Array.from({ length: 6 }, (_, i) => ({
      id: currentLength + i + 1,
      type: Math.random() > 0.5 ? 'photo' : 'video',
      thumbnail: `https://images.unsplash.com/photo-${1515886657613 + i}?w=300&h=300&fit=crop`,
      likes: Math.floor(Math.random() * 50000) + 1000,
      comments: Math.floor(Math.random() * 1000) + 50,
      isVideo: Math.random() > 0.7,
      duration: Math.random() > 0.5 ? `${Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      isCarousel: Math.random() > 0.8
    }));
    
    setDisplayedPosts(prev => [...prev, ...newPosts]);
    
    // Simula fim dos dados após 30 posts
    if (displayedPosts.length >= 30) {
      setHasMorePosts(false);
    }
  };

  // Sistema de rolagem infinita para vídeos
  const loadMoreVideos = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentLength = displayedVideos.length;
    const newVideos = Array.from({ length: 3 }, (_, i) => ({
      id: currentLength + i + 1,
      type: 'video',
      thumbnail: `https://images.unsplash.com/photo-${1441986300917 + i}?w=300&h=300&fit=crop`,
      likes: Math.floor(Math.random() * 50000) + 1000,
      comments: Math.floor(Math.random() * 1000) + 50,
      isVideo: true,
      duration: `${Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
    }));
    
    setDisplayedVideos(prev => [...prev, ...newVideos]);
    
    if (displayedVideos.length >= 15) {
      setHasMoreVideos(false);
    }
  };

  const {
    isLoading: isLoadingPosts,
    hasMore: hasMorePosts,
    setHasMore: setHasMorePosts,
    observerRef: postsObserverRef
  } = useInfiniteScroll(loadMorePosts);

  const {
    isLoading: isLoadingVideos,
    hasMore: hasMoreVideos,
    setHasMore: setHasMoreVideos,
    observerRef: videosObserverRef
  } = useInfiniteScroll(loadMoreVideos);

  // Dados para vídeos estilo TikTok
  const tikTokVideos = [
    {
      id: 1,
      videoUrl: "https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Video+1",
      thumbnail: "https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Video+1",
      title: "Tutorial de maquiagem para o dia",
      likes: 12500,
      comments: 340,
      shares: 89,
      views: 45600,
      duration: "0:45",
      hashtags: ["makeup", "tutorial", "beauty", "ootd"],
      music: "Som original - Ana Silva"
    },
    {
      id: 2,
      videoUrl: "https://via.placeholder.com/400x600/4ECDC4/FFFFFF?text=Video+2",
      thumbnail: "https://via.placeholder.com/400x600/4ECDC4/FFFFFF?text=Video+2",
      title: "Look do dia para trabalho",
      likes: 8900,
      comments: 156,
      shares: 67,
      views: 32100,
      duration: "0:32",
      hashtags: ["workoutfit", "fashion", "style", "professional"],
      music: "Trending Audio - Fashion Week"
    },
    {
      id: 3,
      videoUrl: "https://via.placeholder.com/400x600/45B7D1/FFFFFF?text=Video+3",
      thumbnail: "https://via.placeholder.com/400x600/45B7D1/FFFFFF?text=Video+3",
      title: "Rotina matinal de skincare",
      likes: 15200,
      comments: 423,
      shares: 112,
      views: 67800,
      duration: "1:12",
      hashtags: ["skincare", "morning", "routine", "selfcare"],
      music: "Relaxing Vibes - Spa Music"
    },
    {
      id: 4,
      videoUrl: "https://via.placeholder.com/400x600/96CEB4/FFFFFF?text=Video+4",
      thumbnail: "https://via.placeholder.com/400x600/96CEB4/FFFFFF?text=Video+4",
      title: "Dicas de styling para o verão",
      likes: 9800,
      comments: 234,
      shares: 78,
      views: 41200,
      duration: "0:58",
      hashtags: ["summer", "styling", "tips", "fashion"],
      music: "Summer Hits - Tropical House"
    }
  ];

  // Funções para navegação TikTok
  const handleSwipeUp = () => {
    if (currentVideoIndex < tikTokVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Efeito para controles de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFullscreen) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            handleSwipeDown();
            break;
          case 'ArrowDown':
            event.preventDefault();
            handleSwipeUp();
            break;
          case 'Escape':
            setIsFullscreen(false);
            break;
          case ' ':
            event.preventDefault();
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play();
              } else {
                videoRef.current.pause();
              }
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentVideoIndex]);

  const currentVideo = tikTokVideos[currentVideoIndex];

  const tabsData = [
    {
      id: 'posts',
      title: 'Posts',
      icon: 'material-symbols:grid-view',
      content: 'posts'
    },
    {
      id: 'redes-sociais',
      title: 'Redes Sociais',
      icon: 'material-symbols:share',
      content: 'redes-sociais'
    },
    {
      id: 'campanhas',
      title: 'Campanhas',
      icon: 'material-symbols:campaign',
      content: 'campanhas'
    },
    {
      id: 'avaliacoes',
      title: 'Avaliações',
      icon: 'material-symbols:star-rate',
      content: 'avaliacoes'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 min-h-screen shadow-xl">
      {/* Header do Perfil - Responsivo */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-[#635bFF]/5 dark:from-gray-900 dark:via-gray-800 dark:to-[#635bFF]/10">
        <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-12">
            {/* Avatar */}
            <div className="relative flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl ring-4 ring-[#635bFF]/20">
                <img
                  src={influencerData.avatar}
                  alt={influencerData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {influencerData.verified && (
                <div className="absolute -bottom-2 -right-2 bg-[#635bFF] rounded-full p-2 sm:p-3 shadow-lg ring-4 ring-white dark:ring-gray-900">
                  <HiStar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              )}
            </div>

            {/* Info do Perfil */}
            <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <h1 className="text-xl sm:text-2xl font-light text-gray-900 dark:text-white">
                  {influencerData.username.replace('@', '')}
                </h1>
                <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                  <button
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                      influencerData.isFollowing 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600' 
                        : 'bg-gradient-to-r from-[#635bFF] to-[#5248E6] text-white hover:from-[#5248E6] hover:to-[#4338ca] border-2 border-[#635bFF] hover:border-[#5248E6] ring-2 ring-[#635bFF]/20 hover:ring-[#5248E6]/30'
                    }`}
                  >
                    Contratar
                  </button>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:border-[#635bFF] hover:text-[#635bFF] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-gray-300 dark:border-gray-600">
                    Mensagem
                  </button>
                  <button className="p-2 mx-auto sm:mx-0 w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:border-[#635bFF] hover:text-[#635bFF] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <HiDotsHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Estatísticas - Grid Responsivo */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-6 max-w-sm mx-auto sm:max-w-none sm:mx-0 sm:flex">
                <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl p-3 sm:p-4 bg-gradient-to-br from-white/50 to-gray-50/30 dark:from-gray-800/50 dark:to-gray-700/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#635bFF] transition-colors">
                    {influencerData.posts.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">posts</div>
                </div>
                <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl p-3 sm:p-4 bg-gradient-to-br from-white/50 to-gray-50/30 dark:from-gray-800/50 dark:to-gray-700/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-[#635bFF] group-hover:scale-110 transition-transform">
                    {(influencerData.totalFollowers / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">seguidores</div>
                </div>
                <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl p-3 sm:p-4 bg-gradient-to-br from-white/50 to-gray-50/30 dark:from-gray-800/50 dark:to-gray-700/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#635bFF] transition-colors">
                    {influencerData.following.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">seguindo</div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4 sm:space-y-6 max-w-md mx-auto sm:mx-0">
                <div className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                  {influencerData.name}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-[#635bFF] font-semibold bg-[#635bFF]/10 px-3 py-1.5 rounded-full inline-block border border-[#635bFF]/20">
                  {influencerData.category}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {influencerData.bio}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#635bFF] to-[#5248e6] rounded-full flex items-center justify-center shadow-lg">
                    <HiLocationMarker className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">{influencerData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stories em Destaque - Responsivo */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-bold text-[#635bFF] mb-4 flex items-center gap-2">
          <Icon icon="material-symbols:auto-stories" className="w-5 h-5" />
          Stories em Destaque
        </h2>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2">
          {storiesData.map((story) => (
            <div key={story.id} className="flex-shrink-0 text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-[#635bFF]/20 group-hover:border-[#635bFF] mb-2 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg">
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[64px] sm:max-w-[80px] truncate group-hover:text-[#635bFF] transition-colors">
                {story.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {story.count} posts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegação por Abas - Responsivo */}
      <div className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-40">
        <div className="flex">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-4 px-2 text-xs sm:text-sm font-semibold border-b-3 transition-all duration-300 relative overflow-hidden group ${
                activeTab === tab.id
                  ? 'border-[#635bFF] text-[#635bFF] bg-gradient-to-t from-[#635bFF]/5 to-transparent shadow-lg transform scale-105'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-[#635bFF] hover:border-[#635bFF]/30'
              }`}
            >
              <span className="relative z-10 flex flex-col sm:flex-row items-center gap-1">
                <Icon icon={tab.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">{tab.title}</span>
              </span>
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#635bFF]/10 via-[#635bFF]/5 to-[#635bFF]/10 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo das Abas - Responsivo */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Grid de Posts - Estilo Instagram */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Seção Sobre - Redesenhada */}
            <div className="bg-gradient-to-br from-white via-gray-50/50 to-[#635bFF]/5 dark:from-gray-800 dark:via-gray-800/80 dark:to-[#635bFF]/10 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#635bFF] to-[#5248e6] rounded-xl flex items-center justify-center shadow-lg">
                  <HiUser className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#635bFF] leading-tight">
                  Sobre {influencerData.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 group hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#635bFF]/20 to-[#5248e6]/20 rounded-lg flex items-center justify-center group-hover:from-[#635bFF] group-hover:to-[#5248e6] transition-all duration-300">
                      <HiLocationMarker className="w-4 h-4 sm:w-5 sm:h-5 text-[#635bFF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Localização</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{influencerData.location}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 group hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#635bFF]/20 to-[#5248e6]/20 rounded-lg flex items-center justify-center group-hover:from-[#635bFF] group-hover:to-[#5248e6] transition-all duration-300">
                      <HiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#635bFF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Membro desde</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{influencerData.joinDate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 group hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#635bFF]/20 to-[#5248e6]/20 rounded-lg flex items-center justify-center group-hover:from-[#635bFF] group-hover:to-[#5248e6] transition-all duration-300">
                      <HiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#635bFF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Categoria</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{influencerData.category}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/70 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 group hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#635bFF]/20 to-[#5248e6]/20 rounded-lg flex items-center justify-center group-hover:from-[#635bFF] group-hover:to-[#5248e6] transition-all duration-300">
                      <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-[#635bFF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Avaliação Média</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{influencerData.averageRating}/5.0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Posts - Responsivo com Lazy Loading */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
              {displayedPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square relative cursor-pointer group overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedPost(post)}
                >
                  <LazyImage
                    src={post.thumbnail}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay com estatísticas - Responsivo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-3">
                    <div className="flex items-center gap-3 sm:gap-4 text-white">
                      <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                        <HiHeart className="w-3 h-3 sm:w-4 md:w-5 sm:h-4 md:h-5 text-red-400" />
                        <span className="font-semibold text-xs sm:text-sm">{post.likes > 1000 ? `${(post.likes/1000).toFixed(1)}K` : post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                        <HiChat className="w-3 h-3 sm:w-4 md:w-5 sm:h-4 md:h-5 text-blue-400" />
                        <span className="font-semibold text-xs sm:text-sm">{post.comments > 1000 ? `${(post.comments/1000).toFixed(1)}K` : post.comments.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de tipo de conteúdo - Responsivo */}
                  {post.isVideo && (
                    <div className="absolute top-2 right-2 bg-[#635bFF] rounded-full p-1.5 shadow-lg">
                      <HiPlay className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  {post.isCarousel && (
                    <div className="absolute top-2 right-2 bg-[#635bFF] rounded-full p-1.5 shadow-lg">
                      <Icon icon="material-symbols:layers" className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  {post.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                      {post.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Indicador de carregamento e trigger para rolagem infinita */}
            {hasMorePosts && (
              <div ref={postsObserverRef} className="flex justify-center py-8">
                {isLoadingPosts && (
                  <div className="flex items-center gap-3 text-[#635bFF] bg-[#635bFF]/5 px-6 py-3 rounded-full border border-[#635bFF]/20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#635bFF]"></div>
                    <span className="font-medium">Carregando mais posts...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Redes Sociais Tab */}
        {activeTab === 'redes-sociais' && (
          <div className="mt-6">
            <RedesSociaisTab />
          </div>
        )}

        {/* Campanhas Tab */}
        {activeTab === 'campanhas' && (
          <div className="mt-6">
            <CampanhasTab />
          </div>
        )}

        {/* Avaliações Tab */}
        {activeTab === 'avaliacoes' && (
          <div className="mt-6">
            <AvaliacoesTab />
          </div>
        )}
      </div>

      {/* Modal TikTok - Experiência Imersiva em Tela Cheia */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          ref={containerRef}
        >
          {/* Vídeo Principal */}
          <div className="relative w-full max-w-sm h-full flex items-center justify-center">
            <div className="relative aspect-[9/16] w-full max-h-full bg-black rounded-lg overflow-hidden">
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Controles de Navegação */}
              <div className="absolute inset-y-0 left-0 right-0 flex">
                {/* Área para swipe down */}
                <div 
                  className="flex-1 flex items-start justify-center pt-20 cursor-pointer"
                  onClick={handleSwipeDown}
                >
                  {currentVideoIndex > 0 && (
                    <div className="bg-black bg-opacity-50 rounded-full p-2">
                      <HiChevronUp className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Área para swipe up */}
                <div 
                  className="flex-1 flex items-end justify-center pb-20 cursor-pointer"
                  onClick={handleSwipeUp}
                >
                  {currentVideoIndex < tikTokVideos.length - 1 && (
                    <div className="bg-black bg-opacity-50 rounded-full p-2">
                      <HiChevronDown className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Informações do Vídeo - Estilo TikTok */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex items-end justify-between">
                  {/* Informações do lado esquerdo */}
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={influencerData.avatar}
                        alt={influencerData.name}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                      <span className="text-white font-semibold text-sm">
                        {influencerData.username}
                      </span>
                      <Button size="xs" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full">
                        Seguir
                      </Button>
                    </div>
                    
                    <h3 className="text-white text-sm font-medium mb-2 line-clamp-2">
                      {currentVideo.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {currentVideo.hashtags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-white text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Icon icon="material-symbols:music-note" className="w-4 h-4" />
                      <span className="truncate">{currentVideo.music}</span>
                    </div>
                  </div>

                  {/* Ações do lado direito - Estilo TikTok */}
                  <div className="flex flex-col items-center gap-4">
                    <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <HiHeart className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-semibold">
                        {(currentVideo.likes / 1000).toFixed(1)}K
                      </span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <HiChat className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-semibold">
                        {currentVideo.comments}
                      </span>
                    </button>
                    
                    <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <HiShare className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-semibold">
                        {currentVideo.shares}
                      </span>
                    </button>
                    
                    <button 
                      onClick={toggleMute}
                      className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        {isMuted ? (
                          <HiVolumeOff className="w-6 h-6 text-white" />
                        ) : (
                          <HiVolumeUp className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Indicador de Progresso */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex gap-1">
                  {tikTokVideos.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-1 rounded-full ${
                        index === currentVideoIndex 
                          ? 'bg-white' 
                          : 'bg-white bg-opacity-30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Botão de Fechar */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
          >
            <HiX className="w-6 h-6 text-white" />
          </button>

          {/* Instruções de Navegação */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs text-center bg-black bg-opacity-50 px-3 py-2 rounded-full">
            Use ↑↓ ou clique para navegar • ESC para sair • Espaço para pausar
          </div>
        </div>
      )}

      {/* Modal Detalhado - Estilo Instagram */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex">
            {/* Imagem/Vídeo */}
            <div className="flex-1 bg-black flex items-center justify-center">
              <img
                src={selectedPost.thumbnail}
                alt={`Post ${selectedPost.id}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Sidebar com detalhes */}
            <div className="w-80 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={influencerData.avatar}
                    alt={influencerData.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {influencerData.username.replace('@', '')}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Icon icon="material-symbols:close" className="w-6 h-6" />
                </button>
              </div>

              {/* Conteúdo */}
               <div className="flex-1 p-4 overflow-y-auto">
                 <div className="space-y-4">
                   <div>
                     <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                       Post {selectedPost.id}
                     </h3>
                     <p className="text-gray-700 dark:text-gray-300 text-sm">
                       Conteúdo incrível compartilhado por {influencerData.name}. Este post mostra o dia a dia e inspirações do mundo lifestyle e moda.
                     </p>
                   </div>

                   <div className="flex flex-wrap gap-1">
                     {['lifestyle', 'moda', 'inspiracao', 'ootd', 'style'].map((tag, index) => (
                       <span
                         key={index}
                         className="text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer"
                       >
                         #{tag}
                       </span>
                     ))}
                   </div>

                   {/* Sistema de Comentários - Estilo Facebook */}
                   <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                     <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                       Comentários ({selectedPost.comments.toLocaleString()})
                     </h4>
                     
                     {/* Comentários Mock */}
                     <div className="space-y-3 max-h-40 overflow-y-auto">
                       {[
                         { id: 1, user: 'maria_silva', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face', comment: 'Adorei esse conteúdo! 😍', time: '2h' },
                         { id: 2, user: 'joao123', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', comment: 'Muito inspirador!', time: '4h' },
                         { id: 3, user: 'ana_costa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', comment: 'Onde posso encontrar mais informações sobre isso?', time: '6h' }
                       ].map((comment) => (
                         <div key={comment.id} className="flex gap-2">
                           <img
                             src={comment.avatar}
                             alt={comment.user}
                             className="w-6 h-6 rounded-full flex-shrink-0"
                           />
                           <div className="flex-1">
                             <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                               <div className="font-semibold text-xs text-gray-900 dark:text-white">
                                 {comment.user}
                               </div>
                               <div className="text-sm text-gray-700 dark:text-gray-300">
                                 {comment.comment}
                               </div>
                             </div>
                             <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                               <span>{comment.time}</span>
                               <button className="hover:underline">Curtir</button>
                               <button className="hover:underline">Responder</button>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>

                     {/* Campo de novo comentário */}
                     <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                       <img
                         src={influencerData.avatar}
                         alt="Você"
                         className="w-6 h-6 rounded-full flex-shrink-0"
                       />
                       <div className="flex-1 flex gap-2">
                         <input
                           type="text"
                           placeholder="Escreva um comentário..."
                           className="flex-1 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-full px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                         />
                         <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                           <Icon icon="material-symbols:send" className="w-5 h-5" />
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

              {/* Footer com ações */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="hover:scale-110 transition-transform">
                      <HiHeart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <HiChat className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <HiShare className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-900 dark:text-white font-semibold mb-1">
                  {selectedPost.likes.toLocaleString()} curtidas
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Instagram • há 2 dias
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerProfile;