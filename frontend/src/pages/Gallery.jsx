import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { GalleryCard } from '../components/GalleryCard';
import { galleryImages } from '../data/mockData';

const Gallery = () => {
  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12">
        <Container>
          <SectionTitle 
            badge="The Environment"
            title="Take a Tour Inside"
            description="Experience the atmosphere before you even step through the doors. A space designed to inspire."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] mt-8">
            {galleryImages.map((image, index) => (
              <GalleryCard 
                key={image.id}
                url={image.url}
                alt={image.alt}
                span={image.span}
                index={index}
              />
            ))}
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
};

export default Gallery;
