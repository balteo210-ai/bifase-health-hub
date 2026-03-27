import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, TrendingUp, Users } from 'lucide-react';

const ForProviders = () => {
  return (
    <section className="bg-navy py-24 text-navy-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Increase your appointment efficiency
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg opacity-80">
            Manage your schedule, reduce no-shows, and fill empty slots automatically
            with our smart slot recovery system.
          </p>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'Smart scheduling' },
              { icon: TrendingUp, label: 'Reduce no-shows' },
              { icon: Users, label: 'Attract new patients' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 rounded-xl bg-[hsl(220_50%_20%)] p-6"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <Link to="/role-select">
            <Button size="lg" className="px-10 text-base">
              Join Bifase
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForProviders;
