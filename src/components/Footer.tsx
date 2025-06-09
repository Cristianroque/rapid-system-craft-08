
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            DevStudio
          </div>
          <p className="text-background/80 mb-6 max-w-2xl mx-auto">
            Transformando ideias em soluções digitais que impressionam e fazem a diferença no seu negócio.
          </p>
          <div className="text-sm text-background/60">
            © {currentYear} DevStudio. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
