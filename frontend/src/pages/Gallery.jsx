import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { GalleryCard } from '../components/GalleryCard';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const Gallery = () => {
  const { data: galleryImages = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await api.get('/gallery');
      return response.data.data;
    }
  });

  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12">
        <Container>
          <SectionTitle 
            badge="The Environment"
            title="Take a Tour Inside"
            description="Experience the atmosphere before you even step through the doors. A space designed to inspire."
          />
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] mt-8">
              {galleryImages.map((image, index) => {
                // Generate a masonry-like pattern for span
                let span = 'col-span-1 row-span-1';
                if (index % 4 === 0) span = 'col-span-1 md:col-span-2 row-span-2';
                else if (index % 4 === 3) span = 'col-span-1 md:col-span-2 row-span-1';
                
                return (
                  <GalleryCard 
                    key={image.id}
                    url={image.imageUrl}
                    alt={image.title}
                    span={span}
                    index={index}
                  />
                );
              })}
            </div>
          )}
          {galleryImages.length === 0 && !isLoading && (
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              No images available in the gallery.
            </div>
          )}
        </Container>
      </div>
    </PageTransitionWrapper>
  );
};

export default Gallery;
