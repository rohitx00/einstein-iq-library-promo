import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold font-heading mb-6"
      >
        Welcome to Einstein IQ
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl"
      >
        The premium environment for deep focus and academic excellence.
      </motion.p>
    </div>
  );
};

export default Home;
