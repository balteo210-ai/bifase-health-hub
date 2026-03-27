import { Clock, MapPin, Bell } from 'lucide-react';

const values = [
  {
    icon: Clock,
    title: 'Riduci i tempi di attesa',
    description: 'Prenota istantaneamente e salta la coda. Niente più sale d\'attesa o telefonate.',
  },
  {
    icon: MapPin,
    title: 'Trova servizi vicino a te',
    description: 'Scopri farmacie, cliniche e professionisti nel tuo quartiere.',
  },
  {
    icon: Bell,
    title: 'Ricevi notifiche istantanee',
    description: 'Ricevi avvisi quando si liberano posti cancellati. Non perdere nessuna opportunità.',
  },
];

const ValueProps = () => {
  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
          Perché scegliere Bifase?
        </h2>
        <p className="mx-auto mb-16 max-w-lg text-center text-muted-foreground">
          Un modo più intelligente per gestire i tuoi appuntamenti sanitari
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="rounded-2xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
