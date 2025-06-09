
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { projects, categories } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Github, ExternalLink, Calendar } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  const filteredProjects = selectedCategory === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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

          {/* Filtro de Categoria */}
          <div 
            ref={contentRef}
            className={`mb-8 md:mb-12 transition-all duration-1000 delay-300 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
              </p>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
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

          {/* Grid de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl overflow-hidden border-0 bg-card animate-fade-in h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-40 md:h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 gradient-primary text-white font-medium">
                    {project.category}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-4 md:p-5 flex flex-col h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {/* Tecnologias */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs font-medium">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="secondary" className="text-xs font-medium">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Informações adicionais */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>2024</span>
                    </div>
                    <div className="flex gap-2">
                      {project.repository && (
                        <Github className="w-3 h-3" />
                      )}
                      {project.liveDemo && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </div>
                  </div>

                  {/* Botão */}
                  <Link to={`/projetos/${project.id}`} className="mt-auto">
                    <Button className="w-full gradient-primary text-white py-2.5 text-sm hover:scale-105 transition-all duration-300">
                      Ver Projeto Completo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum projeto encontrado para a categoria selecionada.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
