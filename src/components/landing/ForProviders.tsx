import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ForProviders = () => {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-navy-foreground md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/[0.06] blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-6 inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Per operatori
            </span>
            <h2 className="mb-5 font-display text-3xl font-bold md:text-5xl">
              Aumenta l'efficienza dei tuoi appuntamenti
            </h2>
            <p className="mx-auto mb-14 max-w-xl text-lg opacity-70">
              Gestisci il tuo calendario, riduci le assenze e riempi automaticamente
              gli slot vuoti con il nostro sistema di recupero intelligente.
            </p>
          </motion.div>

          <div className="mb-14 grid gap-4 md:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'Pianificazione intelligente', desc: 'Gestisci gli slot in modo smart' },
              { icon: TrendingUp, label: 'Riduci le assenze', desc: 'Fino al 40% in meno di no-show' },
              { icon: Users, label: 'Nuovi pazienti', desc: 'Raggiungi più persone nella tua zona' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-display font-bold">{item.label}</span>
                <span className="text-sm opacity-60">{item.desc}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link to="/role-select">
                <Button size="lg" className="h-12 gap-2 rounded-full px-10 text-base shadow-lg shadow-primary/25">
                  Unisciti a Bifase
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/per-professionisti">
                <Button variant="outline" size="lg" className="h-12 rounded-full px-10 text-base border-white/20 text-white hover:bg-white/10">
                  Scopri di più
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForProviders;
