
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  repository: string;
  liveDemo?: string;
  fullDescription: string;
  images: string[];
  features: string[];
  challenges: string[];
  results: string[];
}

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Plataforma de gestão para e-commerce",
    description: "Sistema personalizado para controle de estoque, vendas e logística em tempo real.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    category: "E-commerce",
    repository: "https://github.com/empresa/ecommerce-platform",
    liveDemo: "https://demo-ecommerce.empresa.com",
    fullDescription: "Uma plataforma completa de gestão para e-commerce que integra controle de estoque, processamento de pedidos, gestão de clientes e analytics em tempo real. O sistema foi desenvolvido para suportar alto volume de transações e escalar conforme o crescimento do negócio.",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    ],
    features: [
      "Dashboard em tempo real com métricas de vendas",
      "Gestão automatizada de estoque",
      "Sistema de notificações para produtos em baixa",
      "Integração com múltiplos meios de pagamento",
      "Relatórios personalizáveis e exportação de dados"
    ],
    challenges: [
      "Processamento de alto volume de transações simultâneas",
      "Sincronização em tempo real entre múltiplos pontos de venda",
      "Otimização de performance para carregamento rápido"
    ],
    results: [
      "Aumento de 45% na eficiência operacional",
      "Redução de 60% no tempo de processamento de pedidos",
      "Melhoria de 30% na experiência do usuário"
    ]
  },
  {
    id: "health-startup-website",
    title: "Site institucional para startup de saúde",
    description: "Design e desenvolvimento de site responsivo com SEO avançado e blog integrado.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    tech: ["React", "TailwindCSS", "Strapi CMS", "SEO", "Analytics"],
    category: "Website",
    repository: "https://github.com/empresa/health-startup-site",
    liveDemo: "https://vidadigital.com.br",
    fullDescription: "Site institucional moderno e responsivo para startup de saúde digital, focado em conversão e experiência do usuário. Inclui sistema de blog, área de recursos e integração com ferramentas de marketing.",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop"
    ],
    features: [
      "Design responsivo e otimizado para mobile",
      "Sistema de blog integrado com CMS",
      "Otimização SEO avançada",
      "Integração com Google Analytics e ferramentas de marketing",
      "Formulários de contato inteligentes"
    ],
    challenges: [
      "Otimização para carregamento ultra-rápido",
      "Compliance com regulamentações de saúde",
      "Criação de conteúdo técnico acessível"
    ],
    results: [
      "Aumento de 120% no tráfego orgânico",
      "Melhoria de 85% na taxa de conversão",
      "Redução de 40% na taxa de rejeição"
    ]
  },
  {
    id: "financial-control-app",
    title: "Aplicativo web para controle financeiro empresarial",
    description: "Solução web segura e rápida para gestão de fluxo de caixa e relatórios financeiros.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    tech: ["Vue.js", "Laravel", "MySQL", "Charts.js", "Security"],
    category: "FinTech",
    repository: "https://github.com/empresa/financial-control",
    fullDescription: "Aplicativo web completo para gestão financeira empresarial, com recursos avançados de relatórios, previsões e controle de fluxo de caixa. Desenvolvido com foco em segurança e facilidade de uso.",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    features: [
      "Dashboard financeiro interativo",
      "Relatórios personalizáveis em PDF",
      "Controle de contas a pagar e receber",
      "Previsões de fluxo de caixa",
      "Integração com bancos via API"
    ],
    challenges: [
      "Implementação de segurança bancária",
      "Processamento de grandes volumes de dados financeiros",
      "Interface intuitiva para usuários não técnicos"
    ],
    results: [
      "Redução de 50% no tempo de fechamento mensal",
      "Melhoria de 70% na precisão das previsões",
      "Automatização de 80% dos processos manuais"
    ]
  }
];

export const categories = [
  "Todos",
  "E-commerce",
  "Website",
  "FinTech",
  "SaaS",
  "Mobile"
];
