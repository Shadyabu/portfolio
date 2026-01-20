import { motion } from 'framer-motion';
import emotionGif from '../../assets/emotion recognition.webp';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FAF5F0' }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-16">
          {/* GIF on the left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 max-w-xs lg:max-w-md"
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

          {/* Mobile arrow - left-aligned, between image and text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:hidden w-full flex justify-start pl-4"
            style={{ marginLeft: '-70px' , marginBottom:'-23px' , marginTop:'-50px' }}
          >
            <svg
              viewBox="90 135 85 215"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '50px', height: '110px' }}
            >
              {/* Curved arrow pointing upward to image */}
              <motion.path
                d="M 131.41 344.017 C 113.5 340.435 102.414 315.417 96.154 300.214 C 77.956 256.018 98.308 208.316 130.342 176.282 C 141.994 164.63 157.482 156.62 168.803 145.299"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                style={{
                  filter: 'url(#roughen-mobile)',
                }}
              />
              {/* Arrow head pointing upward */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2.3 }}
              >
                <path
                  d="M 134.615 139.957 C 140.67 139.957 146.724 139.957 152.778 139.957 C 177.4 139.957 177.02 136.676 168.803 161.325 C 166.675 167.709 165.598 172.823 165.598 179.487"
                  stroke="#0F172A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
              <defs>
                <filter id="roughen-mobile">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Desktop curved arrow - hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block relative self-start"
            style={{ width: '220px', height: '220px', marginRight: '-130px' , marginTop:'-30px'}}
          >
            <svg
              viewBox="40 60 380 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Curved handdrawn arrow pointing right */}
              <motion.path
                d="M 365.365 304.287 C 365.365 272.304 371.207 234.119 359.37 203.869 C 340.598 155.896 268.733 126.485 222.981 115.441 C 190.762 107.664 159.659 109.57 128.558 119.937 C 123.649 121.574 98.583 136.424 98.583 136.424 C 97.064 138.702 77.6 149.913 77.6 149.913"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                style={{
                  filter: 'url(#roughen-desktop)',
                }}
              />
              {/* Arrow head pointing right */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 2 }}
              >
                <path
                  d="M 85.094 91.461 C 85.094 107.964 74.603 123.228 74.603 139.421 C 74.603 139.727 71.492 155.908 71.605 155.908 C 81.586 155.908 92.841 151.375 103.079 149.913 C 112.988 148.497 123.588 147.073 133.055 143.918"
                  stroke="#0F172A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
              <defs>
                <filter id="roughen-desktop">
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
          className="absolute bottom-4 lg:bottom-1 left-1/2 transform -translate-x-1/2"
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
