import { useState } from 'react';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { PricingCard } from '../components/PricingCard';
import { membershipPlans } from '../data/mockData';
import { BookingModal } from '../components/BookingModal';

const Membership = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mt-8 relative z-20">
            {membershipPlans.map((plan, index) => (
              <PricingCard 
                key={plan.id}
                {...plan}
                delay={index * 0.1}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>
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
