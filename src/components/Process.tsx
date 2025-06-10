
import { Card, CardContent } from '@/components/ui/card';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Diagnóstico Rápido",
      description: "Identificamos os principais gargalos e necessidades do seu projeto em até 48h."
    },
    {
      number: "02",
      title: "Protótipo e validação",
      description: "Criamos wireframes e protótipos navegáveis para garantir a direção certa."
    },
    {
      number: "03",
      title: "Desenvolvimento ágil",
      description: "Sprints curtas, entregas constantes, comunicação transparente."
    },
    {
      number: "04",
      title: "Lançamento + Suporte",
      description: "Lançamos seu sistema e oferecemos suporte técnico e melhorias contínuas."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Como{' '}
            <span className="text-gradient">trabalhamos</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-card to-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
