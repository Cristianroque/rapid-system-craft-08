
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { useProjects } from '@/hooks/useProjects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, loading, error } = useProjects();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [imageRef, imageVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  console.log('ProjectDetail - ID from URL:', id);
  console.log('ProjectDetail - All projects:', projects);

  // Encontrar o projeto pelo ID
  const project = projects.find(p => String(p.id) === String(id));
  
  console.log('ProjectDetail - Found project:', project);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <div className="flex items-center">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span>Carregando projeto...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Erro ao carregar projeto</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/projetos">
              <Button className="gradient-primary text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Projetos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Projeto não encontrado</h1>
            <p className="text-muted-foreground mb-4">
              O projeto solicitado não foi encontrado.
            </p>
            <Link to="/projetos">
              <Button className="gradient-primary text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Projetos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Botão Voltar */}
          <div className="mb-6">
            <Link to="/projetos">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Projetos
              </Button>
            </Link>
          </div>

          {/* Header do Projeto */}
          <div 
            ref={titleRef}
            className={`mb-8 md:mb-12 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
              <Badge className="gradient-primary text-white text-sm">{project.category}</Badge>
              {project.tech.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm">{tech}</Badge>
              ))}
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              {project.title}
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              {project.full_description || project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {project.repository && (
                <a href={project.repository} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button className="w-full sm:w-auto gradient-primary text-white">
                    <Github className="w-4 h-4 mr-2" />
                    Repositório
                  </Button>
                </a>
              )}
              {project.live_demo && (
                <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Imagem Principal */}
          <div 
            ref={imageRef}
            className={`mb-8 md:mb-12 transition-all duration-1000 delay-300 ${
              imageVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
            }`}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Informações do Projeto */}
          <div 
            ref={contentRef}
            className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-600 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Funcionalidades */}
            {project.features && project.features.length > 0 && (
              <Card className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-gradient">Funcionalidades</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Desafios e Resultados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {project.challenges && project.challenges.length > 0 && (
                <Card className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 text-gradient">Desafios</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {project.results && project.results.length > 0 && (
                <Card className="animate-fade-in" style={{ animationDelay: '1200ms' }}>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 text-gradient">Resultados</h3>
                    <ul className="space-y-3">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Galeria de Imagens */}
            {project.images && project.images.length > 0 && (
              <div className="mt-8 md:mt-12">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
                  Galeria do <span className="text-gradient">Projeto</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {project.images.map((image, index) => (
                    <div 
                      key={index}
                      className="animate-fade-in hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: `${1400 + index * 200}ms` }}
                    >
                      <img 
                        src={image} 
                        alt={`${project.title} - ${index + 1}`}
                        className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md"
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
