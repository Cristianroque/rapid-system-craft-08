
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Features />
      <Portfolio />
      <Testimonials />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
