
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Portfolio = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  const projects = [
    {
      id: "ecommerce-platform",
      title: "Plataforma de gestão para e-commerce",
      description: "Sistema personalizado para controle de estoque, vendas e logística em tempo real.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      tech: "Next.js, Node.js, PostgreSQL"
    },
    {
      id: "health-startup-site",
      title: "Site institucional para startup de saúde",
      description: "Design e desenvolvimento de site responsivo com SEO avançado e blog integrado.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      tech: "React, TailwindCSS, Strapi CMS"
    },
    {
      id: "financial-control-app",
      title: "Aplicativo web para controle financeiro empresarial",
      description: "Solução web segura e rápida para gestão de fluxo de caixa e relatórios financeiros.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      tech: "Vue.js, Laravel, MySQL"
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
            Projetos que resolveram{' '}
            <span className="text-gradient">problemas reais</span>
          </h2>
        </div>
        
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-300 ${
            contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Link key={index} to={`/projetos/${project.id}`}>
                <Card 
                  className="group hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden border-0 animate-fade-in cursor-pointer h-full"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-44 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 md:mb-4 leading-relaxed text-sm md:text-base line-clamp-3 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.split(', ').map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projetos">
              <Button size="lg" className="gradient-primary text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:scale-105 transition-all duration-300">
                Ver Todos os Projetos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
