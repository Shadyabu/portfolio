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
    <section id="contact" className="section-container bg-white">
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
                    className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-primary-50 hover:border-primary-300 border-2 border-transparent transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <method.icon className="text-primary-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">{method.label}</p>
                      <p className="text-gray-900 font-medium">{method.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center p-6 bg-gray-50 rounded-xl border-2 border-transparent">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <method.icon className="text-primary-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">{method.label}</p>
                      <p className="text-gray-900 font-medium">{method.value}</p>
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
            <p className="text-gray-700 mb-6">
              Open to opportunities in AI Engineering, Machine Learning Research,
              and Climate Tech positions.
            </p>
            <a
              href="/resume.pdf"
              download
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
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
