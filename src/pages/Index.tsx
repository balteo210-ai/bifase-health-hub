import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ValueProps from '@/components/landing/ValueProps';
import HowItWorks from '@/components/landing/HowItWorks';
import ForProviders from '@/components/landing/ForProviders';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <ForProviders />
      <Footer />
    </div>
  );
};

export default Index;
