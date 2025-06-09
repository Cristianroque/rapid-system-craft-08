
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/ContactModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [lastProjectsRoute, setLastProjectsRoute] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/projetos') {
      setLastProjectsRoute(true);
    }
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handlePortfolioClick = () => {
    if (location.pathname === '/') {
      scrollToSection('portfolio');
    } else {
      window.location.href = '/projetos';
    }
    setIsMenuOpen(false);
  };

  const handleBackClick = () => {
    if (lastProjectsRoute && location.pathname.includes('/projetos/')) {
      window.location.href = '/projetos';
    } else {
      window.location.href = '/';
    }
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMenuOpen(false);
  };

  const isProjectDetail = location.pathname.includes('/projetos/') && location.pathname !== '/projetos';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl md:text-2xl font-bold text-gradient">
              DevStudio
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {isProjectDetail ? (
                <button onClick={handleBackClick} className="text-foreground hover:text-primary transition-colors">
                  Voltar
                </button>
              ) : (
                <>
                  <button onClick={() => scrollToSection('sobre')} className="text-foreground hover:text-primary transition-colors">
                    Sobre
                  </button>
                  <button onClick={() => scrollToSection('servicos')} className="text-foreground hover:text-primary transition-colors">
                    Serviços
                  </button>
                  <button onClick={handlePortfolioClick} className="text-foreground hover:text-primary transition-colors">
                    Portfólio
                  </button>
                  <button onClick={() => scrollToSection('depoimentos')} className="text-foreground hover:text-primary transition-colors">
                    Depoimentos
                  </button>
                </>
              )}
              <Button onClick={handleContactClick} className="gradient-primary text-white px-4 lg:px-6">
                Contato
              </Button>
            </nav>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className={`h-0.5 w-6 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                <span className={`h-0.5 w-6 bg-foreground transition-all mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-6 bg-foreground transition-all mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
              {isProjectDetail ? (
                <button onClick={handleBackClick} className="block text-foreground hover:text-primary transition-colors w-full text-left">
                  Voltar
                </button>
              ) : (
                <>
                  <button onClick={() => scrollToSection('sobre')} className="block text-foreground hover:text-primary transition-colors w-full text-left">
                    Sobre
                  </button>
                  <button onClick={() => scrollToSection('servicos')} className="block text-foreground hover:text-primary transition-colors w-full text-left">
                    Serviços
                  </button>
                  <button onClick={handlePortfolioClick} className="block text-foreground hover:text-primary transition-colors w-full text-left">
                    Portfólio
                  </button>
                  <button onClick={() => scrollToSection('depoimentos')} className="block text-foreground hover:text-primary transition-colors w-full text-left">
                    Depoimentos
                  </button>
                </>
              )}
              <Button onClick={handleContactClick} className="gradient-primary text-white w-full">
                Contato
              </Button>
            </nav>
          )}
        </div>
      </header>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default Header;
