import { useState, useEffect, useCallback, useRef } from 'react';
import { StudyDisciplineWithTopics, StudyTopic, StudyTopicSession, StudyTopicStats, StudyTopicStatus } from '../types/cronograma/studyTopic';

const STORAGE_KEY = 'study-topic-timer-data';

interface UseStudyTopicTimerReturn {
  disciplines: StudyDisciplineWithTopics[];
  stats: StudyTopicStats;
  addDiscipline: (discipline: Omit<StudyDisciplineWithTopics, 'id' | 'topics' | 'totalStudyTime' | 'createdAt' | 'updatedAt'>) => void;
  updateDiscipline: (id: string, updates: Partial<StudyDisciplineWithTopics>) => void;
  deleteDiscipline: (id: string) => void;
  addTopic: (disciplineId: string, topic: Omit<StudyTopic, 'id' | 'disciplineId' | 'totalStudyTime' | 'isTimerRunning' | 'sessions' | 'createdAt' | 'updatedAt'>) => void;
  updateTopic: (disciplineId: string, topicId: string, updates: Partial<StudyTopic>) => void;
  deleteTopic: (disciplineId: string, topicId: string) => void;
  startTopicTimer: (disciplineId: string, topicId: string) => void;
  stopTopicTimer: (disciplineId: string, topicId: string) => void;
  resetTopicTimer: (disciplineId: string, topicId: string) => void;
  completeTopicStudy: (disciplineId: string, topicId: string) => void;
  getFormattedTime: (milliseconds: number) => string;
  getCurrentTopicTime: (disciplineId: string, topicId: string) => number;
  toggleDisciplineExpansion: (disciplineId: string) => void;
}

