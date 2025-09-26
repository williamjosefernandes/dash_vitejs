import React from 'react';
import { Card, Badge, Button, Dropdown } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { HiDotsVertical, HiEye, HiStar, HiUsers, HiClock, HiAcademicCap, HiPlus } from 'react-icons/hi';
import { Trail } from '../../types/trails';

interface TrailCardProps {
  trail: Trail;
  onView?: (id: string) => void;
  onCreatePlan?: (trailId: string) => void;
}

const TrailCard: React.FC<TrailCardProps> = ({
  trail,
  onView,
  onCreatePlan
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'enem': return 'blue';
      case 'vestibular': return 'purple';
      case 'concurso': return 'amber';
      case 'graduacao': return 'green';
      case 'pos_graduacao': return 'orange';
      case 'certificacao': return 'indigo';
      case 'idiomas': return 'emerald';
      case 'tecnologia': return 'cyan';
      default: return 'gray';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basico': return 'green';
      case 'intermediario': return 'yellow';
      case 'avancado': return 'red';
      default: return 'gray';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'enem': return 'ENEM';
      case 'vestibular': return 'Vestibular';
      case 'concurso': return 'Concurso';
      case 'graduacao': return 'Graduação';
      case 'pos_graduacao': return 'Pós-graduação';
      case 'certificacao': return 'Certificação';
      case 'idiomas': return 'Idiomas';
      case 'tecnologia': return 'Tecnologia';
      default: return category;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'basico': return 'Básico';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      default: return difficulty;
    }
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const formatSuccessRate = (rate: number) => {
    return `${rate}% de aprovação`;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
      {/* Header do Card */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center min-w-0 flex-1">
          <div className={`p-2 rounded-lg bg-${trail.color}-100 dark:bg-${trail.color}-900 flex-shrink-0`}>
            <Icon 
              icon={trail.icon} 
              className={`h-6 w-6 text-${trail.color}-600 dark:text-${trail.color}-400`} 
            />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 break-words">
              {trail.title}
            </h3>
            <Badge color={getCategoryColor(trail.category)} size="sm" className="mt-1">
              {getCategoryLabel(trail.category)}
            </Badge>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<HiDotsVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />}
          >
            <Dropdown.Item onClick={() => onView?.(trail.id)}>
              <HiEye className="w-4 h-4 mr-2" />
              Visualizar Detalhes
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Rating e Estatísticas */}
        <div className="flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-1">
            <HiStar className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {trail.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({trail.reviewsCount})
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {formatSuccessRate(trail.successRate)}
          </span>
        </div>

        {/* Estatísticas */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
          <div className="flex items-center gap-1">
            <HiClock className="h-4 w-4" />
            <span className="truncate">{trail.totalHours}h • {formatDuration(trail.estimatedDuration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiUsers className="h-4 w-4" />
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {trail.enrolledStudents.toLocaleString()} alunos
            </span>
          </div>
        </div>

        {/* Badges de Dificuldade */}
        <div className="flex gap-2 flex-shrink-0">
          <Badge color={getDifficultyColor(trail.difficulty)} size="sm">
            {getDifficultyLabel(trail.difficulty)}
          </Badge>
          <Badge color="gray" size="sm">
            <HiAcademicCap className="w-3 h-3 mr-1" />
            {trail.subjects.length} disciplinas
          </Badge>
        </div>

        {/* Descrição */}
        {trail.shortDescription && (
          <div className="flex-1 flex items-start">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 break-words">
              {trail.shortDescription}
            </p>
          </div>
        )}

        {/* Botão Criar Plano */}
        <div className="flex-shrink-0 pt-2">
          <Button
            onClick={() => onCreatePlan?.(trail.id)}
            className="w-full"
            color="blue"
            size="sm"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            Criar Plano de Estudo
          </Button>
        </div>

        {/* Tags */}
        {trail.tags && trail.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 flex-shrink-0">
            {trail.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {trail.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{trail.tags.length - 3} mais
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TrailCard;