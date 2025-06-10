
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
    }, 2000);

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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  // Different images for light and dark themes
  const backgroundImage = theme === 'dark' 
    ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    : 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80';

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Smooth Transitions */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: `url('${backgroundImage}')`
            }}
          />
          
          {/* Gradient overlay that fades to transparent at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-transparent"></div>
          
          {/* Bottom fade transition to normal background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1200 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Soluções digitais que{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                impressionam
              </span>{' '}
              <span className="inline-block w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl md:text-3xl lg:text-4xl transition-all duration-500 ease-out opacity-90 align-baseline">
                {techEmojis[currentEmojiIndex]}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={scrollToNext}
            className="text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer"
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
      `}</style>
    </>
  );
};

export default Hero;
