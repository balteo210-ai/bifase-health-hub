import { Clock, MapPin, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Clock,
    title: 'Riduci i tempi di attesa',
    description: 'Prenota istantaneamente e salta la coda. Niente più sale d\'attesa o telefonate.',
    gradient: 'from-primary/10 to-primary/5',
  },
  {
    icon: MapPin,
    title: 'Trova servizi vicino a te',
    description: 'Scopri farmacie, cliniche e professionisti nel tuo quartiere.',
    gradient: 'from-success/10 to-success/5',
  },
  {
    icon: Bell,
    title: 'Notifiche intelligenti',
    description: 'Ricevi avvisi quando si liberano posti cancellati. Non perdere nessuna opportunità.',
    gradient: 'from-accent to-accent/50',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ValueProps = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Perché Bifase
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            La salute, semplificata
          </h2>
          <p className="mx-auto mb-16 max-w-lg text-muted-foreground md:text-lg">
            Un modo più intelligente per gestire i tuoi appuntamenti sanitari
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={item}
              className="group rounded-3xl border border-border/60 bg-card p-8 card-elevated"
            >
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${v.gradient}`}>
                <v.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-foreground">{v.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProps;
