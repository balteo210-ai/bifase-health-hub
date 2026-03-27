import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import BifaseLogo from '@/components/BifaseLogo';

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'citizen' | 'provider') || 'citizen';
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, name, role, ...(role === 'provider' && { businessName: name, serviceType }) });
    navigate(role === 'citizen' ? '/dashboard' : '/provider');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="mb-6"><BifaseLogo size="md" linkTo="/" /></div>
          <h1 className="mb-1 text-2xl font-bold text-foreground">Crea un account</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Registrati come {role === 'citizen' ? 'cittadino' : 'operatore sanitario'}
          </p>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">{role === 'provider' ? 'Nome attività' : 'Nome completo'}</Label>
              <Input id="name" placeholder={role === 'provider' ? 'Nome della tua clinica' : 'Mario Rossi'} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@esempio.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {role === 'provider' && (
              <div>
                <Label>Tipo di servizio</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger><SelectValue placeholder="Seleziona il tipo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Medicina Generale</SelectItem>
                    <SelectItem value="dentistry">Odontoiatria</SelectItem>
                    <SelectItem value="pharmacy">Farmacia</SelectItem>
                    <SelectItem value="physiotherapy">Fisioterapia</SelectItem>
                    <SelectItem value="ophthalmology">Oculistica</SelectItem>
                    <SelectItem value="other">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button type="submit" className="w-full">Crea account</Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Hai già un account?{' '}
            <Link to={`/login?role=${role}`} className="text-primary hover:underline">Accedi</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
