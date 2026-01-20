import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '2px solid #D6C9A1',
        boxShadow: '6px 6px 0px rgba(214, 201, 161, 0.3)',
        transition: 'all 0.3s ease'
      }}
      className="overflow-hidden relative"
    >
      {/* Image section with playful overlay */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, #D6C9A1 0%, #FAF5F0 100%)' }}>
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ fontFamily: "'Mouse Memoirs', cursive", fontSize: '4rem', color: '#0F172A', opacity: 0.3 }}>
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Title with Mouse Memoirs */}
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Mouse Memoirs', cursive",
            fontSize: '2rem',
            color: '#0F172A',
            letterSpacing: '0.02em',
            lineHeight: '1.2'
          }}
        >
          {project.title}
        </h3>

        {/* Sustainability badge with playful style */}
        {project.sustainability && (
          <motion.span
            className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-3"
            style={{
              backgroundColor: '#D6C9A1',
              color: '#0F172A',
              border: '1px solid #0F172A'
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            {project.sustainability}
          </motion.span>
        )}

        <p className="mb-4 leading-relaxed" style={{ color: '#0F172A', opacity: 0.8, fontSize: '0.95rem' }}>
          {project.description}
        </p>

        {/* Technologies with better styling */}
        <div className="mb-5">
          <h4
            className="text-sm font-medium mb-2"
            style={{
              color: '#0F172A',
              opacity: 0.6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-sm rounded-md"
                style={{
                  backgroundColor: '#FAF5F0',
                  color: '#0F172A',
                  border: '1px solid #D6C9A1'
                }}
                whileHover={{
                  backgroundColor: '#F5EFE6',
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links with playful hover states */}
        <div className="flex gap-4 pt-3 border-t" style={{ borderColor: '#D6C9A1' }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium"
              style={{ color: '#0F172A', opacity: 0.7 }}
              whileHover={{ opacity: 1, x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <Github size={18} />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium"
              style={{ color: '#0F172A', opacity: 0.7 }}
              whileHover={{ opacity: 1, x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink size={18} />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Decorative corner element */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '30px',
          height: '30px',
          border: '2px solid #D6C9A1',
          borderRadius: '50%',
          opacity: 0.3
        }}
      />
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
          Featured Projects
        </h2>

        {/* Handdrawn underline */}
        <div className="flex justify-center mb-4">
          <svg width="140" height="12" viewBox="0 0 140 12" fill="none">
            <motion.path
              d="M 2 6 Q 35 4, 70 7 T 138 5"
              stroke="#D6C9A1"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                filter: 'url(#roughen-projects)',
              }}
            />
            <defs>
              <filter id="roughen-projects">
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
