
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from '@/components/ContactModal';
import { useTheme } from '@/hooks/useTheme';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const { theme } = useTheme();

  const techEmojis = ['💻', '🚀', '⚡', '🔧', '💡', '🎯', '📱', '🌐'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % techEmojis.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    const element = document.getElementById('sobre');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat md:bg-cover bg-background"
        style={{
          backgroundImage: `url('/lovable-uploads/a4cad51c-077a-45f3-b879-64176e122b08.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text visibility - only on desktop */}
        <div className="absolute inset-0 bg-black/70 z-0 hidden md:block"></div>

        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative z-20">
          <div className={`max-w-4xl mx-auto transition-all duration-1200 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground md:text-white">
              Soluções digitais que{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                impressionam
              </span>{' '}
              <span 
                className="inline-block transition-all duration-500 ease-out opacity-90 align-baseline"
                style={{ 
                  width: '0.8em', 
                  height: '0.8em', 
                  fontSize: '0.6em',
                  verticalAlign: 'baseline',
                  lineHeight: '1'
                }}
              >
                {techEmojis[currentEmojiIndex]}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground md:text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Portfólio de projetos que transformaram ideias em sistemas ágeis, modernos e funcionais.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1200 delay-300 ${
              isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'
            }`}>
              <Button 
                onClick={scrollToPortfolio}
                size="lg" 
                className="w-full sm:w-auto gradient-primary text-white px-10 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver projetos
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={scrollToNext}
            className="text-foreground/80 md:text-white/80 hover:text-primary transition-all duration-150 cursor-pointer animate-bounce hover:animate-none"
            style={{ animationDuration: '9s' }}
          >
            <ArrowDown className="w-6 h-6" />
          </button>
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
        @media (max-width: 768px) {
          section {
            background-image: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
