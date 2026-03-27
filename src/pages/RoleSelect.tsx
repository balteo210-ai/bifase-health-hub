import { Link } from 'react-router-dom';
import { User, Stethoscope } from 'lucide-react';
import BifaseLogo from '@/components/BifaseLogo';
import { motion } from 'framer-motion';

const RoleSelect = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
      <motion.div
        className="w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6"><BifaseLogo size="lg" linkTo="/" className="mx-auto" /></div>
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Benvenuto su Bifase</h1>
        <p className="mb-10 text-muted-foreground">Scegli come vuoi utilizzare la piattaforma</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/login?role=citizen" className="block">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group cursor-pointer rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 transition-colors group-hover:from-primary/20 group-hover:to-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-foreground">Sono un cittadino</h2>
              <p className="text-sm text-muted-foreground">Cerca e prenota servizi sanitari</p>
            </motion.div>
          </Link>
          <Link to="/login?role=provider" className="block">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group cursor-pointer rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 transition-colors group-hover:from-primary/20 group-hover:to-primary/10">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-foreground">Sono un operatore sanitario</h2>
              <p className="text-sm text-muted-foreground">Gestisci appuntamenti e servizi</p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
