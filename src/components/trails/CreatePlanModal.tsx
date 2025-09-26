import React, { useState } from 'react';
import { Modal, Button, TextInput, Textarea, Select, Alert } from 'flowbite-react';
import { HiX, HiPlus, HiInformationCircle } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { Trail } from '../../types/trails';
import { StudyPlan, StudyPlanCategory, StudyPlanDifficulty } from '../../types/studyPlans';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  trail: Trail | null;
  onCreatePlan: (planData: Partial<StudyPlan>) => void;
}

interface PlanFormData {
  title: string;
  description: string;
  category: StudyPlanCategory;
  difficulty: StudyPlanDifficulty;
  dailyHours: number;
  startDate: string;
  endDate: string;
}

const CreatePlanModal: React.FC<CreatePlanModalProps> = ({
  isOpen,
  onClose,
  trail,
  onCreatePlan
}) => {
  const [formData, setFormData] = useState<PlanFormData>({
    title: '',
    description: '',
    category: 'geral' as StudyPlanCategory,
    difficulty: 'iniciante' as StudyPlanDifficulty,
    dailyHours: 2,
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  const [errors, setErrors] = useState<Partial<PlanFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualizar dados do formulário quando a trilha mudar
  React.useEffect(() => {
    if (trail) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (trail.estimatedDuration * 7)); // Converter semanas para dias
      
      setFormData({
        title: `Plano baseado em: ${trail.title}`,
        description: `Plano de estudos criado a partir da trilha "${trail.title}". ${trail.shortDescription}`,
        category: trail.category as StudyPlanCategory,
        difficulty: trail.difficulty as StudyPlanDifficulty,
        dailyHours: Math.ceil(trail.weeklyHours / 7),
        startDate: new Date().toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
    }
  }, [trail]);

  const handleInputChange = (field: keyof PlanFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PlanFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (formData.dailyHours < 1 || formData.dailyHours > 12) {
      newErrors.dailyHours = 'Horas diárias deve estar entre 1 e 12';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Data de início é obrigatória';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Data de término é obrigatória';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'Data de término deve ser posterior à data de início';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !trail) return;

    setIsSubmitting(true);

    try {
      // Calcular duração total em horas
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalHours = daysDiff * formData.dailyHours;

      const planData: Partial<StudyPlan> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        startDate: formData.startDate,
        endDate: formData.endDate,
        dailyHours: formData.dailyHours,
        totalHours,
        completedHours: 0,
        progress: 0,
        status: 'ativo',
        color: trail.color,
        icon: trail.icon,
        tags: trail.tags,
        // Converter dados da trilha para estrutura do plano
        subjects: trail.subjects.map(subject => ({
          id: `subj_${subject.id}`,
          name: subject.name,
          description: subject.description || '',
          color: trail.color,
          icon: subject.icon || trail.icon,
          estimatedHours: Math.ceil(totalHours / trail.subjects.length),
          completedHours: 0,
          progress: 0,
          difficulty: formData.difficulty,
          priority: 'alta' as const,
          topics: [],
          resources: []
        })),
        goals: trail.objectives.map(objective => ({
          id: `goal_${objective.id}`,
          title: objective.title,
          description: objective.description,
          targetDate: formData.endDate,
          isCompleted: false,
          progress: 0
        })),
        milestones: trail.milestones.map(milestone => ({
          id: `mile_${milestone.id}`,
          title: milestone.title,
          description: milestone.description,
          targetDate: milestone.targetDate,
          isCompleted: false,
          requirements: milestone.requirements || []
        }))
      };

      onCreatePlan(planData);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'geral' as StudyPlanCategory,
        difficulty: 'iniciante' as StudyPlanDifficulty,
        dailyHours: 2,
        startDate: new Date().toISOString().split('T')[0],
        endDate: ''
      });
    } catch (error) {
      console.error('Erro ao criar plano:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (category: StudyPlanCategory) => {
    const labels = {
      'enem': 'ENEM',
      'vestibular': 'Vestibular',
      'concurso': 'Concurso Público',
      'certificacao': 'Certificação',
      'idiomas': 'Idiomas',
      'tecnologia': 'Tecnologia',
      'geral': 'Geral'
    };
    return labels[category] || category;
  };

  const getDifficultyLabel = (difficulty: StudyPlanDifficulty) => {
    const labels = {
      'iniciante': 'Iniciante',
      'intermediario': 'Intermediário',
      'avancado': 'Avançado'
    };
    return labels[difficulty] || difficulty;
  };

  if (!trail) return null;

  return (
    <Modal show={isOpen} onClose={onClose} size="2xl">
      <Modal.Header className="border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${trail.color}20` }}
          >
            <Icon 
              icon={trail.icon} 
              className="w-5 h-5"
              style={{ color: trail.color }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Criar Plano de Estudo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Baseado na trilha: {trail.title}
            </p>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-6">
        <Alert color="info" icon={HiInformationCircle} className="mb-6">
          <span className="font-medium">Informação:</span> Este plano será criado com base na estrutura da trilha selecionada, incluindo disciplinas, objetivos e marcos.
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título do Plano *
            </label>
            <TextInput
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Digite o título do seu plano de estudo"
              color={errors.title ? 'failure' : 'gray'}
              helperText={errors.title}
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva os objetivos e detalhes do seu plano"
              rows={3}
              color={errors.description ? 'failure' : 'gray'}
              helperText={errors.description}
            />
          </div>

          {/* Categoria e Dificuldade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoria
              </label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value as StudyPlanCategory)}
              >
                <option value="enem">ENEM</option>
                <option value="vestibular">Vestibular</option>
                <option value="concurso">Concurso Público</option>
                <option value="certificacao">Certificação</option>
                <option value="idiomas">Idiomas</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="geral">Geral</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dificuldade
              </label>
              <Select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value as StudyPlanDifficulty)}
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </Select>
            </div>
          </div>

          {/* Horas Diárias */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Horas de Estudo por Dia *
            </label>
            <TextInput
              type="number"
              min="1"
              max="12"
              value={formData.dailyHours}
              onChange={(e) => handleInputChange('dailyHours', parseInt(e.target.value) || 1)}
              color={errors.dailyHours ? 'failure' : 'gray'}
              helperText={errors.dailyHours || 'Recomendado: 2-4 horas por dia'}
            />
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data de Início *
              </label>
              <TextInput
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                color={errors.startDate ? 'failure' : 'gray'}
                helperText={errors.startDate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data de Término *
              </label>
              <TextInput
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                color={errors.endDate ? 'failure' : 'gray'}
                helperText={errors.endDate}
              />
            </div>
          </div>

          {/* Resumo da Trilha */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Resumo da Trilha Base
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Disciplinas:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {trail.subjects.length}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Objetivos:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {trail.objectives.length}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Marcos:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {trail.milestones.length}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Duração:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {trail.estimatedDuration} semanas
                </p>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-end gap-3 w-full">
          <Button
            color="gray"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <HiPlus className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Criando...' : 'Criar Plano'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePlanModal;