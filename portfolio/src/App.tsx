import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Project';
import Contact from './sections/Contact';
import { TransitionProvider } from './context/TransitionContext';

function App() {
  return (
    <Router>
      <TransitionProvider>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-[#050505] text-[#e6e6e6] min-h-screen"
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </TransitionProvider>
    </Router>
  );
}

export default App;
