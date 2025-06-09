
-- Criar tabela de projetos
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  repository TEXT,
  live_demo TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  challenges TEXT[] NOT NULL DEFAULT '{}',
  results TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de mensagens
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de respostas para mensagens
CREATE TABLE public.message_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
  response_text TEXT NOT NULL,
  response_type TEXT NOT NULL DEFAULT 'custom' CHECK (response_type IN ('custom', 'quick')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para projetos (público para leitura, admin para escrita)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública dos projetos
CREATE POLICY "Anyone can view projects" 
  ON public.projects 
  FOR SELECT 
  USING (true);

-- Habilitar RLS para mensagens (admin apenas)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura e escrita das mensagens (por enquanto público)
CREATE POLICY "Anyone can view messages" 
  ON public.messages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create messages" 
  ON public.messages 
  FOR INSERT 
  WITH CHECK (true);

-- Habilitar RLS para respostas
ALTER TABLE public.message_responses ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura das respostas
CREATE POLICY "Anyone can view message responses" 
  ON public.message_responses 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create message responses" 
  ON public.message_responses 
  FOR INSERT 
  WITH CHECK (true);

-- Inserir projetos de teste
INSERT INTO public.projects (title, description, full_description, image, tech, category, repository, live_demo, images, features, challenges, results) VALUES 
(
  'Plataforma de gestão para e-commerce',
  'Sistema personalizado para controle de estoque, vendas e logística em tempo real.',
  'Uma plataforma completa de gestão para e-commerce que integra controle de estoque, processamento de pedidos, gestão de clientes e analytics em tempo real. O sistema foi desenvolvido para suportar alto volume de transações e escalar conforme o crescimento do negócio.',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
  ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
  'E-commerce',
  'https://github.com/empresa/ecommerce-platform',
  'https://demo-ecommerce.empresa.com',
  ARRAY[
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  ],
  ARRAY[
    'Dashboard em tempo real com métricas de vendas',
    'Gestão automatizada de estoque',
    'Sistema de notificações para produtos em baixa',
    'Integração com múltiplos meios de pagamento',
    'Relatórios personalizáveis e exportação de dados'
  ],
  ARRAY[
    'Processamento de alto volume de transações simultâneas',
    'Sincronização em tempo real entre múltiplos pontos de venda',
    'Otimização de performance para carregamento rápido'
  ],
  ARRAY[
    'Aumento de 45% na eficiência operacional',
    'Redução de 60% no tempo de processamento de pedidos',
    'Melhoria de 30% na experiência do usuário'
  ]
),
(
  'Site institucional para startup de saúde',
  'Design e desenvolvimento de site responsivo com SEO avançado e blog integrado.',
  'Site institucional moderno e responsivo para startup de saúde digital, focado em conversão e experiência do usuário. Inclui sistema de blog, área de recursos e integração com ferramentas de marketing.',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
  ARRAY['React', 'TailwindCSS', 'Strapi CMS', 'SEO', 'Analytics'],
  'Website',
  'https://github.com/empresa/health-startup-site',
  'https://vidadigital.com.br',
  ARRAY[
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop'
  ],
  ARRAY[
    'Design responsivo e otimizado para mobile',
    'Sistema de blog integrado com CMS',
    'Otimização SEO avançada',
    'Integração com Google Analytics e ferramentas de marketing',
    'Formulários de contato inteligentes'
  ],
  ARRAY[
    'Otimização para carregamento ultra-rápido',
    'Compliance com regulamentações de saúde',
    'Criação de conteúdo técnico acessível'
  ],
  ARRAY[
    'Aumento de 120% no tráfego orgânico',
    'Melhoria de 85% na taxa de conversão',
    'Redução de 40% na taxa de rejeição'
  ]
),
(
  'Aplicativo web para controle financeiro empresarial',
  'Solução web segura e rápida para gestão de fluxo de caixa e relatórios financeiros.',
  'Aplicativo web completo para gestão financeira empresarial, com recursos avançados de relatórios, previsões e controle de fluxo de caixa. Desenvolvido com foco em segurança e facilidade de uso.',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
  ARRAY['Vue.js', 'Laravel', 'MySQL', 'Charts.js', 'Security'],
  'FinTech',
  'https://github.com/empresa/financial-control',
  NULL,
  ARRAY[
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
  ],
  ARRAY[
    'Dashboard financeiro interativo',
    'Relatórios personalizáveis em PDF',
    'Controle de contas a pagar e receber',
    'Previsões de fluxo de caixa',
    'Integração com bancos via API'
  ],
  ARRAY[
    'Implementação de segurança bancária',
    'Processamento de grandes volumes de dados financeiros',
    'Interface intuitiva para usuários não técnicos'
  ],
  ARRAY[
    'Redução de 50% no tempo de fechamento mensal',
    'Melhoria de 70% na precisão das previsões',
    'Automatização de 80% dos processos manuais'
  ]
);

-- Inserir mensagens de teste
INSERT INTO public.messages (name, email, phone, company, message, status) VALUES 
(
  'João Silva',
  'joao@email.com',
  '(11) 99999-9999',
  'Tech Solutions',
  'Gostaria de um orçamento para desenvolvimento de um e-commerce completo com todas as funcionalidades modernas.',
  'new'
),
(
  'Maria Santos',
  'maria@startup.com',
  '(21) 88888-8888',
  'StartupXYZ',
  'Preciso de um site institucional moderno e responsivo para minha startup de tecnologia.',
  'responded'
),
(
  'Carlos Oliveira',
  'carlos@empresa.com',
  '(31) 77777-7777',
  'Empresa ABC',
  'Tenho interesse em uma aplicação web para controle financeiro empresarial.',
  'new'
);

-- Inserir uma resposta de teste para a mensagem da Maria
INSERT INTO public.message_responses (message_id, response_text, response_type)
SELECT 
  id,
  'Olá Maria! Agradecemos seu interesse. Vamos agendar uma reunião para discutir os detalhes.',
  'custom'
FROM public.messages 
WHERE email = 'maria@startup.com';
