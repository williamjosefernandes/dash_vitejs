import React, { useState, useEffect } from 'react';
import { CronogramaItem, CronogramaFormData } from '../../types/cronograma';
import { X, Calendar, Clock, BookOpen, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface CronogramaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CronogramaFormData) => void;
  cronograma?: CronogramaItem | null;
  mode: 'create' | 'edit';
}

export const CronogramaModal: React.FC<CronogramaModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cronograma,
  mode
}) => {
  const [formData, setFormData] = useState<CronogramaFormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Ativo',
    priority: 'Média',
    totalHours: 0,
    subjects: []
  });

  const [newSubject, setNewSubject] = useState('');
  const [errors, setErrors] = useState<Partial<CronogramaFormData>>({});

  useEffect(() => {
    if (cronograma && mode === 'edit') {
      setFormData({
        title: cronograma.title,
        description: cronograma.description,
        startDate: cronograma.startDate,
        endDate: cronograma.endDate,
        status: cronograma.status,
        priority: cronograma.priority,
        totalHours: cronograma.totalHours,
        subjects: [...cronograma.subjects]
      });
    } else {
      // Reset form for create mode
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Ativo',
        priority: 'Média',
        totalHours: 0,
        subjects: []
      });
    }
    setErrors({});
  }, [cronograma, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CronogramaFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Data de início é obrigatória';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Data de fim é obrigatória';
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'Data de fim deve ser posterior à data de início';
    }

    if (formData.totalHours <= 0) {
      newErrors.totalHours = 'Total de horas deve ser maior que zero';
    }

    if (formData.subjects.length === 0) {
      newErrors.subjects = 'Adicione pelo menos uma matéria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof CronogramaFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addSubject = () => {
    if (newSubject.trim() && !formData.subjects.includes(newSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject('');
      
      // Clear subjects error
      if (errors.subjects) {
        setErrors(prev => ({ ...prev, subjects: undefined }));
      }
    }
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubject();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Novo Cronograma' : 'Editar Cronograma'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite o título do cronograma"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Descreva o cronograma de estudo"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.description}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Data de Início *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Data de Fim *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as CronogramaFormData['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Ativo">Ativo</option>
                <option value="Pausado">Pausado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridade
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value as CronogramaFormData['priority'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
          </div>

          {/* Total Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} className="inline mr-1" />
              Total de Horas *
            </label>
            <input
              type="number"
              min="1"
              value={formData.totalHours}
              onChange={(e) => handleInputChange('totalHours', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.totalHours ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: 120"
            />
            {errors.totalHours && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.totalHours}
              </p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen size={16} className="inline mr-1" />
              Matérias *
            </label>
            
            {/* Add Subject Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite uma matéria e pressione Enter"
              />
              <button
                type="button"
                onClick={addSubject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <Plus size={16} />
                Adicionar
              </button>
            </div>

            {/* Subjects List */}
            {formData.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {subject}
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.subjects && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.subjects}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              {mode === 'create' ? 'Criar Cronograma' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};