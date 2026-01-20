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
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Interested in collaborating or discussing AI for sustainability? Let's connect!
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center p-6 rounded-xl border-2 transition-all duration-200 group"
                    style={{ backgroundColor: '#FAF5F0', borderColor: 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5EFE6'; e.currentTarget.style.borderColor = '#D6C9A1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAF5F0'; e.currentTarget.style.borderColor = 'transparent'; }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#F5EFE6' }}>
                      <method.icon size={24} style={{ color: '#0F172A' }} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm" style={{ color: '#0F172A', opacity: 0.6 }}>{method.label}</p>
                      <p className="font-medium" style={{ color: '#0F172A' }}>{method.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center p-6 rounded-xl border-2" style={{ backgroundColor: '#FAF5F0', borderColor: 'transparent' }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5EFE6' }}>
                      <method.icon size={24} style={{ color: '#0F172A' }} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm" style={{ color: '#0F172A', opacity: 0.6 }}>{method.label}</p>
                      <p className="font-medium" style={{ color: '#0F172A' }}>{method.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="mb-6" style={{ color: '#0F172A', opacity: 0.8 }}>
              Open to opportunities in AI Engineering, Machine Learning Research,
              and Climate Tech positions.
            </p>
            <a
              href="/resume.pdf"
              download
              className="inline-block px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              style={{ backgroundColor: '#0F172A', color: '#FAF5F0' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
