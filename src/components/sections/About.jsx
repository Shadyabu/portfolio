import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
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
  {
    src: UCL,
    alt: 'UCL',
    rotate: -3,
    size: { mobile: 'large', desktop: 'large' },
    title: 'University College London',
    description: (
      <>
        <p className="mb-4">This is the logo of UCL, the university I am completing my Masters at. I am studying an MSc in Artificial Intelligence for Sustainable Development. I am on track to receive a Distinction, which is the highest honour to receive in the degree.</p>
        <p className="mb-4"><strong>Modules I have taken include:</strong></p>
        <p className="mb-4">Foundations of AI, <strong>Deep Learning</strong>, AI for Sustainable Development, <strong>Probabilistic Modelling</strong>, Information Retrieval Systems, <strong>Auditory Computing</strong>, Computational Modelling for <strong>Biomedical Imaging</strong> and my Masters Project (keeping this a secret for now).</p>
        <p>As my activities I am part of the surf club and have taken part in <strong>hackathons</strong> organised by the university.</p>
      </>
    )
  },
  {
    src: QMUL,
    alt: 'QMUL',
    rotate: 2,
    size: { mobile: 'small', desktop: 'small' },
    title: 'Queen Mary University of London',
    description: (
      <>
        <p className="mb-4">This logo represents Queen Mary University of London, where I completed my <strong>Bachelors in Computer Science and Management</strong>. Here I learned the <strong>foundations</strong> of <strong>software engineering</strong>, <strong>networking</strong>, <strong>cybersecurity</strong>, audio signal processing and IT management.</p>
        <p>In my spare time I was making music, teaching Python, taking part in hackathons, working on software projects and running the university radio station.</p>
      </>
    )
  },
  {
    src: London,
    alt: 'London',
    rotate: -1,
    size: { mobile: 'small', desktop: 'small' },
    title: 'London',
    description: (
      <p>This city is close to my heart. I came to this city alone at 17 years old, naïve and fresh out of school. It is the place I became an adult, met many friends and grew a lot as a person.</p>
    )
  },
  {
    src: GIZ,
    alt: 'GIZ',
    rotate: -2,
    size: { mobile: 'medium', desktop: 'medium' },
    title: 'German Agency for International Cooperation',
    description: (
      <>
        <p className="mb-4">At the German Agency for International Cooperation (the German Development Agency), I worked on a <strong>large scale software project</strong> to implement a new SAP System into the organisation. My tasks were focused on <strong>software testing</strong> and test management.</p>
        <p className="mb-4">My highlight was a week with the raw materials team, where I wrote a factsheet on <strong>how AI can make the raw materials supply chain more resilient and sustainable, from exploration to recycling</strong>. It was received well and I was later invited back to hold a presentation on the topic
          I also joined an excursion to Copenhagen with meetings at (amongst others) <strong>UNHCR, UN Women and the Danish Refugee Council</strong>.</p>
      </>
    )
  },
  {
    src: IMC,
    alt: 'IMC Worldwide',
    rotate: 4,
    size: { mobile: 'small', desktop: 'small' },
    title: 'Innovative Methods Consulting',
    description: (
      <p>IMC was my first employer. Since 2019 I have been working here <strong>part time</strong>. I started off working as IT Support, learning how the professional world works and quickly worked my way up to being a <strong>Technical Consultant</strong>, supporting clients with technical needs like <strong>software engineering, IT infrastructure and technical support</strong>. I have been a <strong>team lead</strong> since 2023.</p>
    )
  },
  {
    src: GPDF,
    alt: 'GPDF',
    rotate: 3,
    size: { mobile: 'medium', desktop: 'medium' },
    title: 'Global Peter Drucker Forum',
    description: (
      <p>Every year I look forward to the <strong>Global Peter Drucker Forum</strong>, one of the world's leading <strong>management forums</strong>. At the Drucker Forum I work on <strong>web development, mobile app development, technical support,</strong> <strong>IT infrastructure</strong> and <strong>preparing IT systems for the event</strong>. During the forum I lead a team of 3 people to ensure smooth operations of the IT.</p>
    )
  },
  {
    src: Globe,
    alt: 'Globe',
    rotate: 3,
    size: { mobile: 'large', desktop: 'small' },
    title: 'International Experience',
    description: (
      <p>This globe represents my <strong>international experience</strong>. I speak <strong>4 languages</strong> fluently: English, German, French and Arabic and have <strong>worked in 5 countries across 3 continents</strong>.</p>
    )
  },
  {
    src: FL,
    alt: 'FL Studio',
    rotate: -4,
    size: { mobile: 'medium', desktop: 'medium' },
    title: 'Music Production',
    description: (
      <p>I am a hobby <strong>music producer</strong>, this image is the logo of my favourite music production software, FL Studio. I have probably spent over 1000 hours using it over the past 6 years and produced countless songs. In total I have <strong>co-produced music</strong> which has reached over <strong>10 Million streams.</strong></p>
    )
  },
  {
    src: Hundertwasser,
    alt: 'Hundertwasser House',
    rotate: 1,
    size: { mobile: 'small', desktop: 'small' },
    title: 'Vienna - Hundertwasser House',
    description: (
      <>
        <p className="mb-4">The building depicted on this image is the Hundertwasser house in <strong>Vienna</strong>. I chose this building to represent my favourite city and the place I grew up in, Vienna. I could have chosen many different people and symbols to represent my home town, Mozart, Klimt, Freud, or the many different Landmarks built during the Habsburg empire. But ultimately, Hundertwasser represents my Viennese influence perfectly. <strong>Creative, innovative and influenced by nature.</strong></p>
        <p className="mb-4">Hundertwasser was an artist and architect, his core principle was that there are no straight lines in nature and therefore his architectural style did not include any straight lines. The most notable impact he had on Vienna was his design of the <strong>Spittelau incinerator</strong>, a waste incinerator which handles two birds with one stone. It <strong>burns waste and provides thousands of homes with warm water and energy.</strong></p>
        <p>To me, Hundertwasser represents what it means to <strong>combine modern technologies and design to solve real world challenges while also being sustainable.</strong></p>
      </>
    )
  },
  {
    src: G20,
    alt: 'G20',
    rotate: -2,
    size: { mobile: 'medium', desktop: 'medium' },
    title: 'G20 Techsprint 2024',
    description: (
      <p>I was a <strong>finalist</strong> in the <strong>G20 Techsprint 2024</strong> together with the Climate Finance AI Team. As finalists, we were invited to Brasilia to attend the final ceremony and <strong>present our project in the Brazilian Central Bank</strong>. Before the finals ceremony I spent a few days in Rio, marking my first solo trip. Brazil is a beautiful country with kind and warm people, together with the professional experience it is <strong>a trip that I will never forget</strong> filled with people that I hope to visit again soon.</p>
    )
  },
  {
    src: UNODC,
    alt: 'UNODC',
    rotate: 2,
    size: { mobile: 'small', desktop: 'small' },
    title: 'UNODC Youth Initiative',
    description: (
      <p>I was part of the <strong>UNODC Youth Initiative</strong>, this was my first experience engaging with the UN System. I learned about <strong>SDGs</strong>, the work of UNODC and was given the opportunity to reflect on drug and crime prevention with students from all over the world who came to Vienna for the UNODC Youth Forum.</p>
    )
  },
  {
    src: Orange,
    alt: 'Orange Egypt',
    rotate: -3,
    size: { mobile: 'medium', desktop: 'medium' },
    title: 'Orange Egypt',
    description: (
      <p>At <strong>Orange Egypt</strong> I had my first professional experience in the MENA region. I lived and worked in Egypt for a month and saw the wild disparity in technological adaptation and class discrimination. It is what made me want to go into Sustainable Development. I lived in between two worlds, I stayed in a house in between farms and fields and; split by only a highway; was a compound with offices, called the smart city.</p>
    )
  },
  {
    src: Caritas,
    alt: 'Caritas',
    rotate: -1,
    size: { mobile: 'small', desktop: 'small' },
    title: 'Young Caritas',
    description: (
      <p>I <strong>volunteered</strong> for Young Caritas in <strong>refugee houses</strong> in Vienna. On weekends we'd go to play with the kids and help them integrate into Austria, baking, playing football, helping with homework.</p>
    )
  },
];

