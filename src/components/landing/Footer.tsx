import { Link } from 'react-router-dom';
import BifaseLogo from '@/components/BifaseLogo';

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
  >
    {children}
  </a>
);

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
            {/* Social Icons */}
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon href="https://instagram.com/bifase" label="Instagram">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://facebook.com/bifase" label="Facebook">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/bifase" label="LinkedIn">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-end">
              <Link to="/per-professionisti" className="text-muted-foreground transition-colors hover:text-foreground">Per Professionisti</Link>
              <Link to="/privacy-demo-disclaimer" className="text-muted-foreground transition-colors hover:text-foreground">Privacy & Demo Disclaimer</Link>
            </div>
            <div className="rounded-full border border-primary/20 bg-primary/[0.04] px-4 py-2">
              <p className="text-xs text-primary font-medium">
                🎓 MVP Capstone Project — Executive Master in Digital Marketing, Rome Business School
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 text-center text-xs text-muted-foreground space-y-3">
          <p className="font-medium text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Bifase Health Hub è un MVP dimostrativo sviluppato come Capstone Project dell'Executive
            Master in Digital Marketing presso Rome Business School. La piattaforma non è un servizio
            sanitario attivo. I dati presenti sono fittizi e utilizzati esclusivamente a scopo
            formativo e dimostrativo. Non inserire dati personali, sanitari o sensibili.
          </p>
          <p className="text-muted-foreground/80">
            Progetto dimostrativo · Dati fittizi a scopo formativo · <Link to="/privacy-demo-disclaimer" className="underline hover:text-foreground">Privacy & Demo Disclaimer</Link>
          </p>
          <p>© {new Date().getFullYear()} Bifase Health Hub — MVP Capstone Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
