import { Review, ReviewSession, SpacedRepetitionSettings } from '../../types/gabaritte';

export const mockSpacedRepetitionSettings: SpacedRepetitionSettings = {
  easyInterval: 4,
  mediumInterval: 2,
  hardInterval: 1,
  graduatingInterval: 7,
  lapseInterval: 1,
  maximumInterval: 365
};

export const mockReviews: Review[] = [
  {
    id: 'rev1',
    subjectId: 'subj1',
    topicId: 'topic1',
    type: 'spaced_repetition',
    scheduledDate: '2024-02-01T09:00:00Z',
    completedDate: '2024-02-01T09:15:00Z',
    status: 'completed',
    difficulty: 'medium',
    confidence: 4,
    timeSpent: 15,
    nextReviewDate: '2024-02-05T09:00:00Z',
    notes: 'Conceitos de matrizes bem compreendidos',
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  },
  {
    id: 'rev2',
    subjectId: 'subj2',
    topicId: 'topic2',
    type: 'quick_review',
    scheduledDate: '2024-02-02T14:00:00Z',
    status: 'scheduled',
    difficulty: 'hard',
    confidence: 2,
    timeSpent: 0,
    nextReviewDate: '2024-02-03T14:00:00Z',
    createdAt: '2024-01-30T16:00:00Z',
    updatedAt: '2024-01-30T16:00:00Z'
  },
  {
    id: 'rev3',
    subjectId: 'subj3',
    topicId: 'topic3',
    type: 'deep_review',
    scheduledDate: '2024-02-01T16:00:00Z',
    completedDate: '2024-02-01T16:45:00Z',
    status: 'completed',
    difficulty: 'easy',
    confidence: 5,
    timeSpent: 45,
    nextReviewDate: '2024-02-08T16:00:00Z',
    notes: 'Química orgânica - nomenclatura dominada',
    createdAt: '2024-01-25T12:00:00Z',
    updatedAt: '2024-02-01T16:45:00Z'
  },
  {
    id: 'rev4',
    subjectId: 'subj1',
    topicId: 'topic1',
    type: 'practice',
    scheduledDate: '2024-02-03T10:00:00Z',
    status: 'overdue',
    difficulty: 'medium',
    confidence: 3,
    timeSpent: 0,
    createdAt: '2024-01-31T08:00:00Z',
    updatedAt: '2024-01-31T08:00:00Z'
  },
  {
    id: 'rev5',
    subjectId: 'subj4',
    topicId: 'topic4',
    type: 'spaced_repetition',
    scheduledDate: '2024-02-02T11:00:00Z',
    completedDate: '2024-02-02T11:20:00Z',
    status: 'completed',
    difficulty: 'easy',
    confidence: 4,
    timeSpent: 20,
    nextReviewDate: '2024-02-06T11:00:00Z',
    notes: 'Romantismo brasileiro - características bem fixadas',
    createdAt: '2024-01-29T14:00:00Z',
    updatedAt: '2024-02-02T11:20:00Z'
  }
];

export const mockReviewSessions: ReviewSession[] = [
  {
    id: 'session1',
    date: '2024-02-01',
    reviews: [mockReviews[0], mockReviews[2]],
    totalTime: 60,
    completedReviews: 2,
    averageConfidence: 4.5,
    status: 'completed'
  },
  {
    id: 'session2',
    date: '2024-02-02',
    reviews: [mockReviews[4]],
    totalTime: 20,
    completedReviews: 1,
    averageConfidence: 4,
    status: 'completed'
  },
  {
    id: 'session3',
    date: '2024-02-03',
    reviews: [mockReviews[1], mockReviews[3]],
    totalTime: 0,
    completedReviews: 0,
    averageConfidence: 0,
    status: 'active'
  }
];

// Funções auxiliares
export const getReviewsByStatus = (status: Review['status']): Review[] => {
  return mockReviews.filter(review => review.status === status);
};

export const getReviewsBySubject = (subjectId: string): Review[] => {
  return mockReviews.filter(review => review.subjectId === subjectId);
};

export const getOverdueReviews = (): Review[] => {
  return mockReviews.filter(review => review.status === 'overdue');
};

export const getTodayReviews = (): Review[] => {
  const today = new Date().toISOString().split('T')[0];
  return mockReviews.filter(review => 
    review.scheduledDate.startsWith(today) && review.status === 'scheduled'
  );
};

export const getReviewStats = () => {
  const total = mockReviews.length;
  const completed = mockReviews.filter(r => r.status === 'completed').length;
  const scheduled = mockReviews.filter(r => r.status === 'scheduled').length;
  const overdue = mockReviews.filter(r => r.status === 'overdue').length;
  
  return {
    total,
    completed,
    scheduled,
    overdue,
    completionRate: (completed / total) * 100
  };
};