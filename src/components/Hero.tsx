
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import ContactModal from '@/components/ContactModal';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1200 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Soluções digitais que{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                impressionam
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Portfólio de projetos que transformaram ideias em sistemas ágeis, modernos e funcionais.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1200 delay-300 ${
              isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'
            }`}>
              <Button 
                onClick={handleContactClick}
                size="lg" 
                className="gradient-primary text-white px-10 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Fale conosco
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-4 text-lg border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                onClick={scrollToPortfolio}
              >
                Ver projetos
              </Button>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos mais sutis */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default Hero;
