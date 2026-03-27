import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BifaseLogo from '@/components/BifaseLogo';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <BifaseLogo size="sm" />
        <div className="flex items-center gap-3">
          <Link to="/role-select">
            <Button variant="ghost" size="sm">Accedi</Button>
          </Link>
          <Link to="/role-select">
            <Button size="sm">Inizia ora</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
