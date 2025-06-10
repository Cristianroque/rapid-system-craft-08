
import { useTheme } from '@/hooks/useTheme';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`py-12 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-muted text-muted-foreground' : 'bg-foreground text-background'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            DevStudio
          </div>
          <p className={`mb-6 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-muted-foreground/80' : 'text-background/80'
          }`}>
            Transformando ideias em soluções digitais que impressionam e fazem a diferença no seu negócio.
          </p>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-muted-foreground/60' : 'text-background/60'
          }`}>
            © {currentYear} DevStudio. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
