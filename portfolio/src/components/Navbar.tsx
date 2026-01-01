import { useState, useEffect, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { trigger } = usePageTransition();

  const handleNav = (to: string) => (event: MouseEvent) => {
    event.preventDefault();
    setIsOpen(false);
    trigger(to);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0b0b0b]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.45)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-semibold tracking-tight text-[#f5f5f5]"
            >
              N<span className="text-[#a8a8a8]">.</span>Q
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={location.pathname === "/"} onNavigate={handleNav}>Home</NavLink>
            <NavLink to="/about" isActive={location.pathname === "/about"} onNavigate={handleNav}>About</NavLink>
            <NavLink to="/projects" isActive={location.pathname === "/projects"} onNavigate={handleNav}>Projects</NavLink>
            <NavLink to="/contact" isActive={location.pathname === "/contact"} onNavigate={handleNav}>Contact</NavLink>
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
            className="md:hidden text-[#f5f5f5]"
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
            className="md:hidden bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              <MobileNavLink to="/" onClick={handleNav}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={handleNav}>
                About
              </MobileNavLink>
              <MobileNavLink to="/projects" onClick={handleNav}>
                Projects
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={handleNav}>
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
  children,
  onNavigate
}: { 
  to: string; 
  isActive: boolean;
  children: React.ReactNode;
  onNavigate: (to: string) => (event: MouseEvent) => void;
}) => (
  <Link to={to} onClick={onNavigate(to)}>
    <motion.span
      whileHover={{ y: -2 }}
      className={`relative group cursor-pointer uppercase tracking-[0.08em] text-sm font-semibold ${
        isActive ? 'text-[#f5f5f5]' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
      <motion.span
        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#a8a8a8] transform origin-left
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
  onClick: (to: string) => (event: MouseEvent) => void;
  children: React.ReactNode;
}) => (
  <Link to={to} onClick={onClick(to)}>
    <motion.span
      whileTap={{ scale: 0.95 }}
      className="block text-gray-300 hover:text-gray-50 transition-colors text-lg"
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
    whileHover={{ y: -2, color: '#f5f5f5' }}
    className="text-gray-500 hover:text-gray-100 transition-colors"
  >
    {icon}
  </motion.a>
);

export default Navbar;
