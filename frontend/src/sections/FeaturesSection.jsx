import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { FeatureCard } from '../components/FeatureCard';
import { features } from '../data/mockData';

export const FeaturesSection = () => {
  return (
    <Container id="features" className="bg-[var(--color-bg-base)]">
      <SectionTitle 
        badge="Premium Amenities"
        title="Everything You Need to Succeed"
        description="We've thoughtfully designed every aspect of our library to eliminate distractions and maximize your productivity."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delay={index * 0.1}
          />
        ))}
      </div>
    </Container>
  );
};
