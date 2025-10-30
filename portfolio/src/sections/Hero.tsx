import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import {
  RocketIcon,
  Code2Icon,
  BrainCircuitIcon,
  Blocks,
  Puzzle,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PuzzleScene from '../components/PuzzleScene';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { setVariant } = useCursor();

  useEffect(() => {
    // Rotate through hero taglines
    const texts = ['Full Stack Developer.', 'Problem Solver.', 'Creative Technologist.', 'Community Speaker.'];
    const textTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    if (textRef.current) {
      textRef.current.textContent = texts[0];
      const sequence = texts.slice(1).concat(texts[0]);

      sequence.forEach((text) => {
        textTimeline
          .to(textRef.current, {
            duration: 1,
            text,
            ease: 'none',
          })
          .to(textRef.current, {
            duration: 2,
            delay: 1,
          });
      });
    }

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.3,
      });

      const letters = titleRef.current.querySelectorAll('.letter');
      gsap.from(letters, {
        opacity: 0,
        y: 20,
        rotationX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
      });
    }

    return () => {
      textTimeline.kill();
    };
  }, []);

  const highlights = [
    {
      icon: Sparkles,
      title: 'Current Focus',
      description: 'Shipping cross-platform experiences with Expo',
    },
    {
      icon: Code2Icon,
      title: 'Experience',
      description: '2 years building full stack products',
    },
    {
      icon: Blocks,
      title: 'Toolkit',
      description: 'React Native • Golang • Unity',
    },
  ];

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-80 z-0">
        <PuzzleScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30 pointer-events-none z-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-5" />

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-40 pb-24 pointer-events-none">
        <div className="w-full max-w-4xl mx-auto space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm mx-auto"
            >
              <Puzzle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-mono">Solving Complex Problems</span>
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-sm uppercase tracking-[0.35em] text-blue-100/80"
            >
              I'm a Tech Enthusiast
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-blue-400 text-xl md:text-2xl font-mono tracking-wider"
            >
              {'<Hello World />'}
            </motion.h2>

            <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white tracking-tight">
              <div className="mb-2">{splitText('Noora')}</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {splitText('Qasim')}
              </div>
            </h1>

            <div className="text-2xl md:text-4xl text-gray-300 min-h-[80px]">
              <span className="text-gray-400">I'm a </span>
              <span ref={textRef} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              I design and build experiences that feel seamless end-to-end—connecting strategy, design, and
              engineering to ship polished, resilient products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link to="/projects" className="pointer-events-auto">
                <motion.button
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold overflow-hidden shadow-lg shadow-blue-500/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <RocketIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    View Projects
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>

              <Link to="/speaking" className="pointer-events-auto">
                <motion.button
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30"
                >
                  Book Me to Speak
                </motion.button>
              </Link>

              <Link to="/contact" className="pointer-events-auto">
                <motion.button
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto pt-8"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm pointer-events-auto"
                >
                  <item.icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex items-center justify-center gap-6 pt-6"
            >
              <motion.div
                whileHover={{ y: -5, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30 backdrop-blur-sm"
              >
                <RocketIcon className="text-blue-400 w-8 h-8" />
              </motion.div>
              <motion.div
                whileHover={{ y: -5, rotate: -5 }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30 backdrop-blur-sm"
              >
                <Code2Icon className="text-purple-400 w-8 h-8" />
              </motion.div>
              <motion.div
                whileHover={{ y: -5, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center border border-pink-500/30 backdrop-blur-sm"
              >
                <BrainCircuitIcon className="text-pink-400 w-8 h-8" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </div>
  );
};

export default Hero;
