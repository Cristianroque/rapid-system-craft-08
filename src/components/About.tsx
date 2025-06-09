
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={titleRef}
            className={`mb-16 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Somos especialistas em resolver{' '}
              <span className="text-gradient">problemas digitais</span>
            </h2>
          </div>
          
          <div 
            ref={contentRef}
            className={`transition-all duration-1000 delay-300 ${
              contentVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-lg md:text-xl text-muted-foreground space-y-6 leading-relaxed mb-12">
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
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <p className="text-2xl md:text-3xl font-semibold text-gradient mb-6">
                Somos a ponte entre seu problema e a solução tecnológica ideal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground font-medium">Soluções personalizadas</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground font-medium">Tecnologia de ponta</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground font-medium">Suporte contínuo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
