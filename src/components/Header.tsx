
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/ContactModal';
import { Menu, X } from 'lucide-react';

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl md:text-2xl font-bold text-gradient">
              DevStudio
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {isProjectDetail ? (
                <button onClick={handleBackClick} className="text-foreground hover:text-primary transition-colors">
                  ← Voltar
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
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
              <nav className="container mx-auto px-4 py-6 space-y-4">
                {isProjectDetail ? (
                  <button 
                    onClick={handleBackClick} 
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors w-full text-left py-3 px-4 rounded-lg hover:bg-muted/50"
                  >
                    ← Voltar
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => scrollToSection('sobre')} 
                      className="block text-foreground hover:text-primary transition-colors w-full text-left py-3 px-4 rounded-lg hover:bg-muted/50"
                    >
                      Sobre
                    </button>
                    <button 
                      onClick={() => scrollToSection('servicos')} 
                      className="block text-foreground hover:text-primary transition-colors w-full text-left py-3 px-4 rounded-lg hover:bg-muted/50"
                    >
                      Serviços
                    </button>
                    <button 
                      onClick={handlePortfolioClick} 
                      className="block text-foreground hover:text-primary transition-colors w-full text-left py-3 px-4 rounded-lg hover:bg-muted/50"
                    >
                      Portfólio
                    </button>
                    <button 
                      onClick={() => scrollToSection('depoimentos')} 
                      className="block text-foreground hover:text-primary transition-colors w-full text-left py-3 px-4 rounded-lg hover:bg-muted/50"
                    >
                      Depoimentos
                    </button>
                  </>
                )}
                <div className="pt-2">
                  <Button 
                    onClick={handleContactClick} 
                    className="gradient-primary text-white w-full py-3"
                  >
                    Entrar em Contato
                  </Button>
                </div>
              </nav>
            </div>
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
