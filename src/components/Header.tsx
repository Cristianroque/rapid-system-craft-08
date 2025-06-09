
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            DevStudio
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('sobre')} className="text-foreground hover:text-primary transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection('servicos')} className="text-foreground hover:text-primary transition-colors">
              Serviços
            </button>
            <Link to="/projetos" className="text-foreground hover:text-primary transition-colors">
              Portfólio
            </Link>
            <button onClick={() => scrollToSection('depoimentos')} className="text-foreground hover:text-primary transition-colors">
              Depoimentos
            </button>
            <Button onClick={() => scrollToSection('contato')} className="gradient-primary text-white">
              Contato
            </Button>
          </nav>

          <button 
            className="md:hidden"
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
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => scrollToSection('sobre')} className="block text-foreground hover:text-primary transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection('servicos')} className="block text-foreground hover:text-primary transition-colors">
              Serviços
            </button>
            <Link to="/projetos" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Portfólio
            </Link>
            <button onClick={() => scrollToSection('depoimentos')} className="block text-foreground hover:text-primary transition-colors">
              Depoimentos
            </button>
            <Button onClick={() => scrollToSection('contato')} className="gradient-primary text-white w-full">
              Contato
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
