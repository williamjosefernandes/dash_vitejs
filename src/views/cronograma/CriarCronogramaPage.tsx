import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { CriarCronogramaPageProps } from '../../types/cronograma';

const CriarCronogramaPage: React.FC<CriarCronogramaPageProps> = ({
  steps,
  currentStep,
  setCurrentStep,
  courses,
  disciplines,
  searchTerm,
  setSearchTerm,
  contentSearchTerm,
  setContentSearchTerm,
  scheduleMode,
  setScheduleMode,
  scheduleName,
  setScheduleName,
  dailyWorkload,
  setDailyWorkload,
  timeSuggestions,
  copyFromDay,
  setCopyFromDay,
  copyToDay,
  setCopyToDay,
  viewMode,
  setViewMode,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  mockScheduleData,
  mockDetailedSchedule,
  subjectColors,
  studyStartDate,
  setStudyStartDate,
  studyEndDate,
  setStudyEndDate,
  weekSchedule,
  setWeekSchedule,
  studySequence,
  setStudySequence,
  toggleCourseSelection,
  toggleDisciplineExpansion,
  toggleDisciplineSelection,
  toggleTopicExpansion,
  toggleTopicSelection,
  toggleSubtopicSelection,
  updateScheduleTime,
  getContentIcon,
  getContentInfo,
  reviewFrequency = "Semanalmente",
  setReviewFrequency = () => {},
  reviewDay = "Segunda-feira", 
  setReviewDay = () => {},
  reviewWorkload = "01:00",
  setReviewWorkload = () => {},
  draggedItem,
  setDraggedItem
}) => {
  // Estados locais
  const [disciplineChangeFrequency, setDisciplineChangeFrequency] = useState('A cada 2 subtópicos');
  const [showCopySidebar, setShowCopySidebar] = useState(false);

  const toggleDayEnabled = (dayIndex: number) => {
    setWeekSchedule(prev => {
      const updated = [...prev];
      updated[dayIndex] = { ...updated[dayIndex], enabled: !updated[dayIndex].enabled };
      return updated;
    });
  };

  const copySchedule = () => {
    if (!copyFromDay || !copyToDay) return;
    
    const fromIndex = weekSchedule.findIndex(day => day.day === copyFromDay);
    const toIndex = weekSchedule.findIndex(day => day.day === copyToDay);
    
    if (fromIndex !== -1 && toIndex !== -1) {
      setWeekSchedule(prev => {
        const updated = [...prev];
        updated[toIndex] = {
          ...updated[toIndex],
          startTime: updated[fromIndex].startTime,
          endTime: updated[fromIndex].endTime,
          totalHours: updated[fromIndex].totalHours,
          enabled: updated[fromIndex].enabled
        };
        return updated;
      });
    }
  };

  const filteredCourses = (courses || []).filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDisciplines = (disciplines || []).filter(discipline =>
    discipline.title.toLowerCase().includes(contentSearchTerm.toLowerCase()) ||
    (discipline.topics || []).some(topic =>
      topic.title.toLowerCase().includes(contentSearchTerm.toLowerCase()) ||
      (topic.subtopics || []).some(subtopic =>
        subtopic.title.toLowerCase().includes(contentSearchTerm.toLowerCase())
      )
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Cronograma de estudos
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${step.number === currentStep 
                      ? 'bg-blue-600 text-white' 
                      : step.number < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }
                  `}>
                    {step.number < currentStep ? (
                      <Icon icon="solar:check-bold" className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {step.title && (
                    <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {step.title}
                    </span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4
                    ${step.number < currentStep 
                      ? 'bg-green-600' 
                      : 'bg-gray-200 dark:bg-gray-700'
                    }
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {currentStep === 1 && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Seleção de cursos
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Selecione os planos de estudo que serão incluídos no seu cronograma
                </p>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selecione seus planos de estudo.
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Digite o nome do plano de estudo favoritado"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <Icon 
                    icon="solar:magnifer-linear" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>
              </div>

              {/* Course List */}
              <div className="space-y-4 mb-8">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`
                      flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors
                      ${course.selected 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                      }
                    `}
                    onClick={() => toggleCourseSelection(course.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                          {course.institution.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {course.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Icon icon="solar:trash-bin-minimalistic-linear" className="w-5 h-5" />
                      </button>
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center
                        ${course.selected 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300 dark:border-gray-600'
                        }
                      `}>
                        {course.selected && (
                          <Icon icon="solar:check-bold" className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => setCurrentStep(2)}
                >
                  <span>Continuar</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Escolha o conteúdo
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Selecione os conteúdos que deseja incluir no seu cronograma de estudos
                </p>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar disciplinas, tópicos ou conteúdos..."
                    value={contentSearchTerm}
                    onChange={(e) => setContentSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <Icon 
                    icon="solar:magnifer-linear" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>
              </div>

              {/* Hierarchical Content Structure */}
              <div className="space-y-4 mb-8">
                {filteredDisciplines.map((discipline) => (
                  <div key={discipline.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                    {/* Discipline Level */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleDisciplineExpansion(discipline.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <Icon 
                            icon={discipline.expanded ? "solar:alt-arrow-down-bold" : "solar:alt-arrow-right-bold"} 
                            className="w-4 h-4 text-gray-600 dark:text-gray-400" 
                          />
                        </button>
                        <div className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
                          ${discipline.selected 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300 dark:border-gray-600'
                          }
                        `}
                        onClick={() => toggleDisciplineSelection(discipline.id)}
                        >
                          {discipline.selected && (
                            <Icon icon="solar:check-bold" className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {discipline.title}
                        </h3>
                      </div>
                    </div>

                    {/* Topics Level */}
                    {discipline.expanded && (
                      <div className="border-t border-gray-200 dark:border-gray-600">
                        {(discipline.topics || []).map((topic) => (
                          <div key={topic.id}>
                            <div className="flex items-center justify-between p-4 pl-8 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => toggleTopicExpansion(discipline.id, topic.id)}
                                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                >
                                  <Icon 
                                    icon={topic.expanded ? "solar:alt-arrow-down-bold" : "solar:alt-arrow-right-bold"} 
                                    className="w-4 h-4 text-gray-600 dark:text-gray-400" 
                                  />
                                </button>
                                <div className={`
                                  w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
                                  ${topic.selected 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300 dark:border-gray-600'
                                  }
                                `}
                                onClick={() => toggleTopicSelection(discipline.id, topic.id)}
                                >
                                  {topic.selected && (
                                    <Icon icon="solar:check-bold" className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {topic.title}
                                </h4>
                              </div>
                            </div>

                            {/* Subtopics Level */}
                            {topic.expanded && (
                              <div className="bg-gray-50 dark:bg-gray-700/30">
                                {(topic.subtopics || []).map((subtopic) => (
                                  <div 
                                    key={subtopic.id}
                                    className="flex items-center justify-between p-3 pl-16 border-b border-gray-100 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-600/30 transition-colors"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className={`
                                        w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
                                        ${subtopic.selected 
                                          ? 'border-blue-500 bg-blue-500' 
                                          : 'border-gray-300 dark:border-gray-600'
                                        }
                                      `}
                                      onClick={() => toggleSubtopicSelection(discipline.id, topic.id, subtopic.id)}
                                      >
                                        {subtopic.selected && (
                                          <Icon icon="solar:check-bold" className="w-3 h-3 text-white" />
                                        )}
                                      </div>
                                      <div className={`
                                        w-6 h-6 rounded flex items-center justify-center
                                        ${subtopic.type === 'video' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                                          subtopic.type === 'pdf' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                          subtopic.type === 'quiz' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                          'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                        }
                                      `}>
                                        <Icon icon={getContentIcon(subtopic.type)} className="w-3 h-3" />
                                      </div>
                                      <div>
                                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                          {subtopic.title}
                                        </h5>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          {getContentInfo(subtopic)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setCurrentStep(1)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => setCurrentStep(3)}
                >
                  <span>Continuar</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Sequência de estudos
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Escolha o que você deseja estudar primeiro. Para isso, basta arrastar as disciplinas e posicioná-las na sequência desejada.
                </p>
              </div>

              {/* Info Box */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mt-0.5">
                    <Icon icon="solar:info-circle-bold" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Como funciona a sequência?
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      No cronograma, a cada ciclo conteúdos haverá troca de disciplina, seguindo um método considerado ideal por muitos estudantes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Study Sequence List */}
              <div className="space-y-3 mb-8">
                {studySequence
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => {
                        setDraggedItem(item);
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedItem && draggedItem.id !== item.id) {
                          const newSequence = [...studySequence];
                          const draggedIndex = newSequence.findIndex(seq => seq.id === draggedItem.id);
                          const targetIndex = newSequence.findIndex(seq => seq.id === item.id);
                          
                          // Remove dragged item and insert at target position
                          const [removed] = newSequence.splice(draggedIndex, 1);
                          newSequence.splice(targetIndex, 0, removed);
                          
                          // Update order
                          const updatedSequence = newSequence.map((seq, idx) => ({
                            ...seq,
                            order: idx + 1
                          }));
                          
                          setStudySequence(updatedSequence);
                        }
                        setDraggedItem(null);
                      }}
                      className={`
                        flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg cursor-move transition-all
                        ${draggedItem?.id === item.id ? 'opacity-50 scale-95' : 'hover:shadow-md'}
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {index + 1}.
                          </span>
                          <div className="flex items-center space-x-2">
                            <Icon icon="solar:menu-dots-bold" className="w-5 h-5 text-gray-400" />
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <Icon icon="solar:book-2-bold" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                              {item.type}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon icon="solar:play-circle-bold" className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setCurrentStep(2)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => setCurrentStep(4)}
                >
                  <span>Continuar</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Step 4: Determine sua rotina */}
          {currentStep === 4 && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Determine sua rotina
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Configure seus horários de estudo para cada dia da semana
                </p>
              </div>

              {/* Schedule Mode Selection */}
              <div className="mb-8">
                <div className="flex space-x-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setScheduleMode({ type: 'specific', selectedOption: 'specific' })}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all
                      ${scheduleMode.selectedOption === 'specific'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }
                    `}
                  >
                    <div className={`
                      w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${scheduleMode.selectedOption === 'specific'
                        ? 'border-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                      }
                    `}>
                      {scheduleMode.selectedOption === 'specific' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <Icon icon="solar:clock-circle-bold" className="w-5 h-5" />
                    <span className="font-medium">Horários específicos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScheduleMode({ type: 'workload', selectedOption: 'workload' })}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all
                      ${scheduleMode.selectedOption === 'workload'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }
                    `}
                  >
                    <div className={`
                      w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${scheduleMode.selectedOption === 'workload'
                        ? 'border-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                      }
                    `}>
                      {scheduleMode.selectedOption === 'workload' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <Icon icon="solar:hourglass-bold" className="w-5 h-5" />
                    <span className="font-medium">Carga horária</span>
                  </button>
                </div>

                {/* Specific Times Mode */}
                {scheduleMode.selectedOption === 'specific' && (
                  <div className="space-y-4">
                    {weekSchedule.map((day, index) => (
                      <div key={day.day} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1">
                          <input
                            type="checkbox"
                            checked={day.enabled}
                            onChange={() => toggleDayEnabled(index)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="font-medium text-gray-900 dark:text-white min-w-[120px]">
                            {day.day}
                          </span>
                        </div>

                        {day.enabled && (
                          <>
                            <div className="flex items-center space-x-2">
                              <label className="text-sm text-gray-600 dark:text-gray-400">De:</label>
                              <input
                                type="time"
                                value={day.startTime}
                                onChange={(e) => updateScheduleTime(String(index), 'startTime', e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-sm text-gray-600 dark:text-gray-400">Até:</label>
                              <input
                                type="time"
                                value={day.endTime}
                                onChange={(e) => updateScheduleTime(String(index), 'endTime', e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Icon icon="solar:clock-circle-bold" className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[60px]">
                                {day.totalHours}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {/* Copy Schedule Button */}
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowCopySidebar(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Icon icon="solar:copy-bold" className="w-4 h-4" />
                        <span>Copiar horário</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Workload Mode */}
                {scheduleMode.selectedOption === 'workload' && (
                  <div className="space-y-6">
                    {/* Main workload section */}
                    <div className="text-center py-8">
                      <div className="mb-6">
                        <Icon icon="solar:hourglass-bold" className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Carga horária diária
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Defina quantas horas você quer estudar por dia
                        </p>
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <button
                          type="button"
                          onClick={() => setDailyWorkload(String(Math.max(1, parseInt(dailyWorkload) - 1)))}
                          className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Icon icon="solar:minus-linear" className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>

                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                            {dailyWorkload}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            horas por dia
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setDailyWorkload(String(Math.min(12, parseInt(dailyWorkload) + 1)))}
                          className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Icon icon="solar:plus-linear" className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Time suggestions for workload mode */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                        <Icon icon="solar:clock-circle-bold" className="w-4 h-4 text-blue-500" />
                        <span>Sugestões de horário</span>
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSuggestions.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Clique em um horário para usar como referência
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setCurrentStep(3)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => setCurrentStep(5)}
                >
                  <span>Continuar</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Step 5: Configurações */}
          {currentStep === 5 && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Configurações
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Para concluir, preencha os campos a seguir.
                </p>
              </div>

              <div className="space-y-8">
                {/* Nome do cronograma */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome do cronograma
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Dê um nome para o seu cronograma
                  </p>
                  <input
                    type="text"
                    value={scheduleName}
                    onChange={(e) => setScheduleName(e.target.value)}
                    placeholder="Cronograma de Estudo"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Mudança de disciplina */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mudança de disciplina
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    No seu cronograma, trocaremos de disciplina a cada 2 subtópico. Porém, você pode modificar essa regra, caso deseje, no campo a seguir.
                  </p>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mudar de disciplina
                    </label>
                    <select
                      value={disciplineChangeFrequency}
                      onChange={(e) => setDisciplineChangeFrequency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option value="A cada 1 subtópico">A cada 1 subtópico</option>
                      <option value="A cada 2 subtópicos">A cada 2 subtópicos</option>
                      <option value="A cada 3 subtópicos">A cada 3 subtópicos</option>
                      <option value="A cada 4 subtópicos">A cada 4 subtópicos</option>
                      <option value="A cada 5 subtópicos">A cada 5 subtópicos</option>
                    </select>
                    <Icon 
                      icon="solar:alt-arrow-down-linear" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none mt-6"
                    />
                  </div>
                </div>

                {/* Revisão (opcional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Revisão (opcional)
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Selecione a quantidade de horas ou o horário que você vai reservar para fazer sua revisão ou resolução de questões.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Frequência */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Frequência
                      </label>
                      <div className="relative">
                        <select
                          value={reviewFrequency}
                          onChange={(e) => setReviewFrequency(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                        >
                          <option value="Diariamente">Diariamente</option>
                          <option value="Semanalmente">Semanalmente</option>
                          <option value="Quinzenalmente">Quinzenalmente</option>
                          <option value="Mensalmente">Mensalmente</option>
                        </select>
                        <Icon 
                          icon="solar:alt-arrow-down-linear" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Dia da semana */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Dia da semana
                      </label>
                      <div className="relative">
                        <select
                          value={reviewDay}
                          onChange={(e) => setReviewDay(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                        >
                          <option value="Segunda-feira">Segunda-feira</option>
                          <option value="Terça-feira">Terça-feira</option>
                          <option value="Quarta-feira">Quarta-feira</option>
                          <option value="Quinta-feira">Quinta-feira</option>
                          <option value="Sexta-feira">Sexta-feira</option>
                          <option value="Sábado">Sábado</option>
                          <option value="Domingo">Domingo</option>
                        </select>
                        <Icon 
                          icon="solar:alt-arrow-down-linear" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Carga horária */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Carga horária
                        </label>
                        <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <Icon icon="solar:info-circle-bold" className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={reviewWorkload}
                        onChange={(e) => setReviewWorkload(e.target.value)}
                        placeholder="01:00"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Período de estudo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Período de estudo
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    A data final é calculada automaticamente conforme o conteúdo selecionado e a velocidade de estudo.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Data inicial */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data inicial do cronograma
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={studyStartDate}
                          onChange={(e) => setStudyStartDate(e.target.value)}
                          placeholder="26/09/2025"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                        <Icon 
                          icon="solar:calendar-bold" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Data final */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data final do cronograma (opcional)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={studyEndDate}
                          onChange={(e) => setStudyEndDate(e.target.value)}
                          placeholder="15/04/2026"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                        <Icon 
                          icon="solar:calendar-bold" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setCurrentStep(4)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  onClick={() => setCurrentStep(6)}
                >
                  <span>Continuar</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

              {/* Step 6: Veja como vai ficar seu cronograma */}
          {currentStep === 6 && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Veja como vai ficar seu cronograma
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Confira as configurações que você escolheu a seguir. Depois, você poderá voltar e editar ou confirmar a criação do seu cronograma.
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Icon icon="solar:calendar-bold" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total de Dias</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">30</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Icon icon="solar:clock-circle-bold" className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Horas/Dia</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">6h</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Icon icon="solar:book-2-bold" className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Disciplinas</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">8</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Hoje</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => {
                          const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                                         'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                          const currentIndex = months.indexOf(currentMonth);
                          let newIndex = currentIndex - 1;
                          let newYear = currentYear;
                          
                          if (newIndex < 0) {
                            newIndex = 11;
                            newYear = String(parseInt(currentYear) - 1);
                          }
                          
                          setCurrentMonth(months[newIndex]);
                          setCurrentYear(newYear);
                        }}
                      >
                        <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => {
                          const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                                         'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                          const currentIndex = months.indexOf(currentMonth);
                          let newIndex = currentIndex + 1;
                          let newYear = currentYear;
                          
                          if (newIndex > 11) {
                            newIndex = 0;
                            newYear = String(parseInt(currentYear) + 1);
                          }
                          
                          setCurrentMonth(months[newIndex]);
                          setCurrentYear(newYear);
                        }}
                      >
                        <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    <div className="relative">
                      <select
                        value={`${currentMonth}, ${currentYear}`}
                        onChange={(e) => {
                          const [month, year] = e.target.value.split(', ');
                          setCurrentMonth(month);
                          setCurrentYear(year);
                        }}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                      >
                        <option value="Setembro, 2025">Setembro, 2025</option>
                        <option value="Outubro, 2025">Outubro, 2025</option>
                        <option value="Novembro, 2025">Novembro, 2025</option>
                        <option value="Dezembro, 2025">Dezembro, 2025</option>
                        <option value="Janeiro, 2026">Janeiro, 2026</option>
                        <option value="Fevereiro, 2026">Fevereiro, 2026</option>
                      </select>
                      <Icon 
                        icon="solar:alt-arrow-down-linear" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Visualização</span>
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <button
                        type="button"
                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                          viewMode === 'week' 
                            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => setViewMode('week')}
                      >
                        Semana
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                          viewMode === 'month' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => setViewMode('month')}
                      >
                        Mês
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                      <div key={day} className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Content - Conditional based on view mode */}
                  {viewMode === 'month' ? (
                    /* Month View - Outubro 2025 */
                    <div className="grid grid-cols-7">
                      {(() => {
                        // Outubro 2025 começa numa quarta-feira (dia 1)
                        // Precisamos de 3 dias vazios no início (Dom, Seg, Ter)
                        const calendarDays = [];
                        
                        // Dias vazios do mês anterior (setembro)
                        for (let i = 0; i < 3; i++) {
                          const emptyDate = 28 + i; // 28, 29, 30 de setembro
                          calendarDays.push(
                            <div key={`empty-${i}`} className="border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 min-h-[140px] p-3 bg-gray-50/50 dark:bg-gray-800/50">
                              <div className="text-sm text-gray-400 dark:text-gray-500 mb-3">
                                {emptyDate}
                              </div>
                            </div>
                          );
                        }
                        
                        // Dias de outubro (1-31)
                        for (let day = 1; day <= 31; day++) {
                          const dayData = mockScheduleData.find(d => parseInt(d.date) === day);
                          const isToday = day === 15; // Simulando que hoje é dia 15
                          
                          calendarDays.push(
                            <div key={day} className={`border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 min-h-[140px] p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                              <div className={`text-sm font-semibold mb-3 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                {day}
                                {isToday && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                                )}
                              </div>
                              <div className="space-y-1">
                                {dayData?.subjects.slice(0, 2).map((subject: any, subIndex: number) => {
                                  const colors = subjectColors[subject.name as keyof typeof subjectColors] || subjectColors['Revisão'];
                                  return (
                                    <div 
                                      key={subIndex}
                                      className={`text-xs px-2 py-1 rounded-md border ${colors.bg} ${colors.text} ${colors.border} cursor-pointer hover:shadow-sm transition-all group`}
                                      title={`${subject.name} - ${subject.time} (${subject.type})`}
                                    >
                                      <div className="font-medium truncate">{subject.name}</div>
                                      <div className="text-xs opacity-75 mt-0.5">{subject.time}</div>
                                    </div>
                                  );
                                })}
                                {dayData && dayData.subjects.length > 2 && (
                                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                                    +{dayData.subjects.length - 2} mais
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }
                        
                        // Completar a última semana se necessário (novembro)
                        const totalCells = calendarDays.length;
                        const remainingCells = 42 - totalCells; // 6 semanas * 7 dias = 42 células
                        
                        for (let i = 1; i <= remainingCells && i <= 7; i++) {
                          calendarDays.push(
                            <div key={`next-${i}`} className="border-r border-b border-gray-200 dark:border-gray-700 last:border-r-0 min-h-[140px] p-3 bg-gray-50/50 dark:bg-gray-800/50">
                              <div className="text-sm text-gray-400 dark:text-gray-500 mb-3">
                                {i}
                              </div>
                            </div>
                          );
                        }
                        
                        return calendarDays;
                      })()}
                    </div>
                  ) : (
                     /* Week View - Lista de atividades da semana */
                     <div className="space-y-4 p-6">
                       {(() => {
                         // Semana de 13-19 de outubro (semana que contém o dia 15)
                         const weekDays = [13, 14, 15, 16, 17, 18, 19];
                         const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                         
                         return weekDays.map((day, index) => {
                           const dayData = mockScheduleData.find(d => parseInt(d.date) === day);
                           const isToday = day === 15; // Simulando que hoje é dia 15
                           const dayName = dayNames[index];
                           
                           if (!dayData || dayData.subjects.length === 0) {
                             return (
                               <div key={day} className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                                 <div className="flex items-center justify-between mb-2">
                                   <h4 className={`font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                     {dayName}, {day} de Outubro
                                     {isToday && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Hoje</span>}
                                   </h4>
                                 </div>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhuma atividade programada</p>
                               </div>
                             );
                           }
                           
                           return (
                             <div key={day} className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : 'bg-white dark:bg-gray-800'}`}>
                               <div className="flex items-center justify-between mb-4">
                                 <h4 className={`font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                   {dayName}, {day} de Outubro
                                   {isToday && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Hoje</span>}
                                 </h4>
                                 <span className="text-sm text-gray-500 dark:text-gray-400">
                                   {dayData.subjects.length} atividade{dayData.subjects.length > 1 ? 's' : ''}
                                 </span>
                               </div>
                               
                               <div className="space-y-3">
                                 {dayData.subjects.map((subject: any, subIndex: number) => {
                                   const colors = subjectColors[subject.name as keyof typeof subjectColors] || subjectColors['Revisão'];
                                   return (
                                     <div 
                                       key={subIndex}
                                       className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border} hover:shadow-sm transition-all cursor-pointer group`}
                                     >
                                       <div className="flex items-center space-x-3">
                                         <div className={`w-4 h-4 rounded-full ${colors.bg} ${colors.border} border-2 flex-shrink-0`}></div>
                                         <div>
                                           <h5 className={`font-medium ${colors.text}`}>{subject.name}</h5>
                                           <p className={`text-sm ${colors.text} opacity-75`}>{subject.type}</p>
                                         </div>
                                       </div>
                                       <div className="text-right">
                                         <p className={`text-sm font-medium ${colors.text}`}>{subject.time}</p>
                                         <p className={`text-xs ${colors.text} opacity-60`}>
                                           {subject.duration || '1h'}
                                         </p>
                                       </div>
                                     </div>
                                   );
                                 })}
                               </div>
                             </div>
                           );
                         });
                       })()}
                     </div>
                  )}
                </div>
              </div>

              {/* Quadro de Resumo das Disciplinas */}
              <div className="mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resumo das Disciplinas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Visão geral do progresso e planejamento</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Disciplina</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Conteúdo Total</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Previsão de Término</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Prioridade</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Planos de Estudo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            disciplina: 'Matemática',
                            conteudoTotal: '24 tópicos, 96 subtópicos',
                            previsaoTermino: '15 de Dezembro, 2025',
                            prioridade: 'Alta',
                            planosEstudo: 'Revisão Intensiva, Exercícios Práticos'
                          },
                          {
                            disciplina: 'Física',
                            conteudoTotal: '18 tópicos, 72 subtópicos',
                            previsaoTermino: '20 de Novembro, 2025',
                            prioridade: 'Alta',
                            planosEstudo: 'Teoria + Laboratório, Simulações'
                          },
                          {
                            disciplina: 'Química',
                            conteudoTotal: '15 tópicos, 60 subtópicos',
                            previsaoTermino: '10 de Novembro, 2025',
                            prioridade: 'Média',
                            planosEstudo: 'Estudo Teórico, Experimentos'
                          },
                          {
                            disciplina: 'Biologia',
                            conteudoTotal: '12 tópicos, 48 subtópicos',
                            previsaoTermino: '25 de Outubro, 2025',
                            prioridade: 'Média',
                            planosEstudo: 'Leitura Dirigida, Mapas Mentais'
                          },
                          {
                            disciplina: 'História',
                            conteudoTotal: '20 tópicos, 80 subtópicos',
                            previsaoTermino: '30 de Novembro, 2025',
                            prioridade: 'Baixa',
                            planosEstudo: 'Cronologia, Análise de Fontes'
                          }
                        ].map((item, index) => {
                          const colors = subjectColors[item.disciplina as keyof typeof subjectColors] || subjectColors['Revisão'];
                          const prioridadeColors = {
                            'Alta': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
                            'Média': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
                            'Baixa': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          };
                          
                          return (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${colors.bg} ${colors.border} border`}></div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.disciplina}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                {item.conteudoTotal}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                {item.previsaoTermino}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${prioridadeColors[item.prioridade as keyof typeof prioridadeColors]}`}>
                                  {item.prioridade}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                {item.planosEstudo}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>



              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex items-center space-x-2"
                  onClick={() => setCurrentStep(5)}
                >
                  <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => {
                    // Finalizar cronograma
                    alert('🎉 Cronograma criado com sucesso!');
                  }}
                >
                  <span>Finalizar</span>
                  <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CriarCronogramaPage;