import React, { useState } from 'react';
import CriarCronogramaPage from './CriarCronogramaPage';
import { 
  Step, 
  Course, 
  Discipline, 
  WeekScheduleDay, 
  StudySequenceItem, 
  ScheduleData, 
  DetailedSchedule, 
  SubjectColors,
  ScheduleMode
} from '../../types/cronograma';

const CriarCronogramaPageWrapper: React.FC = () => {
  // Estados para steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps: Step[] = [
    { number: 1, title: 'Cursos' },
    { number: 2, title: 'Conteúdo' },
    { number: 3, title: 'Sequência' },
    { number: 4, title: 'Configuração' },
    { number: 5, title: 'Cronograma' }
  ];

  // Estados para cursos e disciplinas
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Curso de Exemplo', institution: 'Instituição Exemplo', selected: false }
  ]);
  
  const [disciplines, setDisciplines] = useState<Discipline[]>([
    { 
      id: '1', 
      title: 'Disciplina Exemplo', 
      selected: false, 
      expanded: false,
      topics: [
        {
          id: '1',
          title: 'Tópico Exemplo',
          selected: false,
          expanded: false,
          subtopics: [
            { id: '1', title: 'Subtópico Exemplo', type: 'lesson', selected: false }
          ]
        }
      ]
    }
  ]);

  // Estados para busca
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [contentSearchTerm, setContentSearchTerm] = useState<string>('');

  // Estados para configuração
  const [scheduleMode, setScheduleMode] = useState<ScheduleMode>({ type: 'automatic', selectedOption: 'automatic' });
  const [scheduleName, setScheduleName] = useState<string>('Cronograma de Estudo');
  const [dailyWorkload, setDailyWorkload] = useState<string>('4');
  const [copyFromDay, setCopyFromDay] = useState<string>('');
  const [copyToDay, setCopyToDay] = useState<string>('');
  const [viewMode, setViewMode] = useState<string>('month');
  const [currentMonth, setCurrentMonth] = useState<string>('0');
  const [currentYear, setCurrentYear] = useState<string>('2024');

  // Estados para datas
  const [studyStartDate, setStudyStartDate] = useState<string>('');
  const [studyEndDate, setStudyEndDate] = useState<string>('');

  // Estados para cronograma semanal
  const [weekSchedule, setWeekSchedule] = useState<WeekScheduleDay[]>([
    { day: 'Segunda', enabled: true, startTime: '08:00', endTime: '12:00', totalHours: '4h' },
    { day: 'Terça', enabled: true, startTime: '08:00', endTime: '12:00', totalHours: '4h' },
    { day: 'Quarta', enabled: true, startTime: '08:00', endTime: '12:00', totalHours: '4h' },
    { day: 'Quinta', enabled: true, startTime: '08:00', endTime: '12:00', totalHours: '4h' },
    { day: 'Sexta', enabled: true, startTime: '08:00', endTime: '12:00', totalHours: '4h' },
    { day: 'Sábado', enabled: false, startTime: '08:00', endTime: '12:00', totalHours: '4h' },
    { day: 'Domingo', enabled: false, startTime: '08:00', endTime: '12:00', totalHours: '4h' }
  ]);

  // Estados para sequência de estudos
  const [studySequence, setStudySequence] = useState<StudySequenceItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<StudySequenceItem | null>(null);

  // Estados para review
  const [reviewFrequency, setReviewFrequency] = useState<string>('Semanalmente');
  const [reviewDay, setReviewDay] = useState<string>('Segunda-feira');
  const [reviewWorkload, setReviewWorkload] = useState<string>('01:00');

  // Dados mockados para outubro 2025
  const mockScheduleData: ScheduleData = [
    // Primeira semana (29/09 - 05/10)
    { date: '29', subjects: [] }, // Domingo (setembro)
    { date: '30', subjects: [] }, // Segunda (setembro)
    { date: '1', subjects: [
      { name: 'Matemática', time: '08:00', duration: '2h', type: 'Aula', content: 'Funções Quadráticas', contentType: 'Tópico' },
      { name: 'Português', time: '14:00', duration: '1h30', type: 'Exercícios', content: 'Análise Sintática', contentType: 'Subitem' }
    ]},
    { date: '2', subjects: [
      { name: 'História', time: '09:00', duration: '1h', type: 'Leitura', content: 'Revolução Industrial', contentType: 'Tópico' },
      { name: 'Geografia', time: '15:00', duration: '2h', type: 'Aula', content: 'Clima Tropical', contentType: 'Subitem' }
    ]},
    { date: '3', subjects: [
      { name: 'Física', time: '08:30', duration: '1h30', type: 'Exercícios', content: 'Cinemática', contentType: 'Tópico' },
      { name: 'Química', time: '14:30', duration: '1h', type: 'Revisão', content: 'Ligações Químicas', contentType: 'Subitem' }
    ]},
    { date: '4', subjects: [
      { name: 'Biologia', time: '10:00', duration: '2h', type: 'Aula', content: 'Genética Mendeliana', contentType: 'Tópico' }
    ]},
    { date: '5', subjects: [
      { name: 'Revisão', time: '09:00', duration: '3h', type: 'Revisão Geral', content: 'Simulado ENEM', contentType: 'Tópico' }
    ]},
    
    // Segunda semana (06/10 - 12/10)
    { date: '6', subjects: [
      { name: 'Matemática', time: '08:00', duration: '2h', type: 'Aula', content: 'Logaritmos', contentType: 'Tópico' },
      { name: 'Inglês', time: '14:00', duration: '1h', type: 'Conversação', content: 'Present Perfect', contentType: 'Subitem' }
    ]},
    { date: '7', subjects: [
      { name: 'Português', time: '09:00', duration: '1h30', type: 'Redação', content: 'Texto Dissertativo', contentType: 'Tópico' },
      { name: 'História', time: '15:00', duration: '1h', type: 'Exercícios', content: 'Era Vargas', contentType: 'Subitem' }
    ]},
    { date: '8', subjects: [
      { name: 'Geografia', time: '08:30', duration: '2h', type: 'Aula', content: 'Relevo Brasileiro', contentType: 'Tópico' },
      { name: 'Física', time: '14:30', duration: '1h30', type: 'Laboratório', content: 'Movimento Retilíneo', contentType: 'Subitem' }
    ]},
    { date: '9', subjects: [
      { name: 'Química', time: '10:00', duration: '1h30', type: 'Aula', content: 'Reações Orgânicas', contentType: 'Tópico' },
      { name: 'Biologia', time: '16:00', duration: '1h', type: 'Exercícios', content: 'Fotossíntese', contentType: 'Subitem' }
    ]},
    { date: '10', subjects: [
      { name: 'Matemática', time: '08:00', duration: '2h', type: 'Exercícios', content: 'Trigonometria', contentType: 'Tópico' },
      { name: 'Inglês', time: '14:00', duration: '1h', type: 'Grammar', content: 'Modal Verbs', contentType: 'Subitem' }
    ]},
    { date: '11', subjects: [
      { name: 'Português', time: '09:00', duration: '2h', type: 'Literatura', content: 'Romantismo', contentType: 'Tópico' }
    ]},
    { date: '12', subjects: [
      { name: 'Revisão', time: '09:00', duration: '4h', type: 'Simulado', content: 'Prova ENEM', contentType: 'Tópico' }
    ]},
    
    // Terceira semana (13/10 - 19/10)
    { date: '13', subjects: [
      { name: 'História', time: '08:00', duration: '2h', type: 'Aula', content: 'República Velha', contentType: 'Tópico' },
      { name: 'Geografia', time: '14:00', duration: '1h30', type: 'Mapas', content: 'Cartografia', contentType: 'Subitem' }
    ]},
    { date: '14', subjects: [
      { name: 'Física', time: '09:00', duration: '1h30', type: 'Teoria', content: 'Dinâmica', contentType: 'Tópico' },
      { name: 'Química', time: '15:00', duration: '2h', type: 'Laboratório', content: 'Titulação', contentType: 'Subitem' }
    ]},
    { date: '15', subjects: [
      { name: 'Biologia', time: '08:30', duration: '2h', type: 'Aula', content: 'Evolução', contentType: 'Tópico' },
      { name: 'Matemática', time: '14:30', duration: '1h30', type: 'Revisão', content: 'Geometria Plana', contentType: 'Subitem' }
    ]},
    { date: '16', subjects: [
      { name: 'Português', time: '10:00', duration: '1h', type: 'Gramática', content: 'Concordância Verbal', contentType: 'Subitem' },
      { name: 'Inglês', time: '16:00', duration: '1h30', type: 'Reading', content: 'Text Interpretation', contentType: 'Tópico' }
    ]},
    { date: '17', subjects: [
      { name: 'História', time: '08:00', duration: '1h30', type: 'Exercícios', content: 'Segunda Guerra Mundial', contentType: 'Tópico' },
      { name: 'Geografia', time: '14:00', duration: '2h', type: 'Aula', content: 'Hidrografia', contentType: 'Subitem' }
    ]},
    { date: '18', subjects: [
      { name: 'Física', time: '09:00', duration: '2h', type: 'Exercícios', content: 'Energia Mecânica', contentType: 'Tópico' }
    ]},
    { date: '19', subjects: [
      { name: 'Revisão', time: '09:00', duration: '3h', type: 'Revisão Geral', content: 'Matemática e Física', contentType: 'Tópico' }
    ]},
    
    // Quarta semana (20/10 - 26/10)
    { date: '20', subjects: [
      { name: 'Química', time: '08:00', duration: '2h', type: 'Aula', content: 'Equilíbrio Químico', contentType: 'Tópico' },
      { name: 'Biologia', time: '14:00', duration: '1h30', type: 'Exercícios', content: 'Respiração Celular', contentType: 'Subitem' }
    ]},
    { date: '21', subjects: [
      { name: 'Matemática', time: '09:00', duration: '2h', type: 'Aula', content: 'Geometria Espacial', contentType: 'Tópico' },
      { name: 'Português', time: '15:00', duration: '1h', type: 'Redação', content: 'Argumentação', contentType: 'Subitem' }
    ]},
    { date: '22', subjects: [
      { name: 'Inglês', time: '08:30', duration: '1h30', type: 'Listening', content: 'Audio Comprehension', contentType: 'Tópico' },
      { name: 'História', time: '14:30', duration: '2h', type: 'Aula', content: 'Guerra Fria', contentType: 'Subitem' }
    ]},
    { date: '23', subjects: [
      { name: 'Geografia', time: '10:00', duration: '1h30', type: 'Exercícios', content: 'Urbanização', contentType: 'Tópico' },
      { name: 'Física', time: '16:00', duration: '1h', type: 'Revisão', content: 'Ondas', contentType: 'Subitem' }
    ]},
    { date: '24', subjects: [
      { name: 'Química', time: '08:00', duration: '1h30', type: 'Exercícios', content: 'Eletroquímica', contentType: 'Tópico' },
      { name: 'Biologia', time: '14:00', duration: '2h', type: 'Aula', content: 'Ecologia', contentType: 'Subitem' }
    ]},
    { date: '25', subjects: [
      { name: 'Matemática', time: '09:00', duration: '2h', type: 'Revisão', content: 'Análise Combinatória', contentType: 'Tópico' }
    ]},
    { date: '26', subjects: [
      { name: 'Revisão', time: '09:00', duration: '4h', type: 'Simulado Final', content: 'Todas as Disciplinas', contentType: 'Tópico' }
    ]},
    
    // Quinta semana (27/10 - 31/10)
    { date: '27', subjects: [
      { name: 'Português', time: '08:00', duration: '2h', type: 'Literatura', content: 'Modernismo', contentType: 'Tópico' },
      { name: 'Inglês', time: '14:00', duration: '1h', type: 'Writing', content: 'Essay Writing', contentType: 'Subitem' }
    ]},
    { date: '28', subjects: [
      { name: 'História', time: '09:00', duration: '1h30', type: 'Revisão', content: 'Brasil República', contentType: 'Tópico' },
      { name: 'Geografia', time: '15:00', duration: '1h30', type: 'Revisão', content: 'Geografia Física', contentType: 'Subitem' }
    ]},
    { date: '29', subjects: [
      { name: 'Física', time: '08:30', duration: '2h', type: 'Revisão', content: 'Mecânica', contentType: 'Tópico' },
      { name: 'Química', time: '14:30', duration: '1h30', type: 'Revisão', content: 'Química Orgânica', contentType: 'Subitem' }
    ]},
    { date: '30', subjects: [
      { name: 'Biologia', time: '10:00', duration: '2h', type: 'Revisão', content: 'Genética', contentType: 'Tópico' },
      { name: 'Matemática', time: '16:00', duration: '1h', type: 'Revisão', content: 'Estatística', contentType: 'Subitem' }
    ]},
    { date: '31', subjects: [
      { name: 'Revisão', time: '09:00', duration: '5h', type: 'Revisão Final', content: 'Preparação ENEM', contentType: 'Tópico' }
    ]}
  ];

  const mockDetailedSchedule: DetailedSchedule = [
    {
      id: '1',
      time: '08:00',
      subject: 'Matemática',
      content: 'Funções Quadráticas',
      duration: '2h',
      status: 'Agendado',
      type: 'Aula'
    },
    {
      id: '2',
      time: '10:30',
      subject: 'Português',
      content: 'Análise Sintática',
      duration: '1h30',
      status: 'Agendado',
      type: 'Exercícios'
    },
    {
      id: '3',
      time: '14:00',
      subject: 'História',
      content: 'República Velha',
      duration: '1h',
      status: 'Agendado',
      type: 'Leitura'
    },
    {
      id: '4',
      time: '15:30',
      subject: 'Geografia',
      content: 'Climatologia',
      duration: '2h',
      status: 'Agendado',
      type: 'Aula'
    },
    {
      id: '5',
      time: '18:00',
      subject: 'Física',
      content: 'Cinemática',
      duration: '1h30',
      status: 'Agendado',
      type: 'Exercícios'
    }
  ];

  // Dados das disciplinas para a tabela
  const disciplinesTableData = [
    {
      id: '1',
      name: 'Matemática',
      totalContent: 45,
      completionDate: '15/12/2025',
      studyPlans: ['Álgebra Linear', 'Cálculo I', 'Geometria Analítica']
    },
    {
      id: '2',
      name: 'Português',
      totalContent: 38,
      completionDate: '20/11/2025',
      studyPlans: ['Literatura Brasileira', 'Gramática Avançada', 'Redação ENEM']
    },
    {
      id: '3',
      name: 'História',
      totalContent: 52,
      completionDate: '10/01/2026',
      studyPlans: ['História do Brasil', 'História Geral', 'História Contemporânea']
    },
    {
      id: '4',
      name: 'Geografia',
      totalContent: 41,
      completionDate: '05/12/2025',
      studyPlans: ['Geografia Física', 'Geografia Humana', 'Geopolítica']
    },
    {
      id: '5',
      name: 'Física',
      totalContent: 48,
      completionDate: '25/12/2025',
      studyPlans: ['Mecânica', 'Termodinâmica', 'Eletromagnetismo']
    },
    {
      id: '6',
      name: 'Química',
      totalContent: 43,
      completionDate: '18/12/2025',
      studyPlans: ['Química Orgânica', 'Química Inorgânica', 'Físico-Química']
    },
    {
      id: '7',
      name: 'Biologia',
      totalContent: 39,
      completionDate: '22/11/2025',
      studyPlans: ['Biologia Celular', 'Genética', 'Ecologia']
    },
    {
      id: '8',
      name: 'Inglês',
      totalContent: 35,
      completionDate: '30/11/2025',
      studyPlans: ['Grammar Essentials', 'Reading Comprehension', 'Writing Skills']
    }
  ];

  const subjectColors: SubjectColors = {
    'Matemática': { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
    'Português': { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800' },
    'História': { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-800' },
    'Geografia': { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' },
    'Física': { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800' },
    'Química': { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800' },
    'Biologia': { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-800' },
    'Inglês': { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-800' },
    'Revisão': { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800' }
  };
  const timeSuggestions: string[] = ['08:00', '14:00', '19:00'];

  // Funções de toggle
  const toggleCourseSelection = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, selected: !course.selected } : course
    ));
  };

  const toggleDisciplineExpansion = (disciplineId: string) => {
    setDisciplines(prev => prev.map(discipline =>
      discipline.id === disciplineId ? { ...discipline, expanded: !discipline.expanded } : discipline
    ));
  };

  const toggleDisciplineSelection = (disciplineId: string) => {
    setDisciplines(prev => prev.map(discipline =>
      discipline.id === disciplineId ? { ...discipline, selected: !discipline.selected } : discipline
    ));
  };

  const toggleTopicExpansion = (disciplineId: string, topicId: string) => {
    setDisciplines(prev => prev.map(discipline => ({
      ...discipline,
      topics: discipline.topics?.map(topic =>
        topic.id === topicId ? { ...topic, expanded: !topic.expanded } : topic
      )
    })));
  };

  const toggleTopicSelection = (disciplineId: string, topicId: string) => {
    setDisciplines(prev => prev.map(discipline => ({
      ...discipline,
      topics: discipline.topics?.map(topic =>
        topic.id === topicId ? { ...topic, selected: !topic.selected } : topic
      )
    })));
  };

  const toggleSubtopicSelection = (disciplineId: string, topicId: string, subtopicId: string) => {
    setDisciplines(prev => prev.map(discipline => ({
      ...discipline,
      topics: discipline.topics?.map(topic => ({
        ...topic,
        subtopics: topic.subtopics?.map(subtopic =>
          subtopic.id === subtopicId ? { ...subtopic, selected: !subtopic.selected } : subtopic
        )
      }))
    })));
  };

  const updateScheduleTime = (index: string, field: string, value: string) => {
    const numIndex = parseInt(index);
    setWeekSchedule(prev => prev.map((day, i) => 
      i === numIndex ? { ...day, [field]: value } : day
    ));
  };

  const getContentIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      'video': 'solar:play-circle-linear',
      'text': 'solar:document-text-linear',
      'exercise': 'solar:clipboard-check-linear',
      'default': 'solar:book-linear'
    };
    return icons[type] || icons.default;
  };

  const getContentInfo = (id: string) => {
    return { id, title: 'Conteúdo Exemplo', type: 'text' };
  };

  return (
    <CriarCronogramaPage
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      courses={courses}
      disciplines={disciplines}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      contentSearchTerm={contentSearchTerm}
      setContentSearchTerm={setContentSearchTerm}
      scheduleMode={scheduleMode}
      setScheduleMode={setScheduleMode}
      scheduleName={scheduleName}
      setScheduleName={setScheduleName}
      dailyWorkload={dailyWorkload}
      setDailyWorkload={setDailyWorkload}
      timeSuggestions={timeSuggestions}
      copyFromDay={copyFromDay}
      setCopyFromDay={setCopyFromDay}
      copyToDay={copyToDay}
      setCopyToDay={setCopyToDay}
      viewMode={viewMode}
      setViewMode={setViewMode}
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
      currentYear={currentYear}
      setCurrentYear={setCurrentYear}
      mockScheduleData={mockScheduleData}
      mockDetailedSchedule={mockDetailedSchedule}
      disciplinesTableData={disciplinesTableData}
      subjectColors={subjectColors}
      studyStartDate={studyStartDate}
      setStudyStartDate={setStudyStartDate}
      studyEndDate={studyEndDate}
      setStudyEndDate={setStudyEndDate}
      weekSchedule={weekSchedule}
      setWeekSchedule={setWeekSchedule}
      studySequence={studySequence}
      setStudySequence={setStudySequence}
      toggleCourseSelection={toggleCourseSelection}
      toggleDisciplineExpansion={toggleDisciplineExpansion}
      toggleDisciplineSelection={toggleDisciplineSelection}
      toggleTopicExpansion={toggleTopicExpansion}
      toggleTopicSelection={toggleTopicSelection}
      toggleSubtopicSelection={toggleSubtopicSelection}
      updateScheduleTime={updateScheduleTime}
      getContentIcon={getContentIcon}
      getContentInfo={getContentInfo}
      reviewFrequency={reviewFrequency}
      setReviewFrequency={setReviewFrequency}
      reviewDay={reviewDay}
      setReviewDay={setReviewDay}
      reviewWorkload={reviewWorkload}
      setReviewWorkload={setReviewWorkload}
      draggedItem={draggedItem}
      setDraggedItem={setDraggedItem}
    />
  );
};

export default CriarCronogramaPageWrapper;