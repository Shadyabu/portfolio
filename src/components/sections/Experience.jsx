import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 border-l-2 last:pb-0"
      style={{ borderColor: '#D6C9A1' }}
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4" style={{ backgroundColor: '#D6C9A1', borderColor: '#FFFFFF' }}></div>

      <div
        className="p-6 rounded-xl transition-shadow duration-300"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(15, 23, 42, 0.12)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)'}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold" style={{ color: '#0F172A' }}>{exp.role}</h3>
          <span className="text-sm mt-1 md:mt-0" style={{ color: '#0F172A', opacity: 0.6 }}>{exp.period}</span>
        </div>

        <p className="font-medium mb-3" style={{ color: '#D6C9A1' }}>{exp.company}</p>

        <p className="mb-4" style={{ color: '#0F172A', opacity: 0.8 }}>{exp.description}</p>

        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-2">
            {exp.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start" style={{ color: '#0F172A', opacity: 0.8 }}>
                <span className="mr-2" style={{ color: '#D6C9A1' }}>•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
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
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
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
