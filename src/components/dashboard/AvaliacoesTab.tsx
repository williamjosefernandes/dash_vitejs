import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Select, TextInput, Avatar } from 'flowbite-react';
import { 
  HiSearch, 
  HiEye, 
  HiStar, 
  HiCalendar, 
  HiTrendingUp, 
  HiUsers, 
  HiThumbUp,
  HiThumbDown,
  HiCheckCircle
} from 'react-icons/hi';
import { 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

interface Avaliacao {
  id: string;
  marca: string;
  logoMarca: string;
  campanha: string;
  categoria: 'moda' | 'beleza' | 'lifestyle' | 'tecnologia' | 'alimentacao' | 'viagem';
  data: string;
  nota: number; // 1-5
  comentario: string;
  aspectos: {
    comunicacao: number;
    pontualidade: number;
    qualidadeConteudo: number;
    profissionalismo: number;
    resultados: number;
  };
  plataformas: string[];
  metricas: {
    alcance: number;
    engajamento: number;
    conversoes: number;
  };
  recomendaria: boolean;
  status: 'publica' | 'privada' | 'pendente';
  resposta?: string;
  dataResposta?: string;
  tags: string[];
}

const AvaliacoesTab: React.FC = () => {
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<Avaliacao | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('data');
  const [filterNota, setFilterNota] = useState('todas');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para avaliações
  const avaliacoes: Avaliacao[] = [
    {
      id: '1',
      marca: 'Fashion Brand',
      logoMarca: 'https://via.placeholder.com/60x60/E1306C/FFFFFF?text=FB',
      campanha: 'Coleção Verão 2024',
      categoria: 'moda',
      data: '2024-01-20',
      nota: 5,
      comentario: 'Trabalho excepcional! A influenciadora entregou conteúdo de alta qualidade, sempre pontual e com excelente engajamento. Superou nossas expectativas e definitivamente trabalharemos juntos novamente.',
      aspectos: {
        comunicacao: 5,
        pontualidade: 5,
        qualidadeConteudo: 5,
        profissionalismo: 5,
        resultados: 4
      },
      plataformas: ['Instagram', 'TikTok'],
      metricas: {
        alcance: 450000,
        engajamento: 8.5,
        conversoes: 234
      },
      recomendaria: true,
      status: 'publica',
      resposta: 'Muito obrigada pelo feedback! Foi um prazer trabalhar com vocês. Espero colaborar em futuras campanhas!',
      dataResposta: '2024-01-21',
      tags: ['Profissional', 'Criativa', 'Pontual', 'Engajamento Alto']
    },
    {
      id: '2',
      marca: 'Beauty Co.',
      logoMarca: 'https://via.placeholder.com/60x60/FF69B4/FFFFFF?text=BC',
      campanha: 'Linha Skincare Natural',
      categoria: 'beleza',
      data: '2024-01-15',
      nota: 4,
      comentario: 'Ótima parceria! Conteúdo educativo e bem produzido. A única observação é que gostaríamos de mais interação nos stories, mas no geral ficamos muito satisfeitos com os resultados.',
      aspectos: {
        comunicacao: 4,
        pontualidade: 5,
        qualidadeConteudo: 4,
        profissionalismo: 4,
        resultados: 4
      },
      plataformas: ['Instagram', 'YouTube'],
      metricas: {
        alcance: 320000,
        engajamento: 7.2,
        conversoes: 189
      },
      recomendaria: true,
      status: 'publica',
      resposta: 'Obrigada pelo feedback! Vou implementar mais interação nos stories nas próximas campanhas.',
      dataResposta: '2024-01-16',
      tags: ['Educativa', 'Qualidade', 'Confiável']
    },
    {
      id: '3',
      marca: 'Tech Startup',
      logoMarca: 'https://via.placeholder.com/60x60/4285F4/FFFFFF?text=TS',
      campanha: 'App Produtividade',
      categoria: 'tecnologia',
      data: '2024-01-10',
      nota: 5,
      comentario: 'Parceria incrível! A forma como explicou as funcionalidades do app foi perfeita. Conseguiu traduzir conceitos técnicos de forma simples e atrativa. Resultados excelentes!',
      aspectos: {
        comunicacao: 5,
        pontualidade: 4,
        qualidadeConteudo: 5,
        profissionalismo: 5,
        resultados: 5
      },
      plataformas: ['Instagram', 'YouTube', 'LinkedIn'],
      metricas: {
        alcance: 280000,
        engajamento: 9.1,
        conversoes: 312
      },
      recomendaria: true,
      status: 'publica',
      tags: ['Técnica', 'Didática', 'Inovadora', 'Resultados Excelentes']
    },
    {
      id: '4',
      marca: 'Fitness Brand',
      logoMarca: 'https://via.placeholder.com/60x60/FF4500/FFFFFF?text=FIT',
      campanha: 'Desafio 30 Dias',
      categoria: 'lifestyle',
      data: '2024-01-05',
      nota: 4,
      comentario: 'Campanha motivacional muito bem executada. Engajamento excelente e comunidade muito ativa. Pequenos atrasos na entrega de alguns conteúdos, mas qualidade compensou.',
      aspectos: {
        comunicacao: 4,
        pontualidade: 3,
        qualidadeConteudo: 5,
        profissionalismo: 4,
        resultados: 5
      },
      plataformas: ['Instagram', 'TikTok', 'YouTube'],
      metricas: {
        alcance: 520000,
        engajamento: 12.3,
        conversoes: 445
      },
      recomendaria: true,
      status: 'publica',
      resposta: 'Obrigada! Vou melhorar a pontualidade nas próximas campanhas. Foi incrível ver o engajamento da comunidade!',
      dataResposta: '2024-01-06',
      tags: ['Motivacional', 'Engajamento Alto', 'Comunidade Ativa']
    },
    {
      id: '5',
      marca: 'Travel Agency',
      logoMarca: 'https://via.placeholder.com/60x60/FF6B35/FFFFFF?text=TA',
      campanha: 'Destinos Exóticos',
      categoria: 'viagem',
      data: '2023-12-28',
      nota: 3,
      comentario: 'Conteúdo visualmente bonito, mas sentimos falta de mais informações práticas sobre os destinos. O engajamento foi menor que o esperado para o nicho de viagem.',
      aspectos: {
        comunicacao: 3,
        pontualidade: 4,
        qualidadeConteudo: 3,
        profissionalismo: 4,
        resultados: 2
      },
      plataformas: ['Instagram'],
      metricas: {
        alcance: 180000,
        engajamento: 4.2,
        conversoes: 67
      },
      recomendaria: false,
      status: 'publica',
      resposta: 'Entendo o feedback. Vou focar mais em conteúdo informativo e dicas práticas em futuras colaborações de viagem.',
      dataResposta: '2023-12-29',
      tags: ['Visual', 'Melhorar Informações']
    },
    {
      id: '6',
      marca: 'Healthy Foods',
      logoMarca: 'https://via.placeholder.com/60x60/32CD32/FFFFFF?text=HF',
      campanha: 'Receitas Saudáveis',
      categoria: 'alimentacao',
      data: '2023-12-20',
      nota: 5,
      comentario: 'Perfeito! Receitas criativas, apresentação impecável e engajamento fantástico. A audiência adorou as dicas nutricionais. Parceria de muito sucesso!',
      aspectos: {
        comunicacao: 5,
        pontualidade: 5,
        qualidadeConteudo: 5,
        profissionalismo: 5,
        resultados: 5
      },
      plataformas: ['Instagram', 'TikTok'],
      metricas: {
        alcance: 380000,
        engajamento: 10.8,
        conversoes: 298
      },
      recomendaria: true,
      status: 'publica',
      resposta: 'Que alegria receber esse feedback! Adoro criar conteúdo sobre alimentação saudável. Vamos repetir!',
      dataResposta: '2023-12-21',
      tags: ['Criativa', 'Nutricional', 'Engajamento Fantástico']
    },
    {
      id: '7',
      marca: 'Eco Brand',
      logoMarca: 'https://via.placeholder.com/60x60/228B22/FFFFFF?text=EB',
      campanha: 'Sustentabilidade',
      categoria: 'lifestyle',
      data: '2023-12-15',
      nota: 2,
      comentario: 'Infelizmente a campanha não atingiu os objetivos. Faltou alinhamento com os valores da marca e o conteúdo não transmitiu a mensagem de sustentabilidade como esperávamos.',
      aspectos: {
        comunicacao: 2,
        pontualidade: 3,
        qualidadeConteudo: 2,
        profissionalismo: 3,
        resultados: 1
      },
      plataformas: ['Instagram'],
      metricas: {
        alcance: 95000,
        engajamento: 2.1,
        conversoes: 12
      },
      recomendaria: false,
      status: 'privada',
      tags: ['Desalinhamento', 'Melhorar Briefing']
    }
  ];

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'moda': return 'from-pink-500 to-rose-600';
      case 'beleza': return 'from-purple-500 to-pink-600';
      case 'lifestyle': return 'from-blue-500 to-cyan-600';
      case 'tecnologia': return 'from-gray-600 to-blue-600';
      case 'alimentacao': return 'from-green-500 to-emerald-600';
      case 'viagem': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publica': return 'success';
      case 'privada': return 'warning';
      case 'pendente': return 'gray';
      default: return 'gray';
    }
  };

  const getPlataformaIcon = (plataforma: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (plataforma.toLowerCase()) {
      case 'instagram':
        return <FaInstagram {...iconProps} style={{ color: '#E1306C' }} />;
      case 'tiktok':
        return <FaTiktok {...iconProps} style={{ color: '#000000' }} />;
      case 'youtube':
        return <FaYoutube {...iconProps} style={{ color: '#FF0000' }} />;
      case 'twitter':
        return <FaTwitter {...iconProps} style={{ color: '#1DA1F2' }} />;
      case 'linkedin':
        return <FaLinkedin {...iconProps} style={{ color: '#0077B5' }} />;
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
    const matchesSearch = avaliacao.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         avaliacao.campanha.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNota = filterNota === 'todas' || 
                       (filterNota === '5' && avaliacao.nota === 5) ||
                       (filterNota === '4' && avaliacao.nota === 4) ||
                       (filterNota === '3' && avaliacao.nota === 3) ||
                       (filterNota === '1-2' && avaliacao.nota <= 2);
    const matchesStatus = filterStatus === 'todas' || avaliacao.status === filterStatus;
    return matchesSearch && matchesNota && matchesStatus;
  });

  const sortedAvaliacoes = [...filteredAvaliacoes].sort((a, b) => {
    switch (sortBy) {
      case 'nota':
        return b.nota - a.nota;
      case 'marca':
        return a.marca.localeCompare(b.marca);
      case 'data':
      default:
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    }
  });

  const openModal = (avaliacao: Avaliacao) => {
    setSelectedAvaliacao(avaliacao);
    setShowModal(true);
  };

  // Estatísticas
  const notaMedia = avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length;
  const avaliacoesPositivas = avaliacoes.filter(av => av.nota >= 4).length;
  const taxaRecomendacao = (avaliacoes.filter(av => av.recomendaria).length / avaliacoes.length) * 100;
  const totalAlcance = avaliacoes.reduce((acc, av) => acc + av.metricas.alcance, 0);

  return (
    <div className="space-y-6">
      {/* Header com Filtros e Busca */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-100 dark:border-gray-600">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Avaliações
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Feedback das marcas sobre suas campanhas e colaborações
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <TextInput
                placeholder="Buscar avaliações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 min-w-[250px]"
              />
            </div>
            
            <Select value={filterNota} onChange={(e) => setFilterNota(e.target.value)}>
              <option value="todas">Todas as Notas</option>
              <option value="5">5 Estrelas</option>
              <option value="4">4 Estrelas</option>
              <option value="3">3 Estrelas</option>
              <option value="1-2">1-2 Estrelas</option>
            </Select>
            
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="todas">Todos os Status</option>
              <option value="publica">Públicas</option>
              <option value="privada">Privadas</option>
              <option value="pendente">Pendentes</option>
            </Select>
            
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="data">Mais Recentes</option>
              <option value="nota">Maior Nota</option>
              <option value="marca">Por Marca</option>
            </Select>
          </div>
        </div>

        {/* Resumo de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <HiStar className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notaMedia.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Nota Média</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <HiThumbUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avaliacoesPositivas}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avaliações 4+</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <HiCheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {taxaRecomendacao.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Taxa Recomendação</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <HiUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(totalAlcance)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Alcance Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Avaliações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAvaliacoes.map((avaliacao) => (
          <Card 
            key={avaliacao.id} 
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-800 overflow-hidden"
          >
            {/* Header do Card com Gradiente da Categoria */}
            <div className={`bg-gradient-to-r ${getCategoriaColor(avaliacao.categoria)} p-4 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Badge color={getStatusColor(avaliacao.status)} size="sm" className="capitalize">
                    {avaliacao.status}
                  </Badge>
                  <div className="text-white/80 text-sm font-medium capitalize">
                    {avaliacao.categoria}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    img={avaliacao.logoMarca}
                    alt={avaliacao.marca}
                    size="sm"
                    className="ring-2 ring-white/20"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {avaliacao.marca}
                    </h3>
                    <p className="text-white/80 text-sm">{avaliacao.campanha}</p>
                  </div>
                </div>
                
                {/* Nota */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < avaliacao.nota ? 'text-yellow-300' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg">
                    {avaliacao.nota.toFixed(1)}
                  </span>
                </div>
              </div>
              
              {/* Padrão Geométrico de Fundo */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-5">
              {/* Data e Recomendação */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <HiCalendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(avaliacao.data)}</span>
                </div>
                <div className="flex items-center gap-1">
                  {avaliacao.recomendaria ? (
                    <HiThumbUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <HiThumbDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-xs text-gray-500">
                    {avaliacao.recomendaria ? 'Recomenda' : 'Não Recomenda'}
                  </span>
                </div>
              </div>

              {/* Comentário */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                "{avaliacao.comentario}"
              </p>

              {/* Aspectos Avaliados */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aspectos Avaliados:</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(avaliacao.aspectos).slice(0, 4).map(([aspecto, nota]) => (
                    <div key={aspecto} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">
                        {aspecto.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <HiStar
                            key={i}
                            className={`w-3 h-3 ${
                              i < nota ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plataformas */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Plataformas:</div>
                <div className="flex flex-wrap gap-1">
                  {avaliacao.plataformas.map((plataforma, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                      {getPlataformaIcon(plataforma)}
                      <span>{plataforma}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <HiUsers className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">
                    {formatNumber(avaliacao.metricas.alcance)}
                  </div>
                </div>
                
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <HiTrendingUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">
                    {avaliacao.metricas.engajamento.toFixed(1)}%
                  </div>
                </div>
                
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <HiCheckCircle className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">
                    {formatNumber(avaliacao.metricas.conversoes)}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {avaliacao.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {avaliacao.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} color="gray" size="sm">
                        {tag}
                      </Badge>
                    ))}
                    {avaliacao.tags.length > 3 && (
                      <Badge color="gray" size="sm">
                        +{avaliacao.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Botão Ver Detalhes */}
              <Button
                onClick={() => openModal(avaliacao)}
                className={`w-full bg-gradient-to-r ${getCategoriaColor(avaliacao.categoria)} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                size="sm"
              >
                <HiEye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size="4xl">
        <Modal.Header>
          <div className="flex items-center gap-3">
            {selectedAvaliacao && (
              <>
                <Avatar
                  img={selectedAvaliacao.logoMarca}
                  alt={selectedAvaliacao.marca}
                  size="sm"
                />
                <span>Avaliação - {selectedAvaliacao.marca}</span>
              </>
            )}
          </div>
        </Modal.Header>
        <Modal.Body>
          {selectedAvaliacao && (
            <div className="space-y-6">
              {/* Header da Avaliação */}
              <div className={`bg-gradient-to-r ${getCategoriaColor(selectedAvaliacao.categoria)} rounded-xl p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      img={selectedAvaliacao.logoMarca}
                      alt={selectedAvaliacao.marca}
                      size="lg"
                      className="ring-2 ring-white/20"
                    />
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {selectedAvaliacao.marca}
                      </h3>
                      <p className="text-white/80 text-sm">{selectedAvaliacao.campanha}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge color={getStatusColor(selectedAvaliacao.status)} size="lg" className="capitalize mb-2">
                      {selectedAvaliacao.status}
                    </Badge>
                    <div className="text-white/80">{formatDate(selectedAvaliacao.data)}</div>
                  </div>
                </div>
              </div>

              {/* Comentário Principal */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Comentário da Marca
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{selectedAvaliacao.comentario}"
                  </p>
                </div>
              </div>

              {/* Aspectos Detalhados */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Avaliação por Aspectos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedAvaliacao.aspectos).map(([aspecto, nota]) => (
                    <div key={aspecto} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">
                          {aspecto.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-bold text-lg">{nota}/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < nota ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Métricas de Performance */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Métricas da Campanha
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                    <HiUsers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(selectedAvaliacao.metricas.alcance)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Alcance</div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                    <HiTrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {selectedAvaliacao.metricas.engajamento.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Engajamento</div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                    <HiCheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(selectedAvaliacao.metricas.conversoes)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Conversões</div>
                  </div>
                </div>
              </div>

              {/* Plataformas e Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Plataformas Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAvaliacao.plataformas.map((plataforma, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                        {getPlataformaIcon(plataforma)}
                        <span className="font-medium">{plataforma}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAvaliacao.tags.map((tag, index) => (
                      <Badge key={index} color="blue" size="lg">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recomendação */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Recomendação
                </h4>
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  selectedAvaliacao.recomendaria 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}>
                  {selectedAvaliacao.recomendaria ? (
                    <HiThumbUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <HiThumbDown className="w-6 h-6 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    selectedAvaliacao.recomendaria ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {selectedAvaliacao.recomendaria 
                      ? 'A marca recomendaria trabalhar novamente' 
                      : 'A marca não recomendaria trabalhar novamente'
                    }
                  </span>
                </div>
              </div>

              {/* Resposta do Influenciador */}
              {selectedAvaliacao.resposta && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Sua Resposta
                  </h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {selectedAvaliacao.resposta}
                    </p>
                    {selectedAvaliacao.dataResposta && (
                      <div className="text-sm text-gray-500">
                        Respondido em {formatDate(selectedAvaliacao.dataResposta)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setSelectedAvaliacao(null)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvaliacoesTab;