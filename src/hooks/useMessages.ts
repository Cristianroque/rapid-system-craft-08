
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message, MessageResponse } from '@/types/database';
import { toast } from 'sonner';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          message_responses (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const messagesWithResponses: Message[] = data?.map(msg => ({
        ...msg,
        status: msg.status as Message['status'],
        responses: (msg.message_responses || []).map((response: any) => ({
          ...response,
          response_type: response.response_type as MessageResponse['response_type']
        }))
      })) || [];
      
      setMessages(messagesWithResponses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mensagens');
    } finally {
      setLoading(false);
    }
  };

  const createMessage = async (messageData: Omit<Message, 'id' | 'created_at' | 'updated_at' | 'responses'>) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;
      const newMessage: Message = { ...data, status: data.status as Message['status'], responses: [] };
      setMessages(prev => [newMessage, ...prev]);
      toast.success('Mensagem enviada com sucesso!');
      return newMessage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar mensagem';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateMessageStatus = async (id: string, status: Message['status']) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar status da mensagem';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const addMessageResponse = async (messageId: string, responseText: string, responseType: 'custom' | 'quick' = 'custom') => {
    try {
      // Primeiro, buscar os dados da mensagem original
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .select('*')
        .eq('id', messageId)
        .single();

      if (messageError) throw messageError;

      // Inserir a resposta
      const { data, error } = await supabase
        .from('message_responses')
        .insert([{
          message_id: messageId,
          response_text: responseText,
          response_type: responseType
        }])
        .select()
        .single();

      if (error) throw error;

      // Atualizar status da mensagem para 'responded'
      await updateMessageStatus(messageId, 'responded');

      // Enviar e-mail automático
      try {
        console.log('Enviando e-mail para:', messageData.email);
        
        const emailResponse = await supabase.functions.invoke('send-email-response', {
          body: {
            to: messageData.email,
            name: messageData.name,
            responseText: responseText,
            originalMessage: messageData.message
          }
        });

        if (emailResponse.error) {
          console.error('Erro ao enviar e-mail:', emailResponse.error);
          toast.warning('Resposta salva, mas houve problema no envio do e-mail');
        } else {
          console.log('E-mail enviado com sucesso');
          toast.success('Resposta enviada e e-mail entregue com sucesso!');
        }
      } catch (emailError) {
        console.error('Erro no envio do e-mail:', emailError);
        toast.warning('Resposta salva, mas houve problema no envio do e-mail');
      }

      // Atualizar a lista de mensagens localmente
      const typedResponse: MessageResponse = {
        ...data,
        response_type: data.response_type as MessageResponse['response_type']
      };

      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              status: 'responded' as const,
              responses: [...(msg.responses || []), typedResponse]
            }
          : msg
      ));

      return typedResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar resposta';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success('Mensagem excluída com sucesso');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir mensagem';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    createMessage,
    updateMessageStatus,
    addMessageResponse,
    deleteMessage
  };
};
