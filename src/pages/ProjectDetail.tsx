import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Loader2, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Header from '@/components/Header';
import { useProjects } from '@/hooks/useProjects';

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, loading, error } = useProjects();

  console.log('ProjectDetail - ID from URL:', id);
  console.log('ProjectDetail - All projects:', projects);

  const project = projects.find(p => String(p.id) === String(id));
  
  console.log('ProjectDetail - Found project:', project);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center text-foreground">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span>Carregando projeto...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Erro ao carregar projeto</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
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
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Projeto não encontrado</h1>
            <p className="text-muted-foreground mb-6">
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/projetos">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Projetos
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <section className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge className="gradient-primary text-white text-sm">{project.category}</Badge>
              {project.tech.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm">{tech}</Badge>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              {project.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {project.full_description || project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {project.repository && (
                <a href={project.repository} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto gradient-primary text-white">
                    <Github className="w-4 h-4 mr-2" />
                    Repositório
                  </Button>
                </a>
              )}
              {project.live_demo && (
                <a href={project.live_demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </a>
              )}
            </div>
          </section>

          {/* Main Image */}
          <section className="mb-12">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-[300px] lg:h-[400px] object-cover"
              />
            </div>
          </section>

          {/* Three Sections in Boxes */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Features Box */}
              {project.features && project.features.length > 0 && (
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg text-gradient">Funcionalidades</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span>{feature.length > 45 ? `${feature.substring(0, 45)}...` : feature}</span>
                      </div>
                    ))}
                    {project.features.length > 3 && (
                      <div className="text-xs text-muted-foreground/70 mt-3 text-center">
                        +{project.features.length - 3} funcionalidades
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Challenges Box */}
              {project.challenges && project.challenges.length > 0 && (
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle className="text-lg text-gradient">Desafios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {project.challenges.slice(0, 3).map((challenge, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        <span>{challenge.length > 45 ? `${challenge.substring(0, 45)}...` : challenge}</span>
                      </div>
                    ))}
                    {project.challenges.length > 3 && (
                      <div className="text-xs text-muted-foreground/70 mt-3 text-center">
                        +{project.challenges.length - 3} desafios
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Results Box */}
              {project.results && project.results.length > 0 && (
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg text-gradient">Resultados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {project.results.slice(0, 3).map((result, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span>{result.length > 45 ? `${result.substring(0, 45)}...` : result}</span>
                      </div>
                    ))}
                    {project.results.length > 3 && (
                      <div className="text-xs text-muted-foreground/70 mt-3 text-center">
                        +{project.results.length - 3} resultados
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Project Gallery Carousel */}
          {project.images && project.images.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">
                Galeria do <span className="text-gradient">Projeto</span>
              </h3>
              <div className="w-full max-w-6xl mx-auto">
                <Carousel className="w-full" opts={{ align: "start" }}>
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {project.images.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                        <Card className="overflow-hidden group">
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden">
                              <img 
                                src={image} 
                                alt={`${project.title} - ${index + 1}`}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
