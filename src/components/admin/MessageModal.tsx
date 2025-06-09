
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { User, Calendar, Mail, Phone, Building, MessageSquare } from 'lucide-react';

const quickResponses = [
  'Obrigado pelo seu interesse! Entraremos em contato em breve.',
  'Agendamos uma reunião para discutir seu projeto em detalhes.',
  'Enviamos uma proposta detalhada para seu e-mail.',
  'Seu projeto foi analisado e temos algumas sugestões interessantes.',
  'Ficamos honrados com seu interesse. Vamos elaborar um orçamento personalizado.'
];

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: any;
  onSendResponse?: (messageId: string, response: string, type: string) => void;
}

const MessageModal = ({ isOpen, onClose, message, onSendResponse }: MessageModalProps) => {
  const [responseText, setResponseText] = useState('');
  const [selectedQuickResponse, setSelectedQuickResponse] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [recipientName, setRecipientName] = useState('');

  // Pré-preencher campos quando o modal abrir
  useEffect(() => {
    if (message) {
      setEmailSubject(`Resposta sobre: ${message.message.substring(0, 50)}...`);
      setRecipientName(message.name);
    }
  }, [message]);

  const handleSendResponse = (type = 'custom') => {
    if (!message || !responseText.trim()) return;

    onSendResponse?.(message.id, responseText, type);
    setResponseText('');
    setSelectedQuickResponse('');
    setEmailSubject('');
    setRecipientName('');
  };

  const handleQuickResponse = () => {
    if (selectedQuickResponse) {
      setResponseText(selectedQuickResponse);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { variant: 'default' as const, text: 'Nova' },
      responded: { variant: 'secondary' as const, text: 'Respondida' },
      archived: { variant: 'outline' as const, text: 'Arquivada' }
    };
    
    const config = variants[status] || variants.new;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Mensagem de {message.name}
            </DialogTitle>
            {getStatusBadge(message.status)}
          </div>
        </DialogHeader>

        <div className="flex-1 space-y-6 min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              {/* Informações do Contato */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{message.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{message.email}</span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{message.phone}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {message.company && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{message.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(message.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Mensagem Original */}
              <div className="space-y-2">
                <h3 className="font-semibold">Mensagem:</h3>
                <div className="p-4 bg-background border rounded-lg">
                  <p className="leading-relaxed">{message.message}</p>
                </div>
              </div>

              {/* Respostas Anteriores */}
              {message.responses && message.responses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Respostas Enviadas:</h3>
                  <div className="space-y-3">
                    {message.responses.map((response: any) => (
                      <div key={response.id} className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <p className="text-sm leading-relaxed">{response.response_text}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(response.created_at).toLocaleDateString('pt-BR')} • 
                          {response.response_type === 'quick' ? ' Resposta rápida' : ' Resposta personalizada'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Configurações do Email */}
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold">Configurações do Email:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Nome do Destinatário:</Label>
                    <Input
                      id="recipientName"
                      value={recipientName || message.name}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nome do destinatário"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailSubject">Assunto do Email:</Label>
                    <Input
                      id="emailSubject"
                      value={emailSubject || `Resposta sobre: ${message.message.substring(0, 50)}...`}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Assunto do email"
                    />
                  </div>
                </div>
              </div>

              {/* Resposta Rápida */}
              <div className="space-y-3">
                <h3 className="font-semibold">Resposta Rápida:</h3>
                <Select value={selectedQuickResponse} onValueChange={setSelectedQuickResponse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma resposta pronta" />
                  </SelectTrigger>
                  <SelectContent>
                    {quickResponses.map((response, index) => (
                      <SelectItem key={index} value={response}>
                        {response.length > 50 ? `${response.substring(0, 50)}...` : response}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleQuickResponse}
                  disabled={!selectedQuickResponse}
                >
                  Usar Resposta Pronta
                </Button>
              </div>

              {/* Campo de Resposta */}
              <div className="space-y-3">
                <h3 className="font-semibold">Sua Resposta:</h3>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Digite sua resposta personalizada..."
                  rows={6}
                  className="resize-none"
                />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setResponseText('');
              setSelectedQuickResponse('');
            }}
            disabled={!responseText.trim() && !selectedQuickResponse}
          >
            Limpar
          </Button>
          <Button 
            className="gradient-primary text-white"
            onClick={() => handleSendResponse('custom')}
            disabled={!responseText.trim()}
          >
            Enviar Resposta por Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
