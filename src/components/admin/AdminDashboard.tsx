
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { useMessages } from '@/hooks/useMessages';
import { BarChart3, MessageSquare, FolderOpen, TrendingUp, Users, Clock, Loader2 } from 'lucide-react';
import ProjectEditModal from './ProjectEditModal';
import MessageModal from './MessageModal';

const AdminDashboard = () => {
  const { projects, loading: projectsLoading, createProject } = useProjects();
  const { messages, loading: messagesLoading, addMessageResponse } = useMessages();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const stats = [
    {
      title: 'Total de Projetos',
      value: projects.length,
      icon: FolderOpen,
      description: 'Projetos no portfólio',
      color: 'text-blue-600'
    },
    {
      title: 'Mensagens Novas',
      value: messages.filter(m => m.status === 'new').length,
      icon: MessageSquare,
      description: 'Aguardando resposta',
      color: 'text-green-600'
    },
    {
      title: 'Total de Mensagens',
      value: messages.length,
      icon: Users,
      description: 'Contatos recebidos',
      color: 'text-purple-600'
    },
    {
      title: 'Atividade Recente',
      value: '24h',
      icon: Clock,
      description: 'Última atualização',
      color: 'text-orange-600'
    }
  ];

  const recentProjects = projects.slice(0, 3);
  const recentMessages = messages.slice(0, 3);

  const handleViewAllProjects = () => {
    const projectsTab = document.querySelector('[data-state="inactive"][value="projects"]') as HTMLButtonElement;
    if (projectsTab) {
      projectsTab.click();
    }
  };

  const handleViewAllMessages = () => {
    const messagesTab = document.querySelector('[data-state="inactive"][value="messages"]') as HTMLButtonElement;
    if (messagesTab) {
      messagesTab.click();
    }
  };

  const handleOpenMessage = (message: any) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
  };

  const handleSendResponse = async (messageId: string, response: string, type: string) => {
    try {
      await addMessageResponse(messageId, response, type as 'custom' | 'quick');
      setIsMessageModalOpen(false);
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    }
  };

  const handleCreateProject = async (projectData: any) => {
    try {
      await createProject(projectData);
      setIsProjectModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  if (projectsLoading || messagesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando dashboard...</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`${stat.color} bg-muted/20 p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Projetos Recentes</CardTitle>
              <Button variant="outline" size="sm" onClick={handleViewAllProjects}>
                Ver Todos
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{project.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {project.category}
                    </p>
                  </div>
                </div>
              ))}
              {recentProjects.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum projeto encontrado
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Mensagens Recentes</CardTitle>
              <Button variant="outline" size="sm" onClick={handleViewAllMessages}>
                Ver Todas
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleOpenMessage(message)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-xs">
                      {message.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{message.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {message.company || message.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                    message.status === 'new' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {message.status === 'new' ? 'Nova' : 'Respondida'}
                  </div>
                </div>
              ))}
              {recentMessages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma mensagem encontrada
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col gap-2 gradient-primary text-white"
                onClick={() => setIsProjectModalOpen(true)}
              >
                <FolderOpen className="w-6 h-6" />
                <span className="text-sm">Novo Projeto</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleViewAllMessages}>
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Ver Mensagens</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => alert('Relatórios em desenvolvimento')}>
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm">Relatórios</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => alert('Analytics em desenvolvimento')}>
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ProjectEditModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        isCreating={true}
        onSave={handleCreateProject}
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        message={selectedMessage}
        onSendResponse={handleSendResponse}
      />
    </>
  );
};

export default AdminDashboard;
