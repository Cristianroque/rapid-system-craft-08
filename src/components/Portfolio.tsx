
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useProjects } from '@/hooks/useProjects';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState('all');

  // Limitar a apenas 3 projetos na página inicial
  const displayProjects = projects.slice(0, 3);

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Nosso Portfólio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span>Carregando projetos...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Nosso Portfólio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Erro ao carregar projetos: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Nosso Portfólio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
          >
            Nosso Portfólio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Conheça alguns dos projetos que desenvolvemos com tecnologias modernas
            e design inovador.
          </motion.p>
        </div>

        {/* Projects grid - apenas 3 projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      {project.live_demo && (
                        <Button size="sm" asChild>
                          <a href={project.live_demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.repository && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.repository} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            Código
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button asChild className="w-full gradient-primary text-white mt-auto">
                    <Link to={`/projetos/${project.id}`}>
                      Ver Detalhes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="gradient-primary text-white">
            <Link to="/projetos">
              Ver Todos os Projetos
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
