
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Reply, Mail, User, Calendar } from 'lucide-react';

// Mock data para mensagens
const mockMessages = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    company: 'Tech Solutions',
    message: 'Gostaria de um orçamento para desenvolvimento de um e-commerce completo.',
    date: '2024-01-15',
    status: 'new',
    responses: []
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@startup.com',
    phone: '(21) 88888-8888',
    company: 'StartupXYZ',
    message: 'Preciso de um site institucional moderno e responsivo para minha startup.',
    date: '2024-01-14',
    status: 'responded',
    responses: [
      {
        id: 1,
        message: 'Olá Maria! Agradecemos seu interesse. Vamos agendar uma reunião para discutir os detalhes.',
        date: '2024-01-14',
        type: 'custom'
      }
    ]
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    email: 'carlos@empresa.com',
    phone: '(31) 77777-7777',
    company: 'Empresa ABC',
    message: 'Tenho interesse em uma aplicação web para controle financeiro.',
    date: '2024-01-13',
    status: 'new',
    responses: []
  }
];

const quickResponses = [
  'Obrigado pelo seu interesse! Entraremos em contato em breve.',
  'Agendamos uma reunião para discutir seu projeto em detalhes.',
  'Enviamos uma proposta detalhada para seu e-mail.',
  'Seu projeto foi analisado e temos algumas sugestões interessantes.',
  'Ficamos honrados com seu interesse. Vamos elaborar um orçamento personalizado.'
];

const MessageManagement = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [selectedQuickResponse, setSelectedQuickResponse] = useState('');

  const getStatusBadge = (status) => {
    const variants = {
      new: { variant: 'default', text: 'Nova' },
      responded: { variant: 'secondary', text: 'Respondida' },
      archived: { variant: 'outline', text: 'Arquivada' }
    };
    
    const config = variants[status] || variants.new;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const handleSendResponse = (type = 'custom') => {
    if (!selectedMessage || !responseText.trim()) return;

    const newResponse = {
      id: Date.now(),
      message: responseText,
      date: new Date().toISOString().split('T')[0],
      type
    };

    setMessages(messages.map(msg => 
      msg.id === selectedMessage.id 
        ? { 
            ...msg, 
            status: 'responded',
            responses: [...msg.responses, newResponse]
          }
        : msg
    ));

    setResponseText('');
    setSelectedQuickResponse('');
    
    // Atualiza a mensagem selecionada
    setSelectedMessage({
      ...selectedMessage,
      status: 'responded',
      responses: [...selectedMessage.responses, newResponse]
    });
  };

  const handleQuickResponse = () => {
    if (selectedQuickResponse) {
      setResponseText(selectedQuickResponse);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Lista de Mensagens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Mensagens Recebidas ({messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <Card 
                key={message.id} 
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{message.name}</span>
                    {getStatusBadge(message.status)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(message.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>📧 {message.email}</p>
                  <p>📱 {message.phone}</p>
                  {message.company && <p>🏢 {message.company}</p>}
                </div>
                
                <p className="text-sm mt-2 line-clamp-2">{message.message}</p>
                
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(message.date).toLocaleDateString('pt-BR')}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalhes e Resposta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Reply className="w-5 h-5" />
            {selectedMessage ? 'Responder Mensagem' : 'Selecione uma Mensagem'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMessage ? (
            <div className="space-y-6">
              {/* Detalhes da Mensagem */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{selectedMessage.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {selectedMessage.email}</p>
                    <p><strong>Telefone:</strong> {selectedMessage.phone}</p>
                    {selectedMessage.company && (
                      <p><strong>Empresa:</strong> {selectedMessage.company}</p>
                    )}
                    <p><strong>Data:</strong> {new Date(selectedMessage.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="font-medium mb-2">Mensagem:</p>
                  <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Respostas Anteriores */}
              {selectedMessage.responses.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Respostas Enviadas:</h4>
                  <div className="space-y-3">
                    {selectedMessage.responses.map((response) => (
                      <div key={response.id} className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <p className="text-sm">{response.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(response.date).toLocaleDateString('pt-BR')} • 
                          {response.type === 'quick' ? ' Resposta rápida' : ' Resposta personalizada'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resposta Rápida */}
              <div>
                <label className="text-sm font-medium mb-2 block">Respostas Prontas:</label>
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
                  className="mt-2 w-full"
                  onClick={handleQuickResponse}
                  disabled={!selectedQuickResponse}
                >
                  Usar Resposta Pronta
                </Button>
              </div>

              {/* Campo de Resposta */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sua Resposta:</label>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Digite sua resposta personalizada..."
                  rows={4}
                />
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 gradient-primary text-white"
                  onClick={() => handleSendResponse('custom')}
                  disabled={!responseText.trim()}
                >
                  Enviar Resposta
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setResponseText('');
                    setSelectedQuickResponse('');
                  }}
                >
                  Limpar
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selecione uma mensagem para ver os detalhes e responder</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageManagement;
