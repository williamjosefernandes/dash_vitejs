import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, TextInput, Label, Select, Textarea, ToggleSwitch, Tabs, Alert } from 'flowbite-react';

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Estados das configurações
  const [settings, setSettings] = useState({
    profile: {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      birthDate: '1995-05-15',
      school: 'Colégio Exemplo',
      grade: '3º Ano - Ensino Médio',
      goal: 'Aprovação no ENEM 2024',
      targetScore: 750
    },
    notifications: {
      email: true,
      push: true,
      studyReminders: true,
      goalAlerts: true,
      weeklyReports: true,
      achievements: true,
      newContent: false,
      marketing: false
    },
    study: {
      dailyGoal: 4, // horas
      sessionDuration: 45, // minutos
      breakDuration: 15, // minutos
      difficulty: 'medium',
      autoAdvance: true,
      showHints: true,
      trackTime: true,
      soundEffects: true
    },
    appearance: {
      theme: 'system',
      language: 'pt-BR',
      fontSize: 'medium',
      animations: true,
      compactMode: false,
      colorScheme: 'blue'
    },
    privacy: {
      profileVisibility: 'private',
      shareProgress: false,
      dataCollection: true,
      analytics: true,
      thirdPartyIntegrations: false
    },
    integrations: {
      googleCalendar: false,
      notion: false,
      discord: false,
      spotify: false
    }
  });

  const handleSave = (section: string) => {
    setAlertMessage(`Configurações de ${section} salvas com sucesso!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleToggle = (section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !(prev[section as keyof typeof prev] as any)[key]
      }
    }));
  };

  const handleInputChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Configurações ⚙️
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Personalize sua experiência de estudo e gerencie suas preferências
            </p>
          </div>
          <Button color="primary" onClick={() => openModal('backup')}>
            <Icon icon="solar:cloud-download-bold-duotone" className="w-5 h-5 mr-2" />
            Backup de Dados
          </Button>
        </div>
      </CardBox>

      {/* Alert de sucesso */}
      {showAlert && (
        <Alert color="success" onDismiss={() => setShowAlert(false)}>
          <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 mr-2" />
          {alertMessage}
        </Alert>
      )}

      {/* Tabs de Configurações */}
      <TitleCard title="Configurações do Sistema">
        <Tabs aria-label="Configurações tabs" variant="underline">
          <Tabs.Item 
            active={activeTab === 'perfil'} 
            title="Perfil" 
            icon={() => <Icon icon="solar:user-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('perfil')}
          >
            <div className="mt-6 space-y-6">
              {/* Informações Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" value="Nome Completo" />
                  <TextInput
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email" value="E-mail" />
                  <TextInput
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" value="Telefone" />
                  <TextInput
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate" value="Data de Nascimento" />
                  <TextInput
                    id="birthDate"
                    type="date"
                    value={settings.profile.birthDate}
                    onChange={(e) => handleInputChange('profile', 'birthDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Informações Acadêmicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="school" value="Escola/Instituição" />
                  <TextInput
                    id="school"
                    value={settings.profile.school}
                    onChange={(e) => handleInputChange('profile', 'school', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="grade" value="Série/Ano" />
                  <Select
                    id="grade"
                    value={settings.profile.grade}
                    onChange={(e) => handleInputChange('profile', 'grade', e.target.value)}
                  >
                    <option value="1º Ano - Ensino Médio">1º Ano - Ensino Médio</option>
                    <option value="2º Ano - Ensino Médio">2º Ano - Ensino Médio</option>
                    <option value="3º Ano - Ensino Médio">3º Ano - Ensino Médio</option>
                    <option value="Cursinho Pré-Vestibular">Cursinho Pré-Vestibular</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="goal" value="Objetivo Principal" />
                  <TextInput
                    id="goal"
                    value={settings.profile.goal}
                    onChange={(e) => handleInputChange('profile', 'goal', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="targetScore" value="Meta de Pontuação (ENEM)" />
                  <TextInput
                    id="targetScore"
                    type="number"
                    value={settings.profile.targetScore}
                    onChange={(e) => handleInputChange('profile', 'targetScore', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" onClick={() => handleSave('perfil')}>
                  <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                  Salvar Perfil
                </Button>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'notificacoes'} 
            title="Notificações" 
            icon={() => <Icon icon="solar:bell-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('notificacoes')}
          >
            <div className="mt-6 space-y-6">
              {/* Configurações de Notificação */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notificações por E-mail</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receba atualizações importantes por e-mail</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.email}
                    onChange={() => handleToggle('notifications', 'email')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notificações Push</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receba notificações no navegador</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.push}
                    onChange={() => handleToggle('notifications', 'push')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Lembretes de Estudo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receba lembretes para manter sua rotina</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.studyReminders}
                    onChange={() => handleToggle('notifications', 'studyReminders')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Alertas de Metas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Seja notificado sobre o progresso das suas metas</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.goalAlerts}
                    onChange={() => handleToggle('notifications', 'goalAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Relatórios Semanais</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receba resumos do seu progresso semanal</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.weeklyReports}
                    onChange={() => handleToggle('notifications', 'weeklyReports')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Conquistas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Seja notificado quando alcançar conquistas</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.achievements}
                    onChange={() => handleToggle('notifications', 'achievements')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Novo Conteúdo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receba notificações sobre novos conteúdos</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.newContent}
                    onChange={() => handleToggle('notifications', 'newContent')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Marketing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Receba ofertas e novidades do Gabaritte</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.notifications.marketing}
                    onChange={() => handleToggle('notifications', 'marketing')}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" onClick={() => handleSave('notificações')}>
                  <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                  Salvar Notificações
                </Button>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'estudo'} 
            title="Estudo" 
            icon={() => <Icon icon="solar:book-2-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('estudo')}
          >
            <div className="mt-6 space-y-6">
              {/* Configurações de Estudo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dailyGoal" value="Meta Diária de Estudo (horas)" />
                  <Select
                    id="dailyGoal"
                    value={settings.study.dailyGoal}
                    onChange={(e) => handleInputChange('study', 'dailyGoal', parseInt(e.target.value))}
                  >
                    <option value={1}>1 hora</option>
                    <option value={2}>2 horas</option>
                    <option value={3}>3 horas</option>
                    <option value={4}>4 horas</option>
                    <option value={5}>5 horas</option>
                    <option value={6}>6 horas</option>
                    <option value={8}>8 horas</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sessionDuration" value="Duração da Sessão (minutos)" />
                  <Select
                    id="sessionDuration"
                    value={settings.study.sessionDuration}
                    onChange={(e) => handleInputChange('study', 'sessionDuration', parseInt(e.target.value))}
                  >
                    <option value={25}>25 minutos (Pomodoro)</option>
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={90}>1h 30min</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="breakDuration" value="Duração da Pausa (minutos)" />
                  <Select
                    id="breakDuration"
                    value={settings.study.breakDuration}
                    onChange={(e) => handleInputChange('study', 'breakDuration', parseInt(e.target.value))}
                  >
                    <option value={5}>5 minutos</option>
                    <option value={10}>10 minutos</option>
                    <option value={15}>15 minutos</option>
                    <option value={20}>20 minutos</option>
                    <option value={30}>30 minutos</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty" value="Nível de Dificuldade Padrão" />
                  <Select
                    id="difficulty"
                    value={settings.study.difficulty}
                    onChange={(e) => handleInputChange('study', 'difficulty', e.target.value)}
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                    <option value="adaptive">Adaptativo</option>
                  </Select>
                </div>
              </div>

              {/* Toggles de Estudo */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Avanço Automático</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Avançar automaticamente para o próximo tópico</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.study.autoAdvance}
                    onChange={() => handleToggle('study', 'autoAdvance')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Mostrar Dicas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Exibir dicas durante os exercícios</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.study.showHints}
                    onChange={() => handleToggle('study', 'showHints')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Rastrear Tempo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Monitorar tempo gasto em cada atividade</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.study.trackTime}
                    onChange={() => handleToggle('study', 'trackTime')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Efeitos Sonoros</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Reproduzir sons para feedback</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.study.soundEffects}
                    onChange={() => handleToggle('study', 'soundEffects')}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" onClick={() => handleSave('estudo')}>
                  <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                  Salvar Configurações de Estudo
                </Button>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'aparencia'} 
            title="Aparência" 
            icon={() => <Icon icon="solar:palette-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('aparencia')}
          >
            <div className="mt-6 space-y-6">
              {/* Configurações de Aparência */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="theme" value="Tema" />
                  <Select
                    id="theme"
                    value={settings.appearance.theme}
                    onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="system">Sistema</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language" value="Idioma" />
                  <Select
                    id="language"
                    value={settings.appearance.language}
                    onChange={(e) => handleInputChange('appearance', 'language', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fontSize" value="Tamanho da Fonte" />
                  <Select
                    id="fontSize"
                    value={settings.appearance.fontSize}
                    onChange={(e) => handleInputChange('appearance', 'fontSize', e.target.value)}
                  >
                    <option value="small">Pequena</option>
                    <option value="medium">Média</option>
                    <option value="large">Grande</option>
                    <option value="extra-large">Extra Grande</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="colorScheme" value="Esquema de Cores" />
                  <Select
                    id="colorScheme"
                    value={settings.appearance.colorScheme}
                    onChange={(e) => handleInputChange('appearance', 'colorScheme', e.target.value)}
                  >
                    <option value="blue">Azul</option>
                    <option value="green">Verde</option>
                    <option value="purple">Roxo</option>
                    <option value="red">Vermelho</option>
                    <option value="orange">Laranja</option>
                  </Select>
                </div>
              </div>

              {/* Toggles de Aparência */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Animações</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Habilitar animações na interface</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.appearance.animations}
                    onChange={() => handleToggle('appearance', 'animations')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Modo Compacto</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Interface mais compacta com menos espaçamento</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.appearance.compactMode}
                    onChange={() => handleToggle('appearance', 'compactMode')}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" onClick={() => handleSave('aparência')}>
                  <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                  Salvar Aparência
                </Button>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'privacidade'} 
            title="Privacidade" 
            icon={() => <Icon icon="solar:shield-check-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('privacidade')}
          >
            <div className="mt-6 space-y-6">
              {/* Configurações de Privacidade */}
              <div>
                <Label htmlFor="profileVisibility" value="Visibilidade do Perfil" />
                <Select
                  id="profileVisibility"
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                >
                  <option value="public">Público</option>
                  <option value="friends">Apenas Amigos</option>
                  <option value="private">Privado</option>
                </Select>
              </div>

              {/* Toggles de Privacidade */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Compartilhar Progresso</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Permitir que outros vejam seu progresso</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.privacy.shareProgress}
                    onChange={() => handleToggle('privacy', 'shareProgress')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Coleta de Dados</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Permitir coleta de dados para melhorar o serviço</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.privacy.dataCollection}
                    onChange={() => handleToggle('privacy', 'dataCollection')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Permitir análise de uso para melhorias</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.privacy.analytics}
                    onChange={() => handleToggle('privacy', 'analytics')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Integrações de Terceiros</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Permitir integrações com serviços externos</p>
                  </div>
                  <ToggleSwitch
                    checked={settings.privacy.thirdPartyIntegrations}
                    onChange={() => handleToggle('privacy', 'thirdPartyIntegrations')}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" onClick={() => handleSave('privacidade')}>
                  <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                  Salvar Privacidade
                </Button>
              </div>
            </div>
          </Tabs.Item>

          <Tabs.Item 
            active={activeTab === 'integracoes'} 
            title="Integrações" 
            icon={() => <Icon icon="solar:link-bold-duotone" className="w-4 h-4" />}
            onClick={() => setActiveTab('integracoes')}
          >
            <div className="mt-6 space-y-6">
              {/* Integrações Disponíveis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="solar:calendar-bold-duotone" className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Google Calendar</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Sincronize seus horários de estudo</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge color={settings.integrations.googleCalendar ? 'success' : 'gray'}>
                      {settings.integrations.googleCalendar ? 'Conectado' : 'Desconectado'}
                    </Badge>
                    <Button 
                      color={settings.integrations.googleCalendar ? 'failure' : 'primary'}
                      size="sm"
                      onClick={() => handleToggle('integrations', 'googleCalendar')}
                    >
                      {settings.integrations.googleCalendar ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="solar:document-bold-duotone" className="w-8 h-8 text-gray-800" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notion</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Exporte suas anotações e resumos</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge color={settings.integrations.notion ? 'success' : 'gray'}>
                      {settings.integrations.notion ? 'Conectado' : 'Desconectado'}
                    </Badge>
                    <Button 
                      color={settings.integrations.notion ? 'failure' : 'primary'}
                      size="sm"
                      onClick={() => handleToggle('integrations', 'notion')}
                    >
                      {settings.integrations.notion ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="solar:chat-round-bold-duotone" className="w-8 h-8 text-indigo-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Discord</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Compartilhe progresso com amigos</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge color={settings.integrations.discord ? 'success' : 'gray'}>
                      {settings.integrations.discord ? 'Conectado' : 'Desconectado'}
                    </Badge>
                    <Button 
                      color={settings.integrations.discord ? 'failure' : 'primary'}
                      size="sm"
                      onClick={() => handleToggle('integrations', 'discord')}
                    >
                      {settings.integrations.discord ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>

                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon icon="solar:music-note-bold-duotone" className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Spotify</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Música de foco durante os estudos</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge color={settings.integrations.spotify ? 'success' : 'gray'}>
                      {settings.integrations.spotify ? 'Conectado' : 'Desconectado'}
                    </Badge>
                    <Button 
                      color={settings.integrations.spotify ? 'failure' : 'primary'}
                      size="sm"
                      onClick={() => handleToggle('integrations', 'spotify')}
                    >
                      {settings.integrations.spotify ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button color="primary" onClick={() => handleSave('integrações')}>
                  <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                  Salvar Integrações
                </Button>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>

      {/* Seção de Ações Avançadas */}
      <TitleCard title="Ações Avançadas">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button color="blue" onClick={() => openModal('export')}>
            <Icon icon="solar:export-bold-duotone" className="w-5 h-5 mr-2" />
            Exportar Dados
          </Button>
          <Button color="green" onClick={() => openModal('import')}>
            <Icon icon="solar:import-bold-duotone" className="w-5 h-5 mr-2" />
            Importar Dados
          </Button>
          <Button color="yellow" onClick={() => openModal('reset')}>
            <Icon icon="solar:restart-bold-duotone" className="w-5 h-5 mr-2" />
            Resetar Configurações
          </Button>
          <Button color="red" onClick={() => openModal('delete')}>
            <Icon icon="solar:trash-bin-trash-bold-duotone" className="w-5 h-5 mr-2" />
            Excluir Conta
          </Button>
        </div>
      </TitleCard>

      {/* Modal Genérico */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          {modalType === 'backup' && 'Backup de Dados'}
          {modalType === 'export' && 'Exportar Dados'}
          {modalType === 'import' && 'Importar Dados'}
          {modalType === 'reset' && 'Resetar Configurações'}
          {modalType === 'delete' && 'Excluir Conta'}
        </Modal.Header>
        <Modal.Body>
          {modalType === 'backup' && (
            <div className="space-y-4">
              <p>Faça backup de todos os seus dados de estudo, incluindo progresso, estatísticas e configurações.</p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  O backup será salvo em formato JSON e pode ser usado para restaurar seus dados em outro dispositivo.
                </p>
              </div>
            </div>
          )}
          {modalType === 'export' && (
            <div className="space-y-4">
              <p>Exporte seus dados em diferentes formatos para análise externa ou backup.</p>
              <div className="space-y-2">
                <Label htmlFor="exportFormat" value="Formato de Exportação" />
                <Select id="exportFormat">
                  <option value="json">JSON (Completo)</option>
                  <option value="csv">CSV (Estatísticas)</option>
                  <option value="pdf">PDF (Relatório)</option>
                </Select>
              </div>
            </div>
          )}
          {modalType === 'import' && (
            <div className="space-y-4">
              <p>Importe dados de backup ou de outros sistemas de estudo.</p>
              <div className="space-y-2">
                <Label htmlFor="importFile" value="Arquivo de Importação" />
                <TextInput id="importFile" type="file" accept=".json,.csv" />
              </div>
            </div>
          )}
          {modalType === 'reset' && (
            <div className="space-y-4">
              <p className="text-red-600 dark:text-red-400">
                Esta ação irá resetar todas as configurações para os valores padrão. Seus dados de progresso não serão afetados.
              </p>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Esta ação não pode ser desfeita. Certifique-se de fazer backup das configurações importantes.
                </p>
              </div>
            </div>
          )}
          {modalType === 'delete' && (
            <div className="space-y-4">
              <p className="text-red-600 dark:text-red-400 font-semibold">
                ATENÇÃO: Esta ação irá excluir permanentemente sua conta e todos os dados associados.
              </p>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Esta ação é irreversível. Todos os seus dados de progresso, estatísticas e configurações serão perdidos permanentemente.
                </p>
              </div>
              <div>
                <Label htmlFor="confirmDelete" value="Digite 'EXCLUIR' para confirmar" />
                <TextInput id="confirmDelete" placeholder="EXCLUIR" />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            color={modalType === 'delete' || modalType === 'reset' ? 'failure' : 'primary'}
            onClick={() => {
              setShowModal(false);
              handleSave(modalType);
            }}
          >
            {modalType === 'backup' && 'Fazer Backup'}
            {modalType === 'export' && 'Exportar'}
            {modalType === 'import' && 'Importar'}
            {modalType === 'reset' && 'Resetar'}
            {modalType === 'delete' && 'Excluir Conta'}
          </Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Configuracoes;