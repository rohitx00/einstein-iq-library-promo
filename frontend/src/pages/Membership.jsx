import { useState } from 'react';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { PricingCard } from '../components/PricingCard';
import { BookingModal } from '../components/BookingModal';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const Membership = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const response = await api.get('/plans');
      return response.data.data;
    }
  });

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12 relative z-10">
        <Container>
          <SectionTitle 
            badge="Plans & Pricing"
            title="Invest in Your Productivity"
            description="Choose the membership plan that best fits your schedule and requirements. Upgrade or cancel anytime."
          />
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mt-8 relative z-20">
              {plans.map((plan, index) => (
                <PricingCard 
                  key={plan.id}
                  name={plan.title}
                  price={plan.price}
                  duration={plan.duration}
                  features={plan.features ? plan.features.split(',').map(f => f.trim()) : []}
                  recommended={plan.isFeatured}
                  delay={index * 0.1}
                  onSelectPlan={handleSelectPlan}
                />
              ))}
            </div>
          )}
        </Container>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlan} 
      />
    </PageTransitionWrapper>
  );
};

export default Membership;
