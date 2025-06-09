
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactModal from './ContactModal';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleRef, titleVisible] = useScrollAnimation();
  const [cardRef, cardVisible] = useScrollAnimation();

  return (
    <>
      <section id="contato" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={titleRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Entre em{' '}
              <span className="text-gradient">contato</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Preencha o formulário ou envie um e-mail diretamente para nossa equipe. Estamos prontos para ouvir você.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card 
              ref={cardRef}
              className={`border-0 bg-gradient-to-br from-card to-muted/50 transition-all duration-1000 delay-200 ${
                cardVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
              }`}
            >
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">E-mail</h3>
                    <p className="text-muted-foreground">contato@suempresa.com</p>
                  </div>
                  
                  <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Telefone</h3>
                    <p className="text-muted-foreground">(82) 9 9999-9999</p>
                  </div>
                  
                  <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground">(82) 9 9999-9999</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Resposta garantida em até 24 horas durante dias úteis.
                  </p>
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    size="lg"
                    className="gradient-primary text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
                  >
                    Enviar mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Contact;
