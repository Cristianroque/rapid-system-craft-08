
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato! Em breve responderemos.",
    });
    
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Entre em{' '}
            <span className="text-gradient">contato</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Preencha o formulário ou envie um e-mail diretamente para nossa equipe. Estamos prontos para ouvir você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <Card className="border-0 bg-gradient-to-br from-card to-muted/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Informações de contato</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-muted-foreground">contato@suempresa.com</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-muted-foreground">(82) 9 9999-9999</p>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      Resposta garantida em até 24 horas durante dias úteis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Card className="border-0 bg-gradient-to-br from-card to-muted/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nome *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Empresa
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full"
                      placeholder="Conte-nos sobre seu projeto..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full gradient-primary text-white hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
