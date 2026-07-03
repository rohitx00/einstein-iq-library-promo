import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { TestimonialCard } from '../components/TestimonialCard';
import { testimonials } from '../data/mockData';

export const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Container id="testimonials" className="bg-[var(--color-bg-base)] overflow-hidden">
      <SectionTitle 
        badge="Success Stories"
        title="Hear From Our Members"
        description="Discover how Einstein IQ has transformed the study habits and academic performance of our community."
      />
      
      <div className="relative max-w-[100vw] sm:max-w-none">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-surface)] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)] transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-surface)] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)] transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </Container>
  );
};
