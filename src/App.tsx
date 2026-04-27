import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { PublicLayout } from './components/layouts/PublicLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { cn } from './lib/utils';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  Users, 
  BarChart, 
  ShieldCheck, 
  Code2, 
  Zap, 
  Smartphone, 
  Monitor, 
  Layout, 
  Settings2, 
  Plus, 
  Minus,
  MessageCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { LeadCaptureSection } from './components/sections/LeadCaptureSection';
import { BudgetPage } from './components/pages/BudgetPage';
import { SERVICES, BLOG_POSTS, FAQS, WHATSAPP_CONFIG } from './constants';
import { motion, AnimatePresence } from 'motion/react';

// Specialized UI Components for Home
function FeatureCard({ icon: Icon, title, desc, i }: { icon: any, title: string, desc: string, i: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="p-10 premium-card space-y-6 group"
    >
      <div className="w-14 h-14 bg-primary-soft rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-display">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}

function BlogPostCard({ post }: { post: any }) {
  return (
    <Link to={`/blog/${post.slug}`} className="premium-card group block">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={post.cover_image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/10">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-widest">
          <Clock className="w-3 h-3 mr-2" />
          {post.published_at}
        </div>
        <h3 className="text-xl font-display group-hover:text-primary transition-colors leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 font-medium">
          {post.excerpt}
        </p>
        <div className="pt-2 flex items-center text-dark text-xs font-bold uppercase tracking-widest">
          Ler mais
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function FaqItem({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-surface-border last:border-0">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 lg:py-8 text-left group"
      >
        <h4 className="text-lg lg:text-xl font-display font-bold group-hover:text-primary transition-colors pr-8">
          {item.question}
        </h4>
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full border border-surface-border flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-primary border-primary text-white" : "text-dark"
        )}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-500 leading-relaxed max-w-3xl font-medium">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Public Pages
function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] -z-10 hidden lg:block" />
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />

        <div className="section-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                <span className="flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full">
                  <Sparkles size={10} />
                </span>
                <span className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  Tecnologia que impulsiona o seu lucro
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-[84px] font-display font-extrabold leading-[1.05] tracking-tight text-gradient">
                Sua visão <br />
                <span className="text-primary italic">extraordinária</span> <br />
                codificada.
              </h1>
              
              <p className="text-gray-500 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium">
                Criamos sites premium, sistemas críticos e experiências digitais focadas em altíssima conversão e autoridade de marca.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link to="/orcamento">
                  <button className="bg-primary text-white btn-premium h-16 px-12 text-lg hover:bg-primary-hover shadow-primary/30 group">
                    Iniciar Meu Projeto
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
                <div className="flex -space-x-3 items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface-low overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                      </div>
                    ))}
                  </div>
                  <div className="pl-6 text-left">
                    <p className="text-xs font-bold text-dark">+50 Projetos Ativos</p>
                    <p className="text-[10px] font-medium text-gray-400">Entrega média em 15 dias</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative">
              <div className="relative z-10 animate-float translate-y-[-20px]">
                {/* Hero Visual Mockup */}
                <div className="glass-card shadow-2xl shadow-primary/10 aspect-square lg:aspect-[4/5] relative flex flex-col items-center justify-center p-8 bg-white/40">
                  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-surface-border overflow-hidden flex flex-col">
                    <div className="h-10 bg-surface-low border-b border-surface-border flex items-center px-4 space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-grow p-6 space-y-6">
                      <div className="w-2/3 h-8 bg-surface-low rounded-lg" />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center">
                          <BarChart className="text-primary w-6 h-6" />
                        </div>
                        <div className="h-24 bg-surface-low rounded-xl" />
                        <div className="h-24 bg-surface-low rounded-xl" />
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-4 bg-surface-low rounded" />
                        <div className="w-full h-4 bg-surface-low rounded" />
                        <div className="w-4/5 h-4 bg-surface-low rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div 
                    initial={{ x: 20, y: 20 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
                    className="absolute -top-6 -right-6 p-5 glass-card bg-white shadow-xl flex items-center space-x-4 border-primary/20 border-2"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Status</p>
                      <p className="text-sm font-black text-dark leading-none">Site Publicado</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, y: 20 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, delay: 0.5 }}
                    className="absolute bottom-1/4 -left-10 p-6 glass-card bg-dark text-white shadow-2xl flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <Terminal size={20} />
                    </div>
                    <div className="pr-4">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">Performance</p>
                      <p className="text-lg font-black leading-none">100% Core Web</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-surface-border bg-surface-low/30 overflow-hidden">
        <div className="section-container text-center space-y-8">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Tecnologias que dominamos para sua evolução</p>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {[
              { name: 'React', icon: Smartphone },
              { name: 'Cloud', icon: ShieldCheck },
              { name: 'SaaS', icon: Layout },
              { name: 'Scale', icon: Users },
              { name: 'AI', icon: Terminal },
            ].map((tech, i) => (
              <div key={i} className="flex items-center space-x-2 font-display font-bold text-xl">
                <tech.icon size={24} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32" id="servicos">
        <div className="section-container space-y-24">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl lg:text-6xl text-gradient">
              Soluções completas para seu <br />
              <span className="text-primary tracking-tighter">ecossistema digital.</span>
            </h2>
            <p className="text-gray-500 text-lg lg:text-xl font-medium leading-relaxed">
              Não entregamos apenas arquivos. Entregamos ferramentas que reduzem processos, aumentam sua percepção de valor e geram caixa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <FeatureCard 
                key={s.id}
                i={i}
                title={s.title}
                desc={s.short_description}
                icon={i === 0 ? Monitor : i === 1 ? Layout : i === 2 ? Smartphone : i === 3 ? Code2 : i === 4 ? Settings2 : Zap}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
                Método Life Dev
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl text-white">
              Um processo <span className="text-primary italic">transparente</span> do início à evolução.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              Acreditamos em parcerias de longo prazo. Nosso método é focado em clareza, velocidade e feedback contínuo para que você acompanhe cada etapa do desenvolvimento.
            </p>
            <Link to="/orcamento">
              <Button className="h-16 px-12 lg:text-lg">Começar Agora</Button>
            </Link>
          </div>

          <div className="space-y-12">
            {[
              { n: '01', t: 'Diagnóstico & Estratégia', d: 'Entendemos profundamente seus objetivos e como a tecnologia pode atendê-los.' },
              { n: '02', t: 'Design & UX Premium', d: 'Criamos interfaces exclusivas focadas em experiência do usuário e conversão.' },
              { n: '03', t: 'Desenvolvimento Ágil', d: 'Código limpo, performante e seguro seguindo as melhores práticas do mercado.' },
              { n: '04', t: 'Publicação & Suporte', d: 'Lançamos seu projeto e garantimos que tudo funcione perfeitamente com suporte ativo.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="text-5xl font-display font-black text-white/5 group-hover:text-primary/40 transition-colors duration-500">
                  {step.n}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{step.t}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-32" id="blog">
        <div className="section-container space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl lg:text-6xl text-gradient">
                Educação Digital <br />
                <span className="text-primary tracking-tighter">para Líderes.</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                Insights reais sobre tecnologia, negócios e design para ajudar no crescimento da sua marca.
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="h-14 font-bold border-surface-border">Ver todos os artigos</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-surface-low/50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl">Perguntas Frequentes</h2>
              <p className="text-gray-500 font-medium">Tiramos suas principais dúvidas sobre o processo de orçamento e entrega.</p>
            </div>

            <div className="bg-white rounded-[40px] border border-surface-border p-8 lg:p-12 shadow-sm">
              {FAQS.map((faq, i) => (
                <FaqItem 
                  key={i} 
                  item={faq} 
                  isOpen={openFaq === i} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>

            <div className="text-center pt-8 space-y-4">
              <p className="text-gray-500 font-medium text-sm">Não encontrou o que procurava?</p>
              <div className="flex justify-center gap-4">
                <a href={`https://wa.me/${WHATSAPP_CONFIG.number}`} className="flex items-center space-x-2 text-primary font-bold hover:underline">
                  <MessageCircle size={18} fill="currentColor" stroke="none" />
                  <span>Fale no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <LeadCaptureSection />
    </div>
  );
}

function PageNotFound() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
       <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center">
        <ArrowRight className="text-primary w-12 h-12 rotate-[-135deg]" />
      </div>
      <div className="space-y-4">
        <h1 className="text-6xl lg:text-8xl font-display font-black text-dark-muted">404</h1>
        <h2 className="text-3xl font-display font-bold text-dark">Algo deu errado.</h2>
        <p className="text-gray-500 max-w-md mx-auto text-lg font-medium">
          A página que você está buscando não existe ou foi movida para uma nova evolução.
        </p>
      </div>
      <Link to="/">
        <Button className="h-16 px-12 text-lg">Voltar para a Home</Button>
      </Link>
    </div>
  );
}

// Blog Detail Page Simulation
function BlogDetail() {
  return (
    <section className="section-container py-32 flex flex-col items-center text-center">
      <div className="max-w-3xl space-y-12">
        <div className="space-y-6">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">Artigo Completo</span>
          <h1 className="text-4xl lg:text-6xl font-display leading-[1.1]">Em breve o conteúdo completo estará disponível.</h1>
          <p className="text-gray-500 text-xl font-medium">Estamos finalizando os últimos detalhes das nossas publicações exclusivas.</p>
        </div>
        <Link to="/blog">
          <Button variant="outline">Voltar ao Blog</Button>
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Surfaces */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/orcamento" element={<BudgetPage />} />
          <Route path="/blog" element={<section className="section-container py-32 space-y-16">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl lg:text-7xl">Nosso Blog</h1>
              <p className="text-gray-500 text-xl font-medium">Insights profundos sobre tecnologia, design e vendas no digital.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map(post => <BlogPostCard key={post.id} post={post} />)}
            </div>
          </section>} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/servicos" element={<section className="section-container py-32"><h1>Serviços em Detalhe</h1></section>} />
          <Route path="/portfolio" element={<section className="section-container py-32"><h1>Cases de Sucesso</h1></section>} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Login (Isolated) */}
        <Route path="/admin/login" element={<div className="min-h-screen bg-surface-low flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl border border-surface-border p-12 space-y-10">
             <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-[20px] mx-auto flex items-center justify-center transform rotate-3 shadow-xl shadow-primary/20">
                <span className="text-white font-black text-2xl -rotate-3">LD</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold text-dark">Portal Admin</h1>
                <p className="text-gray-400 text-sm font-medium">Exclusivo para gestores Life Dev.</p>
              </div>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <Input label="E-mail" placeholder="admin@lifedevtech.com.br" />
              <Input label="Senha" type="password" placeholder="••••••••" />
              <Button className="w-full h-14 group" onClick={() => window.location.href = '/admin/dashboard'}>
                Acessar Dashboard
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>} />

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
           <Route path="/admin/dashboard" element={
            <div className="space-y-8">
              <h1 className="text-3xl font-bold">Painel de Controle</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="admin-card p-6 bg-white shadow-sm border border-surface-border rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Leads Pendentes</p>
                  <p className="text-3xl font-black">24</p>
                </div>
                <div className="admin-card p-6 bg-white shadow-sm border border-surface-border rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Projetos Ativos</p>
                  <p className="text-3xl font-black">12</p>
                </div>
                <div className="admin-card p-6 bg-white shadow-sm border border-surface-border rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contatos WhatsApp</p>
                  <p className="text-3xl font-black">156</p>
                </div>
              </div>
            </div>
           } />
           <Route path="/admin/crm/leads" element={<div className="admin-card p-10 bg-white">CRM em desenvolvimento</div>} />
           <Route path="/admin/financeiro/orders" element={<div className="admin-card p-10 bg-white">Financeiro em desenvolvimento</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
