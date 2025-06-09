
const About = () => {
  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 animate-fade-in">
            Somos especialistas em resolver{' '}
            <span className="text-gradient">problemas digitais</span>
          </h2>
          
          <div className="text-lg md:text-xl text-muted-foreground space-y-6 leading-relaxed animate-fade-in">
            <p>
              Sites e sistemas mal construídos geram frustração, lentidão e perda de oportunidades. 
              Nossa missão é eliminar esses gargalos com <strong>soluções sob medida</strong>, pensadas 
              para escalar com o seu negócio.
            </p>
            
            <p>
              Desenvolvemos plataformas digitais de alto desempenho, focadas em{' '}
              <strong>experiência do usuário, velocidade, tecnologia de ponta e manutenção facilitada</strong>. 
              Tudo isso com um processo ágil e transparente.
            </p>
            
            <p className="text-2xl font-semibold text-gradient">
              Somos a ponte entre seu problema e a solução tecnológica ideal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
