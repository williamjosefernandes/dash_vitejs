import React, { useState } from 'react';
import { Modal, Badge, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';

interface RedeSocial {
  id: number;
  nome: string;
  plataforma: string;
  usuario: string;
  seguidores: number;
  seguindo: number;
  posts: number;
  engajamento: number;
  crescimento: number;
  status: 'ativa' | 'inativa' | 'pausada';
  verificada: boolean;
  ultimaAtualizacao: string;
  metricas: {
    alcanceMedio: number;
    impressoesMensais: number;
    interacoesMensais: number;
    salvamentosMensais: number;
  };
}

const RedesSociaisTab: React.FC = () => {
  const [selectedRede, setSelectedRede] = useState<RedeSocial | null>(null);
  const [filtroPlataforma, setFiltroPlataforma] = useState<string>('todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<string>('seguidores');

  const mockRedesSociais: RedeSocial[] = [
    {
      id: 1,
      nome: "Instagram Principal",
      plataforma: "Instagram",
      usuario: "@influencer_oficial",
      seguidores: 125000,
      seguindo: 890,
      posts: 1250,
      engajamento: 8.5,
      crescimento: 12.3,
      status: "ativa",
      verificada: true,
      ultimaAtualizacao: "2024-01-20",
      metricas: {
        alcanceMedio: 45000,
        impressoesMensais: 2500000,
        interacoesMensais: 180000,
        salvamentosMensais: 25000
      }
    },
    {
      id: 2,
      nome: "TikTok Oficial",
      plataforma: "TikTok",
      usuario: "@influencer_tiktok",
      seguidores: 89000,
      seguindo: 234,
      posts: 456,
      engajamento: 15.2,
      crescimento: 28.7,
      status: "ativa",
      verificada: true,
      ultimaAtualizacao: "2024-01-19",
      metricas: {
        alcanceMedio: 78000,
        impressoesMensais: 3200000,
        interacoesMensais: 450000,
        salvamentosMensais: 67000
      }
    },
    {
      id: 3,
      nome: "YouTube Channel",
      plataforma: "YouTube",
      usuario: "Influencer Lifestyle",
      seguidores: 45000,
      seguindo: 156,
      posts: 234,
      engajamento: 6.8,
      crescimento: 8.9,
      status: "ativa",
      verificada: false,
      ultimaAtualizacao: "2024-01-18",
      metricas: {
        alcanceMedio: 25000,
        impressoesMensais: 890000,
        interacoesMensais: 67000,
        salvamentosMensais: 12000
      }
    },
    {
      id: 4,
      nome: "Twitter Pessoal",
      plataforma: "Twitter",
      usuario: "@influencer_tw",
      seguidores: 23000,
      seguindo: 567,
      posts: 2890,
      engajamento: 4.2,
      crescimento: -2.1,
      status: "pausada",
      verificada: false,
      ultimaAtualizacao: "2024-01-15",
      metricas: {
        alcanceMedio: 8900,
        impressoesMensais: 234000,
        interacoesMensais: 12000,
        salvamentosMensais: 890
      }
    },
    {
      id: 5,
      nome: "LinkedIn Profissional",
      plataforma: "LinkedIn",
      usuario: "Influencer Marketing",
      seguidores: 12000,
      seguindo: 890,
      posts: 345,
      engajamento: 7.3,
      crescimento: 15.6,
      status: "ativa",
      verificada: false,
      ultimaAtualizacao: "2024-01-17",
      metricas: {
        alcanceMedio: 5600,
        impressoesMensais: 156000,
        interacoesMensais: 8900,
        salvamentosMensais: 2300
      }
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
      case 'Twitter': return 'mdi:twitter';
      case 'LinkedIn': return 'mdi:linkedin';
      default: return 'mdi:web';
    }
  };

  const getPlataformaColor = (plataforma: string) => {
    switch (plataforma) {
      case 'Instagram': return 'text-pink-600';
      case 'TikTok': return 'text-gray-900';
      case 'YouTube': return 'text-red-600';
      case 'Twitter': return 'text-blue-500';
      case 'LinkedIn': return 'text-blue-700';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pausada': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inativa': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const redesFiltradas = mockRedesSociais
    .filter(rede => {
      const matchPlataforma = filtroPlataforma === 'todas' || rede.plataforma === filtroPlataforma;
      const matchStatus = filtroStatus === 'todos' || rede.status === filtroStatus;
      return matchPlataforma && matchStatus;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case 'seguidores':
          return b.seguidores - a.seguidores;
        case 'engajamento':
          return b.engajamento - a.engajamento;
        case 'crescimento':
          return b.crescimento - a.crescimento;
        default:
          return 0;
      }
    });

  const totalSeguidores = mockRedesSociais.reduce((sum, rede) => sum + rede.seguidores, 0);
  const totalPosts = mockRedesSociais.reduce((sum, rede) => sum + rede.posts, 0);
  const engajamentoMedio = mockRedesSociais.reduce((sum, rede) => sum + rede.engajamento, 0) / mockRedesSociais.length;
  const redesAtivas = mockRedesSociais.filter(rede => rede.status === 'ativa').length;

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Redes Sociais
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas contas e acompanhe métricas de performance
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filtroPlataforma}
              onChange={(e) => setFiltroPlataforma(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todas">Todas as Plataformas</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
            
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="ativa">Ativa</option>
              <option value="pausada">Pausada</option>
              <option value="inativa">Inativa</option>
            </select>
            
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="seguidores">Mais Seguidores</option>
              <option value="engajamento">Maior Engajamento</option>
              <option value="crescimento">Maior Crescimento</option>
            </select>
          </div>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Redes Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{redesAtivas}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:global-bold-duotone" className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Seguidores</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(totalSeguidores)}</p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:users-group-rounded-bold-duotone" className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(totalPosts)}</p>
              </div>
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:document-bold-duotone" className="w-5 h-5 text-info" />
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

      {/* Grid de Redes Sociais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {redesFiltradas.map((rede) => (
          <div
            key={rede.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedRede(rede)}
          >
            {/* Header do Card */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
                  <Icon icon={getPlataformaIcon(rede.plataforma)} className={`w-6 h-6 ${getPlataformaColor(rede.plataforma)}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{rede.nome}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{rede.usuario}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {rede.verificada && (
                  <Icon icon="solar:verified-check-bold" className="w-5 h-5 text-blue-500" />
                )}
                <Badge className={getStatusColor(rede.status)}>
                  {rede.status.charAt(0).toUpperCase() + rede.status.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatNumber(rede.seguidores)}
                </div>
                <div className="text-xs text-gray-500">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatNumber(rede.posts)}
                </div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {rede.engajamento.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Engajamento</div>
              </div>
            </div>

            {/* Crescimento */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Crescimento mensal</span>
              <div className={`flex items-center gap-1 ${rede.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <Icon 
                  icon={rede.crescimento >= 0 ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'} 
                  className="w-4 h-4" 
                />
                <span className="text-sm font-semibold">
                  {Math.abs(rede.crescimento).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal show={selectedRede !== null} onClose={() => setSelectedRede(null)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Icon icon={getPlataformaIcon(selectedRede?.plataforma || '')} className={`w-6 h-6 ${getPlataformaColor(selectedRede?.plataforma || '')}`} />
            <span>{selectedRede?.nome}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedRede && (
            <div className="space-y-6">
              {/* Informações da Conta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Informações da Conta
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Usuário:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedRede.usuario}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <Badge className={getStatusColor(selectedRede.status)}>
                        {selectedRede.status.charAt(0).toUpperCase() + selectedRede.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Verificada:</span>
                      <div className="flex items-center gap-1">
                        {selectedRede.verificada ? (
                          <>
                            <Icon icon="solar:verified-check-bold" className="w-4 h-4 text-blue-500" />
                            <span className="text-blue-500">Sim</span>
                          </>
                        ) : (
                          <span className="text-gray-500">Não</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Última atualização:</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(selectedRede.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Estatísticas Gerais
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatNumber(selectedRede.seguidores)}
                      </div>
                      <div className="text-sm text-gray-600">Seguidores</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatNumber(selectedRede.seguindo)}
                      </div>
                      <div className="text-sm text-gray-600">Seguindo</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatNumber(selectedRede.posts)}
                      </div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedRede.engajamento.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Engajamento</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métricas Detalhadas */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Métricas Mensais
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-primary">
                      {formatNumber(selectedRede.metricas.alcanceMedio)}
                    </div>
                    <div className="text-sm text-gray-600">Alcance Médio</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-secondary">
                      {formatNumber(selectedRede.metricas.impressoesMensais)}
                    </div>
                    <div className="text-sm text-gray-600">Impressões</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-info">
                      {formatNumber(selectedRede.metricas.interacoesMensais)}
                    </div>
                    <div className="text-sm text-gray-600">Interações</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-success">
                      {formatNumber(selectedRede.metricas.salvamentosMensais)}
                    </div>
                    <div className="text-sm text-gray-600">Salvamentos</div>
                  </div>
                </div>
              </div>

              {/* Crescimento */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Análise de Crescimento
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Crescimento mensal:</span>
                    <div className={`flex items-center gap-2 ${selectedRede.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <Icon 
                        icon={selectedRede.crescimento >= 0 ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'} 
                        className="w-5 h-5" 
                      />
                      <span className="text-lg font-bold">
                        {Math.abs(selectedRede.crescimento).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setSelectedRede(null)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RedesSociaisTab;