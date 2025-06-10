
import { Rocket, Cpu, UserCheck, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Agilidade e eficiência",
      description: "Utilizamos metodologias ágeis para entregar resultados rápidos sem comprometer a qualidade."
    },
    {
      icon: Cpu,
      title: "Tecnologia atualizada",
      description: "Trabalhamos com as stacks mais modernas do mercado, garantindo segurança e performance."
    },
    {
      icon: UserCheck,
      title: "UX de verdade",
      description: "Sistemas construídos com foco no usuário final. Simples, intuitivos e eficientes."
    },
    {
      icon: RefreshCcw,
      title: "Suporte e evolução",
      description: "Entregamos, acompanhamos e evoluímos seus projetos com atualizações e melhorias constantes."
    }
  ];

  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Por que escolher a{' '}
            <span className="text-gradient">nossa empresa?</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-card to-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
