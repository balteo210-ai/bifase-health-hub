import { Search, Eye, CalendarCheck, BellRing } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Search for a service', step: '01' },
  { icon: Eye, title: 'View real-time availability', step: '02' },
  { icon: CalendarCheck, title: 'Book instantly', step: '03' },
  { icon: BellRing, title: 'Receive reminders', step: '04' },
];

const HowItWorks = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mb-16 max-w-lg text-center text-muted-foreground">
          Book your next appointment in 4 simple steps
        </p>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-0.5 w-full translate-x-1/2 bg-border md:block" />
              )}
              <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
