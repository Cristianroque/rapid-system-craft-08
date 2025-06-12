import ContactModal from '@/components/ContactModal';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      scrollToSection('hero');
    } else {
      window.location.href = '/';
    }
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
    window.location.href = '/';
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMenuOpen(false);
  };

  const isProjectDetail = location.pathname.includes('/projetos/') && location.pathname !== '/projetos';
  const isProjectsPage = location.pathname === '/projetos';
  const isHomePage = location.pathname === '/';

  // Determine text color based on page and scroll state
  const getTextColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white';
    }
    return 'text-foreground';
  };

  const getHoverTextColor = () => {
    if (isHomePage && !isScrolled) {
      return 'hover:text-primary';
    }
    return 'hover:text-primary';
  };

  // Mobile menu icon color - theme responsive except when transparent on home page
  const getMobileIconColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white';
    }
    return 'text-foreground';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage
        ? 'bg-background/95 backdrop-blur-md border-b border-border'
        : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleLogoClick} className="flex items-center">
              <img
                src="https://i.ibb.co/sd8gjWj6/logosqtstudio.png"
                alt="SqtStudio Logo"
                className="h-8 md:h-10"
              />
            </button>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {isProjectDetail || isProjectsPage ? (
                <button onClick={handleBackClick} className={`${getTextColor()} ${getHoverTextColor()} transition-colors`}>
                  ← Voltar
                </button>
              ) : (
                <>
                  <button onClick={() => scrollToSection('sobre')} className={`${getTextColor()} ${getHoverTextColor()} transition-colors`}>
                    Sobre
                  </button>
                  <button onClick={() => scrollToSection('servicos')} className={`${getTextColor()} ${getHoverTextColor()} transition-colors`}>
                    Serviços
                  </button>
                  <button onClick={handlePortfolioClick} className={`${getTextColor()} ${getHoverTextColor()} transition-colors`}>
                    Portfólio
                  </button>
                  <button onClick={() => scrollToSection('depoimentos')} className={`${getTextColor()} ${getHoverTextColor()} transition-colors`}>
                    Depoimentos
                  </button>
                </>
              )}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button onClick={handleContactClick} className="gradient-primary text-white px-4 lg:px-6">
                  Contato
                </Button>
              </div>
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className={`w-6 h-6 ${getMobileIconColor()}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${getMobileIconColor()}`} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg transition-all duration-300">
              <nav className="container mx-auto px-4 py-6 space-y-4">
                {isProjectDetail || isProjectsPage ? (
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
