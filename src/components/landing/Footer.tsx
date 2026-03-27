import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-xl font-bold text-primary">Bifase</span>
            <p className="mt-1 text-sm text-muted-foreground">
              Connecting citizens and healthcare providers
            </p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bifase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
