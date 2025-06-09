
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          <h1 className="text-4xl font-bold mb-4">Projeto não encontrado</h1>
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
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Navegação */}
          <div className="mb-8">
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
            className={`mb-12 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="gradient-primary text-white">{project.category}</Badge>
              {project.tech.map((tech, index) => (
                <Badge key={index} variant="secondary">{tech}</Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={project.repository} target="_blank" rel="noopener noreferrer">
                <Button className="gradient-primary text-white">
                  <Github className="w-4 h-4 mr-2" />
                  Ver Repositório
                </Button>
              </a>
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Demo
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
              className="w-full h-[400px] md:h-[600px] object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Funcionalidades */}
            <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="text-gradient">Funcionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Desafios */}
            <Card className="animate-fade-in" style={{ animationDelay: '800ms' }}>
              <CardHeader>
                <CardTitle className="text-gradient">Desafios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Resultados */}
            <Card className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
              <CardHeader>
                <CardTitle className="text-gradient">Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Galeria de Imagens */}
          {project.images.length > 1 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Galeria do <span className="text-gradient">Projeto</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.images.slice(1).map((image, index) => (
                  <div 
                    key={index}
                    className="animate-fade-in hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${1200 + index * 200}ms` }}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} - ${index + 2}`}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
