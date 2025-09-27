import { ScheduleData, DetailedSchedule } from '../../types/cronograma';

// Dados mockados baseados no cronograma da imagem
export const cronogramaImageMockData: ScheduleData = [
  {
    date: '26', // Sexta-feira
    subjects: [
      {
        name: 'Língua Portuguesa I',
        time: '09:00',
        duration: '38min',
        type: 'Plano do curso',
        content: 'Noções básicas - Compreensão e Interpretação',
        contentType: 'Tópico'
      },
      {
        name: 'Língua Portuguesa I',
        time: '09:39',
        duration: '32min',
        type: 'Compreensão e Interpretação',
        content: 'Questões Práticas',
        contentType: 'Tópico'
      },
      {
        name: 'Noções de Lógica e Estatística I',
        time: '10:12',
        duration: '35min',
        type: 'Lógica Proposicional',
        content: 'Lógica Proposicional I',
        contentType: 'Tópico'
      },
      {
        name: 'Noções de Lógica e Estatística I',
        time: '10:48',
        duration: '40min',
        type: 'Lógica Proposicional',
        content: 'Lógica Proposicional II',
        contentType: 'Tópico'
      },
      {
        name: 'Direito Administrativo I',
        time: '11:29',
        duration: '23min',
        type: 'Princípios Administrativos',
        content: 'Introdução',
        contentType: 'Tópico'
      },
      {
        name: 'Direito Administrativo I',
        time: '11:53',
        duration: '7min',
        type: 'Princípios Administrativos',
        content: 'Legalidade - Impessoalidade',
        contentType: 'Tópico'
      }
    ]
  },
  {
    date: '27', // Sábado
    subjects: [
      {
        name: 'Direito Administrativo I',
        time: '09:00',
        duration: '21min',
        type: 'Princípios Administrativos',
        content: 'Legalidade - Impessoalidade',
        contentType: 'Tópico'
      },
      {
        name: 'Fundamentos de Macroeconomia e Microeconomia I',
        time: '09:22',
        duration: '37min',
        type: 'Macroeconomia',
        content: 'Contas Nacionais',
        contentType: 'Tópico'
      },
      {
        name: 'Fundamentos de Macroeconomia e Microeconomia I',
        time: '10:00',
        duration: '33min',
        type: 'Macroeconomia',
        content: 'Contas Nacionais II',
        contentType: 'Tópico'
      },
      {
        name: 'Atualidades (Somente para a prova discursiva) I',
        time: '10:34',
        duration: '38min',
        type: 'Ecologia e Sustentabilidade',
        content: 'Ecologia e Sustentabilidade',
        contentType: 'Tópico'
      }
    ]
  }
];

// Cronograma detalhado baseado na imagem
export const cronogramaImageDetailedSchedule: DetailedSchedule = [
  // Dia 26 - Sexta-feira
  {
    id: '1',
    time: '09:00 - 09:38',
    subject: 'Língua Portuguesa I',
    content: 'Plano do curso - Noções básicas - Compreensão e Interpretação',
    duration: '38min',
    status: 'Agendado',
    type: 'Plano do curso'
  },
  {
    id: '2',
    time: '09:39 - 10:11',
    subject: 'Língua Portuguesa I',
    content: 'Compreensão e Interpretação: Questões Práticas',
    duration: '32min',
    status: 'Agendado',
    type: 'Compreensão e Interpretação'
  },
  {
    id: '3',
    time: '10:12 - 10:47',
    subject: 'Noções de Lógica e Estatística I',
    content: 'Lógica Proposicional I',
    duration: '35min',
    status: 'Agendado',
    type: 'Lógica Proposicional'
  },
  {
    id: '4',
    time: '10:48 - 11:28',
    subject: 'Noções de Lógica e Estatística I',
    content: 'Lógica Proposicional II',
    duration: '40min',
    status: 'Agendado',
    type: 'Lógica Proposicional'
  },
  {
    id: '5',
    time: '11:29 - 11:52',
    subject: 'Direito Administrativo I',
    content: 'Princípios Administrativos - Introdução',
    duration: '23min',
    status: 'Agendado',
    type: 'Princípios Administrativos'
  },
  {
    id: '6',
    time: '11:53 - 12:00',
    subject: 'Direito Administrativo I',
    content: 'Princípios Administrativos - Legalidade - Impessoalidade',
    duration: '7min',
    status: 'Agendado',
    type: 'Princípios Administrativos'
  },
  // Dia 27 - Sábado
  {
    id: '7',
    time: '09:00 - 09:21',
    subject: 'Direito Administrativo I',
    content: 'Princípios Administrativos - Legalidade - Impessoalidade',
    duration: '21min',
    status: 'Agendado',
    type: 'Princípios Administrativos'
  },
  {
    id: '8',
    time: '09:22 - 09:59',
    subject: 'Fundamentos de Macroeconomia e Microeconomia I',
    content: 'Macroeconomia - Contas Nacionais',
    duration: '37min',
    status: 'Agendado',
    type: 'Macroeconomia'
  },
  {
    id: '9',
    time: '10:00 - 10:33',
    subject: 'Fundamentos de Macroeconomia e Microeconomia I',
    content: 'Macroeconomia - Contas Nacionais II',
    duration: '33min',
    status: 'Agendado',
    type: 'Macroeconomia'
  },
  {
    id: '10',
    time: '10:34 - 11:12',
    subject: 'Atualidades (Somente para a prova discursiva) I',
    content: 'Ecologia e Sustentabilidade',
    duration: '38min',
    status: 'Agendado',
    type: 'Ecologia e Sustentabilidade'
  }
];

// Cores das disciplinas para melhor visualização
export const cronogramaImageSubjectColors = {
  'Língua Portuguesa I': {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-700 dark:text-blue-300'
  },
  'Noções de Lógica e Estatística I': {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-700',
    text: 'text-green-700 dark:text-green-300'
  },
  'Direito Administrativo I': {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-700',
    text: 'text-purple-700 dark:text-purple-300'
  },
  'Fundamentos de Macroeconomia e Microeconomia I': {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-700',
    text: 'text-orange-700 dark:text-orange-300'
  },
  'Atualidades (Somente para a prova discursiva) I': {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-700',
    text: 'text-red-700 dark:text-red-300'
  }
};

// Informações adicionais do cronograma
export const cronogramaImageInfo = {
  title: 'Cronograma de Estudos - Concurso Público',
  startDate: '26/09/2025', // Sexta-feira
  endDate: '16/02/2026',
  totalDays: 2, // Apenas os dias mostrados na imagem
  totalSubjects: 5,
  totalStudyTime: '5h 4min', // Soma aproximada de todas as durações
  description: 'Cronograma baseado na imagem fornecida com disciplinas específicas para concurso público'
};