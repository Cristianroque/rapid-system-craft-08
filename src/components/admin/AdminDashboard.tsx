
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { BarChart3, MessageSquare, FolderOpen, TrendingUp, Users, Clock } from 'lucide-react';

// Mock data para demonstração
const mockMessages = [
  { id: 1, name: 'João Silva', status: 'new', date: '2024-01-15' },
  { id: 2, name: 'Maria Santos', status: 'responded', date: '2024-01-14' },
  { id: 3, name: 'Carlos Oliveira', status: 'new', date: '2024-01-13' }
];

const AdminDashboard = () => {
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
      value: mockMessages.filter(m => m.status === 'new').length,
      icon: MessageSquare,
      description: 'Aguardando resposta',
      color: 'text-green-600'
    },
    {
      title: 'Total de Mensagens',
      value: mockMessages.length,
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
  const recentMessages = mockMessages.slice(0, 3);

  return (
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
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{project.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Mensagens Recentes</CardTitle>
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {message.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{message.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(message.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  message.status === 'new' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {message.status === 'new' ? 'Nova' : 'Respondida'}
                </div>
              </div>
            ))}
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
            <Button className="h-20 flex-col gap-2 gradient-primary text-white">
              <FolderOpen className="w-6 h-6" />
              <span className="text-sm">Novo Projeto</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Ver Mensagens</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
