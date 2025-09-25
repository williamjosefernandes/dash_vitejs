import React, { useState } from 'react';
import CardBox from '../../../components/shared/CardBox';
import TitleCard from '../../../components/shared/TitleBorderCard';
import { Icon } from '@iconify/react';
import { Button, Badge, Modal, TextInput, Label, Select, Textarea, Datepicker } from 'flowbite-react';

const Planejamento = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // week, month, day
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Dados simulados de eventos/atividades
  const events = [
    {
      id: 1,
      title: 'Matemática - Álgebra Linear',
      type: 'study',
      subject: 'Matemática',
      date: '2024-09-26',
      startTime: '14:00',
      endTime: '16:00',
      description: 'Revisão de matrizes e determinantes',
      priority: 'high',
      status: 'scheduled',
      location: 'Biblioteca',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Física - Mecânica',
      type: 'class',
      subject: 'Física',
      date: '2024-09-26',
      startTime: '10:00',
      endTime: '12:00',
      description: 'Aula sobre leis de Newton',
      priority: 'medium',
      status: 'scheduled',
      location: 'Sala 201',
      color: 'green'
    },
    {
      id: 3,
      title: 'Prova de Química',
      type: 'exam',
      subject: 'Química',
      date: '2024-09-27',
      startTime: '08:00',
      endTime: '10:00',
      description: 'Prova sobre química orgânica',
      priority: 'high',
      status: 'scheduled',
      location: 'Auditório',
      color: 'red'
    },
    {
      id: 4,
      title: 'Revisão de Biologia',
      type: 'review',
      subject: 'Biologia',
      date: '2024-09-27',
      startTime: '15:00',
      endTime: '17:00',
      description: 'Revisão sobre genética',
      priority: 'medium',
      status: 'completed',
      location: 'Casa',
      color: 'emerald'
    },
    {
      id: 5,
      title: 'Trabalho de História',
      type: 'assignment',
      subject: 'História',
      date: '2024-09-28',
      startTime: '19:00',
      endTime: '21:00',
      description: 'Finalizar trabalho sobre Segunda Guerra',
      priority: 'high',
      status: 'in_progress',
      location: 'Casa',
      color: 'amber'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return 'solar:book-2-bold-duotone';
      case 'class': return 'solar:presentation-graph-bold-duotone';
      case 'exam': return 'solar:document-text-bold-duotone';
      case 'review': return 'solar:refresh-bold-duotone';
      case 'assignment': return 'solar:clipboard-text-bold-duotone';
      default: return 'solar:calendar-bold-duotone';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'study': return 'Estudo';
      case 'class': return 'Aula';
      case 'exam': return 'Prova';
      case 'review': return 'Revisão';
      case 'assignment': return 'Trabalho';
      default: return 'Evento';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'failure';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'info';
      case 'in_progress': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'failure';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendado';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return 'Indefinido';
    }
  };

  // Filtrar eventos por data selecionada
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  // Gerar dias da semana
  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(selectedDate);
  const todayEvents = getEventsForDate(selectedDate);

  const stats = {
    totalEvents: events.length,
    todayEvents: getEventsForDate(new Date()).length,
    completedEvents: events.filter(e => e.status === 'completed').length,
    pendingEvents: events.filter(e => e.status === 'scheduled' || e.status === 'in_progress').length
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsEditing(false);
    setShowEventModal(true);
  };

  const handleNewEvent = () => {
    setSelectedEvent(null);
    setIsEditing(true);
    setShowEventModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardBox>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Planejamento 📅
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Organize seu cronograma de estudos de forma inteligente
            </p>
          </div>
          <div className="flex gap-2">
            <Button color="secondary" onClick={() => setSelectedDate(new Date())}>
              <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 mr-2" />
              Hoje
            </Button>
            <Button color="primary" onClick={handleNewEvent}>
              <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>
      </CardBox>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:calendar-bold-duotone" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalEvents}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total de Eventos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.todayEvents}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Eventos Hoje</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:check-circle-bold-duotone" className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.completedEvents}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Concluídos</p>
        </CardBox>

        <CardBox className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-3">
            <Icon icon="solar:hourglass-bold-duotone" className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stats.pendingEvents}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Pendentes</p>
        </CardBox>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário Semanal */}
        <div className="lg:col-span-2">
          <TitleCard title="Cronograma Semanal">
            <div className="space-y-4">
              {/* Navegação da semana */}
              <div className="flex items-center justify-between">
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 7);
                    setSelectedDate(newDate);
                  }}
                >
                  <Icon icon="solar:arrow-left-bold-duotone" className="w-4 h-4" />
                </Button>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {weekDays[0].toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </h3>
                
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 7);
                    setSelectedDate(newDate);
                  }}
                >
                  <Icon icon="solar:arrow-right-bold-duotone" className="w-4 h-4" />
                </Button>
              </div>

              {/* Grade da semana */}
              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 p-2">
                    {day}
                  </div>
                ))}
                
                {weekDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = day.toDateString() === selectedDate.toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : isToday
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium mb-2 ${
                        isToday ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {day.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded bg-${event.color}-100 dark:bg-${event.color}-900/30 text-${event.color}-700 dark:text-${event.color}-300 cursor-pointer hover:opacity-80`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event);
                            }}
                          >
                            {event.startTime} - {event.title.substring(0, 15)}...
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{dayEvents.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TitleCard>
        </div>

        {/* Eventos do Dia */}
        <div>
          <TitleCard title={`Eventos - ${selectedDate.toLocaleDateString('pt-BR')}`}>
            <div className="space-y-3">
              {todayEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Icon icon="solar:calendar-bold-duotone" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum evento agendado para este dia</p>
                </div>
              ) : (
                todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon icon={getEventTypeIcon(event.type)} className={`w-5 h-5 text-${event.color}-600 dark:text-${event.color}-400`} />
                        <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                      </div>
                      <Badge color={getPriorityColor(event.priority)} size="sm">
                        {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:bookmark-bold-duotone" className="w-4 h-4" />
                        <span>{event.subject}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <Badge color={getStatusColor(event.status)} size="sm">
                        {getStatusText(event.status)}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getEventTypeText(event.type)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TitleCard>
        </div>
      </div>

      {/* Modal de Evento */}
      <Modal show={showEventModal} onClose={() => setShowEventModal(false)} size="xl">
        <Modal.Header>
          {isEditing ? 'Novo Evento' : selectedEvent?.title}
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && !isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label value="Informações Gerais" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div><strong>Tipo:</strong> {getEventTypeText(selectedEvent.type)}</div>
                    <div><strong>Disciplina:</strong> {selectedEvent.subject}</div>
                    <div><strong>Data:</strong> {new Date(selectedEvent.date).toLocaleDateString('pt-BR')}</div>
                    <div><strong>Horário:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</div>
                    <div><strong>Local:</strong> {selectedEvent.location}</div>
                  </div>
                </div>

                <div>
                  <Label value="Status e Prioridade" className="text-lg font-semibold mb-3 block" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <Badge color={getStatusColor(selectedEvent.status)}>
                        {getStatusText(selectedEvent.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Prioridade:</strong>
                      <Badge color={getPriorityColor(selectedEvent.priority)}>
                        {selectedEvent.priority === 'high' ? 'Alta' : selectedEvent.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <Label value="Descrição" className="text-lg font-semibold mb-3 block" />
                  <p className="text-gray-600 dark:text-gray-300">{selectedEvent.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" value="Título" />
                  <TextInput id="title" placeholder="Nome do evento" />
                </div>
                <div>
                  <Label htmlFor="type" value="Tipo" />
                  <Select id="type">
                    <option value="study">Estudo</option>
                    <option value="class">Aula</option>
                    <option value="exam">Prova</option>
                    <option value="review">Revisão</option>
                    <option value="assignment">Trabalho</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject" value="Disciplina" />
                  <Select id="subject">
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biologia">Biologia</option>
                    <option value="História">História</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" value="Prioridade" />
                  <Select id="priority">
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" value="Data" />
                  <TextInput id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="startTime" value="Início" />
                  <TextInput id="startTime" type="time" />
                </div>
                <div>
                  <Label htmlFor="endTime" value="Fim" />
                  <TextInput id="endTime" type="time" />
                </div>
              </div>

              <div>
                <Label htmlFor="location" value="Local" />
                <TextInput id="location" placeholder="Local do evento" />
              </div>

              <div>
                <Label htmlFor="description" value="Descrição" />
                <Textarea id="description" placeholder="Descrição do evento" rows={3} />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isEditing && selectedEvent ? (
            <>
              <Button color="primary" onClick={() => setIsEditing(true)}>
                <Icon icon="solar:pen-bold-duotone" className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button color="success" disabled={selectedEvent.status === 'completed'}>
                <Icon icon="solar:check-circle-bold-duotone" className="w-4 h-4 mr-2" />
                Marcar como Concluído
              </Button>
              <Button color="gray" onClick={() => setShowEventModal(false)}>
                Fechar
              </Button>
            </>
          ) : (
            <>
              <Button color="primary">
                <Icon icon="solar:diskette-bold-duotone" className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button color="gray" onClick={() => setShowEventModal(false)}>
                Cancelar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Planejamento;