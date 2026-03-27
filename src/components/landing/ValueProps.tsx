import { Clock, MapPin, Bell } from 'lucide-react';

const values = [
  {
    icon: Clock,
    title: 'Reduce waiting time',
    description: 'Book instantly and skip the queue. No more waiting rooms or phone calls.',
  },
  {
    icon: MapPin,
    title: 'Find services near you',
    description: 'Discover pharmacies, clinics, and professionals right in your neighborhood.',
  },
  {
    icon: Bell,
    title: 'Get notified instantly',
    description: 'Receive alerts when cancelled slots become available. Never miss an opportunity.',
  },
];

const ValueProps = () => {
  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
          Why choose Bifase?
        </h2>
        <p className="mx-auto mb-16 max-w-lg text-center text-muted-foreground">
          A smarter way to manage your healthcare appointments
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
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
