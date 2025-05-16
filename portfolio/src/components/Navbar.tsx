import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-white"
            >
              N<span className="text-blue-500">.</span>Q
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/about" isActive={location.pathname === "/about"}>About</NavLink>
            <NavLink to="/projects" isActive={location.pathname === "/projects"}>Projects</NavLink>
            <NavLink to="/contact" isActive={location.pathname === "/contact"}>Contact</NavLink>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <SocialIcon icon={<Github />} href="https://github.com/NooraWael" />
            <SocialIcon icon={<Linkedin />} href="https://www.linkedin.com/in/nooraqasim" />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/50 backdrop-blur-lg"
          >
            <div className="px-4 py-6 space-y-4">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink to="/projects" onClick={() => setIsOpen(false)}>
                Projects
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ 
  to, 
  isActive, 
  children 
}: { 
  to: string; 
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <Link to={to}>
    <motion.span
      whileHover={{ y: -2 }}
      className={`relative group cursor-pointer ${
        isActive ? 'text-blue-500' : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      <motion.span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
          transition-transform duration-300`}
      />
    </motion.span>
  </Link>
);

const MobileNavLink = ({ 
  to, 
  onClick, 
  children 
}: { 
  to: string; 
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link to={to}>
    <motion.span
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="block text-gray-300 hover:text-white transition-colors text-lg"
    >
      {children}
    </motion.span>
  </Link>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, color: '#3B82F6' }}
    className="text-gray-400 hover:text-white transition-colors"
  >
    {icon}
  </motion.a>
);

export default Navbar;