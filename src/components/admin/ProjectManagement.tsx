
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Loader2, RefreshCw } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useProjects } from '@/hooks/useProjects';
import ProjectEditModal from './ProjectEditModal';
import { toast } from 'sonner';

const ProjectManagement = () => {
  const { projects, loading, createProject, updateProject, deleteProject, fetchProjects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

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

  const handleDeleteConfirm = async (projectId: string) => {
    try {
      setDeleteLoading(projectId);
      await deleteProject(projectId);
      toast.success('Projeto excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir projeto');
      console.error('Erro:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchProjects();
      toast.success('Lista de projetos atualizada!');
    } catch (error) {
      toast.error('Erro ao atualizar lista');
      console.error('Erro:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsCreating(false);
  };

  const handleSaveProject = async (projectData: any) => {
    try {
      if (isCreating) {
        console.log('Creating new project with data:', projectData);
        await createProject(projectData);
        toast.success('Projeto criado com sucesso!');
      } else if (selectedProject) {
        console.log('Updating project with data:', projectData);
        await updateProject(selectedProject.id, projectData);
        toast.success('Projeto atualizado com sucesso!');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(isCreating ? 'Erro ao criar projeto' : 'Erro ao atualizar projeto');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando projetos...</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Projetos ({projects.length})</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button onClick={handleCreateNew} className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
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
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground px-3"
                        disabled={deleteLoading === project.id}
                      >
                        {deleteLoading === project.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o projeto "{project.title}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteConfirm(project.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum projeto encontrado</p>
            <Button 
              onClick={handleCreateNew} 
              className="mt-4 gradient-primary text-white"
            >
              Criar primeiro projeto
            </Button>
          </div>
        )}
      </div>

      <ProjectEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        isCreating={isCreating}
        onSave={handleSaveProject}
      />
    </>
  );
};

export default ProjectManagement;
