import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-primary/5" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Now available in your city
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Find and book healthcare services near you{' '}
            <span className="text-primary">in seconds</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Bifase connects citizens and healthcare providers in real time.
            Search, compare, and book — all in one place.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/role-select">
              <Button size="lg" className="gap-2 px-8 text-base">
                <Search className="h-4 w-4" />
                Find a service
              </Button>
            </Link>
            <Link to="/role-select">
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base">
                Join as a provider
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
