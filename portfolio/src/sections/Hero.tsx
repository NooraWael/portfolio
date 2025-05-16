import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  RocketIcon, 
  Code2Icon, 
  BrainCircuitIcon,
  // Tech stack icons
  Blocks,
  Gamepad2,
  Hash,
  AppWindow,
  Terminal,
  Smartphone,
  Container,
  Boxes,
  GitBranchIcon,
  CloudIcon,
  Database,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';



gsap.registerPlugin(TextPlugin);

const Hero = () => {
  // Previous refs and useEffect remain the same...
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Previous useEffect code remains the same...
    const texts = ["Full Stack Developer.", "Project Manager", "Problem Solver.", "Team Player."];

    const textTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    if (textRef.current) {
      texts.forEach((text) => {
        textTimeline
          .to(textRef.current, {
            duration: 1,
            text: text,
            ease: "none",
          })
          .to(textRef.current, {
            duration: 2,
            delay: 1,
          });
      });
    }

    const animations: gsap.core.Tween[] = [];
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle) => {
      const tween = gsap.to(particle as Element, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-150, 150),
        duration: gsap.utils.random(15, 30),
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
      animations.push(tween);
    });

    return () => {
      textTimeline.kill();
      animations.forEach(tween => tween.kill());
    };
  }, []);

  // Updated tech stack items with new technologies
  const techStack = [
    { icon: Blocks, label: 'React Native' },
    { icon: Gamepad2, label: 'Game Dev' },
    { icon: Hash, label: 'C#' },
    { icon: AppWindow, label: 'Unity' },
    { icon: Terminal, label: 'Golang' },
    { icon: Smartphone, label: 'Swift' },
    { icon: Container, label: 'Docker' },
    { icon: Boxes, label: 'Expo' },
    { icon: GitBranchIcon, label: 'Git' },
    { icon: CloudIcon, label: 'Cloud' },
    { icon: Database, label: 'Database' },
    { icon: Globe, label: 'Web' }
  ];

  return (
    <div className="flex min-h-screen w-full fixed inset-0 overflow-hidden">
      {/* Left section remains the same */}
      <div ref={containerRef} className="w-[800px] relative bg-black overflow-hidden">
        {/* Previous left section content remains exactly the same... */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-blue-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-12 h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-blue-500 text-xl font-mono">Hello World, I'm</h2>
            <h1 className="text-6xl md:text-8xl font-bold text-white">
              Noora
              <br />
              Qasim
            </h1>
            <div className="text-3xl md:text-5xl text-gray-300 h-20">
              I'm a <span ref={textRef} className="text-blue-500"></span>
            </div>

            <div className="flex space-x-4 pt-8">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold 
                  hover:bg-blue-700 transition-colors duration-300
                  shadow-lg shadow-blue-500/30"
              >
                View Projects
              </motion.button>
              </Link>
              <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-xl font-bold 
                  hover:bg-blue-500/10 transition-colors duration-300"
              >
                Contact Me
              </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Tech stack icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 flex space-x-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center"
            >
              <RocketIcon className="text-blue-500 w-6 h-6" />
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center"
            >
              <Code2Icon className="text-blue-500 w-6 h-6" />
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center"
            >
              <BrainCircuitIcon className="text-blue-500 w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-blue-900/20 pointer-events-none" />
      </div>

      {/* Right Section - Modified with updated tech icons grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-[calc(100%-800px)] bg-[#1E1E1E] flex flex-col justify-center"
      >
        <div className="px-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-lg bg-[#252525] hover:bg-[#2A2A2A] transition-colors"
          >
            <h3 className="text-blue-400 mb-2">Current Focus</h3>
            <p className="text-gray-300">Creating Cross Compatibility apps using expo </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-lg bg-[#252525] hover:bg-[#2A2A2A] transition-colors"
          >
            <h3 className="text-blue-400 mb-2">Experience</h3>
            <p className="text-gray-300">1 year in Full Stack Development</p>
          </motion.div>

 
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="p-6 rounded-lg bg-[#252525] hover:bg-[#2A2A2A] transition-colors"
          >
            <h3 className="text-blue-400 mb-4">Technologies</h3>
            <div className="grid grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-4 bg-[#2A2A2A] rounded-lg hover:bg-[#303030] transition-colors"
                >
                  <tech.icon className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-gray-300 text-sm text-center">{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;