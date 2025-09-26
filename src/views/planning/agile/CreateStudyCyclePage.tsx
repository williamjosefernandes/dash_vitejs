import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  TextInput, 
  Textarea, 
  Modal, 
  Badge,
  Progress,
  Select
} from 'flowbite-react';
import { 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiEye, 
  HiCalendar, 
  HiClock, 
  HiBookOpen,
  HiAcademicCap,
  HiChartBar,
  HiSave,
  HiArrowLeft,
  HiDuplicate
} from 'react-icons/hi';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { BacklogItem, StudyCycle } from '../../../types/planning';
import { useNavigate } from 'react-router';

interface CreateStudyCyclePageProps {}

const CreateStudyCyclePage: React.FC<CreateStudyCyclePageProps> = () => {
  const navigate = useNavigate();
  
  // Estados principais
  const [cycleName, setCycleName] = useState('');
  const [cycleDescription, setCycleDescription] = useState('');
  const [cycleDuration, setCycleDuration] = useState(14); // dias
  const [cycleStartDate, setCycleStartDate] = useState('');
  
  // Estados do backlog
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<BacklogItem[]>([]);
  
  // Estados dos modais
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BacklogItem | null>(null);
  
  // Estados do formulário de item
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemSubject, setItemSubject] = useState('');
  const [itemPriority, setItemPriority] = useState<'baixa' | 'media' | 'alta'>('media');
  const [itemEstimatedHours, setItemEstimatedHours] = useState(2);
  const [itemType, setItemType] = useState<'teoria' | 'exercicio' | 'revisao' | 'simulado'>('teoria');
  
  // Estados de controle
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para disciplinas
  const subjects = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Física',
    'Química',
    'Biologia',
    'Inglês'
  ];

  // Inicializar dados mock
  useEffect(() => {
    const mockBacklogItems: BacklogItem[] = [
      {
        id: '1',
        title: 'Funções Quadráticas',
        description: 'Estudo completo de funções do segundo grau',
        subject: 'Matemática',
        priority: 'alta',
        estimatedHours: 4,
        type: 'teoria',
        status: 'pendente',
        createdAt: new Date(),
        tags: ['álgebra', 'gráficos']
      },
      {
        id: '2',
        title: 'Exercícios de Derivadas',
        description: 'Lista de exercícios sobre derivadas',
        subject: 'Matemática',
        priority: 'media',
        estimatedHours: 3,
        type: 'exercicio',
        status: 'pendente',
        createdAt: new Date(),
        tags: ['cálculo', 'prática']
      },
      {
        id: '3',
        title: 'Literatura Brasileira - Romantismo',
        description: 'Características do movimento romântico no Brasil',
        subject: 'Português',
        priority: 'alta',
        estimatedHours: 5,
        type: 'teoria',
        status: 'pendente',
        createdAt: new Date(),
        tags: ['literatura', 'história']
      },
      {
        id: '4',
        title: 'Revolução Industrial',
        description: 'Causas e consequências da Revolução Industrial',
        subject: 'História',
        priority: 'media',
        estimatedHours: 3,
        type: 'teoria',
        status: 'pendente',
        createdAt: new Date(),
        tags: ['século XVIII', 'economia']
      },
      {
        id: '5',
        title: 'Simulado de Física',
        description: 'Simulado sobre mecânica e termodinâmica',
        subject: 'Física',
        priority: 'alta',
        estimatedHours: 2,
        type: 'simulado',
        status: 'pendente',
        createdAt: new Date(),
        tags: ['avaliação', 'mecânica']
      }
    ];
    
    setBacklogItems(mockBacklogItems);
  }, []);

  // Funções de manipulação do backlog
  const handleAddItem = () => {
    if (!itemTitle.trim()) return;
    
    const newItem: BacklogItem = {
      id: Date.now().toString(),
      title: itemTitle,
      description: itemDescription,
      subject: itemSubject,
      priority: itemPriority,
      estimatedHours: itemEstimatedHours,
      type: itemType,
      status: 'pendente',
      createdAt: new Date(),
      tags: []
    };
    
    setBacklogItems([...backlogItems, newItem]);
    resetItemForm();
    setIsAddItemModalOpen(false);
  };

  const handleEditItem = () => {
    if (!editingItem || !itemTitle.trim()) return;
    
    const updatedItems = backlogItems.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            title: itemTitle,
            description: itemDescription,
            subject: itemSubject,
            priority: itemPriority,
            estimatedHours: itemEstimatedHours,
            type: itemType
          }
        : item
    );
    
    setBacklogItems(updatedItems);
    
    // Atualizar também nos itens selecionados se necessário
    const updatedSelectedItems = selectedItems.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            title: itemTitle,
            description: itemDescription,
            subject: itemSubject,
            priority: itemPriority,
            estimatedHours: itemEstimatedHours,
            type: itemType
          }
        : item
    );
    
    setSelectedItems(updatedSelectedItems);
    resetItemForm();
    setIsEditItemModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    setBacklogItems(backlogItems.filter(item => item.id !== itemId));
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const resetItemForm = () => {
    setItemTitle('');
    setItemDescription('');
    setItemSubject('');
    setItemPriority('media');
    setItemEstimatedHours(2);
    setItemType('teoria');
  };

  const openEditModal = (item: BacklogItem) => {
    setEditingItem(item);
    setItemTitle(item.title);
    setItemDescription(item.description);
    setItemSubject(item.subject);
    setItemPriority(item.priority);
    setItemEstimatedHours(item.estimatedHours);
    setItemType(item.type);
    setIsEditItemModalOpen(true);
  };

  // Funções de drag and drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'backlog' && destination.droppableId === 'selected') {
      // Mover do backlog para selecionados
      const item = backlogItems[source.index];
      if (!selectedItems.find(selected => selected.id === item.id)) {
        const newSelectedItems = Array.from(selectedItems);
        newSelectedItems.splice(destination.index, 0, item);
        setSelectedItems(newSelectedItems);
      }
    } else if (source.droppableId === 'selected' && destination.droppableId === 'backlog') {
      // Remover dos selecionados
      const newSelectedItems = Array.from(selectedItems);
      newSelectedItems.splice(source.index, 1);
      setSelectedItems(newSelectedItems);
    } else if (source.droppableId === 'selected' && destination.droppableId === 'selected') {
      // Reordenar itens selecionados
      const newSelectedItems = Array.from(selectedItems);
      const [reorderedItem] = newSelectedItems.splice(source.index, 1);
      newSelectedItems.splice(destination.index, 0, reorderedItem);
      setSelectedItems(newSelectedItems);
    }
  };

  // Função para criar o ciclo
  const handleCreateCycle = async () => {
    if (!cycleName.trim() || selectedItems.length === 0) return;
    
    setIsLoading(true);
    
    try {
      const newCycle: StudyCycle = {
        id: Date.now().toString(),
        name: cycleName,
        description: cycleDescription,
        startDate: new Date(cycleStartDate).toISOString(),
        endDate: new Date(new Date(cycleStartDate).getTime() + cycleDuration * 24 * 60 * 60 * 1000).toISOString(),
        duration: cycleDuration,
        status: 'planejamento',
        goal: cycleDescription,
        items: selectedItems.map((item, index) => ({
          id: `cycle-${item.id}`,
          backlogItemId: item.id,
          cycleId: Date.now().toString(),
          status: 'pendente',
          position: index
        })),
        totalEstimatedHours: selectedItems.reduce((sum, item) => sum + item.estimatedHours, 0),
        totalCompletedHours: 0,
        completionPercentage: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Aqui você salvaria o ciclo no backend
      console.log('Novo ciclo criado:', newCycle);
      
      // Redirecionar para a página de planejamento
      navigate('/planning/agile');
    } catch (error) {
      console.error('Erro ao criar ciclo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular estatísticas do ciclo
  const cycleStats = {
    totalItems: selectedItems.length,
    totalHours: selectedItems.reduce((sum, item) => sum + item.estimatedHours, 0),
    subjectDistribution: selectedItems.reduce((acc, item) => {
      acc[item.subject] = (acc[item.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    priorityDistribution: selectedItems.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baixa': return 'success';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'teoria': return <HiBookOpen className="w-4 h-4" />;
      case 'exercicio': return <HiPencil className="w-4 h-4" />;
      case 'revisao': return <HiDuplicate className="w-4 h-4" />;
      case 'simulado': return <HiChartBar className="w-4 h-4" />;
      default: return <HiBookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                color="gray"
                onClick={() => navigate('/planning/agile')}
              >
                <HiArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <HiAcademicCap className="w-8 h-8 text-blue-600" />
                  Criar Novo Ciclo de Estudos
                </h1>
                <p className="text-gray-600 mt-1">
                  Organize seus conteúdos e crie um ciclo de estudos personalizado
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                color="gray"
                onClick={() => setIsPreviewModalOpen(true)}
                disabled={selectedItems.length === 0}
              >
                <HiEye className="mr-2 h-4 w-4" />
                Visualizar Ciclo
              </Button>
              <Button
                  color="primary"
                  onClick={handleCreateCycle}
                  disabled={!cycleName.trim() || selectedItems.length === 0}
                >
                  <HiSave className="mr-2 h-4 w-4" />
                  {isLoading ? 'Criando...' : 'Criar Ciclo'}
                </Button>
            </div>
          </div>
          
          {/* Configurações básicas do ciclo */}
          <Card className="mb-6">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TextInput
                  placeholder="Ex: Ciclo de Matemática - Janeiro"
                  value={cycleName}
                  onChange={(e) => setCycleName(e.target.value)}
                  icon={HiAcademicCap}
                />
                <TextInput
                  type="date"
                  value={cycleStartDate}
                  onChange={(e) => setCycleStartDate(e.target.value)}
                  icon={HiCalendar}
                />
                <TextInput
                  type="number"
                  value={cycleDuration.toString()}
                  onChange={(e) => setCycleDuration(parseInt(e.target.value) || 14)}
                  icon={HiClock}
                />
                <div className="flex items-end">
                  <Badge
                    color="blue"
                    size="lg"
                    className="h-10 flex items-center"
                  >
                    {selectedItems.length} itens selecionados
                  </Badge>
                </div>
              </div>
              
              <Textarea
                placeholder="Descreva os objetivos e foco deste ciclo de estudos..."
                value={cycleDescription}
                onChange={(e) => setCycleDescription(e.target.value)}
                className="mt-4"
                rows={2}
              />
            </div>
          </Card>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Backlog de Conteúdos */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <HiBookOpen className="w-5 h-5" />
                    Backlog de Conteúdos
                  </h2>
                  <p className="text-sm text-gray-600">
                    Arraste os itens para o painel do ciclo
                  </p>
                </div>
                <Button
                  color="blue"
                  onClick={() => setIsAddItemModalOpen(true)}
                >
                  <HiPlus className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
              </div>
              <div className="p-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="backlog">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver 
                            ? 'border-blue-400 bg-blue-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        {backlogItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-3 transition-transform ${
                                  snapshot.isDragging ? 'rotate-2 scale-105' : ''
                                }`}
                              >
                                <Card 
                                  className={`cursor-grab active:cursor-grabbing ${
                                    selectedItems.find(selected => selected.id === item.id)
                                      ? 'opacity-50 border-2 border-green-300'
                                      : 'hover:shadow-md'
                                  }`}
                                >
                                  <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                          {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                          {item.description}
                                        </p>
                                      </div>
                                      <div className="flex gap-1 ml-2">
                                        <Button
                                          size="sm"
                                          color="gray"
                                          onClick={() => openEditModal(item)}
                                        >
                                          <HiPencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          color="red"
                                          onClick={() => handleDeleteItem(item.id)}
                                        >
                                          <HiTrash className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 items-center">
                                      <Badge size="sm">
                                        {item.subject}
                                      </Badge>
                                      <Badge 
                                        size="sm" 
                                        color={getPriorityColor(item.priority)}
                                      >
                                        {item.priority}
                                      </Badge>
                                      <Badge 
                                        size="sm"
                                      >
                                        <span className="flex items-center gap-1">
                                          {getTypeIcon(item.type)}
                                          {item.type}
                                        </span>
                                      </Badge>
                                      <Badge size="sm">
                                        {item.estimatedHours}h
                                      </Badge>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {backlogItems.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            <HiBookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Nenhum item no backlog</p>
                            <p className="text-sm">Adicione conteúdos para começar</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </Card>
          </div>

          {/* Painel do Ciclo */}
          <div>
            <Card className="h-full">
              <div className="p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <HiChartBar className="w-5 h-5" />
                    Estrutura do Ciclo
                  </h2>
                  <p className="text-sm text-gray-600">
                    Itens selecionados para o ciclo
                  </p>
                </div>
              </div>
              <div className="p-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="selected">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[300px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={`selected-${item.id}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-3 transition-transform ${
                                  snapshot.isDragging ? 'rotate-2 scale-105' : ''
                                }`}
                              >
                                <Card className="cursor-grab active:cursor-grabbing hover:shadow-md">
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-medium text-gray-500">
                                        #{index + 1}
                                      </span>
                                      <Button
                                        size="sm"
                                        color="red"
                                        onClick={() => {
                                          const newSelected = selectedItems.filter(selected => selected.id !== item.id);
                                          setSelectedItems(newSelected);
                                        }}
                                      >
                                        <HiTrash className="w-3 h-3" />
                                      </Button>
                                    </div>
                                    <h4 className="font-medium text-sm mb-1">
                                      {item.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                      <Badge size="sm" className="text-xs">
                                        {item.subject}
                                      </Badge>
                                      <Badge size="sm" className="text-xs">
                                        {item.estimatedHours}h
                                      </Badge>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {selectedItems.length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            <HiChartBar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Nenhum item selecionado</p>
                            <p className="text-sm">Arraste itens do backlog</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                
                {/* Estatísticas do ciclo */}
                {selectedItems.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-semibold mb-3">Estatísticas do Ciclo</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total de Horas</span>
                          <span className="font-medium">{cycleStats.totalHours}h</span>
                        </div>
                        <Progress
                            progress={(cycleStats.totalHours / 40) * 100}
                            color="blue"
                            size="sm"
                          />
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Por Disciplina</p>
                        {Object.entries(cycleStats.subjectDistribution).map(([subject, count]) => (
                          <div key={subject} className="flex justify-between text-sm mb-1">
                            <span>{subject}</span>
                            <span>{count as number} itens</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Modal para adicionar item */}
        <Modal 
          show={isAddItemModalOpen} 
          onClose={() => setIsAddItemModalOpen(false)}
          size="2xl"
        >
          <Modal.Header>Adicionar Novo Item ao Backlog</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  placeholder="Ex: Funções Quadráticas"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                />
                <Select
                  value={itemSubject}
                  onChange={(e) => setItemSubject(e.target.value)}
                >
                  <option value="">Selecione uma disciplina</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </Select>
                <Select
                  value={itemPriority}
                  onChange={(e) => setItemPriority(e.target.value as 'baixa' | 'media' | 'alta')}
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </Select>
                <Select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value as 'teoria' | 'exercicio' | 'revisao' | 'simulado')}
                >
                  <option value="teoria">Teoria</option>
                  <option value="exercicio">Exercício</option>
                  <option value="revisao">Revisão</option>
                  <option value="simulado">Simulado</option>
                </Select>
                <TextInput
                  type="number"
                  value={itemEstimatedHours.toString()}
                  onChange={(e) => setItemEstimatedHours(parseInt(e.target.value) || 1)}
                  className="md:col-span-2"
                />
              </div>
              <Textarea
                placeholder="Descreva o conteúdo deste item..."
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                rows={3}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setIsAddItemModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="blue" onClick={handleAddItem}>
              Adicionar Item
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para editar item */}
        <Modal 
          show={isEditItemModalOpen} 
          onClose={() => setIsEditItemModalOpen(false)}
          size="2xl"
        >
          <Modal.Header>Editar Item do Backlog</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  placeholder="Ex: Funções Quadráticas"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                />
                <Select
                  value={itemSubject}
                  onChange={(e) => setItemSubject(e.target.value)}
                >
                  <option value="">Selecione uma disciplina</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </Select>
                <Select
                  value={itemPriority}
                  onChange={(e) => setItemPriority(e.target.value as 'baixa' | 'media' | 'alta')}
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </Select>
                <Select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value as 'teoria' | 'exercicio' | 'revisao' | 'simulado')}
                >
                  <option value="teoria">Teoria</option>
                  <option value="exercicio">Exercício</option>
                  <option value="revisao">Revisão</option>
                  <option value="simulado">Simulado</option>
                </Select>
                <TextInput
                  type="number"
                  value={itemEstimatedHours.toString()}
                  onChange={(e) => setItemEstimatedHours(parseInt(e.target.value) || 1)}
                  className="md:col-span-2"
                />
              </div>
              <Textarea
                placeholder="Descreva o conteúdo deste item..."
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                rows={3}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setIsEditItemModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="blue" onClick={handleEditItem}>
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de preview do ciclo */}
        <Modal 
          show={isPreviewModalOpen} 
          onClose={() => setIsPreviewModalOpen(false)}
          size="4xl"
        >
          <Modal.Header>
            <div>
              <h2 className="text-xl font-bold">Preview do Ciclo de Estudos</h2>
              <p className="text-sm text-gray-600 font-normal">
                {cycleName || 'Novo Ciclo de Estudos'}
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              {/* Informações gerais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <div className="p-6 text-center">
                    <HiBookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{cycleStats.totalItems}</p>
                    <p className="text-sm text-gray-600">Itens</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6 text-center">
                    <HiClock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">{cycleStats.totalHours}h</p>
                    <p className="text-sm text-gray-600">Total de Horas</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6 text-center">
                    <HiCalendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold">{cycleDuration}</p>
                    <p className="text-sm text-gray-600">Dias</p>
                  </div>
                </Card>
              </div>

              {/* Lista de itens */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Itens do Ciclo</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedItems.map((item, index) => (
                    <Card key={item.id}>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-500">
                                #{index + 1}
                              </span>
                              <h4 className="font-semibold">{item.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge size="sm">
                                {item.subject}
                              </Badge>
                              <Badge 
                                size="sm" 
                                color={getPriorityColor(item.priority)}
                              >
                                {item.priority}
                              </Badge>
                              <Badge 
                                size="sm"
                              >
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              {item.estimatedHours}h
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setIsPreviewModalOpen(false)}>
              Fechar
            </Button>
            <Button 
              color="blue" 
              onClick={() => {
                setIsPreviewModalOpen(false);
                handleCreateCycle();
              }}
              disabled={!cycleName.trim() || selectedItems.length === 0}
            >
              {isLoading ? 'Criando...' : 'Criar Ciclo'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CreateStudyCyclePage;