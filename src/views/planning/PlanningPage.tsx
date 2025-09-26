import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Modal, TextInput, Textarea, Select } from 'flowbite-react';
import { 
  HiPlus, HiCalendar, HiClock, HiCheckCircle, 
  HiExclamationCircle, HiChevronLeft, HiChevronRight, HiRefresh 
} from 'react-icons/hi';
import { Link } from 'react-router';
import { mockEvents } from '../../data/mockData';
import { Event } from '../../types/planning';

const PlanningPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  // Formulário de evento
  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'study' as Event['type'],
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    priority: 'medium' as Event['priority'],
    location: ''
  });

  // Navegação do calendário
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  // Eventos do dia selecionado
  const selectedDateEvents = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return events.filter(event => event.date.startsWith(dateStr));
  }, [events, selectedDate]);

  // Gerar dias do calendário
  const calendarDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayEvents = events.filter(event => 
        event.date.startsWith(current.toISOString().split('T')[0])
      );
      
      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString(),
        isSelected: current.toDateString() === selectedDate.toDateString(),
        events: dayEvents
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [selectedDate, events]);

  // Estatísticas
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = events.filter(event => {
      const eventDate = new Date(event.date);
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
    
    return {
      todayEvents: events.filter(e => e.date.startsWith(today)).length,
      weekEvents: thisWeek.length,
      completedThisWeek: thisWeek.filter(e => e.status === 'completed').length,
      upcomingEvents: events.filter(e => e.date > today && e.status === 'scheduled').length
    };
  }, [events]);

  const handleOpenEventModal = (mode: 'create' | 'edit' | 'view', event?: Event, date?: Date) => {
    setModalMode(mode);
    if (event) {
      setSelectedEvent(event);
      setEventForm({
        title: event.title,
        type: event.type,
        subject: event.subject,
        date: event.date.split('T')[0],
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description,
        priority: event.priority,
        location: event.location
      });
    } else {
      setSelectedEvent(null);
      const dateStr = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      setEventForm({
        title: '',
        type: 'study',
        subject: '',
        date: dateStr,
        startTime: '09:00',
        endTime: '10:00',
        description: '',
        priority: 'medium',
        location: ''
      });
    }
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (modalMode === 'create') {
      const newEvent: Event = {
        id: `event${Date.now()}`,
        ...eventForm,
        status: 'scheduled',
        color: getEventColor(eventForm.type),
        participants: [],
        resources: [],
        reminders: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEvents([...events, newEvent]);
    } else if (modalMode === 'edit' && selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, ...eventForm, updatedAt: new Date().toISOString() }
          : e
      ));
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const getEventColor = (type: Event['type']) => {
    const colors = {
      study: 'blue',
      class: 'green',
      exam: 'red',
      review: 'yellow',
      assignment: 'purple',
      meeting: 'indigo',
      workshop: 'pink',
      seminar: 'gray'
    };
    return colors[type] || 'blue';
  };

  const getPriorityColor = (priority: Event['priority']) => {
    switch (priority) {
      case 'urgent': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'scheduled': return 'blue';
      case 'in_progress': return 'yellow';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      case 'postponed': return 'gray';
      default: return 'gray';
    }
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Planejamento</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize sua rotina de estudos e acompanhe seus compromissos
          </p>
        </div>
        <Button 
          onClick={() => handleOpenEventModal('create')}
          className="bg-primary hover:bg-primaryemphasis"
        >
          <HiPlus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
        <Link to="/planning/agile">
          <Button 
            color="blue"
            className="ml-2"
          >
            <HiRefresh className="mr-2 h-4 w-4" />
            Metodologia Ágil
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <HiCalendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hoje</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayEvents}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <HiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Concluídos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedThisWeek}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <HiClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Esta Semana</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.weekEvents}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <HiExclamationCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Próximos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcomingEvents}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <div className="lg:col-span-2">
          <Card>
            {/* Header do Calendário */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <HiChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h2>
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <HiChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  color={viewMode === 'month' ? 'blue' : 'gray'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                >
                  Mês
                </Button>
                <Button
                  color={viewMode === 'week' ? 'blue' : 'gray'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                >
                  Semana
                </Button>
                <Button
                  color={viewMode === 'day' ? 'blue' : 'gray'}
                  size="sm"
                  onClick={() => setViewMode('day')}
                >
                  Dia
                </Button>
              </div>
            </div>

            {/* Grid do Calendário */}
            <div className="grid grid-cols-7 gap-1">
              {/* Cabeçalho dos dias */}
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}

              {/* Dias do calendário */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    min-h-[80px] p-1 border border-gray-200 dark:border-gray-700 cursor-pointer
                    hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                    ${!day.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800 text-gray-400' : ''}
                    ${day.isToday ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700' : ''}
                    ${day.isSelected ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600' : ''}
                  `}
                  onClick={() => setSelectedDate(day.date)}
                  onDoubleClick={() => handleOpenEventModal('create', undefined, day.date)}
                >
                  <div className="text-sm font-medium mb-1">
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {day.events.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`
                          text-xs p-1 rounded truncate cursor-pointer
                          bg-${getEventColor(event.type)}-100 text-${getEventColor(event.type)}-800
                          dark:bg-${getEventColor(event.type)}-900 dark:text-${getEventColor(event.type)}-200
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEventModal('view', event);
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{day.events.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Eventos do Dia */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Eventos de {selectedDate.toLocaleDateString('pt-BR')}
            </h3>
            <div className="space-y-3">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleOpenEventModal('view', event)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <Badge color={getStatusColor(event.status)} size="sm">
                        {event.status === 'scheduled' ? 'Agendado' :
                         event.status === 'completed' ? 'Concluído' :
                         event.status === 'in_progress' ? 'Em andamento' :
                         event.status === 'cancelled' ? 'Cancelado' : 'Adiado'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>{event.startTime} - {event.endTime}</div>
                      <div>{event.subject}</div>
                      {event.location && <div>📍 {event.location}</div>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <HiCalendar className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nenhum evento neste dia
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleOpenEventModal('create', undefined, selectedDate)}
                    className="mt-2 bg-primary hover:bg-primaryemphasis"
                  >
                    Adicionar Evento
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Próximos Eventos
            </h3>
            <div className="space-y-2">
              {events
                .filter(e => e.date > new Date().toISOString() && e.status === 'scheduled')
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString('pt-BR')} às {event.startTime}
                      </div>
                    </div>
                    <Badge color={getPriorityColor(event.priority)} size="sm">
                      {event.priority === 'urgent' ? 'Urgente' :
                       event.priority === 'high' ? 'Alta' :
                       event.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal de Evento */}
      <Modal show={showEventModal} onClose={() => setShowEventModal(false)} size="lg">
        <Modal.Header>
          {modalMode === 'create' ? 'Novo Evento' : 
           modalMode === 'edit' ? 'Editar Evento' : 'Detalhes do Evento'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <TextInput
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Ex: Aula de Matemática"
                disabled={modalMode === 'view'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo
                </label>
                <Select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as any })}
                  disabled={modalMode === 'view'}
                >
                  <option value="study">Estudo</option>
                  <option value="class">Aula</option>
                  <option value="exam">Prova</option>
                  <option value="review">Revisão</option>
                  <option value="assignment">Tarefa</option>
                  <option value="meeting">Reunião</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminário</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Disciplina
                </label>
                <TextInput
                  value={eventForm.subject}
                  onChange={(e) => setEventForm({ ...eventForm, subject: e.target.value })}
                  placeholder="Ex: Matemática"
                  disabled={modalMode === 'view'}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data
                </label>
                <TextInput
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Início
                </label>
                <TextInput
                  type="time"
                  value={eventForm.startTime}
                  onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fim
                </label>
                <TextInput
                  type="time"
                  value={eventForm.endTime}
                  onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                  disabled={modalMode === 'view'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição
              </label>
              <Textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Descreva o evento..."
                rows={3}
                disabled={modalMode === 'view'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prioridade
                </label>
                <Select
                  value={eventForm.priority}
                  onChange={(e) => setEventForm({ ...eventForm, priority: e.target.value as any })}
                  disabled={modalMode === 'view'}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Local
                </label>
                <TextInput
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Ex: Sala 101"
                  disabled={modalMode === 'view'}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {modalMode === 'view' ? (
            <div className="flex space-x-2">
              <Button onClick={() => setModalMode('edit')} className="bg-primary hover:bg-primaryemphasis">
                Editar
              </Button>
              <Button 
                color="red" 
                onClick={() => {
                  if (selectedEvent) {
                    handleDeleteEvent(selectedEvent.id);
                    setShowEventModal(false);
                  }
                }}
              >
                Excluir
              </Button>
              <Button color="gray" onClick={() => setShowEventModal(false)}>
                Fechar
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSaveEvent} className="bg-primary hover:bg-primaryemphasis">
                {modalMode === 'create' ? 'Criar' : 'Salvar'}
              </Button>
              <Button color="gray" onClick={() => setShowEventModal(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlanningPage;