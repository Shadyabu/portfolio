import { motion } from 'framer-motion';
import emotionGif from '../../assets/emotion recognition.webp';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FAF5F0' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* GIF on the left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 max-w-md"
          >
            <div
              style={{
                border: '2px solid #D6C9A1',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.1)'
              }}
            >
              <img
                src={emotionGif}
                alt="Emotion Recognition Demo"
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Handdrawn curved arrow - hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block relative"
            style={{ width: '120px', height: '120px' }}
          >
            <svg
              viewBox="0 0 150 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Curved handdrawn arrow pointing right */}
              <motion.path
                d="M 20 60 Q 75 30, 130 60"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                style={{
                  filter: 'url(#roughen)',
                }}
              />
              {/* Arrow head pointing right */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2 }}
              >
                <path
                  d="M 130 60 L 125 50 M 130 60 L 120 64"
                  stroke="#0F172A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
              <defs>
                <filter id="roughen">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Text on the right with Mouse Memoirs font */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-auto text-center lg:text-left"
          >
            <h1
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#0F172A',
                lineHeight: '1.2',
                marginBottom: '0.5rem'
              }}
            >
              This is me, Shady Abushady
            </h1>
            <p
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                color: '#0F172A',
                opacity: 0.8
              }}
            >
              AI/ML Engineer
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a
            href="#about"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#0F172A',
              opacity: 0.5,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
          >
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              Scroll to explore
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: 'bounce 2s infinite' }}
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
