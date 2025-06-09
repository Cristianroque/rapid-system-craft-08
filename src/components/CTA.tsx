
import { Button } from '@/components/ui/button';

const CTA = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Seu projeto merece{' '}
            <span className="text-gradient">qualidade e velocidade</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Fale com a gente e descubra como podemos transformar sua ideia em um sistema funcional, ágil e moderno.
          </p>
          
          <Button 
            onClick={scrollToContact}
            size="lg" 
            className="gradient-primary text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
          >
            Entrar em contato
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
