import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BifaseLogo from '@/components/BifaseLogo';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <BifaseLogo size="navbar" />
          <Link to="/per-professionisti" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Per Professionisti
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/role-select">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Accedi</Button>
          </Link>
          <Link to="/role-select">
            <Button size="sm" className="rounded-full px-5 shadow-sm">Inizia ora</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
