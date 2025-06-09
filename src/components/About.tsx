
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [leftRef, leftVisible] = useScrollAnimation();
  const [rightRef, rightVisible] = useScrollAnimation();

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={titleRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Somos especialistas em resolver{' '}
              <span className="text-gradient">problemas digitais</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              ref={leftRef}
              className={`transition-all duration-1000 delay-200 ${
                leftVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-40px]'
              }`}
            >
              <div className="text-lg md:text-xl text-muted-foreground space-y-6 leading-relaxed">
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
            </div>
            
            <div 
              ref={rightRef}
              className={`transition-all duration-1000 delay-400 ${
                rightVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-[40px]'
              }`}
            >
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <p className="text-2xl md:text-3xl font-semibold text-gradient mb-6">
                  Somos a ponte entre seu problema e a solução tecnológica ideal.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Soluções personalizadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Tecnologia de ponta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Suporte contínuo</span>
                  </div>
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
