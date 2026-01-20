import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-12 pb-16 last:pb-0"
      style={{ position: 'relative' }}
    >
      {/* Handdrawn timeline line */}
      <svg
        style={{
          position: 'absolute',
          left: '16px',
          top: '24px',
          width: '4px',
          height: 'calc(100% - 24px)',
          overflow: 'visible'
        }}
        className="last:hidden"
      >
        <motion.path
          d={`M 2 0 Q 1 ${index % 2 === 0 ? '30' : '20'}, 2 60 T 2 120 T 2 180 T 2 240 T 2 300`}
          stroke="#D6C9A1"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          viewport={{ once: true }}
          style={{
            filter: 'url(#roughen-timeline)',
          }}
        />
        <defs>
          <filter id="roughen-timeline">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
          </filter>
        </defs>
      </svg>

      {/* Playful timeline dot */}
      <motion.div
        className="absolute left-[8px] top-[6px]"
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#D6C9A1',
          border: '3px solid #FFFFFF',
          borderRadius: '50%',
          boxShadow: '0 0 0 2px #D6C9A1',
          zIndex: 10
        }}
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.3, rotate: 180 }}
      />

      {/* Experience card with playful design */}
      <motion.div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #D6C9A1',
          boxShadow: '5px 5px 0px rgba(214, 201, 161, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{ y: -5, boxShadow: '8px 8px 0px rgba(214, 201, 161, 0.4)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative corner element */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: '60px',
            height: '60px',
            backgroundColor: '#FAF5F0',
            borderRadius: '50%',
            opacity: 0.5
          }}
        />

        <div className="relative z-10">
          {/* Header with role and period */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
            <h3
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: '1.75rem',
                color: '#0F172A',
                letterSpacing: '0.02em',
                lineHeight: '1.2'
              }}
            >
              {exp.role}
            </h3>
            <motion.span
              className="px-3 py-1 rounded-full text-sm font-medium self-start"
              style={{
                backgroundColor: '#F5EFE6',
                color: '#0F172A',
                border: '1px solid #D6C9A1',
                whiteSpace: 'nowrap'
              }}
              whileHover={{ scale: 1.05, backgroundColor: '#D6C9A1' }}
            >
              {exp.period}
            </motion.span>
          </div>

          {/* Company name */}
          <p
            className="font-medium mb-4"
            style={{
              color: '#D6C9A1',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            {exp.company}
          </p>

          {/* Description */}
          <p
            className="mb-4 leading-relaxed"
            style={{
              color: '#0F172A',
              opacity: 0.85,
              fontSize: '1rem'
            }}
          >
            {exp.description}
          </p>

          {/* Highlights with playful bullets */}
          {exp.highlights && exp.highlights.length > 0 && (
            <ul className="space-y-3">
              {exp.highlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                  viewport={{ once: true }}
                  style={{ color: '#0F172A', opacity: 0.8 }}
                >
                  <motion.span
                    className="mr-3 mt-1"
                    style={{
                      fontSize: '1.2rem',
                      color: '#D6C9A1',
                      fontWeight: 'bold'
                    }}
                    whileHover={{ scale: 1.3, rotate: 90 }}
                  >
                    ✦
                  </motion.span>
                  <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Bottom decorative dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            display: 'flex',
            gap: '4px'
          }}
        >
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#D6C9A1',
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section-container" style={{ backgroundColor: '#FAF5F0' }}>
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
          Experience
        </h2>

        {/* Handdrawn underline */}
        <div className="flex justify-center mb-4">
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none">
            <motion.path
              d="M 2 6 Q 30 4, 60 7 T 118 6"
              stroke="#D6C9A1"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                filter: 'url(#roughen-experience)',
              }}
            />
            <defs>
              <filter id="roughen-experience">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
              </filter>
            </defs>
          </svg>
        </div>

        <p
          className="text-center mb-12"
          style={{
            fontSize: '1.125rem',
            color: '#0F172A',
            opacity: 0.75,
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}
        >
          My journey in AI and international development
        </p>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
