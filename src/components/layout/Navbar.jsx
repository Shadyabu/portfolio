import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      // We're on home page, just scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 w-full backdrop-blur-md z-50"
      style={{
        backgroundColor: 'rgba(250, 245, 240, 0.9)',
        borderBottom: '2px solid #D6C9A1',
        boxShadow: '0 4px 6px rgba(214, 201, 161, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Mouse Memoirs font */}
          <motion.a
            href="/"
            onClick={handleLogoClick}
            style={{
              fontFamily: "'Mouse Memoirs', cursive",
              fontSize: '2rem',
              color: '#0F172A',
              textDecoration: 'none',
              letterSpacing: '0.02em'
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Shady Abushady
          </motion.a>

          {/* Desktop Navigation with playful design */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                style={{
                  color: '#0F172A',
                  textDecoration: 'none',
                  position: 'relative'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  backgroundColor: '#F5EFE6',
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button with playful interaction */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{
              color: '#0F172A',
              backgroundColor: isOpen ? '#F5EFE6' : 'transparent',
              border: '2px solid',
              borderColor: isOpen ? '#D6C9A1' : 'transparent'
            }}
            whileHover={{
              backgroundColor: '#F5EFE6',
              borderColor: '#D6C9A1'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation with smooth animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            style={{
              backgroundColor: '#FAF5F0',
              borderTop: '1px solid #D6C9A1'
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-3 rounded-lg text-base font-medium"
                  style={{
                    color: '#0F172A',
                    textDecoration: 'none',
                    backgroundColor: 'transparent'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{
                    backgroundColor: '#F5EFE6',
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span
                    style={{
                      fontFamily: "'Mouse Memoirs', cursive",
                      fontSize: '1.5rem',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Decorative element at bottom of mobile menu */}
            <motion.div
              className="flex justify-center pb-3 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
            >
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#D6C9A1'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
