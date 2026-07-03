import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';
import { MapCard } from '../components/MapCard';
import { Button } from '../components/Button';
import { cn } from '../utils/cn';

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    alert('Message sent successfully! We will get back to you soon.');
  };

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
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">Phone</p>
                    <a href="tel:+1234567890" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">Email</p>
                    <a href="mailto:hello@einsteiniq.com" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">hello@einsteiniq.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-primary)]">Address</p>
                    <p className="text-[var(--color-text-secondary)]">123 Academic Avenue, Knowledge District, City 10001</p>
                  </div>
                </div>
              </div>

              <MapCard />
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
                  <label htmlFor="subject" className="text-sm font-medium text-[var(--color-primary)]">Subject</label>
                  <input 
                    id="subject"
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white border outline-none transition-colors",
                      errors.subject ? "border-red-500 focus:border-red-500" : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                    )}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && <span className="text-xs text-red-500">{errors.subject.message}</span>}
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
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-accent)] text-white hover:bg-[#b5952f] mt-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
