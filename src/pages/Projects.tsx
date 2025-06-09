
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Github, ExternalLink } from 'lucide-react';
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
  const [filtersRef, filtersVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

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
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div 
            ref={titleRef}
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
              Nossos <span className="text-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Projetos</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
              Descubra as soluções digitais que desenvolvemos para nossos clientes, transformando ideias em sistemas funcionais e modernos
            </p>
          </div>

          {/* Filtros */}
          <div 
            ref={filtersRef}
            className={`bg-card rounded-2xl p-4 md:p-6 mb-8 md:mb-12 shadow-lg border max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
              filtersVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome, descrição ou tecnologia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-4 border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 text-base md:text-lg"
                />
              </div>
              
              <div className="flex items-center gap-3 lg:min-w-[200px]">
                <Filter className="text-muted-foreground w-5 h-5" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full py-3 md:py-4 text-base md:text-lg rounded-xl border-input">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-base md:text-lg py-3">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-muted-foreground text-sm md:text-base">
                {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grid de Projetos */}
          <div 
            ref={gridRef}
            className={`transition-all duration-1000 delay-600 ${
              gridVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                {filteredProjects.map((project, index) => (
                  <Card 
                    key={project.id}
                    className="group hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden border-0 bg-card animate-fade-in"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 gradient-primary text-white font-medium px-3 py-1">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4 md:p-6 flex flex-col h-full">
                      <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-4 leading-relaxed text-sm md:text-base flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs md:text-sm font-medium">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge variant="secondary" className="text-xs md:text-sm font-medium">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-auto">
                        <div className="flex-1">
                          <Link to={`/projetos/${project.id}`}>
                            <Button className="w-full gradient-primary text-white py-2 md:py-3 text-sm md:text-base hover:scale-105 transition-all duration-300">
                              Ver Projeto
                            </Button>
                          </Link>
                        </div>
                        <div className="flex gap-2">
                          <a 
                            href={project.repository} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-10 h-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          {project.liveDemo && (
                            <a 
                              href={project.liveDemo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-20">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Nenhum projeto encontrado</h3>
                <p className="text-muted-foreground text-base md:text-lg">
                  Tente ajustar seus filtros ou termos de busca
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
