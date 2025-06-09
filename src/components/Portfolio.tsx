
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Portfolio = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  const projects = [
    {
      id: "ecommerce-platform",
      title: "Plataforma de gestão para e-commerce",
      description: "Sistema completo desenvolvido para uma empresa do setor varejista que precisava modernizar sua operação digital. A plataforma integra controle de estoque em tempo real, processamento automatizado de pedidos, gestão completa de clientes e dashboard com analytics avançados. O sistema foi arquitetado para suportar alto volume de transações simultâneas e escalar conforme o crescimento do negócio, resultando em 45% de aumento na eficiência operacional.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      category: "E-commerce",
      repository: "https://github.com/empresa/ecommerce-platform",
      liveDemo: "https://demo-ecommerce.empresa.com"
    },
    {
      id: "health-startup-website",
      title: "Site institucional para startup de saúde",
      description: "Projeto desenvolvido para uma startup inovadora do setor de saúde digital, focando em conversão e experiência do usuário. O site inclui design responsivo otimizado para mobile, sistema de blog integrado com CMS, SEO avançado para melhor posicionamento nos buscadores e integração completa com ferramentas de marketing digital. O resultado foi um aumento de 120% no tráfego orgânico e 85% de melhoria na taxa de conversão.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      tech: ["React", "TailwindCSS", "Strapi CMS", "SEO"],
      category: "Website",
      repository: "https://github.com/empresa/health-startup-site",
      liveDemo: "https://vidadigital.com.br"
    },
    {
      id: "financial-control-app",
      title: "Aplicativo web para controle financeiro empresarial",
      description: "Solução web robusta desenvolvida para gestão financeira empresarial, com foco em segurança bancária e facilidade de uso. O sistema oferece dashboard financeiro interativo, relatórios personalizáveis em PDF, controle completo de contas a pagar e receber, previsões de fluxo de caixa baseadas em IA e integração segura com bancos via API. A implementação resultou em 50% de redução no tempo de fechamento mensal e 70% de melhoria na precisão das previsões financeiras.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      tech: ["Vue.js", "Laravel", "MySQL", "Charts.js"],
      category: "FinTech",
      repository: "https://github.com/empresa/financial-control"
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div 
          ref={titleRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
            Projetos que resolveram{' '}
            <span className="text-gradient">problemas reais</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Conheça algumas das soluções que desenvolvemos para nossos clientes, transformando ideias em sistemas funcionais e eficientes
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-300 ${
            contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Link key={index} to={`/projetos/${project.id}`} className="group">
                <Card 
                  className="group-hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden border-0 animate-fade-in cursor-pointer h-full bg-card"
                  style={{ animationDelay: `${index * 200}ms` }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base line-clamp-4 flex-grow">
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
                        <Button className="w-full gradient-primary text-white py-2 md:py-3 text-sm md:text-base hover:scale-105 transition-all duration-300">
                          Ver Projeto
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={project.repository} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center w-10 h-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        {project.liveDemo && (
                          <a 
                            href={project.liveDemo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center w-10 h-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
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
