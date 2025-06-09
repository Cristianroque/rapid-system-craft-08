
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, User, Calendar, Eye, Loader2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useMessages } from '@/hooks/useMessages';
import MessageModal from './MessageModal';
import { toast } from 'sonner';

const MessageManagement = () => {
  const { messages, loading, deleteMessage, addMessageResponse } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      new: { variant: 'default' as const, text: 'Nova' },
      responded: { variant: 'secondary' as const, text: 'Respondida' },
      archived: { variant: 'outline' as const, text: 'Arquivada' }
    };
    
    const config = variants[status] || variants.new;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const handleOpenMessage = (message: any) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleSendResponse = async (messageId: string, response: string, type: string) => {
    try {
      await addMessageResponse(messageId, response, type as 'custom' | 'quick');
      toast.success('Resposta enviada com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Erro ao enviar resposta');
      console.error('Erro:', error);
    }
  };

  const handleDeleteConfirm = async (messageId: string) => {
    try {
      setDeleteLoading(messageId);
      await deleteMessage(messageId);
      toast.success('Mensagem excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir mensagem');
      console.error('Erro:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const newMessagesCount = messages.filter(m => m.status === 'new').length;
  const respondedMessagesCount = messages.filter(m => m.status === 'responded').length;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Carregando mensagens...</span>
        </CardContent>
      </Card>
    );
  }

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
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {messages.map((message) => (
              <Card 
                key={message.id} 
                className="p-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.01]"
                onClick={() => handleOpenMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">{message.name}</span>
                      {getStatusBadge(message.status)}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <p className="break-all">📧 {message.email}</p>
                      {message.phone && <p>📱 {message.phone}</p>}
                      {message.company && <p>🏢 {message.company}</p>}
                    </div>
                    
                    <p className="text-sm line-clamp-2 mb-3 break-words">{message.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(message.created_at).toLocaleDateString('pt-BR')}
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
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={(e) => e.stopPropagation()}
                              disabled={deleteLoading === message.id}
                            >
                              {deleteLoading === message.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a mensagem de "{message.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteConfirm(message.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
