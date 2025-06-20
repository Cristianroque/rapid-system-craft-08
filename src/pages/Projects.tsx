import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { useProjects } from '@/hooks/useProjects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Github, ExternalLink, Search, Filter, Loader2 } from 'lucide-react';

const categories = ['Todos', 'E-commerce', 'Website', 'FinTech', 'SaaS', 'Mobile'];

const Projects = () => {
  const { projects, loading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'Todos' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div 
            ref={titleRef}
            className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Nosso <span className="text-gradient">Portfólio</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore nossa coleção de projetos que demonstram expertise em desenvolvimento web moderno
            </p>
          </div>

          {/* Barra de Pesquisa e Filtros */}
          <div 
            ref={contentRef}
            className={`mb-8 md:mb-12 transition-all duration-1000 delay-300 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Pesquisar projetos, tecnologias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base bg-background/50 backdrop-blur-sm border-muted-foreground/20"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px] h-12 bg-background/50 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-muted-foreground">
                  {loading ? 'Carregando...' : `${filteredProjects.length} projeto${filteredProjects.length !== 1 ? 's' : ''} encontrado${filteredProjects.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Carregando projetos...</span>
            </div>
          )}

          {/* Grid de Projetos - Cards com altura uniforme */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 max-w-5xl mx-auto">
              {filteredProjects.map((project, index) => (
                <Link key={project.id} to={`/projetos/${project.id}`} className="block h-full">
                  <Card 
                    className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl overflow-hidden border-0 animate-fade-in cursor-pointer h-full flex flex-col"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-36 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 gradient-primary text-white font-medium text-xs">
                        {project.category}
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardContent className="p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 leading-relaxed text-sm line-clamp-3 flex-grow min-h-[4.5rem]">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4 min-h-[2rem]">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span>Ver detalhes</span>
                        <div className="flex gap-1">
                          <Github className="w-3 h-3" />
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum projeto encontrado para os critérios selecionados.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
