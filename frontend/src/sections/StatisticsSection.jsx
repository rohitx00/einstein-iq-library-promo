import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Container } from '../components/Container';
import { statistics } from '../data/mockData';

const Counter = ({ from = 0, to, duration = 2, suffix = '' }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const controls = animate(from, to, {
        duration,
        ease: 'easeOut',
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString() + suffix;
          }
        },
      });
      setHasAnimated(true);
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, isInView, hasAnimated]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

export const StatisticsSection = () => {
  return (
    <div className="bg-[var(--color-primary)] py-20 border-y border-[var(--color-secondary)]">
      <Container className="!py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-2"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[var(--color-accent)]">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-medium text-[var(--color-surface)] uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};