const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedImage(null);
        triggerRef.current?.focus();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape, true);
      // Focus the modal when it opens
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, true);
    };
  }, [selectedImage]);

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
            A collection of symbols, places, and organizations that have shaped my journey.
          </p>
        </motion.div>

        {/* Asymmetrical image collage */}
        <div className="max-w-7xl mx-auto">
          <div
            className="image-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              gridAutoFlow: 'dense'
            }}
          >
            <style jsx>{`
              @media (max-width: 768px) {
                .image-grid {
                  grid-template-columns: repeat(3, 1fr) !important;
                }
                .image-grid .mobile-large {
                  grid-column: span 2 !important;
                }
              }
            `}</style>
            {images.map((image, index) => {
              // Define size classes for asymmetry
              const sizeMap = {
                small: 'col-span-1 row-span-1',
                medium: 'md:col-span-2 row-span-1',
                large: 'md:col-span-2 md:row-span-2',
                xlarge: 'md:col-span-3 md:row-span-2'
              };

              // Use window width to determine if mobile
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

              const heightMap = {
                small: '150px',
                medium: '180px',
                large: isMobile ? '200px' : '250px',
                xlarge: isMobile ? '200px' : '250px'
              };

              // Get the appropriate size based on device
              const currentSize = isMobile ? image.size.mobile : image.size.desktop;

              // Add mobile class for large items
              const mobileClass = isMobile && image.size.mobile === 'large' ? 'mobile-large' : '';

              return (
                <motion.div
                  key={index}
                  className={`${sizeMap[currentSize]} ${mobileClass}`}
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
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileFocus={{ scale:1.05 }}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    outline: 'none'
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details about ${image.title}`}
                  onClick={() => {
                    setSelectedImage(image);
                    triggerRef.current = document.activeElement;
                  }}
                  onTap={() => {
                    setSelectedImage(image);
                    triggerRef.current = document.activeElement;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImage(image);
                      triggerRef.current = e.currentTarget;
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outlineOffset = '4px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: heightMap[currentSize],
                      backgroundColor: '#FFFFFF',
                      border: '3px solid #D6C9A1',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      boxShadow: '6px 6px 0px rgba(214, 201, 161, 0.3)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      pointerEvents: 'none'
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
                        borderRadius: '0.5rem',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          position: 'absolute',
                          width: '1px',
                          height: '1px',
                          padding: 0,
                          margin: '-1px',
                          overflow: 'hidden',
                          clip: 'rect(0, 0, 0, 0)',
                          whiteSpace: 'nowrap',
                          border: 0
                        }}
                      />
                    </div>
                  </div>

                  {/* Decorative tape effect */}
                  <div
                    aria-hidden="true"
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
                      opacity: 0.7,
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Click me label for first image */}
                  {index === 0 && (
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0, scale: 0, rotate: 12 }}
                      animate={{ opacity: 1, scale: 1, rotate: 12 }}
                      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '-12px',
                        backgroundColor: '#D6C9A1',
                        color: '#0F172A',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '0.5rem',
                        fontFamily: "'Mouse Memoirs', cursive",
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        border: '2px solid #0F172A',
                        boxShadow: '3px 3px 0px rgba(15, 23, 42, 0.3)',
                        pointerEvents: 'none',
                        letterSpacing: '0.02em',
                        zIndex: 5
                      }}
                    >
                      Click me!
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage(null);
              triggerRef.current?.focus();
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem',
              cursor: 'pointer'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '1rem',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                cursor: 'default',
                outline: 'none'
              }}
              tabIndex={-1}
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedImage(null);
                  triggerRef.current?.focus();
                }}
                aria-label="Close dialog"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #D6C9A1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#D6C9A1';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF';
                  e.target.style.transform = 'scale(1)';
                }}
                onFocus={(e) => {
                  e.target.style.outline = '3px solid #D6C9A1';
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                }}
              >
                ×
              </button>

              {/* Modal content */}
              <div style={{ padding: '2rem' }}>
                {/* Image */}
                <div
                  style={{
                    width: '100%',
                    height: '250px',
                    backgroundColor: '#FAF5F0',
                    border: '3px solid #D6C9A1',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${selectedImage.src})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '0.5rem',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      style={{
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)',
                        whiteSpace: 'nowrap',
                        border: 0
                      }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  id="modal-title"
                  style={{
                    fontFamily: "'Mouse Memoirs', cursive",
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    color: '#0F172A',
                    marginBottom: '1rem',
                    letterSpacing: '0.02em'
                  }}
                >
                  {selectedImage.title}
                </h3>

                {/* Description */}
                <div
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: '#0F172A',
                    opacity: 0.85
                  }}
                >
                  {selectedImage.description}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
