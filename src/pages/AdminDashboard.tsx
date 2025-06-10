
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, BarChart3, FolderOpen, MessageSquare } from 'lucide-react';
import ProjectManagement from '@/components/admin/ProjectManagement';
import MessageManagement from '@/components/admin/MessageManagement';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ThemeToggle from '@/components/ThemeToggle';

const AdminDashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background transition-colors duration-300">
      <div className="border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground text-sm">
                Gerencie projetos, mensagens e conteúdo do site
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] h-12">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              Projetos
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Mensagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="projects">
            <div className="bg-card rounded-lg border p-6 transition-colors duration-300">
              <ProjectManagement />
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              <MessageManagement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
