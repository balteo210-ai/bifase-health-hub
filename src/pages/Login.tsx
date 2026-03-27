import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/lib/store';

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
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <Link to="/" className="mb-6 inline-block text-xl font-bold text-primary">
            Bifase
          </Link>
          <h1 className="mb-1 text-2xl font-bold text-foreground">Login</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in as a {role === 'citizen' ? 'citizen' : 'healthcare provider'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link
              to={`/register?role=${role}`}
              className="text-primary hover:underline"
            >
              Create account
            </Link>
            <span className="mx-2 text-muted-foreground">·</span>
            <button className="text-muted-foreground hover:text-foreground">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
