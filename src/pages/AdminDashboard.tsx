
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from '@/data/projects';
import ProjectManagement from '@/components/admin/ProjectManagement';
import MessageManagement from '@/components/admin/MessageManagement';
import ProjectPreview from '@/components/admin/ProjectPreview';

const AdminDashboard = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground text-lg">
            Gerencie projetos, mensagens e conteúdo do site
          </p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectManagement 
                    onProjectSelect={setActiveProject}
                    activeProject={activeProject}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview do Projeto</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectPreview project={activeProject} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <MessageManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
