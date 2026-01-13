import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-container bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I'm an AI Engineer with a passion for leveraging machine learning to address
              real-world challenges in sustainable development and climate action.
            </p>

            <p>
              Currently pursuing my MSc in Machine Learning at University College London (UCL),
              I bring 6 years of consulting experience from IMC Worldwide, where I worked on
              international development projects in Vienna.
            </p>

            <p>
              My recent work includes developing AI solutions at Climate Finance AI and
              contributing to UN SDG tracking initiatives at GIZ. I'm particularly interested
              in the intersection of deep learning, natural language processing, and environmental
              sustainability.
            </p>

            <p>
              With a BSc in Computer Science from Queen Mary University of London and hands-on
              experience with PyTorch, TensorFlow, and modern ML frameworks, I'm dedicated to
              building technology that makes a positive impact on our planet.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">📍</span>
                <span>Based in London, UK</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">🎓</span>
                <span>MSc Machine Learning @ UCL</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">💼</span>
                <span>6 years consulting experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">🌍</span>
                <span>Focus on AI for Sustainability</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">🤖</span>
                <span>Deep Learning & NLP Specialist</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
