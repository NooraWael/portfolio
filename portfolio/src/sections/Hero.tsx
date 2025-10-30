import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import {
  RocketIcon,
  Code2Icon,
  BrainCircuitIcon,
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
  Globe,
  Puzzle,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PuzzleScene from '../components/PuzzleScene';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [assemblyComplete, setAssemblyComplete] = useState(false);

  useEffect(() => {
    // Animated rotating text
    const texts = ["Full Stack Developer.", "Problem Solver.", "Puzzle Master.", "Tech Enthusiast."];
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

    // Title entrance animation with glitch effect
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.3,
      });

      // Letter-by-letter reveal effect
      const letters = titleRef.current.querySelectorAll('.letter');
      gsap.from(letters, {
        opacity: 0,
        y: 20,
        rotationX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5,
      });
    }

    // Puzzle assembly complete after animation
    setTimeout(() => {
      setAssemblyComplete(true);
    }, 3000);

    return () => {
      textTimeline.kill();
    };
  }, []);

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

  // Split text into letters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* 3D Puzzle Scene Background */}
      <div className="absolute inset-0 opacity-80">
        <PuzzleScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 md:px-16">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Puzzle Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm"
            >
              <Puzzle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-mono">Solving Complex Problems</span>
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </motion.div>

            {/* Hello Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-blue-400 text-xl md:text-2xl font-mono tracking-wider"
            >
              {'<Hello World />'}
            </motion.h2>

            {/* Name with animated letters */}
            <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white tracking-tight">
              <div className="mb-2">{splitText('Noora')}</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {splitText('Qasim')}
              </div>
            </h1>

            {/* Dynamic Text */}
            <div className="text-2xl md:text-4xl text-gray-300 min-h-[80px]">
              <span className="text-gray-400">I'm a </span>
              <span ref={textRef} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold"></span>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-gray-400 text-lg max-w-2xl leading-relaxed"
            >
              Crafting innovative solutions piece by piece. I approach development like solving a puzzle -
              finding patterns, connecting pieces, and creating something extraordinary.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold
                    overflow-hidden shadow-lg shadow-blue-500/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <RocketIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    View Projects
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>

              <Link to="/speaking">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold
                    hover:from-purple-500 hover:to-purple-600 transition-all duration-300
                    shadow-lg shadow-purple-500/30"
                >
                  Book Me to Speak
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-blue-500 text-blue-400 rounded-xl font-bold
                    hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300
                    backdrop-blur-sm"
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Bottom Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-6 pt-8"
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

          {/* Right Side - Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Assembly Status */}
            {assemblyComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-mono text-sm">Puzzle Assembled Successfully</span>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-md hover:border-blue-400/40 transition-all"
            >
              <h3 className="text-blue-400 mb-3 text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Current Focus
              </h3>
              <p className="text-gray-300 text-lg">Creating Cross Compatibility apps using Expo</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-md hover:border-purple-400/40 transition-all"
            >
              <h3 className="text-purple-400 mb-3 text-xl font-bold flex items-center gap-2">
                <Code2Icon className="w-5 h-5" />
                Experience
              </h3>
              <p className="text-gray-300 text-lg">2 years in Full Stack Development</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/20 backdrop-blur-md hover:border-pink-400/40 transition-all"
            >
              <h3 className="text-pink-400 mb-6 text-xl font-bold">Technologies</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-all border border-white/5 hover:border-blue-500/30"
                  >
                    <tech.icon className="w-6 h-6 text-blue-400 mb-2" />
                    <span className="text-gray-400 text-xs text-center">{tech.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </div>
  );
};

export default Hero;
