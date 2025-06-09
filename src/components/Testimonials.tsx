
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Eles entenderam o problema da nossa plataforma em minutos. Em poucas semanas tínhamos um sistema novo e funcional no ar.",
      name: "Ana Souza",
      role: "CEO, TechCommerce"
    },
    {
      quote: "Nossa startup cresceu muito depois que eles refizeram nosso site. Design moderno, carregamento rápido e suporte impecável.",
      name: "Bruno Lima",
      role: "Cofundador, VidaDigital"
    }
  ];

  return (
    <section id="depoimentos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            O que nossos{' '}
            <span className="text-gradient">clientes dizem</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-card to-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
