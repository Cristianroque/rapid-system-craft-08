
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectPreviewProps {
  project: any;
}

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  if (!project) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Selecione ou crie um projeto para ver o preview</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Preview em tempo real:
      </div>
      
      {/* Preview do Card do Projeto */}
      <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden border-0 bg-card">
        <div className="relative overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}
          {project.category && (
            <Badge className="absolute top-4 left-4 gradient-primary text-white font-medium px-3 py-1">
              {project.category}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {project.title || 'Título do Projeto'}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed text-base flex-grow">
            {project.description || 'Descrição do projeto aparecerá aqui...'}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech?.slice(0, 3).map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary" className="text-sm font-medium">
                {tech}
              </Badge>
            ))}
            {project.tech?.length > 3 && (
              <Badge variant="secondary" className="text-sm font-medium">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>
          <Button className="w-full gradient-primary text-white py-3 text-lg hover:scale-105 transition-all duration-300 mt-auto">
            Ver Projeto
          </Button>
        </CardContent>
      </Card>

      {/* Preview da Página de Detalhes */}
      {project.title && (
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-4">Preview da Página de Detalhes:</h4>
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex flex-wrap items-center gap-2">
              {project.category && (
                <Badge className="gradient-primary text-white">{project.category}</Badge>
              )}
              {project.tech?.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant="secondary">{tech}</Badge>
              ))}
            </div>
            
            <h1 className="text-2xl font-bold">{project.title}</h1>
            
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription || project.description || 'Descrição detalhada aparecerá aqui...'}
            </p>

            <div className="flex gap-4">
              <Button className="gradient-primary text-white">
                <Github className="w-4 h-4 mr-2" />
                Repositório
              </Button>
              {project.liveDemo && (
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              )}
            </div>

            {project.features?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gradient">Funcionalidades</h3>
                <ul className="space-y-2">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPreview;
