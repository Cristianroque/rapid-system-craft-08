
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectEditModal from './ProjectEditModal';

const ProjectManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setSelectedProject(null);
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDelete = (projectId: string) => {
    // Implementar lógica de exclusão
    console.log('Excluir projeto:', projectId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsCreating(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Projetos ({projects.length})</h3>
          <Button onClick={handleCreateNew} className="gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {projects.map((project) => (
            <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-1 mb-1">{project.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                    {project.tech.slice(0, 2).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                    {project.tech.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{project.tech.length - 2}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(project)}
                    className="px-3"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground px-3"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ProjectEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        isCreating={isCreating}
      />
    </>
  );
};

export default ProjectManagement;
