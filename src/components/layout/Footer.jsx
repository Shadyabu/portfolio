import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Shadyabu',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shadyabushady/',
      label: 'LinkedIn'
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#0F172A',
        color: '#FAF5F0',
        borderTop: '3px solid #D6C9A1',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative top wave */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #D6C9A1 0%, #FAF5F0 50%, #D6C9A1 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo/Name with Mouse Memoirs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontFamily: "'Mouse Memoirs', cursive",
                fontSize: '2rem',
                color: '#FAF5F0',
                letterSpacing: '0.02em',
                marginBottom: '0.5rem'
              }}
            >
              Shady Abushady
            </h3>
          </motion.div>

          {/* Handdrawn divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.5, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <svg width="100" height="8" viewBox="0 0 100 8" fill="none">
              <path
                d="M 2 4 Q 25 2, 50 4 T 98 4"
                stroke="#D6C9A1"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                style={{
                  filter: 'url(#roughen-footer)',
                }}
              />
              <defs>
                <filter id="roughen-footer">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Social Links with playful hover */}
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-3"
                style={{
                  color: '#FAF5F0',
                  backgroundColor: 'rgba(214, 201, 161, 0.1)',
                  border: '2px solid rgba(214, 201, 161, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label={social.label}
                whileHover={{
                  backgroundColor: '#D6C9A1',
                  color: '#0F172A',
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright with playful design */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm flex items-center justify-center gap-2"
              style={{
                color: '#FAF5F0',
                opacity: 0.7
              }}
            >
              Built with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }
                }}
              >
                <Heart size={16} fill="#D6C9A1" color="#D6C9A1" />
              </motion.span>
              using React & AI
            </p>
            <p
              className="text-sm"
              style={{
                color: '#FAF5F0',
                opacity: 0.6
              }}
            >
              © {currentYear} Shady Abushady. All rights reserved.
            </p>
          </motion.div>

          {/* Decorative dots */}
          <motion.div
            className="flex gap-2 pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[1, 2, 3, 4, 5].map((dot, index) => (
              <motion.div
                key={dot}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#D6C9A1'
                }}
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2
                  }
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#D6C9A1',
          opacity: 0.05
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#D6C9A1',
          opacity: 0.05
        }}
      />
    </footer>
  );
};

export default Footer;
