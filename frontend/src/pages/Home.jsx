import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Hero } from '../sections/Hero';
import { FeaturesSection } from '../sections/FeaturesSection';
import { StatisticsSection } from '../sections/StatisticsSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';

const Home = () => {
  return (
    <PageTransitionWrapper>
      <div className="flex flex-col w-full">
        <Hero />
        <FeaturesSection />
        <StatisticsSection />
        <TestimonialsSection />
      </div>
    </PageTransitionWrapper>
  );
};

export default Home;
