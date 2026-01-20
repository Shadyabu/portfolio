import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

const SkillCategory = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '1rem',
        border: '2px solid #D6C9A1',
        boxShadow: '5px 5px 0px rgba(214, 201, 161, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="p-6 rounded-xl"
    >
      {/* Decorative background pattern */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#FAF5F0',
          opacity: 0.5
        }}
      />

      {/* Header with icon and title */}
      <div className="flex items-center mb-5 relative z-10">
        <motion.div
          className="text-4xl mr-4"
          whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
        >
          {category.icon}
        </motion.div>
        <h3
          style={{
            fontFamily: "'Mouse Memoirs', cursive",
            fontSize: '1.75rem',
            color: '#0F172A',
            letterSpacing: '0.02em'
          }}
        >
          {category.category}
        </h3>
      </div>

      {/* Skills tags with playful interactions */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.items.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            className="px-3 py-2 text-sm rounded-lg font-medium"
            style={{
              backgroundColor: '#F5EFE6',
              color: '#0F172A',
              border: '1px solid #D6C9A1',
              cursor: 'default'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
            viewport={{ once: true }}
            whileHover={{
              backgroundColor: '#D6C9A1',
              scale: 1.1,
              rotate: Math.random() > 0.5 ? 3 : -3,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* Decorative corner dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          display: 'flex',
          gap: '4px'
        }}
      >
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#D6C9A1',
              opacity: 0.4
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-container" style={{ backgroundColor: '#FFFFFF' }}>
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
          Skills & Technologies
        </h2>

        {/* Handdrawn underline */}
        <div className="flex justify-center mb-4">
          <svg width="160" height="12" viewBox="0 0 160 12" fill="none">
            <motion.path
              d="M 2 7 Q 40 4, 80 7 T 158 6"
              stroke="#D6C9A1"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                filter: 'url(#roughen-skills)',
              }}
            />
            <defs>
              <filter id="roughen-skills">
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
          My technical toolkit for building AI-powered solutions
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <SkillCategory key={category.category} category={category} index={index} />
          ))}
        </div>

        {/* Playful bottom decoration */}
        <motion.div
          className="mt-12 flex justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#D6C9A1'
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
