import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import BifaseLogo from '@/components/BifaseLogo';
import { motion } from 'framer-motion';

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'citizen' | 'provider') || 'citizen';
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email, role,
      name: role === 'provider' ? businessName : name,
      ...(role === 'provider' && { businessName, serviceType }),
    });
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
          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Crea un account</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Registrati come {role === 'citizen' ? 'cittadino' : 'operatore sanitario'}
          </p>
          <form onSubmit={handleRegister} className="space-y-4">
            {role === 'citizen' ? (
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Mario Rossi" className="h-11 rounded-xl" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Nome struttura</Label>
                  <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} required placeholder="Farmacia Centrale" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Tipo di servizio</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Seleziona tipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medicina Generale">Medicina Generale</SelectItem>
                      <SelectItem value="Odontoiatria">Odontoiatria</SelectItem>
                      <SelectItem value="Farmacia">Farmacia</SelectItem>
                      <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
                      <SelectItem value="Oculistica">Oculistica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@esempio.com" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="h-11 rounded-xl" />
            </div>
            <Button type="submit" className="h-11 w-full rounded-xl text-base shadow-sm">Crea account</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Hai già un account?{' '}
            <Link to={`/login?role=${role}`} className="font-medium text-primary hover:underline">Accedi</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
