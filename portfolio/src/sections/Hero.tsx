import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { RocketIcon, Code2Icon, Blocks, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PuzzleScene from '../components/PuzzleScene';
import { useCursor } from '../context/CursorContext';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { setVariant } = useCursor();
  const { trigger } = usePageTransition();

  useEffect(() => {
    // Rotate through hero taglines
    const texts = ['Product-minded engineer.', 'Full stack developer.', 'Experience architect.', 'Community speaker.'];
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
      description: 'Calm, resilient flows for mobile, web, and realtime surfaces.',
    },
    {
      icon: Code2Icon,
      title: 'Core Stack',
      description: 'React Native • Expo • Go • Three.js • Framer Motion',
    },
    {
      icon: Blocks,
      title: 'Approach',
      description: 'Systems thinking, docs-first collaboration, reliable delivery.',
    },
  ];
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.04),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0)_65%,rgba(255,255,255,0.06)_100%)] opacity-70" />
      <div className="absolute -right-32 top-20 h-64 w-64 bg-[#292929] blur-[110px] opacity-40" />
      <div className="absolute -left-24 bottom-10 h-72 w-72 bg-[#111111] blur-[130px] opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
        <div className="grid items-center gap-10 sm:gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-left relative"
          >
            <div className="pointer-events-none absolute -left-10 -top-16 h-72 w-72 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),transparent_55%)] blur-[90px] opacity-70" />
            {/* <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.05] tracking-tight drop-shadow-[0_18px_60px_rgba(0,0,0,0.75)]"
            >
              <div className="text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.65)] mb-4">
                Noora Qasim — Full-stack Engineer
              </div>
              <div className="space-y-2">
                <div>{splitText('I build systems,')}</div>
                <div>{splitText('for humans.')}</div>
              </div>
            </h1> */}

            <div className="text-xl md:text-2xl text-gray-100 min-h-[70px]">
              <span className="text-gray-100">I&apos;m a </span>
              <span ref={textRef} className="font-semibold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-400 text-lg leading-relaxed max-w-2xl"
            >
              Building resilient products with a calm, intentional approach. I connect strategy, design, and engineering
              to ship experiences that feel deliberate across mobile, web, and interactive canvases.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3 text-sm text-gray-400"
            >
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 pt-4"
          >
              <Link to="/projects" className="pointer-events-auto">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    trigger('/projects');
                  }}
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  whileHover={{ scale: 1.04, boxShadow: '0 20px 70px rgba(0, 0, 0, 0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-3 rounded-full border border-white/10 bg-gradient-to-b from-[#141414] to-[#090909] text-[#f7f7f7] font-semibold tracking-wide"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <RocketIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    View Projects
                  </span>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
                </motion.button>
              </Link>

              <Link to="/contact" className="pointer-events-auto">
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    trigger('/contact');
                  }}
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full border border-white/10 text-gray-200 font-semibold tracking-wide bg-white/5 hover:bg-white/10 transition-all"
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative w-full max-w-[420px] mx-auto aspect-[4/5] min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]">
              <PuzzleScene />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-14"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -3 }}
              className="flex items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm pointer-events-auto"
            >
              <item.icon className="w-6 h-6 text-[#d2d2d2] flex-shrink-0" />
              <div>
                <p className="text-[#f1f1f1] font-semibold">{item.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
