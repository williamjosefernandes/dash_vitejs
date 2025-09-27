import React, { useState } from 'react';
import StudyDisciplineHeader from './StudyDisciplineHeader';

// Dados de exemplo baseados na imagem
const mockScheduleData = [
  {
    date: '09:00 - 09:38',
    dayName: 'Set, Sex',
    dayNumber: 26,
    items: [
      {
        id: '1',
        startTime: '09:00',
        endTime: '09:38',
        subject: 'Língua Portuguesa I',
        topic: 'Plano do curso - Noções básicas - Compreensão e Interpretação',
        type: 'class' as const,
        status: 'pending' as const,
        color: '#3B82F6'
      },
      {
        id: '2',
        startTime: '09:39',
        endTime: '10:11',
        subject: 'Língua Portuguesa I',
        topic: 'Compreensão e Interpretação: Questões Práticas',
        type: 'class' as const,
        status: 'pending' as const,
        color: '#3B82F6'
      },
      {
        id: '3',
        startTime: '10:12',
        endTime: '10:47',
        subject: 'Noções de Lógica e Estatística I',
        topic: 'Lógica Proposicional I',
        type: 'study' as const,
        status: 'pending' as const,
        color: '#10B981'
      },
      {
        id: '4',
        startTime: '10:48',
        endTime: '11:26',
        subject: 'Noções de Lógica e Estatística I',
        topic: 'Lógica Proposicional II',
        type: 'study' as const,
        status: 'pending' as const,
        color: '#10B981'
      },
      {
        id: '5',
        startTime: '11:29',
        endTime: '11:52',
        subject: 'Direito Administrativo I',
        topic: 'Princípios Administrativos - Introdução',
        type: 'review' as const,
        status: 'pending' as const,
        color: '#F59E0B'
      },
      {
        id: '6',
        startTime: '11:53',
        endTime: '12:00',
        subject: 'Direito Administrativo I',
        topic: 'Princípios Administrativos - Legalidade - Impessoalidade',
        type: 'review' as const,
        status: 'pending' as const,
        color: '#F59E0B'
      }
    ]
  },
  {
    date: '09:00 - 09:21',
    dayName: 'Set, Sáb',
    dayNumber: 27,
    items: [
      {
        id: '7',
        startTime: '09:00',
        endTime: '09:21',
        subject: 'Direito Administrativo I',
        topic: 'Princípios Administrativos - Legalidade - Impessoalidade',
        type: 'review' as const,
        status: 'pending' as const,
        color: '#F59E0B'
      },
      {
        id: '8',
        startTime: '09:22',
        endTime: '09:59',
        subject: 'Fundamentos de Macroeconomia e Microeconomia I',
        topic: 'Macroeconomia - Contas Nacionais',
        type: 'class' as const,
        status: 'pending' as const,
        color: '#8B5CF6'
      },
      {
        id: '9',
        startTime: '10:00',
        endTime: '10:33',
        subject: 'Fundamentos de Macroeconomia e Microeconomia I',
        topic: 'Macroeconomia - Contas Nacionais II',
        type: 'class' as const,
        status: 'pending' as const,
        color: '#8B5CF6'
      },
      {
        id: '10',
        startTime: '10:34',
        endTime: '11:12',
        subject: 'Atualidades (Somente para a prova discursiva) I',
        topic: 'Ecologia e Sustentabilidade',
        type: 'study' as const,
        status: 'pending' as const,
        color: '#EF4444'
      }
    ]
  }
];

const ScheduleExample: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStartStudy = (itemId: string) => {
    console.log('Iniciando estudo do item:', itemId);
    // Aqui você implementaria a lógica para iniciar o estudo
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <StudyDisciplineHeader
        viewMode="schedule"
        scheduleData={mockScheduleData}
        isExpanded={isExpanded}
        onToggleExpansion={() => setIsExpanded(!isExpanded)}
        onStartStudy={handleStartStudy}
      />
    </div>
  );
};

export default ScheduleExample;