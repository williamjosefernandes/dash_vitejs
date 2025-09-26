import { useState, useEffect, useCallback, useRef } from 'react';
import { StudyTimer, StudySession, StudyDiscipline, StudyStats } from '../types/cronograma';

const STORAGE_KEY = 'study-timer-data';

interface UseStudyTimerReturn {
  disciplines: StudyDiscipline[];
  timers: StudyTimer[];
  stats: StudyStats;
  addDiscipline: (discipline: Omit<StudyDiscipline, 'id' | 'totalStudyTime' | 'createdAt' | 'updatedAt'>) => void;
  updateDiscipline: (id: string, updates: Partial<StudyDiscipline>) => void;
  deleteDiscipline: (id: string) => void;
  startTimer: (disciplineId: string) => void;
  stopTimer: (disciplineId: string) => void;
  resetTimer: (disciplineId: string) => void;
  getFormattedTime: (milliseconds: number) => string;
  isTimerRunning: (disciplineId: string) => boolean;
  getCurrentTime: (disciplineId: string) => number;
}

export const useStudyTimer = (): UseStudyTimerReturn => {
  const [disciplines, setDisciplines] = useState<StudyDiscipline[]>([]);
  const [timers, setTimers] = useState<StudyTimer[]>([]);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const { disciplines: savedDisciplines, timers: savedTimers } = JSON.parse(savedData);
        setDisciplines(savedDisciplines || []);
        setTimers(savedTimers || []);
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage
  const saveData = useCallback((newDisciplines: StudyDiscipline[], newTimers: StudyTimer[]) => {
    const dataToSave = {
      disciplines: newDisciplines,
      timers: newTimers,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, []);

  // Atualizar localStorage quando dados mudarem
  useEffect(() => {
    if (disciplines.length > 0 || timers.length > 0) {
      saveData(disciplines, timers);
    }
  }, [disciplines, timers, saveData]);

  // Função para gerar ID único
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Função para formatar tempo
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
  const addDiscipline = useCallback((disciplineData: Omit<StudyDiscipline, 'id' | 'totalStudyTime' | 'createdAt' | 'updatedAt'>) => {
    const newDiscipline: StudyDiscipline = {
      ...disciplineData,
      id: generateId(),
      totalStudyTime: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newTimer: StudyTimer = {
      id: generateId(),
      disciplineId: newDiscipline.id,
      isRunning: false,
      startTime: null,
      totalTime: 0,
      sessions: [],
    };

    setDisciplines(prev => [...prev, newDiscipline]);
    setTimers(prev => [...prev, newTimer]);
  }, []);

  // Atualizar disciplina
  const updateDiscipline = useCallback((id: string, updates: Partial<StudyDiscipline>) => {
    setDisciplines(prev => prev.map(discipline => 
      discipline.id === id 
        ? { ...discipline, ...updates, updatedAt: new Date().toISOString() }
        : discipline
    ));
  }, []);

  // Deletar disciplina
  const deleteDiscipline = useCallback((id: string) => {
    // Parar timer se estiver rodando
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }

    setDisciplines(prev => prev.filter(discipline => discipline.id !== id));
    setTimers(prev => prev.filter(timer => timer.disciplineId !== id));
  }, []);

  // Iniciar timer
  const startTimer = useCallback((disciplineId: string) => {
    const now = Date.now();
    
    setTimers(prev => prev.map(timer => 
      timer.disciplineId === disciplineId
        ? { ...timer, isRunning: true, startTime: now }
        : timer
    ));

    // Criar intervalo para atualizar o timer
    intervalRefs.current[disciplineId] = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.disciplineId === disciplineId && timer.isRunning && timer.startTime) {
          const currentTime = Date.now();
          const sessionTime = currentTime - timer.startTime;
          return { ...timer, totalTime: timer.totalTime + 1000 };
        }
        return timer;
      }));
    }, 1000);
  }, []);

  // Parar timer
  const stopTimer = useCallback((disciplineId: string) => {
    const now = Date.now();
    
    setTimers(prev => prev.map(timer => {
      if (timer.disciplineId === disciplineId && timer.isRunning && timer.startTime) {
        const sessionDuration = now - timer.startTime;
        const newSession: StudySession = {
          id: generateId(),
          startTime: timer.startTime,
          endTime: now,
          duration: sessionDuration,
          date: new Date().toISOString().split('T')[0],
        };

        // Limpar intervalo
        if (intervalRefs.current[disciplineId]) {
          clearInterval(intervalRefs.current[disciplineId]);
          delete intervalRefs.current[disciplineId];
        }

        return {
          ...timer,
          isRunning: false,
          startTime: null,
          totalTime: timer.totalTime + sessionDuration,
          sessions: [...timer.sessions, newSession],
        };
      }
      return timer;
    }));

    // Atualizar tempo total da disciplina
    setDisciplines(prev => prev.map(discipline => {
      if (discipline.id === disciplineId) {
        const timer = timers.find(t => t.disciplineId === disciplineId);
        if (timer && timer.startTime) {
          const sessionDuration = now - timer.startTime;
          return {
            ...discipline,
            totalStudyTime: discipline.totalStudyTime + sessionDuration,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return discipline;
    }));
  }, [timers]);

  // Resetar timer
  const resetTimer = useCallback((disciplineId: string) => {
    // Parar timer se estiver rodando
    if (intervalRefs.current[disciplineId]) {
      clearInterval(intervalRefs.current[disciplineId]);
      delete intervalRefs.current[disciplineId];
    }

    setTimers(prev => prev.map(timer => 
      timer.disciplineId === disciplineId
        ? { ...timer, isRunning: false, startTime: null, totalTime: 0, sessions: [] }
        : timer
    ));

    setDisciplines(prev => prev.map(discipline => 
      discipline.id === disciplineId
        ? { ...discipline, totalStudyTime: 0, updatedAt: new Date().toISOString() }
        : discipline
    ));
  }, []);

  // Verificar se timer está rodando
  const isTimerRunning = useCallback((disciplineId: string): boolean => {
    const timer = timers.find(t => t.disciplineId === disciplineId);
    return timer?.isRunning || false;
  }, [timers]);

  // Obter tempo atual do timer
  const getCurrentTime = useCallback((disciplineId: string): number => {
    const timer = timers.find(t => t.disciplineId === disciplineId);
    if (!timer) return 0;

    if (timer.isRunning && timer.startTime) {
      const currentSessionTime = Date.now() - timer.startTime;
      return timer.totalTime + currentSessionTime;
    }

    return timer.totalTime;
  }, [timers]);

  // Calcular estatísticas
  const stats: StudyStats = {
    totalTime: disciplines.reduce((sum, discipline) => sum + discipline.totalStudyTime, 0),
    todayTime: timers.reduce((sum, timer) => {
      const today = new Date().toISOString().split('T')[0];
      const todaySessions = timer.sessions.filter(session => session.date === today);
      return sum + todaySessions.reduce((sessionSum, session) => sessionSum + session.duration, 0);
    }, 0),
    weekTime: timers.reduce((sum, timer) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekSessions = timer.sessions.filter(session => new Date(session.date) >= weekAgo);
      return sum + weekSessions.reduce((sessionSum, session) => sessionSum + session.duration, 0);
    }, 0),
    monthTime: timers.reduce((sum, timer) => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      const monthSessions = timer.sessions.filter(session => new Date(session.date) >= monthAgo);
      return sum + monthSessions.reduce((sessionSum, session) => sessionSum + session.duration, 0);
    }, 0),
    averageSessionTime: timers.reduce((sum, timer) => sum + timer.sessions.length, 0) > 0
      ? timers.reduce((sum, timer) => sum + timer.sessions.reduce((sessionSum, session) => sessionSum + session.duration, 0), 0) /
        timers.reduce((sum, timer) => sum + timer.sessions.length, 0)
      : 0,
    totalSessions: timers.reduce((sum, timer) => sum + timer.sessions.length, 0),
    disciplineStats: disciplines.reduce((stats, discipline) => {
      const timer = timers.find(t => t.disciplineId === discipline.id);
      const lastSession = timer?.sessions.sort((a, b) => b.endTime - a.endTime)[0];
      
      stats[discipline.id] = {
        totalTime: discipline.totalStudyTime,
        sessions: timer?.sessions.length || 0,
        lastStudied: lastSession ? new Date(lastSession.endTime).toISOString() : '',
      };
      
      return stats;
    }, {} as StudyStats['disciplineStats']),
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
    timers,
    stats,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    startTimer,
    stopTimer,
    resetTimer,
    getFormattedTime,
    isTimerRunning,
    getCurrentTime,
  };
};