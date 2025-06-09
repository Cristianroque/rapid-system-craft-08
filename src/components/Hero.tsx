
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3882&q=80')`
            }}
          />
          {/* Gradient overlay for transparency effect at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background"></div>
          {/* Additional dark overlay for better text readability */}
          <div className="absolute inset-0 bg-background/40"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1200 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white">
              Soluções digitais que{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                impressionam
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Portfólio de projetos que transformaram ideias em sistemas ágeis, modernos e funcionais.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4 transition-all duration-1200 delay-300 ${
              isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'
            }`}>
              <Button 
                onClick={handleContactClick}
                size="lg" 
                className="w-full sm:w-auto gradient-primary text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Fale conosco
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 text-base md:text-lg border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
                onClick={scrollToPortfolio}
              >
                Ver projetos
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating animation elements */}
        <div className="absolute inset-0 -z-5">
          {/* Círculos flutuantes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/8 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-2xl animate-[float_7s_ease-in-out_infinite]"></div>
        </div>
      </section>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </>
  );
};

export default Hero;
