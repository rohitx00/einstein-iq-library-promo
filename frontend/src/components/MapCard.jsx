export const MapCard = ({ address }) => {
  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden glass p-2 relative group bg-white">
      <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none rounded-3xl" />
      <iframe
        title="Location Map"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '1.5rem', filter: 'grayscale(100%) contrast(90%) opacity(80%)' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.909663859974!2d86.20033607490485!3d22.805810979326324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3005452d589%3A0xfc66a5b77382495f!2sEINSTEIN%20IQ%20LIBRARY!5e0!3m2!1sen!2sin!4v1783075063653!5m2!1sen!2sin"
      />
    </div>
  );
};
