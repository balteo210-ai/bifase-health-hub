import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Stethoscope } from 'lucide-react';

const RoleSelect = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-lg text-center">
        <Link to="/" className="mb-2 inline-block text-2xl font-bold text-primary">
          Bifase
        </Link>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome to Bifase</h1>
        <p className="mb-10 text-muted-foreground">Choose how you'd like to use the platform</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/login?role=citizen" className="block">
            <div className="group cursor-pointer rounded-2xl border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent transition-colors group-hover:bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">I am a citizen</h2>
              <p className="text-sm text-muted-foreground">Search and book healthcare services</p>
            </div>
          </Link>

          <Link to="/login?role=provider" className="block">
            <div className="group cursor-pointer rounded-2xl border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent transition-colors group-hover:bg-primary/10">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">I am a healthcare provider</h2>
              <p className="text-sm text-muted-foreground">Manage appointments and services</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
