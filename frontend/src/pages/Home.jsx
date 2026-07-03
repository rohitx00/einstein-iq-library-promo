import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Hero } from '../sections/Hero';
import { FeaturesSection } from '../sections/FeaturesSection';
import { StatisticsSection } from '../sections/StatisticsSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CTASection } from '../sections/CTASection';

const Home = () => {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col w-full">
        <Hero />
        <FeaturesSection limit={6} />
        <StatisticsSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </PageTransitionWrapper>
  );
};

export default Home;
