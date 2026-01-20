import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

const SkillCategory = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        backgroundColor: '#FFFFFF',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #D6C9A1',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)'
      }}
      className="p-6 rounded-xl"
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{category.icon}</div>
        <h3 className="text-xl font-bold" style={{ color: '#0F172A' }}>{category.category}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm rounded-md transition-colors duration-200"
            style={{ backgroundColor: '#F5EFE6', color: '#0F172A' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D6C9A1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F5EFE6'; }}
          >
            {skill}
          </span>
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
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          My technical toolkit for building AI-powered solutions
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <SkillCategory key={category.category} category={category} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
