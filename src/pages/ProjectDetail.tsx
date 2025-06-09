
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { projects } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Projeto não encontrado</h1>
          <Link to="/projetos">
            <Button className="gradient-primary text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Projetos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Navegação */}
          <div className="mb-8">
            <Link to="/projetos">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          {/* Header do Projeto */}
          <div 
            ref={titleRef}
            className={`mb-8 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="gradient-primary text-white">{project.category}</Badge>
              {project.tech.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant="secondary">{tech}</Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href={project.repository} target="_blank" rel="noopener noreferrer">
                <Button className="gradient-primary text-white">
                  <Github className="w-4 h-4 mr-2" />
                  Repositório
                </Button>
              </a>
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Imagem Principal */}
          <div 
            ref={contentRef}
            className={`mb-12 transition-all duration-1000 delay-300 ${
              contentVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
          >
            <img 
              src={project.images[0]} 
              alt={project.title}
              className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Informações do Projeto */}
          <div className="space-y-8">
            {/* Funcionalidades */}
            <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gradient">Funcionalidades</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Desafios e Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gradient">Desafios</h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gradient">Resultados</h3>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Galeria de Imagens */}
            {project.images.length > 1 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  Galeria do <span className="text-gradient">Projeto</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div 
                      key={index}
                      className="animate-fade-in hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: `${1200 + index * 200}ms` }}
                    >
                      <img 
                        src={image} 
                        alt={`${project.title} - ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
