import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { rules } from '../data/mockData';

const Rules = () => {
  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12">
        <Container>
          <SectionTitle 
            badge="Code of Conduct"
            title="Library Rules"
            description="To maintain our premium, distraction-free environment, we ask all members to strictly adhere to these guidelines."
          />
          <div className="max-w-3xl mx-auto flex flex-col gap-6 mt-8">
            {rules.map((rule, index) => (
              <div 
                key={rule.id}
                className="glass p-6 md:p-8 rounded-2xl flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-[var(--color-surface)] flex items-center justify-center font-bold text-xl shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-[var(--color-primary)] mb-2">{rule.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
};

export default Rules;
