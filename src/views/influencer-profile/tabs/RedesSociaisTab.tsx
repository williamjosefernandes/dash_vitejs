import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Badge, 
  Modal, 
  Select, 
  Avatar,
  Progress
} from 'flowbite-react';
import { 
  HiHeart, 
  HiChat, 
  HiEye, 
  HiTrendingUp,
  HiExternalLink,
  HiPlus,
  HiTrash,
  HiInformationCircle
} from 'react-icons/hi';
import { 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaTwitter,
  FaFacebook,
  FaLinkedin
} from 'react-icons/fa';

// Mock data para as redes sociais
const redesSociaisData = [
  {
    id: 1,
    platform: 'instagram',
    username: '@anasilva_oficial',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    category: 'Lifestyle & Moda',
    followers: 125300,
    averageLikes: 8500,
    averageComments: 245,
    engagementRate: 8.5,
    reach: 95000,
    profileUrl: 'https://instagram.com/anasilva_oficial',
    verified: true,
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 35 },
        { range: '25-34', percentage: 45 },
        { range: '35-44', percentage: 15 },
        { range: '45+', percentage: 5 }
      ],
      gender: { female: 78, male: 22 },
      topLocations: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte']
    },
    growthData: [
      { month: 'Jan', followers: 118000 },
      { month: 'Fev', followers: 120500 },
      { month: 'Mar', followers: 122800 },
      { month: 'Abr', followers: 125300 }
    ]
  },
  {
    id: 2,
    platform: 'tiktok',
    username: '@anasilva.oficial',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    category: 'Lifestyle & Beleza',
    followers: 89400,
    averageLikes: 15200,
    averageComments: 567,
    engagementRate: 12.3,
    reach: 156000,
    profileUrl: 'https://tiktok.com/@anasilva.oficial',
    verified: false,
    demographics: {
      ageGroups: [
        { range: '16-24', percentage: 55 },
        { range: '25-34', percentage: 30 },
        { range: '35-44', percentage: 12 },
        { range: '45+', percentage: 3 }
      ],
      gender: { female: 82, male: 18 },
      topLocations: ['São Paulo', 'Rio de Janeiro', 'Brasília']
    },
    growthData: [
      { month: 'Jan', followers: 78000 },
      { month: 'Fev', followers: 82500 },
      { month: 'Mar', followers: 86200 },
      { month: 'Abr', followers: 89400 }
    ]
  },
  {
    id: 3,
    platform: 'youtube',
    username: 'Ana Silva',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    category: 'Lifestyle & Vlogs',
    followers: 45600,
    averageLikes: 2800,
    averageComments: 156,
    engagementRate: 6.8,
    reach: 78000,
    profileUrl: 'https://youtube.com/@anasilva',
    verified: true,
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 25 },
        { range: '25-34', percentage: 40 },
        { range: '35-44', percentage: 25 },
        { range: '45+', percentage: 10 }
      ],
      gender: { female: 70, male: 30 },
      topLocations: ['São Paulo', 'Rio de Janeiro', 'Porto Alegre']
    },
    growthData: [
      { month: 'Jan', followers: 42000 },
      { month: 'Fev', followers: 43200 },
      { month: 'Mar', followers: 44500 },
      { month: 'Abr', followers: 45600 }
    ]
  }
];

