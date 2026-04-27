import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageCircle, Mail, Phone, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { WHATSAPP_CONFIG, EMAIL_CONFIG } from '@/src/constants';

function ContactTopBar() {
  return (
    <div className="bg-dark text-white/70 py-2.5 text-[11px] font-medium tracking-wider uppercase border-b border-white/5">
      <div className="section-container flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-6">
          <a href={`mailto:${EMAIL_CONFIG.address}`} className="flex items-center hover:text-primary transition-colors">
            <Mail className="w-3 h-3 mr-2 text-primary" />
            {EMAIL_CONFIG.address}
          </a>
          <a href={`https://wa.me/${WHATSAPP_CONFIG.number}`} className="flex items-center hover:text-primary transition-colors">
            <Phone className="w-3 h-3 mr-2 text-primary" />
            +55 11 92055-9685
          </a>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
            Disponível para novos projetos
          </span>
        </div>
      </div>
    </div>
  );
}

export function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Soluções', href: '/solucoes' },
    { name: 'Portfólio', href: '/portfolio' },
    { name: 'Planos', href: '/planos' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <ContactTopBar />
      
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-surface-border py-4" : "bg-transparent py-6"
      )}>
        <div className="section-container flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-xl shadow-primary/20">
              <span className="text-white font-display font-black text-xl -rotate-3 group-hover:rotate-0 transition-transform">LD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-extrabold tracking-tighter text-dark leading-none">
                Life Dev
              </span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
                Sites & Sistemas
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-semibold transition-all rounded-xl hover:text-primary",
                  pathname === link.href ? "text-primary bg-primary/5" : "text-gray-600 hover:bg-surface-low"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/orcamento" className="hidden md:block">
              <Button size="md" className="group">
                Criar Orçamento
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <button 
              className="lg:hidden p-2 text-dark bg-surface-low rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-surface-border shadow-2xl"
            >
              <div className="px-6 py-10 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between text-2xl font-display font-bold text-dark hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ChevronRight className="text-gray-200" />
                  </Link>
                ))}
                <div className="pt-6 flex flex-col space-y-4">
                  <Link to="/orcamento" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full h-14 text-lg">Pedir Orçamento Agora</Button>
                  </Link>
                  <a href={`https://wa.me/${WHATSAPP_CONFIG.number}`} className="flex items-center justify-center space-x-3 text-dark font-bold hover:text-primary transition-colors py-4">
                    <MessageCircle fill="currentColor" stroke="none" className="w-5 h-5 text-green-500" />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_CONFIG.number}`}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle fill="currentColor" stroke="none" className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </a>

      {/* Footer */}
      <footer className="bg-dark text-white pt-32 pb-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform rotate-3">
                  <span className="text-white font-display font-black text-xl -rotate-3">LD</span>
                </div>
                <span className="text-2xl font-display font-bold tracking-tighter text-white">
                  Life Dev
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Aceleramos negócios através de tecnologia extraordinária. Especialistas em sites premium, sistemas críticos e conversão estratégica.
              </p>
              <div className="flex space-x-4">
                <a href={`mailto:${EMAIL_CONFIG.address}`} className="p-3 bg-white/5 rounded-2xl hover:bg-primary transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={`https://wa.me/${WHATSAPP_CONFIG.number}`} className="p-3 bg-white/5 rounded-2xl hover:bg-primary transition-all duration-300">
                  <MessageCircle fill="currentColor" stroke="none" className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold mb-8 text-lg uppercase tracking-widest text-primary/80">Serviços</h4>
              <ul className="space-y-5 text-gray-400 text-[13px] font-medium">
                <li><Link to="/servicos/sites-institucionais" className="hover:text-white transition-colors">Sites Institucionais Premium</Link></li>
                <li><Link to="/servicos/landing-pages" className="hover:text-white transition-colors">Landing Pages de Alta Conversão</Link></li>
                <li><Link to="/servicos/e-commerce" className="hover:text-white transition-colors">E-commerce Profissional</Link></li>
                <li><Link to="/servicos/sistemas-web" className="hover:text-white transition-colors">Sistemas Web Sob Medida</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-8 text-lg uppercase tracking-widest text-primary/80">Empresa</h4>
              <ul className="space-y-5 text-gray-400 text-[13px] font-medium">
                <li><Link to="/sobre" className="hover:text-white transition-colors">Nossa História</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfólio & Cases</Link></li>
                <li><Link to="/processo" className="hover:text-white transition-colors">Nosso Método</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Insights & Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-8 text-lg uppercase tracking-widest text-primary/80">Atendimento</h4>
              <div className="space-y-6">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Segunda a Sexta, das 09h às 18h.<br />
                  Sua proposta estratégica enviada em até 24h.
                </p>
                <Link to="/orcamento">
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 py-6">
                    Pedir Orçamento
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              <span>© {new Date().getFullYear()} Life Dev | Sites & Sistemas</span>
              <span className="hidden md:block">•</span>
              <Link to="/legal/privacidade" className="hover:text-primary transition-colors">Privacidade</Link>
              <Link to="/legal/termos" className="hover:text-primary transition-colors">Termos</Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Infraestrutura Verificada</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
