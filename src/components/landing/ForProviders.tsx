import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, TrendingUp, Users } from 'lucide-react';

const ForProviders = () => {
  return (
    <section className="bg-navy py-24 text-navy-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Aumenta l'efficienza dei tuoi appuntamenti
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg opacity-80">
            Gestisci il tuo calendario, riduci le assenze e riempi automaticamente
            gli slot vuoti con il nostro sistema di recupero intelligente.
          </p>
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'Pianificazione intelligente' },
              { icon: TrendingUp, label: 'Riduci le assenze' },
              { icon: Users, label: 'Attira nuovi pazienti' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 rounded-xl bg-[hsl(220_50%_20%)] p-6">
                <item.icon className="h-8 w-8 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <Link to="/role-select">
            <Button size="lg" className="px-10 text-base">
              Unisciti a Bifase
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForProviders;
