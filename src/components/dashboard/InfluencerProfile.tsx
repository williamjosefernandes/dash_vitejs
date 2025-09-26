import React from 'react';
import { Tabs } from 'flowbite-react';
import { Icon } from '@iconify/react';
import CardBox from '../shared/CardBox';
import PostagensTab from './PostagensTab';
import RedesSociaisTab from './RedesSociaisTab';
import CampanhasTab from './CampanhasTab';
import AvaliacoesTab from './AvaliacoesTab';

const InfluencerProfile: React.FC = () => {
  const influencerData = {
    name: "Ana Silva",
    username: "@anasilva",
    bio: "Influenciadora digital especializada em lifestyle e moda. Criando conteúdo autêntico e inspirador para uma comunidade engajada.",
    location: "São Paulo, Brasil",
    website: "www.anasilva.com.br",
    email: "contato@anasilva.com.br",
    phone: "+55 11 99999-9999",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    stats: {
      followers: "125.4K",
      engagement: "8.2%",
      campaigns: "47",
      rating: "4.9"
    },
    socialMedia: [
      { platform: "Instagram", handle: "@anasilva", followers: "89.2K", icon: "mdi:instagram" },
      { platform: "TikTok", handle: "@anasilva_oficial", followers: "36.2K", icon: "ic:baseline-tiktok" },
      { platform: "YouTube", handle: "Ana Silva", followers: "12.8K", icon: "mdi:youtube" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Avatar e Info Principal */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={influencerData.avatar}
                  alt={influencerData.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {influencerData.name}
                </h1>
                <p className="text-lg text-primary font-medium mb-3">
                  {influencerData.username}
                </p>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                  {influencerData.bio}
                </p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto">
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primaryemphasis transition-colors duration-200 flex items-center gap-2">
                <Icon icon="solar:message-circle-02-bold-duotone" className="w-5 h-5" />
                Enviar Mensagem
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2">
                <Icon icon="solar:share-bold-duotone" className="w-5 h-5" />
                Compartilhar
              </button>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4 text-gray-400" />
              {influencerData.location}
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <Icon icon="solar:global-bold-duotone" className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <a 
                href={`https://${influencerData.website}`} 
                className="hover:text-primary transition-colors duration-200 truncate max-w-xs"
                title={influencerData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {influencerData.website}
              </a>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <Icon icon="solar:letter-bold-duotone" className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <a 
                href={`mailto:${influencerData.email}`} 
                className="hover:text-primary transition-colors duration-200 truncate max-w-xs"
                title={influencerData.email}
              >
                {influencerData.email}
              </a>
            </div>
          </div>

          {/* Redes Sociais Rápidas */}
          <div className="mt-6 flex gap-4">
            {influencerData.socialMedia.map((social, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Icon icon={social.icon} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {social.followers}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Seguidores", value: influencerData.stats.followers, icon: "solar:users-group-rounded-bold-duotone", color: "text-primary" },
              { label: "Engajamento", value: influencerData.stats.engagement, icon: "solar:heart-bold-duotone", color: "text-secondary" },
              { label: "Campanhas", value: influencerData.stats.campaigns, icon: "solar:megaphone-bold-duotone", color: "text-info" },
              { label: "Avaliação", value: influencerData.stats.rating, icon: "solar:star-bold-duotone", color: "text-warning" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Icon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal com Abas */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <CardBox className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Tabs
            aria-label="Perfil do Influenciador"
            variant="underline"
            className="w-full"
          >
            <Tabs.Item
              active
              title={
                <div className="flex items-center gap-2 px-4 py-2">
                  <Icon icon="solar:gallery-bold-duotone" className="w-5 h-5" />
                  <span className="font-medium">Postagens</span>
                </div>
              }
            >
              <div className="pt-6">
                <PostagensTab />
              </div>
            </Tabs.Item>
            
            <Tabs.Item
              title={
                <div className="flex items-center gap-2 px-4 py-2">
                  <Icon icon="solar:share-bold-duotone" className="w-5 h-5" />
                  <span className="font-medium">Redes Sociais</span>
                </div>
              }
            >
              <div className="pt-6">
                <RedesSociaisTab />
              </div>
            </Tabs.Item>
            
            <Tabs.Item
              title={
                <div className="flex items-center gap-2 px-4 py-2">
                  <Icon icon="solar:megaphone-bold-duotone" className="w-5 h-5" />
                  <span className="font-medium">Campanhas</span>
                </div>
              }
            >
              <div className="pt-6">
                <CampanhasTab />
              </div>
            </Tabs.Item>
            
            <Tabs.Item
              title={
                <div className="flex items-center gap-2 px-4 py-2">
                  <Icon icon="solar:star-bold-duotone" className="w-5 h-5" />
                  <span className="font-medium">Avaliações</span>
                </div>
              }
            >
              <div className="pt-6">
                <AvaliacoesTab />
              </div>
            </Tabs.Item>
          </Tabs>
        </CardBox>
      </div>
    </div>
  );
};

export default InfluencerProfile;