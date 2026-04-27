import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { submitLead } from '@/src/data/public';
import { CheckCircle2, AlertCircle, ArrowRight, Wallet, Rocket, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const budgetSchema = z.object({
  full_name: z.string().min(3, 'Nome Completo é obrigatório'),
  email: z.string().email('E-mail corporativo inválido'),
  phone: z.string().min(10, 'WhatsApp válido necessário'),
  company: z.string().min(2, 'Nome da Empresa é necessário'),
  project_type: z.string().min(1, 'Selecione o tipo de projeto'),
  budget_range: z.string().min(1, 'Selecione uma faixa de investimento'),
  message: z.string().min(10, 'Conte-nos um pouco mais sobre o projeto'),
});

type BudgetFormValues = z.infer<typeof budgetSchema>;

export function BudgetPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      project_type: '',
      budget_range: '',
    }
  });

  const onSubmit = async (data: BudgetFormValues) => {
    setState('loading');
    try {
      await submitLead({
        ...data,
        source: 'Budget Page',
      });
      setState('success');
      reset();
    } catch (error) {
      console.error(error);
      setState('error');
    }
  };

  return (
    <div className="bg-surface-low min-h-screen py-24">
      <div className="section-container">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          
          {/* Info Column */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Rocket className="text-primary w-8 h-8" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
                Vamos tirar sua ideia do <span className="text-primary">papel?</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Preencha o formulário ao lado e receba um diagnóstico especializado e uma proposta estratégica em até 24h úteis.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Building2, title: 'Foco no Negócio', desc: 'Não entregamos apenas código, entregamos resultados e ROI.' },
                { icon: Wallet, title: 'Transparência Total', desc: 'Preços modulares e cronogramas realistas sem surpresas.' },
                { icon: CheckCircle2, title: 'Expertise Técnica', desc: 'Stack moderna (Next.js, Supabase, AI) para escala global.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-surface-border">
                    <item.icon className="w-5 h-5 text-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 glass-card bg-primary/5 border border-primary/10 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Preferência por rapidez?</p>
              <h4 className="text-lg font-bold text-dark">Fale direto via WhatsApp</h4>
              <Button onClick={() => window.open('https://wa.me/5511920559685', '_blank')} className="w-full h-14" variant="secondary">
                Abrir Conversa Agora
              </Button>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-2xl border border-surface-border relative overflow-hidden">
              <AnimatePresence mode="wait">
                {state === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-display font-bold">Solicitação Recebida!</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">Um de nossos estrategistas analisará seu perfil e entrará em contato em breve.</p>
                    <div className="pt-8">
                      <Button onClick={() => setState('idle')} variant="outline">Enviar Nova Solicitação</Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Nome Completo" placeholder="Ex: Leonardo Freire" error={errors.full_name?.message} {...register('full_name')} />
                      <Input label="E-mail Corporativo" placeholder="seu@empresa.com.br" error={errors.email?.message} {...register('email')} />
                      <Input label="WhatsApp" placeholder="(11) 99999-9999" error={errors.phone?.message} {...register('phone')} />
                      <Input label="Sua Empresa" placeholder="Nome da sua marca" error={errors.company?.message} {...register('company')} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5 text-left">
                        <label className="text-sm font-semibold text-dark-muted ml-0.5">Tipo de Projeto</label>
                        <select 
                          className="flex h-12 w-full rounded-xl border border-surface-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-no-repeat bg-[right_1rem_center]"
                          style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundSize: '1.2em'}}
                          {...register('project_type')}
                        >
                          <option value="">Selecione...</option>
                          <option value="site-institucional">Site Institucional Premium</option>
                          <option value="landing-page">Landing Page de Conversão</option>
                          <option value="ecommerce">E-commerce Profissional</option>
                          <option value="sistema-web">Sistema Web Customizado</option>
                          <option value="outros">Outros Projetos</option>
                        </select>
                        {errors.project_type && <p className="text-xs text-red-500 mt-1">{errors.project_type.message}</p>}
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="text-sm font-semibold text-dark-muted ml-0.5">Investimento Estimado</label>
                        <select 
                          className="flex h-12 w-full rounded-xl border border-surface-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-no-repeat bg-[right_1rem_center]"
                          style={{backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundSize: '1.2em'}}
                          {...register('budget_range')}
                        >
                          <option value="">Selecione...</option>
                          <option value="1.5-5k">R$ 1.500 - R$ 5.000</option>
                          <option value="5-15k">R$ 5.000 - R$ 15.000</option>
                          <option value="15-50k">R$ 15.000 - R$ 50.000</option>
                          <option value="50k+">Acima de R$ 50.000</option>
                        </select>
                        {errors.budget_range && <p className="text-xs text-red-500 mt-1">{errors.budget_range.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-sm font-semibold text-dark-muted ml-0.5">Objetivos e Mensagem</label>
                      <textarea
                        placeholder="Conte um pouco sobre o projeto e o que você espera alcançar..."
                        className="w-full h-32 rounded-2xl border border-surface-border bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        {...register('message')}
                      ></textarea>
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                    </div>

                    {state === 'error' && (
                      <div className="p-4 bg-red-50 rounded-2xl flex items-center space-x-3 text-red-700 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Falha ao processar. Verifique sua conexão ou fale no WhatsApp.</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full h-16 text-lg group" isLoading={state === 'loading'}>
                      Enviar Solicitação de Orçamento
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <p className="text-center text-[11px] text-gray-400 font-medium">
                      🔒 Seus dados estão seguros e serão usados apenas para fins comerciais.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
