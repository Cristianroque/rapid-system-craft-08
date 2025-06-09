
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import { projects, categories } from '@/data/projects';

interface ProjectManagementProps {
  onProjectSelect: (project: any) => void;
  activeProject: any;
}

const ProjectManagement = ({ onProjectSelect, activeProject }: ProjectManagementProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    image: '',
    tech: [],
    category: '',
    repository: '',
    liveDemo: '',
    images: [],
    features: [],
    challenges: [],
    results: []
  });

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      image: '',
      tech: [],
      category: '',
      repository: '',
      liveDemo: '',
      images: [],
      features: [],
      challenges: [],
      results: []
    });
    onProjectSelect(formData);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsCreating(false);
    setFormData({
      ...project,
      tech: Array.isArray(project.tech) ? project.tech : project.tech.split(', ')
    });
    onProjectSelect(formData);
  };

  const handleFormChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onProjectSelect(newFormData);
  };

  const handleAddToArray = (field, value) => {
    if (value.trim()) {
      const newArray = [...formData[field], value.trim()];
      handleFormChange(field, newArray);
    }
  };

  const handleRemoveFromArray = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    handleFormChange(field, newArray);
  };

  const renderArrayInput = (field, label) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input
          placeholder={`Adicionar ${label.toLowerCase()}`}
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
          onClick={(e) => {
            const button = e.target as HTMLButtonElement;
            const input = button.parentElement?.querySelector('input') as HTMLInputElement;
            if (input) {
              handleAddToArray(field, input.value);
              input.value = '';
            }
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData[field]?.map((item, index) => (
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

  if (isCreating || editingProject) {
    return (
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">
            {isCreating ? 'Criar Novo Projeto' : 'Editar Projeto'}
          </h3>
          <Button variant="outline" size="sm" onClick={() => {
            setIsCreating(false);
            setEditingProject(null);
            onProjectSelect(null);
          }}>
            Cancelar
          </Button>
        </div>

        <div className="space-y-4">
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
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descrição Completa</label>
            <Textarea
              value={formData.fullDescription}
              onChange={(e) => handleFormChange('fullDescription', e.target.value)}
              placeholder="Descrição detalhada do projeto"
              rows={4}
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

          <div>
            <label className="text-sm font-medium">Imagem Principal (URL)</label>
            <Input
              value={formData.image}
              onChange={(e) => handleFormChange('image', e.target.value)}
              placeholder="URL da imagem principal"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Repositório (URL)</label>
            <Input
              value={formData.repository}
              onChange={(e) => handleFormChange('repository', e.target.value)}
              placeholder="URL do repositório"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Demo ao Vivo (URL)</label>
            <Input
              value={formData.liveDemo}
              onChange={(e) => handleFormChange('liveDemo', e.target.value)}
              placeholder="URL da demo (opcional)"
            />
          </div>

          {renderArrayInput('tech', 'Tecnologias')}
          {renderArrayInput('images', 'Imagens Adicionais (URLs)')}
          {renderArrayInput('features', 'Funcionalidades')}
          {renderArrayInput('challenges', 'Desafios')}
          {renderArrayInput('results', 'Resultados')}

          <div className="flex gap-2 pt-4">
            <Button className="gradient-primary text-white">
              {isCreating ? 'Criar Projeto' : 'Salvar Alterações'}
            </Button>
            <Button variant="outline" onClick={() => {
              setIsCreating(false);
              setEditingProject(null);
              onProjectSelect(null);
            }}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projetos Existentes</h3>
        <Button onClick={handleCreateNew} className="gradient-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium line-clamp-1">{project.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="flex gap-1 mt-2">
                  <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                  {project.tech.slice(0, 2).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
