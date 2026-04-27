import { Service, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'sites-profissionais',
    title: 'Sites Institucionais Premium',
    short_description: 'Posicionamento digital de alto impacto para empresas que buscam autoridade.',
    description: 'Desenvolvemos sites institucionais com design exclusivo, focados em conversão e performance.',
    content: '...',
    category: 'Web',
    price_range: 'Sob consulta',
    created_at: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '2',
    slug: 'landing-pages',
    title: 'Landing Pages de Alta Conversão',
    short_description: 'Páginas otimizadas para transformar visitantes em leads qualificados.',
    description: 'Foco total em ROI. Criamos LPs com copy persuasiva e design focado em ação.',
    content: '...',
    category: 'Marketing',
    price_range: 'A partir de R$ 1.500',
    created_at: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '3',
    slug: 'ecommerce',
    title: 'E-commerce & Lojas Virtuais',
    short_description: 'Sua loja online preparada para vender mais e escalar com segurança.',
    description: 'Soluções completas de venda online com integração de pagamentos e logística.',
    content: '...',
    category: 'Vendas',
    price_range: 'Sob consulta',
    created_at: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '4',
    slug: 'sistemas-web',
    title: 'Sistemas Web Customizados',
    short_description: 'Sua operação automatizada com tecnologia sob medida para o seu negócio.',
    description: 'Dashboards, CRMs e ERPs exclusivos para otimizar processos e reduzir custos.',
    content: '...',
    category: 'Software',
    price_range: 'Desenvolvimento modular',
    created_at: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '5',
    slug: 'paineis-admin',
    title: 'Painéis Administrativos',
    short_description: 'Gestão completa do seu conteúdo e operação em um só lugar.',
    description: 'Interface profissional para controle de dados, usuários e métricas.',
    content: '...',
    category: 'Backoffice',
    price_range: 'Incluso em sistemas',
    created_at: new Date().toISOString(),
    status: 'published'
  },
  {
    id: '6',
    slug: 'automacoes',
    title: 'Automações & Integrações',
    short_description: 'Conectamos suas ferramentas para um fluxo de trabalho sem falhas.',
    description: 'Integre CRM, WhatsApp, E-mail e redes sociais para automatizar seu marketing.',
    content: '...',
    category: 'Eficiência',
    price_range: 'Projetos específicos',
    created_at: new Date().toISOString(),
    status: 'published'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'por-que-site-profissional-2026',
    title: 'Por que sua empresa precisa de um site profissional em 2026',
    excerpt: 'O mercado digital mudou. Ter "apenas uma página" não é mais suficiente para converter.',
    content: 'O ano de 2026 marca uma era onde a confiança digital é a moeda mais valiosa. Um site profissional não é apenas um cartão de visitas, é o centro de sua estratégia de vendas...',
    author: 'Equipe Life Dev',
    category: 'Estratégia',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
    published_at: '2026-04-15',
    status: 'published'
  },
  {
    id: 'b2',
    slug: 'landing-page-nao-e-so-design',
    title: 'Landing Page não é só design: é conversão',
    excerpt: 'Descubra os elementos psicológicos que fazem um visitante clicar no botão de compra.',
    content: 'Muitas empresas gastam fortunas em design, mas ignoram a copy e o fluxo de UX. Uma Landing Page vencedora equilibra estética com psicologia de vendas...',
    author: 'Leonardo Freire',
    category: 'Marketing',
    cover_image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800',
    published_at: '2026-04-18',
    status: 'published'
  },
  {
    id: 'b3',
    slug: 'quando-criar-sistema-web-sob-medida',
    title: 'Quando vale criar um sistema web sob medida',
    excerpt: 'Planilhas têm limites. Saiba quando é a hora de investir em uma solução exclusiva.',
    content: 'Sua empresa está crescendo e as ferramentas prontas não atendem mais? Um sistema customizado pode ser o diferencial para sua próxima escala...',
    author: 'Tech Lead Life Dev',
    category: 'Tecnologia',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
    published_at: '2026-04-20',
    status: 'published'
  },
  {
    id: 'b4',
    slug: 'erros-site-amador',
    title: '5 erros que fazem um site parecer amador',
    excerpt: 'Pequenos detalhes que destroem sua credibilidade perante o cliente.',
    content: 'Lentidão, falta de responsividade e imagens de baixa qualidade são apenas o começo. Saiba como identificar e corrigir erros comuns...',
    author: 'UX Designer',
    category: 'Design',
    cover_image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800',
    published_at: '2026-04-22',
    status: 'published'
  },
  {
    id: 'b5',
    slug: 'gerar-leads-whatsapp-trafego',
    title: 'Como usar site, WhatsApp e tráfego para gerar leads',
    excerpt: 'O funil perfeito para negócios que dependem do contato comercial direto.',
    content: 'A integração entre anúncios, uma LP otimizada e o fechamento no WhatsApp é a estratégia mais rápida para retorno sobre investimento hoje...',
    author: 'Estrategista Digital',
    category: 'Vendas',
    cover_image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800',
    published_at: '2026-04-25',
    status: 'published'
  },
  {
    id: 'b6',
    slug: 'diferenca-site-lp-sistema',
    title: 'Diferença entre Site Institucional, Landing Page e Sistema',
    excerpt: 'Escolha a ferramenta certa para o seu momento de negócio.',
    content: 'Não sabe por onde começar? Entender a função de cada ferramenta digital é o primeiro passo para não jogar dinheiro fora...',
    author: 'Product Manager',
    category: 'Dúvidas',
    cover_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800',
    published_at: '2026-04-27',
    status: 'published'
  }
];

export const FAQS = [
  {
    question: 'Quanto custa um site profissional?',
    answer: 'O investimento varia de acordo com a complexidade. Landing Pages começam em R$ 1.500, enquanto sites institucionais premium e sistemas sob medida exigem um diagnóstico detalhado para orçamento preciso.'
  },
  {
    question: 'Em quanto tempo o projeto fica pronto?',
    answer: 'Uma Landing Page costuma levar de 7 a 15 dias. Sites institucionais variam de 20 a 45 dias. Sistemas web dependem do escopo, mas trabalhamos com entregas modulares para você já ter valor em poucas semanas.'
  },
  {
    question: 'Vocês fazem sistemas web personalizados também?',
    answer: 'Sim! Somos especialistas em transformar processos manuais ou planilhas complexas em sistemas web automatizados com painéis administrativos intuitivos.'
  },
  {
    question: 'O site já vem otimizado para celulares?',
    answer: 'Absolutamente. Todos os nossos projetos são 100% responsivos e otimizados para oferecer a melhor experiência em qualquer dispositivo, do smartphone ao desktop.'
  },
  {
    question: 'Como funciona o processo de orçamento?',
    answer: 'Você preenche o formulário ou nos chama no WhatsApp, nós agendamos um diagnóstico rápido para entender seu negócio e enviamos uma proposta estratégica em até 24h.'
  },
  {
    question: 'Vocês oferecem suporte pós-lançamento?',
    answer: 'Sim, oferecemos planos de suporte evolutivo para garantir que seu site continue seguro, rápido e atualizado, acompanhando o crescimento da sua empresa.'
  }
];

export const WHATSAPP_CONFIG = {
  number: '5511920559685',
  defaultMessage: 'Olá Life Dev! Gostaria de fazer um orçamento para um projeto digital.'
};

export const EMAIL_CONFIG = {
  address: 'contato@lifedevtech.com.br'
};
