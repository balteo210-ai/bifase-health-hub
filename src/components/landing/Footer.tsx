import { Link } from 'react-router-dom';
import BifaseLogo from '@/components/BifaseLogo';

const Footer = () => {
  return (
    <footer className="border-t bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <BifaseLogo size="sm" linkTo="/" />
            <p className="mt-3 text-sm text-muted-foreground">
              Colleghiamo cittadini e operatori sanitari
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">Chi siamo</Link>
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">Contatti</Link>
            <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bifase. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
