import { DisciplineTableData } from '../../types/cronograma';

export interface StudyGoal {
  id: string;
  disciplineId: string;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  totalContent: number;
  completedContent: number;
  estimatedHoursPerContent: number;
}

export interface ScheduleDistribution {
  disciplineId: string;
  disciplineName: string;
  dailyHours: number;
  weeklyHours: number;
  priority: number;
  urgencyScore: number;
  completionDate: string;
  daysRemaining: number;
  contentRemaining: number;
}

export class ScheduleCalculator {
  /**
   * Calcula a distribuição ideal das disciplinas baseada nas datas dos objetivos
   */
  static calculateDistribution(
    disciplines: DisciplineTableData[],
    studyGoals: StudyGoal[],
    startDate: string,
    totalDailyHours: number,
    studyDaysPerWeek: number = 5
  ): ScheduleDistribution[] {
    const distributions: ScheduleDistribution[] = [];
    const currentDate = new Date();
    
    for (const discipline of disciplines) {
      const goal = studyGoals.find(g => g.disciplineId === discipline.id);
      const targetDate = new Date(this.parseDate(discipline.completionDate));
      const daysRemaining = Math.max(1, Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Calcula urgência baseada no tempo restante
      const urgencyScore = this.calculateUrgencyScore(daysRemaining, discipline.totalContent);
      
      // Calcula conteúdo restante
      const completedContent = goal?.completedContent || 0;
      const contentRemaining = discipline.totalContent - completedContent;
      
      // Estima horas necessárias por conteúdo (padrão: 1.5h por tópico)
      const hoursPerContent = goal?.estimatedHoursPerContent || 1.5;
      const totalHoursNeeded = contentRemaining * hoursPerContent;
      
      // Calcula horas diárias necessárias
      const workingDaysRemaining = Math.ceil(daysRemaining * (studyDaysPerWeek / 7));
      const dailyHoursNeeded = Math.max(0.5, totalHoursNeeded / workingDaysRemaining);
      
      distributions.push({
        disciplineId: discipline.id,
        disciplineName: discipline.name,
        dailyHours: Math.min(dailyHoursNeeded, totalDailyHours * 0.4), // Máximo 40% do tempo diário
        weeklyHours: dailyHoursNeeded * studyDaysPerWeek,
        priority: this.calculatePriority(urgencyScore, goal?.priority || 'medium'),
        urgencyScore,
        completionDate: discipline.completionDate,
        daysRemaining,
        contentRemaining
      });
    }
    
    // Normaliza as horas para não exceder o tempo total disponível
    return this.normalizeDistribution(distributions, totalDailyHours);
  }
  
  /**
   * Calcula o score de urgência baseado no tempo restante e quantidade de conteúdo
   */
  private static calculateUrgencyScore(daysRemaining: number, totalContent: number): number {
    // Score base: quanto menos dias, maior a urgência
    const timeScore = Math.max(0, 100 - (daysRemaining / 30) * 100);
    
    // Score de conteúdo: quanto mais conteúdo, maior a urgência
    const contentScore = Math.min(100, (totalContent / 50) * 100);
    
    // Combina os scores com peso maior para tempo
    return (timeScore * 0.7) + (contentScore * 0.3);
  }
  
  /**
   * Calcula a prioridade numérica baseada na urgência e prioridade definida
   */
  private static calculatePriority(urgencyScore: number, priority: string): number {
    const priorityWeights = {
      'high': 3,
      'medium': 2,
      'low': 1
    };
    
    const baseWeight = priorityWeights[priority as keyof typeof priorityWeights] || 2;
    return Math.round((urgencyScore / 100) * baseWeight * 10);
  }
  
  /**
   * Normaliza a distribuição para não exceder o tempo total disponível
   */
  private static normalizeDistribution(
    distributions: ScheduleDistribution[],
    totalDailyHours: number
  ): ScheduleDistribution[] {
    const totalRequestedHours = distributions.reduce((sum, d) => sum + d.dailyHours, 0);
    
    if (totalRequestedHours <= totalDailyHours) {
      return distributions.sort((a, b) => b.priority - a.priority);
    }
    
    // Se exceder, redistribui proporcionalmente baseado na prioridade
    const totalPriority = distributions.reduce((sum, d) => sum + d.priority, 0);
    
    return distributions.map(dist => ({
      ...dist,
      dailyHours: (dist.priority / totalPriority) * totalDailyHours,
      weeklyHours: ((dist.priority / totalPriority) * totalDailyHours) * 5
    })).sort((a, b) => b.priority - a.priority);
  }
  
  /**
   * Gera cronograma semanal baseado na distribuição calculada
   */
  static generateWeeklySchedule(
    distributions: ScheduleDistribution[],
    weekDays: string[],
    startTime: string = '08:00',
    sessionDuration: number = 1.5
  ): any[] {
    const schedule: any[] = [];
    let currentTime = this.parseTime(startTime);
    
    for (const day of weekDays) {
      const daySchedule: any[] = [];
      let dayTime = currentTime;
      
      for (const dist of distributions) {
        if (dist.dailyHours >= sessionDuration) {
          const sessions = Math.floor(dist.dailyHours / sessionDuration);
          
          for (let i = 0; i < sessions; i++) {
            daySchedule.push({
              time: this.formatTime(dayTime),
              subject: dist.disciplineName,
              duration: `${sessionDuration}h`,
              priority: dist.priority,
              urgency: dist.urgencyScore
            });
            
            dayTime += sessionDuration * 60; // Adiciona minutos
          }
        }
      }
      
      schedule.push({
        day,
        sessions: daySchedule
      });
    }
    
    return schedule;
  }
  
  /**
   * Utilitários para manipulação de data e hora
   */
  private static parseDate(dateStr: string): string {
    // Converte formato DD/MM/YYYY para YYYY-MM-DD
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  private static parseTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  private static formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  
  /**
   * Calcula estatísticas do cronograma
   */
  static calculateScheduleStats(distributions: ScheduleDistribution[]): {
    totalWeeklyHours: number;
    averageDailyHours: number;
    highPrioritySubjects: number;
    estimatedCompletionDate: string;
    workloadBalance: 'balanced' | 'heavy' | 'light';
  } {
    const totalWeeklyHours = distributions.reduce((sum, d) => sum + d.weeklyHours, 0);
    const averageDailyHours = totalWeeklyHours / 5;
    const highPrioritySubjects = distributions.filter(d => d.priority >= 20).length;
    
    // Encontra a data de conclusão mais distante
    const latestDate = distributions.reduce((latest, current) => {
      const currentDate = new Date(this.parseDate(current.completionDate));
      const latestDate = new Date(this.parseDate(latest));
      return currentDate > latestDate ? current.completionDate : latest;
    }, distributions[0]?.completionDate || '01/01/2025');
    
    // Determina o equilíbrio da carga de trabalho
    let workloadBalance: 'balanced' | 'heavy' | 'light' = 'balanced';
    if (averageDailyHours > 8) workloadBalance = 'heavy';
    else if (averageDailyHours < 4) workloadBalance = 'light';
    
    return {
      totalWeeklyHours: Math.round(totalWeeklyHours * 10) / 10,
      averageDailyHours: Math.round(averageDailyHours * 10) / 10,
      highPrioritySubjects,
      estimatedCompletionDate: latestDate,
      workloadBalance
    };
  }
}