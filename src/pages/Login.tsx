import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/lib/store';
import BifaseLogo from '@/components/BifaseLogo';
import { motion } from 'framer-motion';

const Login = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'citizen' | 'provider') || 'citizen';
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, name: email.split('@')[0], role });
    navigate(role === 'citizen' ? '/dashboard' : '/provider');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-xl" style={{ boxShadow: 'var(--shadow-elevated)' }}>
          <div className="mb-8"><BifaseLogo size="md" linkTo="/" /></div>
          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Accedi</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Accedi come {role === 'citizen' ? 'cittadino' : 'operatore sanitario'}
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@esempio.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11 rounded-xl" />
            </div>
            <Button type="submit" className="h-11 w-full rounded-xl text-base shadow-sm">Accedi</Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link to={`/register?role=${role}`} className="font-medium text-primary hover:underline">Crea un account</Link>
            <span className="mx-2 text-muted-foreground">·</span>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Password dimenticata?</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
