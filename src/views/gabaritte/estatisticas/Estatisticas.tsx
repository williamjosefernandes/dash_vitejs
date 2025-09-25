import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Progress, Select, Tabs } from 'flowbite-react';

const Estatisticas = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const [timePeriod, setTimePeriod] = useState('mes');

  // Dados simulados de estatísticas
  const stats = {
    geral: {
      totalStudyTime: 156, // horas
      averageScore: 84,
      completedActivities: 127,
      streak: 15,
      improvement: 12, // %
      subjects: 8,
      goals: {
        completed: 12,
        total: 15
      }
    },
    performance: {
      subjects: [
        { name: 'Matemática', score: 88, improvement: 15, time: 45, exercises: 156 },
        { name: 'Física', score: 82, improvement: 8, time: 38, exercises: 124 },
        { name: 'Química', score: 76, improvement: -3, time: 32, exercises: 98 },
        { name: 'Biologia', score: 91, improvement: 18, time: 28, exercises: 87 },
        { name: 'História', score: 79, improvement: 5, time: 25, exercises: 76 },
        { name: 'Geografia', score: 85, improvement: 12, time: 22, exercises: 65 },
        { name: 'Português', score: 87, improvement: 9, time: 35, exercises: 112 },
        { name: 'Literatura', score: 73, improvement: -1, time: 18, exercises: 54 }
      ],
      weeklyProgress: [
        { week: 'Sem 1', score: 72 },
        { week: 'Sem 2', score: 75 },
        { week: 'Sem 3', score: 78 },
        { week: 'Sem 4', score: 84 }
      ]
    },
    time: {
      dailyAverage: 3.2, // horas
      weeklyTotal: 22.4, // horas
      monthlyTotal: 89.6, // horas
      bestDay: 'Terça-feira',
      bestTime: '14:00-16:00',
      distribution: {
        'Manhã (6-12h)': 35,
        'Tarde (12-18h)': 45,
        'Noite (18-24h)': 20
      },
      weeklyDistribution: [
        { day: 'Seg', hours: 3.5 },
        { day: 'Ter', hours: 4.2 },
        { day: 'Qua', hours: 3.8 },
        { day: 'Qui', hours: 4.0 },
        { day: 'Sex', hours: 3.2 },
        { day: 'Sáb', hours: 2.8 },
        { day: 'Dom', hours: 0.9 }
      ]
    },
    goals: [
      {
        id: 1,
        title: 'Estudar 20h por semana',
        current: 22.4,
        target: 20,
        unit: 'horas',
        status: 'completed',
        progress: 112
      },
      {
        id: 2,
        title: 'Média acima de 80%',
        current: 84,
        target: 80,
        unit: '%',
        status: 'completed',
        progress: 105
      },
      {
        id: 3,
        title: 'Completar 100 exercícios',
        current: 87,
        target: 100,
        unit: 'exercícios',
        status: 'in_progress',
        progress: 87
      },
      {
        id: 4,
        title: 'Sequência de 30 dias',
        current: 15,
        target: 30,
        unit: 'dias',
        status: 'in_progress',
        progress: 50
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'not_started': return 'gray';
      default: return 'gray';
    }
  };

  const getGoalStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'in_progress': return 'Em Progresso';
      case 'not_started': return 'Não Iniciada';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Estatísticas Avançadas 📈
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Análise completa do seu desempenho e progresso nos estudos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="trimestre">Trimestre</option>
              <option value="ano">Este Ano</option>
            </Select>
            <Button color="primary">
              <Icon icon="solar:export-bold-duotone" className="w-5 h-5 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardBox>

      {/* Tabs */}
      <TitleCard title="Dashboard de Estatísticas">
        <Tabs aria-label="Estatísticas tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'geral'} 
            title="Visão Geral" 
            icon={() => <Icon icon="solar:chart-2-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('geral')}
          >
            <div className="mt-6 space-y-6">
              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:clock-circle-bold-duotone" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.geral.totalStudyTime}h</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Tempo Total de Estudo</p>
                  <div className="text-xs text-green-600 mt-1">+{stats.geral.improvement}% este mês</div>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:chart-square-bold-duotone" className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.geral.averageScore}%</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Média Geral</p>
                  <div className="text-xs text-green-600 mt-1">+{stats.geral.improvement}% de melhoria</div>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:checklist-bold-duotone" className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.geral.completedActivities}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Atividades Concluídas</p>
                  <div className="text-xs text-blue-600 mt-1">{stats.geral.subjects} disciplinas</div>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:fire-bold-duotone" className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.geral.streak}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Dias Consecutivos</p>
                  <div className="text-xs text-orange-600 mt-1">Sequência atual</div>
                </CardBox>
              </div>

              {/* Progresso das Metas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Metas do Mês</h3>
                  <div className="space-y-4">
                    {stats.goals.slice(0, 4).map((goal) => (
                      <div key={goal.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{goal.title}</span>
                          <div className="flex items-center gap-2">
                            <Badge color={getGoalStatusColor(goal.status)} size="sm">
                              {getGoalStatusText(goal.status)}
                            </Badge>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {goal.current}/{goal.target} {goal.unit}
                            </span>
                          </div>
                        </div>
                        <Progress 
                          progress={Math.min(goal.progress, 100)} 
                          color={goal.status === 'completed' ? 'green' : goal.progress >= 80 ? 'yellow' : 'blue'} 
                          size="sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progresso Semanal</h3>
                  <div className="space-y-3">
                    {stats.performance.weeklyProgress.map((week, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 w-16">{week.week}</div>
                        <div className="flex-1">
                          <Progress progress={week.score} color={week.score >= 80 ? 'green' : week.score >= 60 ? 'yellow' : 'red'} size="sm" />
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white w-12">{week.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'desempenho'} 
            title="Desempenho" 
            icon={() => <Icon icon="solar:graph-up-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('desempenho')}
          >
            <div className="mt-6 space-y-6">
              {/* Ranking de Disciplinas */}
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Desempenho por Disciplina</h3>
                <div className="space-y-4">
                  {stats.performance.subjects
                    .sort((a, b) => b.score - a.score)
                    .map((subject, index) => (
                    <div key={subject.name} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {/* Ranking */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Nome da disciplina */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{subject.time}h estudadas</span>
                          <span>{subject.exercises} exercícios</span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(subject.score)}`}>
                          {subject.score}%
                        </div>
                        <div className={`text-sm ${getImprovementColor(subject.improvement)}`}>
                          {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                        </div>
                      </div>

                      {/* Barra de progresso */}
                      <div className="w-24">
                        <Progress 
                          progress={subject.score} 
                          color={subject.score >= 85 ? 'green' : subject.score >= 70 ? 'yellow' : 'red'} 
                          size="sm" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Análise de Pontos Fortes e Fracos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-green-600" />
                    Pontos Fortes
                  </h3>
                  <div className="space-y-3">
                    {stats.performance.subjects
                      .filter(s => s.score >= 85)
                      .map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="font-medium text-green-800 dark:text-green-200">{subject.name}</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">{subject.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon icon="solar:danger-triangle-bold-duotone" className="w-5 h-5 text-red-600" />
                    Áreas para Melhoria
                  </h3>
                  <div className="space-y-3">
                    {stats.performance.subjects
                      .filter(s => s.score < 80)
                      .map((subject) => (
                      <div key={subject.name} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="font-medium text-red-800 dark:text-red-200">{subject.name}</span>
                        <span className="text-red-600 dark:text-red-400 font-bold">{subject.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'tempo'} 
            title="Tempo de Estudo" 
            icon={() => <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('tempo')}
          >
            <div className="mt-6 space-y-6">
              {/* Métricas de Tempo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.time.dailyAverage}h</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Média Diária</p>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:calendar-date-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.time.weeklyTotal}h</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Semanal</p>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.time.bestDay}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Melhor Dia</p>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.time.bestTime}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Melhor Horário</p>
                </CardBox>
              </div>

              {/* Distribuição de Tempo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribuição por Período</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.time.distribution).map(([period, percentage]) => (
                      <div key={period}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{period}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{percentage}%</span>
                        </div>
                        <Progress progress={percentage} color="blue" size="sm" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Horas por Dia da Semana</h3>
                  <div className="space-y-3">
                    {stats.time.weeklyDistribution.map((day) => (
                      <div key={day.day} className="flex items-center gap-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 w-12">{day.day}</div>
                        <div className="flex-1">
                          <Progress progress={(day.hours / 5) * 100} color="green" size="sm" />
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white w-12">{day.hours}h</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights de Produtividade */}
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Insights de Produtividade</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:lightbulb-bolt-bold-duotone" className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-200">Horário Ideal</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Você é mais produtivo entre 14h e 16h, com 23% melhor desempenho.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:calendar-mark-bold-duotone" className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">Consistência</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Terças e quintas são seus dias mais consistentes de estudo.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:target-bold-duotone" className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800 dark:text-yellow-200">Recomendação</span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Aumente o tempo de estudo aos fins de semana para melhor equilíbrio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'metas'} 
            title="Metas e Objetivos" 
            icon={() => <Icon icon="solar:target-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('metas')}
          >
            <div className="mt-6 space-y-6">
              {/* Resumo das Metas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.geral.goals.completed}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Metas Concluídas</p>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.geral.goals.total - stats.geral.goals.completed}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Em Progresso</p>
                </CardBox>

                <CardBox className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
                    <Icon icon="solar:chart-2-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{Math.round((stats.geral.goals.completed / stats.geral.goals.total) * 100)}%</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Taxa de Sucesso</p>
                </CardBox>
              </div>

              {/* Lista Detalhada de Metas */}
              <div className="space-y-4">
                {stats.goals.map((goal) => (
                  <div key={goal.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge color={getGoalStatusColor(goal.status)}>
                            {getGoalStatusText(goal.status)}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {goal.current} de {goal.target} {goal.unit}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {Math.round(goal.progress)}%
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Progresso</div>
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="mb-4">
                      <Progress 
                        progress={Math.min(goal.progress, 100)} 
                        color={goal.status === 'completed' ? 'green' : goal.progress >= 80 ? 'yellow' : 'blue'} 
                        size="lg" 
                      />
                    </div>

                    {/* Informações adicionais */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {goal.status === 'completed' ? 'Meta alcançada!' : 
                         `Faltam ${goal.target - goal.current} ${goal.unit} para concluir`}
                      </span>
                      {goal.status !== 'completed' && (
                        <span>
                          {goal.progress >= 80 ? 'Quase lá!' : 
                           goal.progress >= 50 ? 'No caminho certo' : 
                           'Continue se esforçando'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão para adicionar nova meta */}
              <div className="text-center">
                <Button color="primary" size="lg">
                  <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
                  Adicionar Nova Meta
                </Button>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>
    </div>
  );
};

export default Estatisticas;