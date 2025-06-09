
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1200 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Soluções digitais que{' '}
            <span className="text-gradient">impressionam</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Portfólio de projetos que transformaram ideias em sistemas ágeis, modernos e funcionais.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1200 delay-300 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'
          }`}>
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="gradient-primary text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
            >
              Fale conosco
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('portfolio');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Ver projetos
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 gradient-primary rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 gradient-secondary rounded-full opacity-15 animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
