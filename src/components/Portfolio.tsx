
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
      title: "Plataforma de gestão para e-commerce",
      description: "Sistema personalizado para controle de estoque, vendas e logística em tempo real.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      tech: "Next.js, Node.js, PostgreSQL"
    },
    {
      title: "Site institucional para startup de saúde",
      description: "Design e desenvolvimento de site responsivo com SEO avançado e blog integrado.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      tech: "React, TailwindCSS, Strapi CMS"
    },
    {
      title: "Aplicativo web para controle financeiro empresarial",
      description: "Solução web segura e rápida para gestão de fluxo de caixa e relatórios financeiros.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      tech: "Vue.js, Laravel, MySQL"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="group hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden border-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projetos">
              <Button size="lg" className="gradient-primary text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300">
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