const RedesSociaisTab: React.FC = () => {
  const [redesSociais, setRedesSociais] = useState(redesSociaisData);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('followers');

  const getPlatformIcon = (platform: string, size: string = 'w-6 h-6') => {
    const icons = {
      instagram: <FaInstagram className={`${size} text-pink-500`} />,
      tiktok: <FaTiktok className={`${size} text-black dark:text-white`} />,
      youtube: <FaYoutube className={`${size} text-red-500`} />,
      twitter: <FaTwitter className={`${size} text-blue-500`} />,
      facebook: <FaFacebook className={`${size} text-blue-600`} />,
      linkedin: <FaLinkedin className={`${size} text-blue-700`} />
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
    let sorted = [...redesSociais];
    
    switch (value) {
      case 'followers':
        sorted.sort((a, b) => b.followers - a.followers);
        break;
      case 'engagement':
        sorted.sort((a, b) => b.engagementRate - a.engagementRate);
        break;
      case 'reach':
        sorted.sort((a, b) => b.reach - a.reach);
        break;
    }
    
    setRedesSociais(sorted);
  };

  // Calcular distribuição de seguidores
  const totalFollowers = redesSociais.reduce((sum, rede) => sum + rede.followers, 0);
  const getFollowerPercentage = (followers: number) => ((followers / totalFollowers) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Seção */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Redes Sociais
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Veja todas as contas conectadas e seus principais indicadores de alcance e engajamento.
        </p>

        {/* Resumo Comparativo */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Distribuição de Seguidores</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total: {formatNumber(totalFollowers)} seguidores
            </div>
          </div>
          
          <div className="space-y-3">
            {redesSociais.map((rede) => (
              <div key={rede.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-32">
                  {getPlatformIcon(rede.platform, 'w-5 h-5')}
                  <span className="text-sm font-medium capitalize">{rede.platform}</span>
                </div>
                <div className="flex-1">
                  <Progress
                    progress={parseFloat(getFollowerPercentage(rede.followers))}
                    color="blue"
                    size="sm"
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                  {getFollowerPercentage(rede.followers)}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button color="gray" size="sm">
              <HiPlus className="w-4 h-4 mr-2" />
              Adicionar Nova Rede Social
            </Button>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <HiInformationCircle className="w-4 h-4" />
              Os dados são atualizados automaticamente
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <Select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="followers">Ordenar por Seguidores</option>
              <option value="engagement">Ordenar por Engajamento</option>
              <option value="reach">Ordenar por Alcance</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid de Redes Sociais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {redesSociais.map((rede) => (
          <Card key={rede.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cabeçalho do Card */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getPlatformIcon(rede.platform)}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {rede.username}
                  </h3>
                  <a
                    href={rede.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Ver perfil <HiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <Button
                color="gray"
                size="sm"
                onClick={() => {/* Remover integração */}}
              >
                <HiTrash className="w-4 h-4" />
              </Button>
            </div>

            {/* Informações do Perfil */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                img={rede.profileImage}
                size="sm"
                rounded
              />
              <div className="flex-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {rede.category}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatNumber(rede.followers)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    seguidores
                  </span>
                  {rede.verified && (
                    <Badge color="info" size="sm">Verificado</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <HiHeart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <div className="text-sm font-semibold">{formatNumber(rede.averageLikes)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Média Curtidas</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <HiChat className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-sm font-semibold">{formatNumber(rede.averageComments)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Média Comentários</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <HiEye className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-sm font-semibold">{formatNumber(rede.reach)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Alcance Médio</div>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <HiTrendingUp className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <div className="text-sm font-semibold">{rede.engagementRate}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Engajamento</div>
              </div>
            </div>

            {/* Taxa de Engajamento */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Performance:
              </span>
              <Badge color={getEngagementColor(rede.engagementRate)}>
                {rede.engagementRate >= 10 ? 'Excelente' : 
                 rede.engagementRate >= 7 ? 'Boa' : 'Regular'}
              </Badge>
            </div>

            {/* Ações */}
            <Button
              onClick={() => {
                setSelectedNetwork(rede);
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
        size="4xl"
      >
        <Modal.Header>
          <div className="flex items-center gap-3">
            {selectedNetwork && getPlatformIcon(selectedNetwork.platform)}
            Detalhes da Rede Social
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedNetwork && (
            <div className="space-y-6">
              {/* Cabeçalho */}
              <div className="flex items-center gap-4">
                <Avatar
                  img={selectedNetwork.profileImage}
                  size="lg"
                  rounded
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedNetwork.username}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedNetwork.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedNetwork.followers.toLocaleString()}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">seguidores</span>
                    {selectedNetwork.verified && (
                      <Badge color="info">Verificado</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Métricas Detalhadas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiHeart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedNetwork.averageLikes.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Média de Curtidas</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiChat className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedNetwork.averageComments.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Média de Comentários</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiEye className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedNetwork.reach.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Alcance Médio</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <HiTrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedNetwork.engagementRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Engajamento</div>
                </div>
              </div>

              {/* Demografia da Audiência */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Faixa Etária */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Faixa Etária</h4>
                  <div className="space-y-2">
                    {selectedNetwork.demographics.ageGroups.map((group: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-16 text-sm">{group.range}</span>
                        <div className="flex-1">
                          <Progress
                            progress={group.percentage}
                            color="blue"
                            size="sm"
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                          {group.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gênero */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Distribuição por Gênero</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-16 text-sm">Feminino</span>
                      <div className="flex-1">
                        <Progress
                          progress={selectedNetwork.demographics.gender.female}
                          color="pink"
                          size="sm"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                        {selectedNetwork.demographics.gender.female}%
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-16 text-sm">Masculino</span>
                      <div className="flex-1">
                        <Progress
                          progress={selectedNetwork.demographics.gender.male}
                          color="blue"
                          size="sm"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                        {selectedNetwork.demographics.gender.male}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principais Localizações */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Principais Localizações</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNetwork.demographics.topLocations.map((location: string, index: number) => (
                    <Badge key={index} color="gray">
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Crescimento de Seguidores */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Crescimento de Seguidores (Últimos 4 meses)</h4>
                <div className="grid grid-cols-4 gap-4">
                  {selectedNetwork.growthData.map((data: any, index: number) => (
                    <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{data.month}</div>
                      <div className="text-lg font-bold">{formatNumber(data.followers)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RedesSociaisTab;