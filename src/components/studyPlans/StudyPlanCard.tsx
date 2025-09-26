import React from 'react';
import { Card, Badge, Progress, Button, Dropdown } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiDotsVertical, HiPlay, HiPause, HiEye, HiPencil, HiTrash, HiClock, HiTrendingUp, HiAcademicCap } from 'react-icons/hi';
import { StudyPlan } from '../../types/studyPlans';

interface StudyPlanCardProps {
  studyPlan: StudyPlan;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({
  studyPlan,
  onView,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'blue';
      case 'design': return 'purple';
      case 'marketing': return 'green';
      case 'business': return 'yellow';
      case 'data': return 'indigo';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'success';
      case 'pausado': return 'warning';
      case 'concluído': return 'info';
      default: return 'gray';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'iniciante': return 'green';
      case 'intermediario': return 'yellow';
      case 'avancado': return 'red';
      default: return 'gray';
    }
  };

  const calculateDaysRemaining = () => {
    if (!studyPlan.endDate) return null;
    const today = new Date();
    const endDate = new Date(studyPlan.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
      {/* Header do Card */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center min-w-0 flex-1">
          <div className={`p-2 rounded-lg bg-${studyPlan.color}-100 dark:bg-${studyPlan.color}-900 flex-shrink-0`}>
            <Icon 
              icon={studyPlan.icon} 
              className={`h-6 w-6 text-${studyPlan.color}-600 dark:text-${studyPlan.color}-400`} 
            />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 break-words">
              {studyPlan.title}
            </h3>
            <Badge color={getCategoryColor(studyPlan.category)} size="sm" className="mt-1">
              {studyPlan.category.charAt(0).toUpperCase() + studyPlan.category.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<HiDotsVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />}
          >
            <Dropdown.Item onClick={() => onView?.(studyPlan.id)}>
              <HiEye className="w-4 h-4 mr-2" />
              Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onEdit?.(studyPlan.id)}>
              <HiPencil className="w-4 h-4 mr-2" />
              Editar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onToggleStatus?.(studyPlan.id)}>
              {studyPlan.status === 'ativo' ? (
                <>
                  <HiPause className="w-4 h-4 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <HiPlay className="w-4 h-4 mr-2" />
                  Retomar
                </>
              )}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => onDelete?.(studyPlan.id)} className="text-red-600">
              <HiTrash className="w-4 h-4 mr-2" />
              Excluir
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Status e Progresso */}
        <div className="flex justify-between items-center flex-shrink-0">
          <Badge color={getStatusColor(studyPlan.status)}>
            {studyPlan.status.charAt(0).toUpperCase() + studyPlan.status.slice(1)}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {studyPlan.progress}%
          </span>
        </div>

        <div className="flex-shrink-0">
          <Progress progress={studyPlan.progress} color={studyPlan.color} />
        </div>

        {/* Estatísticas */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
          <span className="truncate">{studyPlan.completedHours}h / {studyPlan.totalHours}h</span>
          {daysRemaining !== null && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {daysRemaining} dias
            </span>
          )}
        </div>

        {/* Badges de Dificuldade */}
        <div className="flex gap-2 flex-shrink-0">
          <Badge color={getDifficultyColor(studyPlan.difficulty)} size="sm">
            {studyPlan.difficulty === 'iniciante' ? 'Iniciante' : 
             studyPlan.difficulty === 'intermediario' ? 'Intermediário' : 'Avançado'}
          </Badge>
        </div>

        {/* Descrição */}
        {studyPlan.description && (
          <div className="flex-1 flex items-start">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 break-words">
              {studyPlan.description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StudyPlanCard;