import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Clock } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF5F0' }}>
        <div className="text-center">
          <h1 style={{ fontFamily: "'Mouse Memoirs', cursive", fontSize: '3rem', color: '#0F172A' }}>
            Project Not Found
          </h1>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2"
            style={{ color: '#0F172A' }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF5F0' }}>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 mb-8 group"
            style={{ color: '#0F172A', opacity: 0.7 }}
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </motion.span>
          </Link>
        </motion.div>

        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ongoing badge */}
          {project.ongoing && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                border: '2px dashed #F59E0B',
                color: '#92400E'
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
            >
              <Clock size={18} />
              <span className="font-medium">Ongoing Project</span>
            </motion.div>
          )}

          <h1
            className="mb-4"
            style={{
              fontFamily: "'Mouse Memoirs', cursive",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#0F172A',
              letterSpacing: '0.02em',
              lineHeight: '1.1'
            }}
          >
            {project.title}
          </h1>

          {/* Sustainability badge */}
          {project.sustainability && (
            <motion.span
              className="inline-block px-4 py-2 text-base font-medium rounded-full mb-6"
              style={{
                backgroundColor: '#D6C9A1',
                color: '#0F172A',
                border: '2px solid #0F172A'
              }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              {project.sustainability}
            </motion.span>
          )}

          {/* Handdrawn underline */}
          <div className="mb-8">
            <svg width="200" height="12" viewBox="0 0 200 12" fill="none">
              <motion.path
                d="M 2 6 Q 50 3, 100 7 T 198 5"
                stroke="#D6C9A1"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <p
            className="text-lg leading-relaxed whitespace-pre-line"
            style={{ color: '#0F172A', opacity: 0.85 }}
          >
            {project.longDescription}
          </p>
        </motion.div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: '1.75rem',
                color: '#0F172A',
                letterSpacing: '0.02em'
              }}
            >
              Key Highlights
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#D6C9A1', border: '1px solid #0F172A' }}
                  />
                  <span style={{ color: '#0F172A', opacity: 0.8 }}>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Mouse Memoirs', cursive",
              fontSize: '1.75rem',
              color: '#0F172A',
              letterSpacing: '0.02em'
            }}
          >
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="px-4 py-2 text-base rounded-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  border: '2px solid #D6C9A1',
                  boxShadow: '3px 3px 0px rgba(214, 201, 161, 0.4)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '5px 5px 0px rgba(214, 201, 161, 0.5)',
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        {(project.github || project.demo) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4 pt-6 border-t-2"
            style={{ borderColor: '#D6C9A1' }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: '#0F172A',
                  color: '#FAF5F0'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                <span>View Code</span>
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: '#D6C9A1',
                  color: '#0F172A',
                  border: '2px solid #0F172A'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </motion.a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
