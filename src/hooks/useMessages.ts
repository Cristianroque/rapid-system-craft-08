
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message, MessageResponse } from '@/types/database';

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
      
      const messagesWithResponses = data?.map(msg => ({
        ...msg,
        responses: msg.message_responses || []
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
      setMessages(prev => [{ ...data, responses: [] }, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao criar mensagem');
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
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar status da mensagem');
    }
  };

  const addMessageResponse = async (messageId: string, responseText: string, responseType: 'custom' | 'quick' = 'custom') => {
    try {
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

      // Atualizar a lista de mensagens localmente
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              status: 'responded' as const,
              responses: [...(msg.responses || []), data]
            }
          : msg
      ));

      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao adicionar resposta');
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
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao excluir mensagem');
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
