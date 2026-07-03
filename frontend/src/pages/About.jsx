import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const About = () => {
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await api.get('/about');
      return response.data.data;
    }
  });

  const title = aboutData?.title || "Redefining the Modern Workspace";
  const description = aboutData?.description || "Founded with a vision to create the perfect environment for uninterrupted focus and academic success.";
  const mission = aboutData?.mission || "We believe that the right environment is the catalyst for extraordinary achievement. Our mission is to provide students, professionals, and lifelong learners with a sanctuary free from the noise and distractions of the modern world.";
  const vision = aboutData?.vision || "To be the premier network of premium study spaces, fostering a community of driven individuals who value focus, respect, and academic excellence above all else.";
  const imageUrl = aboutData?.imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200";

  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12">
        <Container>
          <SectionTitle 
            badge="Our Story"
            title={title}
            description={description}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="relative h-[500px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-[var(--color-primary)]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={imageUrl} 
                alt="About our Library"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-heading font-bold text-[var(--color-primary)]">Our Mission</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg whitespace-pre-wrap">
                {mission}
              </p>
              <h3 className="text-3xl font-heading font-bold text-[var(--color-primary)] mt-6">Our Vision</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg whitespace-pre-wrap">
                {vision}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
};

export default About;