export const useStudyTopicTimer = (): UseStudyTopicTimerReturn => {
  const [disciplines, setDisciplines] = useState<StudyDisciplineWithTopics[]>([]);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Gerar ID único
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setDisciplines(parsedData.disciplines || []);
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    const dataToSave = {
      disciplines,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [disciplines]);

  // Formatar tempo
  const getFormattedTime = useCallback((milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Adicionar disciplina
  const addDiscipline = useCallback((disciplineData: Omit<StudyDisciplineWithTopics, 'id' | 'topics' | 'totalStudyTime' | 'createdAt' | 'updatedAt'>) => {
    const newDiscipline: StudyDisciplineWithTopics = {
      ...disciplineData,
      id: generateId(),
      topics: [],
      totalStudyTime: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isExpanded: true,
    };

    setDisciplines(prev => [...prev, newDiscipline]);
  }, []);

  // Atualizar disciplina
  const updateDiscipline = useCallback((id: string, updates: Partial<StudyDisciplineWithTopics>) => {
    setDisciplines(prev => prev.map(discipline => 
      discipline.id === id 
        ? { ...discipline, ...updates, updatedAt: new Date().toISOString() }
        : discipline
    ));
  }, []);

  // Deletar disciplina
  const deleteDiscipline = useCallback((id: string) => {
    // Parar todos os timers da disciplina
    const discipline = disciplines.find(d => d.id === id);
    if (discipline) {
      discipline.topics.forEach(topic => {
        const timerKey = `${id}-${topic.id}`;
        if (intervalRefs.current[timerKey]) {
          clearInterval(intervalRefs.current[timerKey]);
          delete intervalRefs.current[timerKey];
        }
      });
    }

    setDisciplines(prev => prev.filter(discipline => discipline.id !== id));
  }, [disciplines]);

  // Adicionar tópico
  const addTopic = useCallback((disciplineId: string, topicData: Omit<StudyTopic, 'id' | 'disciplineId' | 'totalStudyTime' | 'isTimerRunning' | 'sessions' | 'createdAt' | 'updatedAt'>) => {
    const newTopic: StudyTopic = {
      ...topicData,
      id: generateId(),
      disciplineId,
      totalStudyTime: 0,
      isTimerRunning: false,
      sessions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDisciplines(prev => prev.map(discipline => 
      discipline.id === disciplineId
        ? { 
            ...discipline, 
            topics: [...discipline.topics, newTopic],
            updatedAt: new Date().toISOString()
          }
        : discipline
    ));
  }, []);

  // Atualizar tópico
  const updateTopic = useCallback((disciplineId: string, topicId: string, updates: Partial<StudyTopic>) => {
    setDisciplines(prev => prev.map(discipline => 
      discipline.id === disciplineId
        ? {
            ...discipline,
            topics: discipline.topics.map(topic =>
              topic.id === topicId
                ? { ...topic, ...updates, updatedAt: new Date().toISOString() }
                : topic
            ),
            updatedAt: new Date().toISOString()
          }
        : discipline
    ));
  }, []);

  // Deletar tópico
  const deleteTopic = useCallback((disciplineId: string, topicId: string) => {
    const timerKey = `${disciplineId}-${topicId}`;
    if (intervalRefs.current[timerKey]) {
      clearInterval(intervalRefs.current[timerKey]);
      delete intervalRefs.current[timerKey];
    }

    setDisciplines(prev => prev.map(discipline => 
      discipline.id === disciplineId
        ? {
            ...discipline,
            topics: discipline.topics.filter(topic => topic.id !== topicId),
            updatedAt: new Date().toISOString()
          }
        : discipline
    ));
  }, []);

  // Iniciar timer do tópico
  const startTopicTimer = useCallback((disciplineId: string, topicId: string) => {
    const now = Date.now();
    const timerKey = `${disciplineId}-${topicId}`;

    // Atualizar estado do tópico
    updateTopic(disciplineId, topicId, {
      isTimerRunning: true,
      currentSessionStart: now,
      status: 'in_progress' as StudyTopicStatus
    });

    // Criar intervalo para atualizar o timer
    intervalRefs.current[timerKey] = setInterval(() => {
      // O tempo atual será calculado dinamicamente na função getCurrentTopicTime
    }, 1000);
  }, [updateTopic]);

  // Parar timer do tópico
  const stopTopicTimer = useCallback((disciplineId: string, topicId: string) => {
    const now = Date.now();
    const timerKey = `${disciplineId}-${topicId}`;

    setDisciplines(prev => prev.map(discipline => {
      if (discipline.id === disciplineId) {
        const updatedTopics = discipline.topics.map(topic => {
          if (topic.id === topicId && topic.isTimerRunning && topic.currentSessionStart) {
            const sessionDuration = now - topic.currentSessionStart;
            const newSession: StudyTopicSession = {
              id: generateId(),
              topicId: topic.id,
              startTime: topic.currentSessionStart,
              endTime: now,
              duration: sessionDuration,
              date: new Date().toISOString().split('T')[0],
            };

            return {
              ...topic,
              isTimerRunning: false,
              currentSessionStart: undefined,
              totalStudyTime: topic.totalStudyTime + sessionDuration,
              sessions: [...topic.sessions, newSession],
              updatedAt: new Date().toISOString(),
            };
          }
          return topic;
        });

        // Recalcular tempo total da disciplina
        const totalDisciplineTime = updatedTopics.reduce((sum, topic) => sum + topic.totalStudyTime, 0);

        return {
          ...discipline,
          topics: updatedTopics,
          totalStudyTime: totalDisciplineTime,
          updatedAt: new Date().toISOString()
        };
      }
      return discipline;
    }));

    // Limpar intervalo
    if (intervalRefs.current[timerKey]) {
      clearInterval(intervalRefs.current[timerKey]);
      delete intervalRefs.current[timerKey];
    }
  }, []);

  // Resetar timer do tópico
  const resetTopicTimer = useCallback((disciplineId: string, topicId: string) => {
    const timerKey = `${disciplineId}-${topicId}`;
    
    // Parar timer se estiver rodando
    if (intervalRefs.current[timerKey]) {
      clearInterval(intervalRefs.current[timerKey]);
      delete intervalRefs.current[timerKey];
    }

    updateTopic(disciplineId, topicId, {
      isTimerRunning: false,
      currentSessionStart: undefined,
      totalStudyTime: 0,
      sessions: [],
      status: 'not_studied' as StudyTopicStatus
    });
  }, [updateTopic]);

  // Marcar tópico como concluído
  const completeTopicStudy = useCallback((disciplineId: string, topicId: string) => {
    // Se o timer estiver rodando, parar primeiro
    const discipline = disciplines.find(d => d.id === disciplineId);
    const topic = discipline?.topics.find(t => t.id === topicId);
    
    if (topic?.isTimerRunning) {
      stopTopicTimer(disciplineId, topicId);
    }

    updateTopic(disciplineId, topicId, {
      status: 'completed' as StudyTopicStatus
    });
  }, [disciplines, stopTopicTimer, updateTopic]);

  // Obter tempo atual do tópico
  const getCurrentTopicTime = useCallback((disciplineId: string, topicId: string): number => {
    const discipline = disciplines.find(d => d.id === disciplineId);
    const topic = discipline?.topics.find(t => t.id === topicId);
    
    if (!topic) return 0;

    if (topic.isTimerRunning && topic.currentSessionStart) {
      const currentSessionTime = Date.now() - topic.currentSessionStart;
      return topic.totalStudyTime + currentSessionTime;
    }

    return topic.totalStudyTime;
  }, [disciplines]);

  // Toggle expansão da disciplina
  const toggleDisciplineExpansion = useCallback((disciplineId: string) => {
    updateDiscipline(disciplineId, {
      isExpanded: !disciplines.find(d => d.id === disciplineId)?.isExpanded
    });
  }, [disciplines, updateDiscipline]);

  // Calcular estatísticas
  const stats: StudyTopicStats = {
    totalTopics: disciplines.reduce((sum, discipline) => sum + discipline.topics.length, 0),
    notStudiedTopics: disciplines.reduce((sum, discipline) => 
      sum + discipline.topics.filter(topic => topic.status === 'not_studied').length, 0),
    inProgressTopics: disciplines.reduce((sum, discipline) => 
      sum + discipline.topics.filter(topic => topic.status === 'in_progress').length, 0),
    completedTopics: disciplines.reduce((sum, discipline) => 
      sum + discipline.topics.filter(topic => topic.status === 'completed').length, 0),
    totalStudyTime: disciplines.reduce((sum, discipline) => sum + discipline.totalStudyTime, 0),
    todayStudyTime: disciplines.reduce((sum, discipline) => {
      const today = new Date().toISOString().split('T')[0];
      return sum + discipline.topics.reduce((topicSum, topic) => {
        const todaySessions = topic.sessions.filter(session => session.date === today);
        return topicSum + todaySessions.reduce((sessionSum, session) => sessionSum + session.duration, 0);
      }, 0);
    }, 0),
    weekStudyTime: disciplines.reduce((sum, discipline) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sum + discipline.topics.reduce((topicSum, topic) => {
        const weekSessions = topic.sessions.filter(session => new Date(session.date) >= weekAgo);
        return topicSum + weekSessions.reduce((sessionSum, session) => sessionSum + session.duration, 0);
      }, 0);
    }, 0),
    averageSessionTime: (() => {
      const allSessions = disciplines.flatMap(discipline => 
        discipline.topics.flatMap(topic => topic.sessions)
      );
      return allSessions.length > 0 
        ? allSessions.reduce((sum, session) => sum + session.duration, 0) / allSessions.length
        : 0;
    })(),
    totalSessions: disciplines.reduce((sum, discipline) => 
      sum + discipline.topics.reduce((topicSum, topic) => topicSum + topic.sessions.length, 0), 0),
    disciplineStats: disciplines.reduce((stats, discipline) => {
      const completedTopics = discipline.topics.filter(topic => topic.status === 'completed').length;
      const totalTopics = discipline.topics.length;
      
      stats[discipline.id] = {
        totalTime: discipline.totalStudyTime,
        completedTopics,
        totalTopics,
        progress: totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0,
      };
      
      return stats;
    }, {} as StudyTopicStats['disciplineStats']),
  };

  // Limpar intervalos quando componente for desmontado
  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []);

  return {
    disciplines,
    stats,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    addTopic,
    updateTopic,
    deleteTopic,
    startTopicTimer,
    stopTopicTimer,
    resetTopicTimer,
    completeTopicStudy,
    getFormattedTime,
    getCurrentTopicTime,
    toggleDisciplineExpansion,
  };
};