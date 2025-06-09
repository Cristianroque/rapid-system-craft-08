
export interface Project {
  id: string;
  title: string;
  description: string;
  full_description: string;
  image: string;
  tech: string[];
  category: string;
  repository?: string;
  live_demo?: string;
  images: string[];
  features: string[];
  challenges: string[];
  results: string[];
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'responded' | 'archived';
  created_at: string;
  updated_at: string;
  responses?: MessageResponse[];
}

export interface MessageResponse {
  id: string;
  message_id: string;
  response_text: string;
  response_type: 'custom' | 'quick';
  created_at: string;
}
