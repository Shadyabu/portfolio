import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
    size: 'large',
    title: 'University College London',
    description: (
      <>
        <p className="mb-4">This is the logo of UCL, the university I am completing my Masters at. I am studying an MSc in Artificial Intelligence for Sustainable Development. I am on track to receive a Distinction, which is the highest honour to receive in the degree.</p>
        <p className="mb-4"><strong>Modules I have taken include:</strong></p>
        <p className="mb-4">Foundations of AI, Deep Learning, AI for Sustainable Development, Probabilistic Modelling, Information Retrieval Systems, Auditory Computing, Computational Modelling for Biomedical Imaging and my Masters Project (keeping this a secret for now).</p>
        <p>As my activities I am part of the surf club and have taken part in hackathons organised by the university.</p>
      </>
    )
  },
  {
    src: QMUL,
    alt: 'QMUL',
    rotate: 2,
    size: 'small',
    title: 'Queen Mary University of London',
    description: (
      <>
        <p className="mb-4">This logo represents Queen Mary University of London, where I completed my Bachelors in Computer Science and Management. Here I learned the foundations of software engineering, networking, cybersecurity, audio signal processing and IT management.</p>
        <p>In my spare time I was making music, teaching Python, taking part in hackathons, working on software projects and running the university radio station.</p>
      </>
    )
  },
  {
    src: London,
    alt: 'London',
    rotate: -1,
    size: 'small',
    title: 'London',
    description: (
      <p>This city is close to my heart. I came to this city alone at 17 years old, naïve and fresh out of school. It is the place I became an adult, met many friends and grew a lot as a person.</p>
    )
  },
  {
    src: GIZ,
    alt: 'GIZ',
    rotate: -2,
    size: 'medium',
    title: 'German Agency for International Cooperation',
    description: (
      <>
        <p className="mb-4">The German Agency for International Cooperation (the German Development Agency), here I worked in a development context for the first time. The organisation is truly full of amazing people; looking back, my colleagues left a huge positive mark on me and I cannot help but look back at my time with a smile.</p>
        <p className="mb-4">I worked on a large scale software project to implement a new SAP System into the organisation. My tasks were focused on testing and test management.</p>
        <p className="mb-4">I had the chance to take part in an excursion to Copenhagen where we had meetings with (amongst others) UNHCR, UN Women and the Danish Refugee Council.</p>
        <p>I also had the chance to join the raw materials team which are focused on rare earths and metals where I wrote a factsheet on the use of AI for a sustainable raw materials supply. This was received so well that I later held a presentation on the factsheet.</p>
      </>
    )
  },
  {
    src: IMC,
    alt: 'IMC Worldwide',
    rotate: 4,
    size: 'small',
    title: 'Innovative Methods Consulting',
    description: (
      <p>IMC was my first employer. Since 2019 I have been working here part time. I started off working as IT Support, learning how the professional world works and quickly worked my way up to being a Technical Consultant, supporting clients with technical needs like software engineering, IT infrastructure and technical support. I have been a team lead since 2023.</p>
    )
  },
  {
    src: GPDF,
    alt: 'GPDF',
    rotate: 3,
    size: 'medium',
    title: 'Global Peter Drucker Forum',
    description: (
      <p>Every year I look forward to the Global Peter Drucker Forum, one of the world's leading management forums. At the Drucker Forum I work on web development, mobile app development, supporting with their IT infrastructure and preparing IT systems for the event. During the forum I lead a team of 3 people to ensure smooth operations of the IT.</p>
    )
  },
  {
    src: Globe,
    alt: 'Globe',
    rotate: 3,
    size: 'small',
    title: 'International Experience',
    description: (
      <p>This globe represents my international experience. I speak 4 languages fluently: English, German, French and Arabic and have worked in 5 countries across 3 continents.</p>
    )
  },
  {
    src: FL,
    alt: 'FL Studio',
    rotate: -4,
    size: 'medium',
    title: 'Music Production',
    description: (
      <p>I am a hobby music producer, this image is the logo of my favourite music production software, FL Studio. I have probably spent over 1000 hours using it over the past 6 years and produced countless songs. In total I have co-produced music which has reached over 10 Million streams.</p>
    )
  },
  {
    src: Hundertwasser,
    alt: 'Hundertwasser House',
    rotate: 1,
    size: 'small',
    title: 'Vienna - Hundertwasser House',
    description: (
      <>
        <p className="mb-4">The building depicted on this image is the Hundertwasser house in Vienna. I chose this building to represent the city I grew up in, Vienna. I could have chosen many different people and symbols to represent my home town, Mozart, Klimt, Freud, Viennese Social Housing or the many different Landmarks built during the Habsburg empire. But ultimately, Hundertwasser represents my Viennese influence perfectly. Creative, innovative and influenced by nature.</p>
        <p className="mb-4">Hundertwasser was an artist and architect, his core principle was that there are no straight lines in nature and therefore his architectural style did not include any straight lines. The most notable impact he had on Vienna was his design of the Spittelau incinerator, a waste incinerator which handles two birds with one stone. It burns waste and provides thousands of homes with warm water and energy.</p>
        <p>To me, Hundertwasser represents what it means to combine modern technologies and design to solve real world challenges while also being sustainable.</p>
      </>
    )
  },
  {
    src: G20,
    alt: 'G20',
    rotate: -2,
    size: 'medium',
    title: 'G20 Techsprint 2024',
    description: (
      <p>I was a finalist in the G20 Techsprint 2024 together with the Climate Finance AI Team. As finalists, we were invited to Brasilia to attend the final ceremony and present our project in the Brazilian Central Bank. Before the finals ceremony I spent a few days in Rio, marking my first solo trip. Brazil is a beautiful country with kind and warm people, together with the professional experience it is a trip that I will never forget with people that I hope to visit again soon.</p>
    )
  },
  {
    src: UNODC,
    alt: 'UNODC',
    rotate: 2,
    size: 'small',
    title: 'UNODC Youth Initiative',
    description: (
      <p>I was part of the UNODC Youth Initiative, this was my first experience engaging with the UN System. I learned about SDGs, the work of UNODC and was given the opportunity to reflect on drug and crime prevention with students from all over the world who came to Vienna for the UNODC Youth Forum.</p>
    )
  },
  {
    src: Orange,
    alt: 'Orange Egypt',
    rotate: -3,
    size: 'medium',
    title: 'Orange Egypt',
    description: (
      <p>At Orange Egypt I had my first professional experience in the MENA region. I lived and worked in Egypt for a month and saw the wild disparity in technological adaptation and class discrimination. It is what made me want to go into Sustainable Development. I lived in between two worlds, I lived in a house in between farms and fields and split by only a highway was a compound with offices, called the smart city.</p>
    )
  },
  {
    src: Caritas,
    alt: 'Caritas',
    rotate: -1,
    size: 'small',
    title: 'Young Caritas',
    description: (
      <p>I volunteered for young caritas in refugee houses. They would invite us on weekends to play with the kids and help them integrate into Austria. We would bake with them, play football and help with homeworks. This experience was both enriching and difficult, I met children who had experienced war, and carried immense trauma but on the other hand they were still full of life and were now in a safe place with much to look forward to.</p>
    )
  },
];

const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
                  onClick={() => setSelectedImage(image)}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
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
          >
            <motion.div
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
                cursor: 'default'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
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
                      borderRadius: '0.5rem'
                    }}
                  />
                </div>

                {/* Title */}
                <h3
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
