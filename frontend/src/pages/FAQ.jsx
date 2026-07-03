import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { faqs } from '../data/mockData';
import { cn } from '../utils/cn';

const FAQAccordion = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[var(--color-border)] last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-lg text-[var(--color-primary)] pr-8">{question}</span>
        <ChevronDown 
          className={cn(
            'text-[var(--color-accent)] transition-transform duration-300 shrink-0',
            isOpen && 'rotate-180'
          )} 
          size={24} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--color-text-secondary)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12">
        <Container>
          <SectionTitle 
            badge="Questions?"
            title="Frequently Asked Questions"
            description="Everything you need to know about memberships, facilities, and rules."
          />
          <div className="max-w-3xl mx-auto mt-8 glass rounded-3xl p-4 md:p-8">
            {faqs.map((faq) => (
              <FAQAccordion
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
};

export default FAQ;
