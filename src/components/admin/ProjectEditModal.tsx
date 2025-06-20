
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, X } from 'lucide-react';
import ProjectPreview from './ProjectPreview';

const categories = ['Todos', 'E-commerce', 'Website', 'FinTech', 'SaaS', 'Mobile'];

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
  isCreating?: boolean;
  onSave?: (projectData: any) => void;
}

const ProjectEditModal = ({ isOpen, onClose, project, isCreating = false, onSave }: ProjectEditModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    image: '',
    tech: [],
    category: '',
    repository: '',
    live_demo: '',
    images: [],
    features: [],
    challenges: [],
    results: []
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        full_description: project.full_description || '',
        image: project.image || '',
        tech: Array.isArray(project.tech) ? project.tech : [],
        category: project.category || '',
        repository: project.repository || '',
        live_demo: project.live_demo || '',
        images: Array.isArray(project.images) ? project.images : [],
        features: Array.isArray(project.features) ? project.features : [],
        challenges: Array.isArray(project.challenges) ? project.challenges : [],
        results: Array.isArray(project.results) ? project.results : []
      });
    } else if (isCreating) {
      setFormData({
        title: '',
        description: '',
        full_description: '',
        image: '',
        tech: [],
        category: '',
        repository: '',
        live_demo: '',
        images: [],
        features: [],
        challenges: [],
        results: []
      });
    }
  }, [project, isCreating]);

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddToArray = (field: string, value: string) => {
    if (value.trim()) {
      const newArray = [...formData[field], value.trim()];
      handleFormChange(field, newArray);
    }
  };

  const handleRemoveFromArray = (field: string, index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    handleFormChange(field, newArray);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Por favor, preencha pelo menos o título e a descrição.');
      return;
    }
    
    onSave?.(formData);
  };

  const renderArrayInput = (field: string, label: string, placeholder: string) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const target = e.target as HTMLInputElement;
              handleAddToArray(field, target.value);
              target.value = '';
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          onClick={(e) => {
            const button = e.target as HTMLButtonElement;
            const input = button.parentElement?.querySelector('input') as HTMLInputElement;
            if (input && input.value.trim()) {
              handleAddToArray(field, input.value);
              input.value = '';
            }
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData[field]?.map((item: string, index: number) => (
          <Badge key={index} variant="secondary" className="pr-1">
            {item}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-1 ml-1"
              onClick={() => handleRemoveFromArray(field, index)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[90vw] h-[80vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>
              {isCreating ? 'Criar Novo Projeto' : 'Editar Projeto'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 min-h-0">
            {/* Formulário */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações do Projeto</h3>
              <ScrollArea className="h-[calc(80vh-180px)]">
                <div className="space-y-4 pr-4">
                  <div>
                    <label className="text-sm font-medium">Título</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder="Título do projeto"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Descrição Curta</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Descrição breve do projeto"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Descrição Completa</label>
                    <Textarea
                      value={formData.full_description}
                      onChange={(e) => handleFormChange('full_description', e.target.value)}
                      placeholder="Descrição detalhada do projeto"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Categoria</label>
                    <Select value={formData.category} onValueChange={(value) => handleFormChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== 'Todos').map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Imagem Principal (URL)</label>
                      <Input
                        value={formData.image}
                        onChange={(e) => handleFormChange('image', e.target.value)}
                        placeholder="URL da imagem"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Demo ao Vivo (URL)</label>
                      <Input
                        value={formData.live_demo}
                        onChange={(e) => handleFormChange('live_demo', e.target.value)}
                        placeholder="URL da demo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Repositório (URL)</label>
                    <Input
                      value={formData.repository}
                      onChange={(e) => handleFormChange('repository', e.target.value)}
                      placeholder="URL do repositório"
                    />
                  </div>

                  {renderArrayInput('tech', 'Tecnologias', 'Ex: React, Node.js')}
                  {renderArrayInput('images', 'Imagens Adicionais (URLs)', 'URL da imagem')}
                  {renderArrayInput('features', 'Funcionalidades', 'Dashboard em tempo real')}
                  {renderArrayInput('challenges', 'Desafios', 'Processamento de alto volume')}
                  {renderArrayInput('results', 'Resultados', 'Aumento de 45% na eficiência')}
                </div>
              </ScrollArea>
            </div>

            {/* Preview */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <ScrollArea className="h-[calc(80vh-180px)]">
                <ProjectPreview project={formData} />
              </ScrollArea>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-background">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gradient-primary text-white">
              {isCreating ? 'Criar Projeto' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditModal;
