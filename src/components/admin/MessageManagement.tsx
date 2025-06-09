
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, User, Calendar, Eye } from 'lucide-react';
import MessageModal from './MessageModal';

// Mock data para mensagens
const mockMessages = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    company: 'Tech Solutions',
    message: 'Gostaria de um orçamento para desenvolvimento de um e-commerce completo com todas as funcionalidades modernas.',
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
    message: 'Preciso de um site institucional moderno e responsivo para minha startup de tecnologia.',
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
    message: 'Tenho interesse em uma aplicação web para controle financeiro empresarial.',
    date: '2024-01-13',
    status: 'new',
    responses: []
  }
];

const MessageManagement = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { variant: 'default' as const, text: 'Nova', count: messages.filter(m => m.status === 'new').length },
      responded: { variant: 'secondary' as const, text: 'Respondida', count: messages.filter(m => m.status === 'responded').length },
      archived: { variant: 'outline' as const, text: 'Arquivada', count: messages.filter(m => m.status === 'archived').length }
    };
    
    const config = variants[status] || variants.new;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const handleOpenMessage = (message: any) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleSendResponse = (messageId: number, response: string, type: string) => {
    const newResponse = {
      id: Date.now(),
      message: response,
      date: new Date().toISOString().split('T')[0],
      type
    };

    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            status: 'responded',
            responses: [...msg.responses, newResponse]
          }
        : msg
    ));
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  const newMessagesCount = messages.filter(m => m.status === 'new').length;
  const respondedMessagesCount = messages.filter(m => m.status === 'responded').length;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Mensagens Recebidas
            </div>
            <div className="flex gap-2">
              <Badge variant="default">{newMessagesCount} Novas</Badge>
              <Badge variant="secondary">{respondedMessagesCount} Respondidas</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <Card 
                key={message.id} 
                className="p-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.01]"
                onClick={() => handleOpenMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">{message.name}</span>
                      {getStatusBadge(message.status)}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <p>📧 {message.email}</p>
                      <p>📱 {message.phone}</p>
                      {message.company && <p>🏢 {message.company}</p>}
                    </div>
                    
                    <p className="text-sm line-clamp-2 mb-3">{message.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(message.date).toLocaleDateString('pt-BR')}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenMessage(message);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
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
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma mensagem encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>

      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={selectedMessage}
        onSendResponse={handleSendResponse}
      />
    </>
  );
};

export default MessageManagement;
