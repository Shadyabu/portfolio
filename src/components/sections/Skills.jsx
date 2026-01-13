import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

const SkillCategory = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{category.icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
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
    <section id="skills" className="section-container bg-white">
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
