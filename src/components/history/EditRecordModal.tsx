import React, { useState, useEffect } from 'react';
import { Modal, Button, Label, TextInput, Textarea, Select } from 'flowbite-react';
import { HiX, HiCheck, HiExclamationCircle } from 'react-icons/hi';
import { HistoryRecord, HistoryCategory } from '../../types/history';

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: HistoryRecord | null;
  categories: HistoryCategory[];
  onSave: (updatedRecord: HistoryRecord) => void;
}

export const EditRecordModal: React.FC<EditRecordModalProps> = ({
  isOpen,
  onClose,
  record,
  categories,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<HistoryRecord>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (record) {
      setFormData({
        id: record.id,
        title: record.title,
        description: record.description,
        category: record.category,
        subject: record.subject,
        duration: record.duration,
        score: record.score,
        status: record.status,
        notes: record.notes,
        tags: record.tags,
        date: record.date,
      });
      setErrors({});
    }
  }, [record]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData.subject?.trim()) {
      newErrors.subject = 'Matéria é obrigatória';
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que 0';
    }

    if (formData.score !== undefined && (formData.score < 0 || formData.score > 100)) {
      newErrors.score = 'Pontuação deve estar entre 0 e 100';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !record) return;

    setIsLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedRecord: HistoryRecord = {
        ...record,
        ...formData,
        updatedAt: new Date().toISOString(),
      } as HistoryRecord;

      onSave(updatedRecord);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof HistoryRecord, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    handleInputChange('tags', tags);
  };

  if (!record) return null;

  return (
    <Modal show={isOpen} onClose={onClose} size="2xl">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <HiExclamationCircle className="h-5 w-5 text-blue-500" />
          Editar Registro
        </div>
      </Modal.Header>
      
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <Label htmlFor="title" value="Título *" />
            <TextInput
              id="title"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              color={errors.title ? 'failure' : 'gray'}
              helperText={errors.title}
              placeholder="Digite o título da atividade"
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description" value="Descrição *" />
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              color={errors.description ? 'failure' : 'gray'}
              helperText={errors.description}
              placeholder="Descreva a atividade realizada"
              rows={3}
            />
          </div>

          {/* Categoria e Matéria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" value="Categoria *" />
              <Select
                id="category"
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                color={errors.category ? 'failure' : 'gray'}
                helperText={errors.category}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="subject" value="Matéria *" />
              <TextInput
                id="subject"
                value={formData.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                color={errors.subject ? 'failure' : 'gray'}
                helperText={errors.subject}
                placeholder="Ex: Matemática, Português"
              />
            </div>
          </div>

          {/* Duração e Pontuação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration" value="Duração (minutos) *" />
              <TextInput
                id="duration"
                type="number"
                min="1"
                value={formData.duration || ''}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                color={errors.duration ? 'failure' : 'gray'}
                helperText={errors.duration}
                placeholder="60"
              />
            </div>

            <div>
              <Label htmlFor="score" value="Pontuação (0-100)" />
              <TextInput
                id="score"
                type="number"
                min="0"
                max="100"
                value={formData.score || ''}
                onChange={(e) => handleInputChange('score', parseFloat(e.target.value) || undefined)}
                color={errors.score ? 'failure' : 'gray'}
                helperText={errors.score}
                placeholder="85"
              />
            </div>
          </div>

          {/* Status e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" value="Status" />
              <Select
                id="status"
                value={formData.status || 'completed'}
                onChange={(e) => handleInputChange('status', e.target.value as 'completed' | 'in_progress' | 'cancelled')}
              >
                <option value="completed">Concluído</option>
                <option value="in_progress">Em andamento</option>
                <option value="cancelled">Cancelado</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="date" value="Data *" />
              <TextInput
                id="date"
                type="datetime-local"
                value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                onChange={(e) => handleInputChange('date', e.target.value ? new Date(e.target.value).toISOString() : '')}
                color={errors.date ? 'failure' : 'gray'}
                helperText={errors.date}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" value="Tags (separadas por vírgula)" />
            <TextInput
              id="tags"
              value={formData.tags?.join(', ') || ''}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="revisão, importante, difícil"
              helperText="Separe as tags com vírgulas"
            />
          </div>

          {/* Notas */}
          <div>
            <Label htmlFor="notes" value="Notas adicionais" />
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Observações sobre a atividade"
              rows={2}
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex justify-end gap-2 w-full">
          <Button
            color="gray"
            onClick={onClose}
            disabled={isLoading}
          >
            <HiX className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            isProcessing={isLoading}
          >
            <HiCheck className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};