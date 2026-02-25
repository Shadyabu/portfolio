import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data/projects';

const ResultsVisualization = () => {
  const data = [
    { region: 'Tested with Sumatra', variant: 'Sumatra Attention U-Net', f1: 86.7 },
    { region: 'Tested with Sumatra', variant: 'Sumatra Attention U-Net + L2 + Dropout', f1: 83.4 },
    { region: 'Tested with Kalimantan', variant: 'Kalimantan Attention U-Net', f1: 79.4 },
    { region: 'Tested with Kalimantan', variant: 'Kalimantan Attention U-Net + L2 + Dropout', f1: 81.2 },
    { region: 'Tested with Sumatra', variant: 'Kalimantan Attention U-Net + L2 + Dropout', f1: 83.6 },
    { region: 'Tested with Sumatra', variant: 'Kalimantan Attention U-Net', f1: 83.4 },
    { region: 'Tested with Kalimantan', variant: 'Sumatra Attention U-Net', f1: 77.6 }
  ];

  const chartWidth = 850;
  const chartHeight = 550;
  const padding = { top: 30, right: 40, bottom: 40, left: 280 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const barHeight = (innerHeight / data.length) * 0.6;
  const groupSpacing = innerHeight / data.length;

  return (
    <div style={{ margin: '2rem 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg width={chartWidth} height={chartHeight}>
        {/* Background */}
        <rect width={chartWidth} height={chartHeight} fill="#FFFFFF" stroke="#D6C9A1" strokeWidth="2" />

        {/* Title */}
        <text
          x={chartWidth / 2}
          y={20}
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#0F172A"
          fontFamily="'Mouse Memoirs', cursive"
        >
          F1 Scores of the models
        </text>

        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map((value) => (
          <g key={`grid-${value}`}>
            <line
              x1={padding.left + (value / 100) * innerWidth}
              y1={padding.top}
              x2={padding.left + (value / 100) * innerWidth}
              y2={chartHeight - padding.bottom}
              stroke="#E5D4C1"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <text
              x={padding.left + (value / 100) * innerWidth}
              y={chartHeight - padding.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#0F172A"
              opacity="0.6"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* Axis label */}
        <text
          x={chartWidth - padding.right - 10}
          y={chartHeight - padding.bottom + 35}
          fontSize="12"
          fontWeight="600"
          fill="#0F172A"
          opacity="0.7"
        >
          F1 Score
        </text>

        {/* Bars */}
        {data.map((item, idx) => {
          const y = padding.top + idx * groupSpacing + groupSpacing / 2 - barHeight / 2;
          const isTestedOnOtherIsland = idx >= 4;
          const barColor = isTestedOnOtherIsland ? "#B8A591" : "#D6C9A1";

          return (
            <g key={idx}>
              {/* F1 Score Bar */}
              <rect
                x={padding.left}
                y={y}
                width={(item.f1 / 100) * innerWidth}
                height={barHeight}
                fill={barColor}
                opacity="0.9"
              />

              {/* F1 Score value label */}
              <text
                x={padding.left + (item.f1 / 100) * innerWidth + 5}
                y={y + barHeight / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill="#0F172A"
              >
                {item.f1}%
              </text>

              {/* Y-axis labels */}
              <text
                x={padding.left - 10}
                y={y + barHeight / 2 - 2}
                textAnchor="end"
                fontSize="10"
                fontWeight="600"
                fill="#0F172A"
              >
                {item.variant}
              </text>
              <text
                x={padding.left - 10}
                y={y + barHeight / 2 + 11}
                textAnchor="end"
                fontSize="9"
                fill="#0F172A"
                opacity="0.7"
              >
                {item.region}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g>
          <rect
            x={padding.right}
            y={15}
            width={12}
            height={12}
            fill="#B8A591"
          />
          <text
            x={padding.right + 18}
            y={24}
            fontSize="11"
            fill="#0F172A"
          >
            tested with data from other island
          </text>
        </g>
      </svg>
    </div>
  );
};

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

          {/* Subtitle */}
          {project.subtitle && (
            <p
              className="mb-6 text-lg leading-relaxed"
              style={{
                color: '#0F172A',
                opacity: 0.8,
                fontStyle: 'italic'
              }}
            >
              {project.subtitle}
            </p>
          )}

          {/* Tags or Sustainability badge */}
          {project.tags && project.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{
                    backgroundColor: '#D6C9A1',
                    color: '#0F172A',
                    border: '1px solid #0F172A'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          ) : (
            project.sustainability && (
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
            )
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
          <div
            className="text-lg leading-relaxed"
            style={{ color: '#0F172A', opacity: 0.85 }}
          >
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2
                    {...props}
                    style={{
                      fontFamily: "'Mouse Memoirs', cursive",
                      fontSize: '1.5rem',
                      color: '#0F172A',
                      marginTop: '1.5rem',
                      marginBottom: '0.75rem',
                      letterSpacing: '0.02em'
                    }}
                  />
                ),
                p: ({ node, ...props }) => <p {...props} style={{ marginBottom: '0.75rem' }} />,
                img: ({ node, ...props }) => {
                  if (props.src === 'RESULTS_VISUALIZATION') {
                    return <ResultsVisualization />;
                  }
                  if (props.src === 'AGENTS_OF_CHANGE_VIDEO') {
                    return (
                      <video
                        controls
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '0.5rem',
                          margin: '1rem 0',
                          border: '2px solid #D6C9A1'
                        }}
                        src={project.video}
                      />
                    );
                  }
                  return (
                    <img
                      {...props}
                      src={props.src === 'ATTENTION_UNET_IMAGE' ? project.architectureImage : props.src}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '0.5rem',
                        margin: '1rem 0',
                        border: '2px solid #D6C9A1'
                      }}
                    />
                  );
                },
                table: ({ node, ...props }) => (
                  <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
                    <table
                      {...props}
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #D6C9A1',
                        borderRadius: '0.5rem',
                        overflow: 'hidden'
                      }}
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead
                    {...props}
                    style={{
                      backgroundColor: '#D6C9A1',
                      fontWeight: 600
                    }}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    {...props}
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      color: '#0F172A',
                      fontWeight: 600,
                      borderRight: '1px solid #FFFFFF'
                    }}
                  />
                ),
                tbody: ({ node, ...props }) => <tbody {...props} />,
                tr: ({ node, ...props }) => (
                  <tr
                    {...props}
                    style={{
                      borderBottom: '1px solid #D6C9A1'
                    }}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    {...props}
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      color: '#0F172A',
                      borderRight: '1px solid #E5D4C1'
                    }}
                  />
                )
              }}
            >
              {project.longDescription}
            </ReactMarkdown>
          </div>
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
