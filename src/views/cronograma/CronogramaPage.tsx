import React, { useMemo, useState } from 'react';
import { Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiClock, HiPlay, HiPause, HiStop, HiTrendingUp, HiViewGrid, HiViewList, HiPlus, HiDocumentAdd, HiCalendar } from 'react-icons/hi';
import StudyTimerList from '../../components/cronograma/StudyTimerList';

const CronogramaPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  
  // Função para lidar com a adição de novo conteúdo
  const handleAddContent = () => {
    // Aqui você pode implementar a lógica para adicionar novo conteúdo
    console.log('Adicionar novo conteúdo');
  };

  // Função para lidar com a seleção de data
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    console.log('Data selecionada:', date.toLocaleDateString('pt-BR'));
  };

  // Função para alternar a visibilidade do calendário
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Função para gerar os dias do mês
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Função para navegar entre meses
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };
  
  // Estatísticas mockadas - você pode substituir por dados reais
  const stats = useMemo(() => {
    const totalSessions = 45;
    const activeSessions = 3;
    const completedToday = 8;
    const totalHours = 127;
    
    return { totalSessions, activeSessions, completedToday, totalHours };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Icon
                    icon="solar:book-bold-duotone"
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Cronômetro de Estudos
                </h1>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Organize seus estudos por conteúdo e acompanhe seu progresso
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Toggle de visualização */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  title="Visualização em grade"
                >
                  <HiViewGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                  title="Visualização em lista"
                >
                  <HiViewList className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Novo Cronograma
              </Button>




            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <HiClock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Sessões</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSessions}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <HiPlay className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeSessions}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <HiStop className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídas Hoje</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedToday}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <HiTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Horas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {/* Header do conteúdo com botão adicional */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Conteúdos de Estudo
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gerencie seus tópicos e cronômetros de estudo
              </p>
            </div>
            
            {/* Botão Adicionar Conteúdo */}
            <Button
              onClick={handleAddContent}
              className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              title="Adicionar novo conteúdo de estudo"
            >
              <HiDocumentAdd className="w-4 h-4 mr-2" />
              Adicionar Conteúdo
            </Button>
          </div>
          
          <StudyTimerList />
        </div>
      </div>
    </div>
  );
};

export default CronogramaPage;