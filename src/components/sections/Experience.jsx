import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 border-l-2 border-primary-300 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>

      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
          <span className="text-sm text-gray-600 mt-1 md:mt-0">{exp.period}</span>
        </div>

        <p className="text-primary-600 font-medium mb-3">{exp.company}</p>

        <p className="text-gray-700 mb-4">{exp.description}</p>

        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-2">
            {exp.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <span className="text-primary-600 mr-2">•</span>
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
    <section id="experience" className="section-container bg-gray-50">
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
