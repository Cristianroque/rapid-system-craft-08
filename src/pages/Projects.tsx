
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { projects, categories } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [titleRef, titleVisible] = useScrollAnimation();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todos' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div 
            ref={titleRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nossos <span className="text-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Projetos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra as soluções que desenvolvemos para nossos clientes
            </p>
          </div>

          {/* Filtros aprimorados */}
          <div className="bg-card rounded-2xl p-6 mb-12 shadow-lg border max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome, descrição ou tecnologia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 text-lg"
                />
              </div>
              
              <div className="flex items-center gap-3 lg:min-w-[200px]">
                <Filter className="text-muted-foreground w-5 h-5" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full py-4 text-lg rounded-xl border-input">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-lg py-3">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Contador de resultados */}
            <div className="mt-4 text-center">
              <span className="text-muted-foreground">
                {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grid de Projetos */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.id}
                  className="group hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden border-0 bg-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 gradient-primary text-white font-medium px-3 py-1">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-sm font-medium">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="secondary" className="text-sm font-medium">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Link to={`/projetos/${project.id}`}>
                      <Button className="w-full gradient-primary text-white py-3 text-lg hover:scale-105 transition-all duration-300">
                        Ver Projeto
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground text-lg">
                Tente ajustar seus filtros ou termos de busca
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
