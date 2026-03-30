import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import BifaseLogo from '@/components/BifaseLogo';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import BiPremiaWallet from '@/components/bipremia/BiPremiaWallet';
import { motion } from 'framer-motion';

const BiPremiaPage = () => {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();

  if (!user) { navigate('/role-select'); return null; }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <BifaseLogo size="navbar" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{user.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-lg px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              🪙 Il mio BiPremia
            </h1>
            <p className="text-sm text-muted-foreground">Guadagna e spendi i tuoi BiPoint</p>
          </div>
          <BiPremiaWallet />
        </motion.div>
      </div>
    </div>
  );
};

export default BiPremiaPage;
