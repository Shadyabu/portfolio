import { motion } from 'framer-motion';
import FL from '../../assets/about/FL.webp';
import G20 from '../../assets/about/G20.webp';
import GIZ from '../../assets/about/GIZ.webp';
import GPDF from '../../assets/about/GPDF.webp';
import Hundertwasser from '../../assets/about/Hundertwasser.webp';
import IMC from '../../assets/about/IMC.webp';
import London from '../../assets/about/London.webp';
import Orange from '../../assets/about/Orange_logo.webp';
import QMUL from '../../assets/about/QMUL.webp';
import UCL from '../../assets/about/UCL.webp';
import UNODC from '../../assets/about/UNODC.webp';
import Caritas from '../../assets/about/caritas.webp';
import Globe from '../../assets/about/globe.webp';

const images = [
  { src: UCL, alt: 'UCL', rotate: -3, size: 'large' },
  { src: QMUL, alt: 'QMUL', rotate: 2, size: 'small' },
  { src: London, alt: 'London', rotate: -1, size: 'small' },
  { src: GIZ, alt: 'GIZ', rotate: -2, size: 'medium' },
  { src: IMC, alt: 'IMC Worldwide', rotate: 4, size: 'small' },
  { src: GPDF, alt: 'GPDF', rotate: 3, size: 'medium' },
  { src: Globe, alt: 'Globe', rotate: 3, size: 'small' },
  { src: FL, alt: 'FL', rotate: -4, size: 'medium' },
  { src: Hundertwasser, alt: 'Hundertwasser', rotate: 1, size: 'small' },
  { src: G20, alt: 'G20', rotate: -2, size: 'medium' },
  { src: UNODC, alt: 'UNODC', rotate: 2, size: 'small' },
  { src: Orange, alt: 'Orange', rotate: -3, size: 'medium' },
  { src: Caritas, alt: 'Caritas', rotate: -1, size: 'small' },
];

const About = () => {
  return (
    <section id="about" className="section-container" style={{ backgroundColor: '#FAF5F0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Playful section title */}
        <h2
          className="text-center mb-3"
          style={{
            fontFamily: "'Mouse Memoirs', cursive",
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#0F172A',
            letterSpacing: '0.02em'
          }}
        >
          About me
        </h2>

        {/* Handdrawn underline decoration */}
        <div className="flex justify-center mb-8">
          <svg width="160" height="12" viewBox="0 0 160 12" fill="none">
            <motion.path
              d="M 2 6 Q 40 3, 80 7 T 158 5"
              stroke="#D6C9A1"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                filter: 'url(#roughen-underline)',
              }}
            />
            <defs>
              <filter id="roughen-underline">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Text section */}
        <motion.div
          className="mb-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p
            className="leading-relaxed"
            style={{
              fontSize: '1.125rem',
              color: '#0F172A',
              opacity: 0.85,
              fontStyle: 'italic'
            }}
          >
            A collection of moments, places, and organizations that have shaped my journey.
          </p>
        </motion.div>

        {/* Asymmetrical image collage */}
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              gridAutoFlow: 'dense'
            }}
          >
            {images.map((image, index) => {
              // Define size classes for asymmetry
              const sizeMap = {
                small: 'col-span-1 row-span-1',
                medium: 'md:col-span-2 row-span-1',
                large: 'md:col-span-2 md:row-span-2',
                xlarge: 'md:col-span-3 md:row-span-2'
              };

              const heightMap = {
                small: '150px',
                medium: '180px',
                large: '250px',
                xlarge: '250px'
              };

              return (
                <motion.div
                  key={index}
                  className={sizeMap[image.size]}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: image.rotate,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: heightMap[image.size],
                      backgroundColor: '#FFFFFF',
                      border: '3px solid #D6C9A1',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      boxShadow: '6px 6px 0px rgba(214, 201, 161, 0.3)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${image.src})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '0.5rem'
                      }}
                    />
                  </div>

                  {/* Decorative tape effect */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '25px',
                      backgroundColor: 'rgba(214, 201, 161, 0.4)',
                      border: '1px solid rgba(214, 201, 161, 0.6)',
                      borderRadius: '2px',
                      opacity: 0.7
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
