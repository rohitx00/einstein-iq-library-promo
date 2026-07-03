import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { MapCard } from '../components/MapCard';
import { Button } from '../components/Button';
import { cn } from '../utils/cn';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../services/api';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      const response = await api.get('/contact-info');
      return response.data.data;
    }
  });

  const messageMutation = useMutation({
    mutationFn: (data) => api.post('/messages', data),
    onSuccess: () => {
      alert('Message sent successfully! We will get back to you soon.');
      reset();
    },
    onError: () => {
      alert('Failed to send message. Please try again.');
    }
  });

  const onSubmit = (data) => {
    messageMutation.mutate(data);
  };

  const phone = contactInfo?.phone || "+1 (234) 567-890";
  const email = contactInfo?.email || "hello@einsteiniq.com";
  const address = contactInfo?.address || "123 Academic Avenue, Knowledge District, City 10001";
  const mapUrl = contactInfo?.mapUrl;

  return (
    <PageTransitionWrapper>
      <div className="bg-[var(--color-bg-base)] min-h-screen py-12">
        <Container>
          <SectionTitle 
            badge="Get in Touch"
            title="We'd Love to Hear From You"
            description="Have questions about our memberships or facilities? Send us a message and our team will respond promptly."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {/* Contact Info & Map */}
            <div className="flex flex-col gap-8">
              <div className="glass p-8 rounded-3xl flex flex-col gap-6">
                <h3 className="text-2xl font-heading font-bold text-[var(--color-primary)]">Contact Information</h3>
                
                {isLoading ? (
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)] mx-auto"></div>
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-primary)]">Phone</p>
                        <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">{phone}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-primary)]">Email</p>
                        <a href={`mailto:${email}`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">{email}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-primary)]">Address</p>
                        <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap">{address}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {mapUrl ? (
                <div className="glass p-4 rounded-3xl h-[300px] overflow-hidden">
                   <iframe
                      src={mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '1rem' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    ></iframe>
                </div>
              ) : (
                <MapCard />
              )}
            </div>

            {/* Contact Form */}
            <div className="glass p-8 md:p-12 rounded-3xl">
              <h3 className="text-2xl font-heading font-bold text-[var(--color-primary)] mb-8">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-primary)]">Full Name</label>
                  <input 
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white border outline-none transition-colors",
                      errors.name ? "border-red-500 focus:border-red-500" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                    )}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-primary)]">Email Address</label>
                  <input 
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white border outline-none transition-colors",
                      errors.email ? "border-red-500 focus:border-red-500" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                    )}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-[var(--color-primary)]">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white border outline-none transition-colors",
                      errors.phone ? "border-red-500 focus:border-red-500" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                    )}
                    placeholder="+1 (234) 567-890"
                  />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="requestType" className="text-sm font-medium text-[var(--color-primary)]">Subject / Request Type</label>
                  <select 
                    id="requestType"
                    {...register('requestType')}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white border outline-none transition-colors",
                      errors.requestType ? "border-red-500 focus:border-red-500" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                    )}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="visit">Schedule a Visit</option>
                    <option value="call">Request a Call</option>
                  </select>
                  {errors.requestType && <span className="text-xs text-red-500">{errors.requestType.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--color-primary)]">Message</label>
                  <textarea 
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white border outline-none transition-colors resize-none",
                      errors.message ? "border-red-500 focus:border-red-500" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                    )}
                    placeholder="Your message here..."
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={messageMutation.isPending}
                  className="w-full bg-[var(--color-accent)] text-white hover:bg-[#b5952f] mt-2"
                >
                  {messageMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
};

export default Contact;
