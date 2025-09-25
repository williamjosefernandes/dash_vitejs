import React from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Progress, Badge } from 'flowbite-react';

const Home = () => {
  // Dados simulados para o dashboard
  const progressData = {
    studyHours: 45,
    totalHours: 60,
    completedSubjects: 8,
    totalSubjects: 12,
    weeklyGoal: 75
  };

  const recentActivities = [
    { id: 1, subject: 'Matemática', activity: 'Exercícios de Álgebra', time: '2h ago', status: 'completed' },
    { id: 2, subject: 'Física', activity: 'Simulado - Mecânica', time: '4h ago', status: 'in-progress' },
    { id: 3, subject: 'Química', activity: 'Revisão - Orgânica', time: '1 day ago', status: 'completed' },
    { id: 4, subject: 'Português', activity: 'Redação - Dissertação', time: '2 days ago', status: 'pending' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Simulado de Matemática', date: 'Hoje, 15:00', priority: 'high' },
    { id: 2, task: 'Revisão de Física', date: 'Amanhã, 09:00', priority: 'medium' },
    { id: 3, task: 'Entrega de Redação', date: '25/09, 23:59', priority: 'high' },
    { id: 4, task: 'Estudo de Química', date: '26/09, 14:00', priority: 'low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bem-vindo ao Gabaritte! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Acompanhe seu progresso acadêmico e mantenha-se organizado
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Hoje</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </CardBox>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:book-2-bold-duotone" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.studyHours}h</h3>
          <p className="text-gray-600 dark:text-gray-300">Horas de Estudo</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Meta: {progressData.totalHours}h</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:diploma-bold-duotone" className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.completedSubjects}</h3>
          <p className="text-gray-600 dark:text-gray-300">Disciplinas Concluídas</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total: {progressData.totalSubjects}</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:target-bold-duotone" className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{progressData.weeklyGoal}%</h3>
          <p className="text-gray-600 dark:text-gray-300">Meta Semanal</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Em progresso</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-4">
            <Icon icon="solar:chart-bold-duotone" className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85%</h3>
          <p className="text-gray-600 dark:text-gray-300">Performance</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Última semana</p>
        </CardBox>
      </div>

      {/* Progresso Geral */}
      <TitleCard title="Progresso Geral" className="mb-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Horas de Estudo</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progressData.studyHours}/{progressData.totalHours}h</span>
            </div>
            <Progress progress={(progressData.studyHours / progressData.totalHours) * 100} color="blue" size="lg" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disciplinas Concluídas</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progressData.completedSubjects}/{progressData.totalSubjects}</span>
            </div>
            <Progress progress={(progressData.completedSubjects / progressData.totalSubjects) * 100} color="green" size="lg" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta Semanal</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progressData.weeklyGoal}%</span>
            </div>
            <Progress progress={progressData.weeklyGoal} color="purple" size="lg" />
          </div>
        </div>
      </TitleCard>

      {/* Grid com Atividades Recentes e Próximas Tarefas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <TitleCard title="Atividades Recentes">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{activity.subject}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activity.activity}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <Badge color={`light${getStatusColor(activity.status)}`} className={`text-${getStatusColor(activity.status)}`}>
                  {activity.status === 'completed' ? 'Concluído' : 
                   activity.status === 'in-progress' ? 'Em Progresso' : 'Pendente'}
                </Badge>
              </div>
            ))}
          </div>
        </TitleCard>

        {/* Próximas Tarefas */}
        <TitleCard title="Próximas Tarefas">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{task.task}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{task.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge color={`light${getPriorityColor(task.priority)}`} className={`text-${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Alta' : 
                     task.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                  <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </TitleCard>
      </div>

      {/* Ações Rápidas */}
      <TitleCard title="Ações Rápidas">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Icon icon="solar:book-2-bold-duotone" className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Novo Estudo</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Icon icon="solar:clipboard-check-bold-duotone" className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Simulado</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <Icon icon="solar:calendar-add-bold-duotone" className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Agendar</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <Icon icon="solar:chart-2-bold-duotone" className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Relatórios</span>
          </button>
        </div>
      </TitleCard>
    </div>
  );
};

export default Home;