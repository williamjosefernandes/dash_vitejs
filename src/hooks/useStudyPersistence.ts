import { useState, useEffect } from 'react';
import { StudyItem, StudySession } from '../types/cronograma/studySession';

const STORAGE_KEY = 'study_sessions_data';

interface StudyPersistenceData {
  studyItems: StudyItem[];
  studySessions: StudySession[];
}

export const useStudyPersistence = () => {
  const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData: StudyPersistenceData = JSON.parse(storedData);
          setStudyItems(parsedData.studyItems || []);
          setStudySessions(parsedData.studySessions || []);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    };

    loadStoredData();
  }, []);

  // Salvar dados no localStorage sempre que houver mudanças
  const saveToStorage = (items: StudyItem[], sessions: StudySession[]) => {
    try {
      const dataToStore: StudyPersistenceData = {
        studyItems: items,
        studySessions: sessions
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  };

  // Atualizar item de estudo
  const updateStudyItem = (itemId: string, updates: Partial<StudyItem>) => {
    setStudyItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      );
      saveToStorage(updatedItems, studySessions);
      return updatedItems;
    });
  };

  // Adicionar sessão de estudo
  const addStudySession = (session: StudySession) => {
    setStudySessions(prevSessions => {
      const updatedSessions = [...prevSessions, session];
      saveToStorage(studyItems, updatedSessions);
      return updatedSessions;
    });
  };

  // Atualizar sessão de estudo
  const updateStudySession = (sessionId: string, updates: Partial<StudySession>) => {
    setStudySessions(prevSessions => {
      const updatedSessions = prevSessions.map(session =>
        session.id === sessionId ? { ...session, ...updates } : session
      );
      saveToStorage(studyItems, updatedSessions);
      return updatedSessions;
    });
  };

  // Obter tempo total estudado para um item
  const getTotalStudyTime = (itemId: string): number => {
    return studySessions
      .filter(session => session.contentId === itemId && session.endTime)
      .reduce((total, session) => {
        if (session.endTime) {
          return total + (session.endTime.getTime() - session.startTime.getTime());
        }
        return total;
      }, 0);
  };

  // Obter sessão ativa para um item
  const getActiveSession = (itemId: string): StudySession | undefined => {
    return studySessions.find(session => 
      session.contentId === itemId && !session.endTime
    );
  };

  // Inicializar dados mock se não houver dados salvos
  const initializeMockData = (mockItems: StudyItem[]) => {
    if (studyItems.length === 0) {
      setStudyItems(mockItems);
      saveToStorage(mockItems, []);
    }
  };

  return {
    studyItems,
    studySessions,
    updateStudyItem,
    addStudySession,
    updateStudySession,
    getTotalStudyTime,
    getActiveSession,
    initializeMockData,
    setStudyItems
  };
};