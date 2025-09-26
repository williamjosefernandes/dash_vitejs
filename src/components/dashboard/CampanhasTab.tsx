import React, { useState } from 'react';
import { Modal, Badge, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';

interface Campanha {
  id: number;
  titulo: string;
  marca: string;
  tipo: 'post' | 'stories' | 'video' | 'reels' | 'colaboracao';
  status: 'ativa' | 'concluida' | 'pausada' | 'rascunho';
  dataInicio: string;
  dataFim: string;
  valor: number;
  plataformas: string[];
  alcance: number;
  engajamento: number;
  impressoes: number;
  cliques: number;
  conversoes: number;
  descricao: string;
  objetivos: string[];
  entregaveis: string[];
}

const CampanhasTab: React.FC = () => {
  const [selectedCampanha, setSelectedCampanha] = useState<Campanha | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [ordenacao, setOrdenacao] = useState<string>('data');

  const mockCampanhas: Campanha[] = [
    {
      id: 1,
      titulo: "Lançamento Produto Verão 2024",
      marca: "Fashion Brand Co.",
      tipo: "post",
      status: "ativa",
      dataInicio: "2024-01-15",
      dataFim: "2024-02-15",
      valor: 5000,
      plataformas: ["Instagram", "TikTok"],
      alcance: 125000,
      engajamento: 8.5,
      impressoes: 450000,
      cliques: 12500,
      conversoes: 890,
      descricao: "Campanha para promover a nova coleção de verão da marca, focando em peças casuais e elegantes.",
      objetivos: ["Aumentar awareness da marca", "Gerar vendas", "Engajar audiência jovem"],
      entregaveis: ["3 posts no feed", "5 stories", "1 reel"]
    },
    {
      id: 2,
      titulo: "Review Skincare Routine",
      marca: "Beauty Essentials",
      tipo: "video",
      status: "concluida",
      dataInicio: "2024-01-01",
      dataFim: "2024-01-31",
      valor: 3500,
      plataformas: ["YouTube", "Instagram"],
      alcance: 89000,
      engajamento: 12.3,
      impressoes: 320000,
      cliques: 8900,
      conversoes: 567,
      descricao: "Vídeo detalhado sobre rotina de skincare usando produtos da marca parceira.",
      objetivos: ["Educar sobre skincare", "Demonstrar produtos", "Gerar confiança"],
      entregaveis: ["1 vídeo YouTube", "3 posts Instagram", "Stories diários"]
    },
    {
      id: 3,
      titulo: "Colaboração Fitness Challenge",
      marca: "Active Life Sports",
      tipo: "colaboracao",
      status: "ativa",
      dataInicio: "2024-01-20",
      dataFim: "2024-03-20",
      valor: 8000,
      plataformas: ["Instagram", "TikTok", "YouTube"],
      alcance: 200000,
      engajamento: 15.7,
      impressoes: 780000,
      cliques: 25000,
      conversoes: 1200,
      descricao: "Desafio fitness de 60 dias promovendo estilo de vida saudável e produtos esportivos.",
      objetivos: ["Promover vida saudável", "Engajar comunidade fitness", "Aumentar vendas"],
      entregaveis: ["Posts semanais", "Stories diários", "2 vídeos longos", "Lives semanais"]
    },
    {
      id: 4,
      titulo: "Unboxing Tech Gadgets",
      marca: "Tech Innovation Hub",
      tipo: "reels",
      status: "pausada",
      dataInicio: "2024-01-10",
      dataFim: "2024-02-10",
      valor: 2800,
      plataformas: ["Instagram", "TikTok"],
      alcance: 67000,
      engajamento: 9.2,
      impressoes: 234000,
      cliques: 5600,
      conversoes: 234,
      descricao: "Série de reels fazendo unboxing e review de gadgets tecnológicos inovadores.",
      objetivos: ["Mostrar inovações tech", "Educar sobre tecnologia", "Gerar interesse"],
      entregaveis: ["5 reels", "10 stories", "1 post carrossel"]
    },
    {
      id: 5,
      titulo: "Receitas Saudáveis",
      marca: "Organic Foods Market",
      tipo: "stories",
      status: "rascunho",
      dataInicio: "2024-02-01",
      dataFim: "2024-02-28",
      valor: 4200,
      plataformas: ["Instagram"],
      alcance: 0,
      engajamento: 0,
      impressoes: 0,
      cliques: 0,
      conversoes: 0,
      descricao: "Série de stories com receitas saudáveis usando ingredientes orgânicos da marca.",
      objetivos: ["Promover alimentação saudável", "Mostrar versatilidade dos produtos", "Educar sobre nutrição"],
      entregaveis: ["Stories diários", "3 posts de receitas", "1 IGTV"]
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'post': return 'solar:gallery-bold-duotone';
      case 'stories': return 'solar:story-bold-duotone';
      case 'video': return 'solar:video-bold-duotone';
      case 'reels': return 'solar:reel-bold-duotone';
      case 'colaboracao': return 'solar:handshake-bold-duotone';
      default: return 'solar:document-bold-duotone';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'post': return 'text-blue-600';
      case 'stories': return 'text-purple-600';
      case 'video': return 'text-red-600';
      case 'reels': return 'text-pink-600';
      case 'colaboracao': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'concluida': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pausada': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rascunho': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const campanhasFiltradas = mockCampanhas
    .filter(campanha => {
      const matchStatus = filtroStatus === 'todos' || campanha.status === filtroStatus;
      const matchTipo = filtroTipo === 'todos' || campanha.tipo === filtroTipo;
      return matchStatus && matchTipo;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case 'data':
          return new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime();
        case 'valor':
          return b.valor - a.valor;
        case 'alcance':
          return b.alcance - a.alcance;
        case 'engajamento':
          return b.engajamento - a.engajamento;
        default:
          return 0;
      }
    });

  const totalCampanhas = mockCampanhas.length;
  const campanhasAtivas = mockCampanhas.filter(c => c.status === 'ativa').length;
  const valorTotal = mockCampanhas.reduce((sum, c) => sum + c.valor, 0);
  const alcanceTotal = mockCampanhas.reduce((sum, c) => sum + c.alcance, 0);

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Campanhas
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas campanhas publicitárias e parcerias
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="ativa">Ativa</option>
              <option value="concluida">Concluída</option>
              <option value="pausada">Pausada</option>
              <option value="rascunho">Rascunho</option>
            </select>
            
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="post">Post</option>
              <option value="stories">Stories</option>
              <option value="video">Vídeo</option>
              <option value="reels">Reels</option>
              <option value="colaboracao">Colaboração</option>
            </select>
            
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="data">Mais Recentes</option>
              <option value="valor">Maior Valor</option>
              <option value="alcance">Maior Alcance</option>
              <option value="engajamento">Maior Engajamento</option>
            </select>
          </div>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Campanhas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCampanhas}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:document-bold-duotone" className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Campanhas Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campanhasAtivas}</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:play-bold-duotone" className="w-5 h-5 text-success" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(valorTotal)}</p>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:dollar-bold-duotone" className="w-5 h-5 text-warning" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alcance Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(alcanceTotal)}</p>
              </div>
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Icon icon="solar:eye-bold-duotone" className="w-5 h-5 text-info" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Campanhas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campanhasFiltradas.map((campanha) => (
          <div
            key={campanha.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedCampanha(campanha)}
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon icon={getTipoIcon(campanha.tipo)} className={`w-6 h-6 ${getTipoColor(campanha.tipo)}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                    {campanha.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{campanha.marca}</p>
                </div>
              </div>
              <Badge className={getStatusColor(campanha.status)}>
                {campanha.status.charAt(0).toUpperCase() + campanha.status.slice(1)}
              </Badge>
            </div>

            {/* Informações Principais */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Valor:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(campanha.valor)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Período:</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {new Date(campanha.dataInicio).toLocaleDateString('pt-BR')} - {new Date(campanha.dataFim).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Plataformas:</span>
                <div className="flex gap-1">
                  {campanha.plataformas.map((plataforma, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      {plataforma}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Métricas */}
            {campanha.status !== 'rascunho' && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatNumber(campanha.alcance)}
                  </div>
                  <div className="text-xs text-gray-500">Alcance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {campanha.engajamento.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">Engajamento</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal show={selectedCampanha !== null} onClose={() => setSelectedCampanha(null)} size="5xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Icon icon={getTipoIcon(selectedCampanha?.tipo || '')} className={`w-6 h-6 ${getTipoColor(selectedCampanha?.tipo || '')}`} />
            <span>{selectedCampanha?.titulo}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedCampanha && (
            <div className="space-y-6">
              {/* Informações Gerais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Informações da Campanha
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Marca:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedCampanha.marca}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{selectedCampanha.tipo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <Badge className={getStatusColor(selectedCampanha.status)}>
                        {selectedCampanha.status.charAt(0).toUpperCase() + selectedCampanha.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Valor:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedCampanha.valor)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Período:</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(selectedCampanha.dataInicio).toLocaleDateString('pt-BR')} - {new Date(selectedCampanha.dataFim).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Plataformas e Alcance
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 block mb-2">Plataformas:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedCampanha.plataformas.map((plataforma, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm">
                            {plataforma}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métricas Detalhadas */}
              {selectedCampanha.status !== 'rascunho' && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Métricas de Performance
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-primary">
                        {formatNumber(selectedCampanha.alcance)}
                      </div>
                      <div className="text-sm text-gray-600">Alcance</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-secondary">
                        {selectedCampanha.engajamento.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Engajamento</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-info">
                        {formatNumber(selectedCampanha.impressoes)}
                      </div>
                      <div className="text-sm text-gray-600">Impressões</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-warning">
                        {formatNumber(selectedCampanha.cliques)}
                      </div>
                      <div className="text-sm text-gray-600">Cliques</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-success">
                        {formatNumber(selectedCampanha.conversoes)}
                      </div>
                      <div className="text-sm text-gray-600">Conversões</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Descrição */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Descrição
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedCampanha.descricao}
                </p>
              </div>

              {/* Objetivos e Entregáveis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Objetivos
                  </h4>
                  <ul className="space-y-2">
                    {selectedCampanha.objetivos.map((objetivo, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-success" />
                        <span className="text-gray-600 dark:text-gray-400">{objetivo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Entregáveis
                  </h4>
                  <ul className="space-y-2">
                    {selectedCampanha.entregaveis.map((entregavel, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Icon icon="solar:document-bold" className="w-4 h-4 text-info" />
                        <span className="text-gray-600 dark:text-gray-400">{entregavel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setSelectedCampanha(null)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CampanhasTab;