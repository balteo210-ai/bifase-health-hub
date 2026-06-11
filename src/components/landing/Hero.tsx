import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: 'var(--gradient-hero)' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-primary/[0.04] animate-float" />
        <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-primary/[0.03]" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/[0.02]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
              🎓 MVP Capstone Project — Rome Business School
            </div>
            <div className="mb-8 ml-2 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-muted-foreground">
              Demo MVP — Executive Master in Digital Marketing
            </div>
          </motion.div>

          <motion.h1
            className="mb-6 font-display text-4xl font-extrabold leading-[1.1] text-foreground md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Trova e prenota servizi sanitari{' '}
            <span className="gradient-text">in pochi secondi</span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bifase è un prototipo dimostrativo che simula il customer journey di cittadini e
            operatori sanitari. Cerca, confronta e simula una prenotazione — tutto in un'unica demo.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/esplora">
              <Button size="lg" className="h-12 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
                <Search className="h-4 w-4" />
                Esplora la demo
              </Button>
            </Link>
            <Link to="/role-select">
              <Button size="lg" variant="outline" className="h-12 gap-2 rounded-full px-8 text-base">
                Simula profilo operatore
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Prototipo formativo</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Flusso demo di ricerca e prenotazione</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span>Capstone Project — Rome Business School</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
