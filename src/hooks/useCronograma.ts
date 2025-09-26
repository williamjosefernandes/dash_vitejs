import { useState, useCallback } from 'react';
import { CronogramaItem, CronogramaFormData } from '../types/cronograma';

// Mock data inicial
const initialCronogramas: CronogramaItem[] = [
  {
    id: '1',
    title: 'Cronograma de Matemática - Ensino Médio',
    description: 'Cronograma completo para revisão de matemática do ensino médio, incluindo álgebra, geometria e trigonometria.',
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    status: 'Ativo',
    priority: 'Alta',
    totalHours: 120,
    completedHours: 45,
    subjects: ['Álgebra', 'Geometria', 'Trigonometria', 'Estatística'],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    progress: 37.5
  },
  {
    id: '2',
    title: 'Preparação para ENEM - Linguagens',
    description: 'Cronograma focado em português, literatura e redação para o ENEM.',
    startDate: '2024-02-01',
    endDate: '2024-11-01',
    status: 'Ativo',
    priority: 'Alta',
    totalHours: 200,
    completedHours: 80,
    subjects: ['Português', 'Literatura', 'Redação', 'Inglês'],
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-02-10T14:20:00Z',
    progress: 40
  },
  {
    id: '3',
    title: 'Ciências da Natureza - Revisão',
    description: 'Revisão completa de física, química e biologia.',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Pausado',
    priority: 'Média',
    totalHours: 300,
    completedHours: 90,
    subjects: ['Física', 'Química', 'Biologia'],
    createdAt: '2023-12-20T08:00:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    progress: 30
  }
];

export const useCronograma = () => {
  const [cronogramas, setCronogramas] = useState<CronogramaItem[]>(initialCronogramas);

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const calculateProgress = (completedHours: number, totalHours: number): number => {
    return totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;
  };

  const create = useCallback((data: CronogramaFormData) => {
    const newCronograma: CronogramaItem = {
      ...data,
      id: generateId(),
      completedHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0
    };

    setCronogramas(prev => [...prev, newCronograma]);
  }, []);

  const update = useCallback((id: string, data: Partial<CronogramaFormData>) => {
    setCronogramas(prev => prev.map(cronograma => {
      if (cronograma.id === id) {
        const updated = { ...cronograma, ...data, updatedAt: new Date().toISOString() };
        
        // Recalcular progresso se totalHours foi alterado
        if (data.totalHours !== undefined) {
          updated.progress = calculateProgress(updated.completedHours, updated.totalHours);
        }
        
        return updated;
      }
      return cronograma;
    }));
  }, []);

  const updateProgress = useCallback((id: string, completedHours: number) => {
    setCronogramas(prev => prev.map(cronograma => {
      if (cronograma.id === id) {
        const progress = calculateProgress(completedHours, cronograma.totalHours);
        return {
          ...cronograma,
          completedHours,
          progress,
          updatedAt: new Date().toISOString()
        };
      }
      return cronograma;
    }));
  }, []);

  const deleteCronograma = useCallback((id: string) => {
    setCronogramas(prev => prev.filter(cronograma => cronograma.id !== id));
  }, []);

  const getById = useCallback((id: string): CronogramaItem | undefined => {
    return cronogramas.find(cronograma => cronograma.id === id);
  }, [cronogramas]);

  const getAll = useCallback((): CronogramaItem[] => {
    return cronogramas;
  }, [cronogramas]);

  const getByStatus = useCallback((status: CronogramaItem['status']): CronogramaItem[] => {
    return cronogramas.filter(cronograma => cronograma.status === status);
  }, [cronogramas]);

  const getByPriority = useCallback((priority: CronogramaItem['priority']): CronogramaItem[] => {
    return cronogramas.filter(cronograma => cronograma.priority === priority);
  }, [cronogramas]);

  const searchByTitle = useCallback((searchTerm: string): CronogramaItem[] => {
    return cronogramas.filter(cronograma => 
      cronograma.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cronograma.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cronogramas]);

  return {
    cronogramas,
    create,
    update,
    updateProgress,
    delete: deleteCronograma,
    getById,
    getAll,
    getByStatus,
    getByPriority,
    searchByTitle
  };
};