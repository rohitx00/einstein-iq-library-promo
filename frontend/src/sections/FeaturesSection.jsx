import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { FeatureCard } from '../components/FeatureCard';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const FeaturesSection = () => {
  const { data: features = [], isLoading } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const response = await api.get('/facilities');
      return response.data.data;
    }
  });

  return (
    <Container id="features" className="bg-white">
      <SectionTitle 
        badge="Premium Amenities"
        title="Everything You Need to Succeed"
        description="We've thoughtfully designed every aspect of our library to eliminate distractions and maximize your productivity."
      />
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
        </div>
      ) : (
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
      )}
    </Container>
  );
};
