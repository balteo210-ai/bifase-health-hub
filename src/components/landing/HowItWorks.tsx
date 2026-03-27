import { Search, Eye, CalendarCheck, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: Search, title: 'Cerca un servizio', description: 'Trova professionisti per nome, specialità o zona', step: '01' },
  { icon: Eye, title: 'Vedi la disponibilità', description: 'Visualizza slot liberi in tempo reale', step: '02' },
  { icon: CalendarCheck, title: 'Prenota al volo', description: 'Conferma con un clic, senza telefonate', step: '03' },
  { icon: BellRing, title: 'Ricevi promemoria', description: 'Notifiche automatiche prima dell\'appuntamento', step: '04' },
];

const HowItWorks = () => {
  return (
    <section className="bg-secondary/50 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Come funziona
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            4 passi, zero stress
          </h2>
          <p className="mx-auto mb-16 max-w-lg text-muted-foreground md:text-lg">
            Prenota il tuo prossimo appuntamento in modo semplice e veloce
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-border to-transparent md:block" />
              )}
              <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-card border border-border/60 card-elevated">
                <step.icon className="h-9 w-9 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25">
                  {step.step}
                </span>
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
