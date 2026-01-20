import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/shadyabushady/',
      href: 'https://www.linkedin.com/in/shadyabushady/',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@Shadyabu',
      href: 'https://github.com/Shadyabu',
    },
  ];

  return (
    <section id="contact" className="section-container" style={{ backgroundColor: '#FFFFFF' }}>
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
          Get In Touch
        </h2>

        {/* Handdrawn underline */}
        <div className="flex justify-center mb-4">
          <svg width="140" height="12" viewBox="0 0 140 12" fill="none">
            <motion.path
              d="M 2 7 Q 35 4, 70 7 T 138 6"
              stroke="#D6C9A1"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                filter: 'url(#roughen-contact)',
              }}
            />
            <defs>
              <filter id="roughen-contact">
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
          Interested in collaborating or discussing AI for sustainability? Let's connect!
        </p>

        <div className="max-w-4xl mx-auto">
          {/* Contact cards with playful design */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {method.href ? (
                  <motion.a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center p-6 rounded-xl border-2 group"
                    style={{
                      backgroundColor: '#FAF5F0',
                      borderColor: '#D6C9A1',
                      boxShadow: '4px 4px 0px rgba(214, 201, 161, 0.3)',
                      textDecoration: 'none',
                      display: 'flex'
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: '6px 6px 0px rgba(214, 201, 161, 0.4)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #D6C9A1'
                      }}
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <method.icon size={28} style={{ color: '#0F172A' }} />
                    </motion.div>
                    <div className="ml-5">
                      <p
                        className="text-xs font-medium mb-1"
                        style={{
                          color: '#0F172A',
                          opacity: 0.6,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {method.label}
                      </p>
                      <p
                        className="font-medium"
                        style={{
                          color: '#0F172A',
                          fontSize: '1.1rem'
                        }}
                      >
                        {method.value}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="ml-auto"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      style={{
                        fontSize: '1.5rem',
                        color: '#D6C9A1'
                      }}
                    >
                      →
                    </motion.div>
                  </motion.a>
                ) : (
                  <div
                    className="flex items-center p-6 rounded-xl border-2"
                    style={{
                      backgroundColor: '#FAF5F0',
                      borderColor: '#D6C9A1',
                      boxShadow: '4px 4px 0px rgba(214, 201, 161, 0.3)'
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #D6C9A1'
                      }}
                    >
                      <method.icon size={28} style={{ color: '#0F172A' }} />
                    </div>
                    <div className="ml-5">
                      <p
                        className="text-xs font-medium mb-1"
                        style={{
                          color: '#0F172A',
                          opacity: 0.6,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {method.label}
                      </p>
                      <p
                        className="font-medium"
                        style={{
                          color: '#0F172A',
                          fontSize: '1.1rem'
                        }}
                      >
                        {method.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA section with playful design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl relative overflow-hidden"
            style={{
              backgroundColor: '#FAF5F0',
              border: '2px solid #D6C9A1'
            }}
          >
            {/* Decorative background circles */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#F5EFE6',
                opacity: 0.5
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#F5EFE6',
                opacity: 0.5
              }}
            />

            <div className="relative z-10">
              <p
                className="mb-6 leading-relaxed"
                style={{
                  color: '#0F172A',
                  opacity: 0.85,
                  fontSize: '1.05rem',
                  maxWidth: '500px',
                  margin: '0 auto 2rem'
                }}
              >
                Open to opportunities in AI Engineering, Machine Learning Research,
                and Climate Tech positions.
              </p>

              <motion.a
                href="/resume.pdf"
                download
                className="inline-block px-8 py-4 rounded-xl font-medium"
                style={{
                  backgroundColor: '#0F172A',
                  color: '#FAF5F0',
                  border: '2px solid #0F172A',
                  boxShadow: '4px 4px 0px rgba(15, 23, 42, 0.3)',
                  fontFamily: "'Mouse Memoirs', cursive",
                  fontSize: '1.5rem',
                  letterSpacing: '0.02em',
                  textDecoration: 'none'
                }}
                whileHover={{
                  y: -3,
                  boxShadow: '6px 6px 0px rgba(15, 23, 42, 0.4)',
                  backgroundColor: '#1e293b',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Playful doodle decoration */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.15 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
              <motion.path
                d="M 10 20 Q 25 10, 40 20 T 70 20 T 90 20"
                stroke="#0F172A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 10 20 Q 25 10, 40 20 T 70 20 T 90 20",
                    "M 10 20 Q 25 30, 40 20 T 70 20 T 90 20",
                    "M 10 20 Q 25 10, 40 20 T 70 20 T 90 20"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <circle cx="10" cy="20" r="2" fill="#0F172A" />
              <circle cx="50" cy="20" r="2" fill="#0F172A" />
              <circle cx="90" cy="20" r="2" fill="#0F172A" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
