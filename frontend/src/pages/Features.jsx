import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { FeaturesSection } from '../sections/FeaturesSection';

const Features = () => {
  return (
    <PageTransitionWrapper>
      <div className="pt-20">
        <FeaturesSection />
      </div>
    </PageTransitionWrapper>
  );
};

export default Features;
