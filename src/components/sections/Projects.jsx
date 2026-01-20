import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
        transition: 'box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(15, 23, 42, 0.12)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)'}
      className="overflow-hidden"
    >
      <div className="relative h-48" style={{ background: 'linear-gradient(to bottom right, #D6C9A1, #FAF5F0)' }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>{project.title}</h3>

        {project.sustainability && (
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-3" style={{ backgroundColor: '#F5EFE6', color: '#0F172A' }}>
            {project.sustainability}
          </span>
        )}

        <p className="mb-4" style={{ color: '#0F172A', opacity: 0.8 }}>{project.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2" style={{ color: '#0F172A' }}>Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-md"
                style={{ backgroundColor: '#F5EFE6', color: '#0F172A' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors"
              style={{ color: '#0F172A', opacity: 0.7 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#D6C9A1'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.opacity = '0.7'; }}
            >
              <Github size={20} />
              <span>Code</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors"
              style={{ color: '#0F172A', opacity: 0.7 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#D6C9A1'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.opacity = '0.7'; }}
            >
              <ExternalLink size={20} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-container" style={{ backgroundColor: '#FAF5F0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of my work at the intersection of AI and sustainable development
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
