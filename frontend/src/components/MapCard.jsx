export const MapCard = ({ address }) => {
  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden glass p-2 relative group">
      <div className="absolute inset-0 bg-[var(--color-primary)]/40 group-hover:bg-[var(--color-primary)]/20 transition-colors z-10 pointer-events-none rounded-3xl" />
      <iframe
        title="Location Map"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '1.5rem', filter: 'grayscale(100%) invert(90%) hue-rotate(180deg) contrast(80%)' }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNSJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
      />
    </div>
  );
};
