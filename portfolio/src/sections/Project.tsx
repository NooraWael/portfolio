import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Gamepad, Globe, Smartphone, Code, PenTool } from 'lucide-react';
import PageTransition from '../components/pageTransition';
import { useCursor } from '../context/CursorContext';
import cryptic from '../assets/Logo-2.png';
import unamed from '../assets/unnamed.png';
import wget from '../assets/wget-cover.png';
import raincode from '../assets/Raincode.png';
import shamsaha from '../assets/shamsaha.webp';

interface Project {
  id: number;
  title: string;
  description: string;
  type: "web" | "game" | "mobile" | "other" | "tool";
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
}

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setVariant } = useCursor();

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Foremaret',
      description:
        'Top Swedish Golf Second Hand Marketplace. A platform for buying and selling used golf equipment.',
      type: 'mobile',
      tech: [
        'React Native',
        'Expo',
        'Node.js',
        'MongoDB',
        'Stripe',
        'Rocker',
        'BankID',
        'Firebase',
        'Rocker',
        'PostNord',
        'AWS Services',
      ],
      image:
        'https://media.licdn.com/dms/image/v2/D4D0BAQEJKehkb4XXgg/company-logo_200_200/company-logo_200_200/0/1738939089627/foremarket_logo?e=2147483647&v=beta&t=bsJ7eCQtFIqLDJ0o5IrSya6R56w_tCHgVFljkUC021Q',
      live: 'https://foremarket.se/',
      featured: true,
    },
    {
      id: 7,
      title: 'Shamsaha',
      description:
        'Bahrain-based women safety and empowerment app offering 24/7 crisis care, community resources, and multilingual support.',
      type: 'mobile',
      tech: ['React Native', 'Expo', 'Node.js', 'Twilio', 'AWS'],
      image: shamsaha,
      live: 'https://shamsaha.org',
      featured: true,
    },
    {
      id: 2,
      title: 'Cryptic Portal',
      description:
        'An immersive 3D escape game built with Unity, featuring dynamic horror house and AI-driven NPCs. Contains a trained LLM to be your escape room guide',
      type: 'game',
      tech: ['Unity', 'C#', 'Blender', 'Llama AI'],
      image: cryptic,
      live: 'https://dj96u9m908mjo.cloudfront.net/Cryptic.zip',
      featured: true,
    },
    {
      id: 3,
      title: 'Bevy Guide Website',
      description:
        'Created and deployed a step-by-step guide along with strong documentation on how to use bevy, a game engine in Rust',
      type: 'web',
      tech: ['Nextjs', 'Vercel', 'Typescript', 'Bevy', 'Rust'],
      image: 'https://bevyengine.org/assets/bevy_logo_dark.svg',
      live: 'https://bevy-guide.vercel.app',
      featured: true,
      github: 'https://github.com/NooraWael/bevy-guide',
    },
    {
      id: 4,
      title: 'Maze wars',
      description:
        'Maze wars is a project that involved recreating the orginal game maze wars in a modern architecture, server and client using Rust',
      type: 'game',
      tech: ['Rust', 'Sdl2'],
      image: unamed,
      featured: false,
      github: 'https://github.com/NooraWael/maze-wars',
    },
    {
      id: 5,
      title: 'W-get replica',
      description:
        'W-get is a replica of the wget command in linux, it is a tool that allows you to download files from the internet, Along with that I have equipped it with a GUI interface to download files in a user friendly environemnt',
      type: 'tool',
      tech: ['Go', 'Gin'],
      image: wget,
      featured: false,
      github: 'https://github.com/NooraWael/get-with-a-w',
    },
    {
      id: 6,
      title: 'Raincode Website',
      description:
        'Raincode.tech and Raincode.bh are websites for the company Raincode. Which is based in Bahrain and Sweden and provide software solutions',
      type: 'web',
      tech: ['Wordpress', 'Elementor', 'PHP', 'JS'],
      image: raincode,
      featured: false,
      live: 'https://raincode.tech',
    },

    // Add more projects as needed
  ];

  const filterOptions = [
    { value: 'all', label: 'All Projects', icon: Code },
    { value: 'web', label: 'Web Apps', icon: Globe },
    { value: 'game', label: 'Games', icon: Gamepad },
    { value: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { value: 'tool', label: 'Tools', icon: PenTool },
  ];

  useEffect(() => {
    const filtered =
      selectedFilter === 'all'
        ? projects
        : projects.filter((project) => project.type === selectedFilter);
    setDisplayedProjects(filtered);
  }, [selectedFilter]);

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="w-5 h-5" />;
      case 'game':
        return <Gamepad className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e6e6e6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.06)_100%)] opacity-80" />
        <div className="absolute -right-28 top-24 h-64 w-64 bg-[#1f1f1f] blur-[120px] opacity-60" />
        <div className="absolute -left-24 bottom-12 h-80 w-80 bg-[#0d0d0d] blur-[140px] opacity-70" />

        <div
          ref={contentRef}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-24 space-y-12"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-400">
              <div className="h-px w-10 bg-white/15" />
              Project Capsule
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-serif text-white leading-[1.08] drop-shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
                Calmly shipped work across mobile, web, and immersive spaces.
              </h1>
              <p className="text-lg text-gray-200 max-w-3xl leading-relaxed">
                A mix of production apps, 3D experiments, and tools. Filter by surface and explore the systems, stacks,
                and launches.
              </p>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => {
              const Icon = filter.icon;
              const isActive = selectedFilter === filter.value;
              return (
                <motion.button
                  key={filter.value}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 text-sm ${
                    isActive
                      ? 'border-white/30 bg-white/10 text-white shadow-[0_14px_45px_rgba(0,0,0,0.45)]'
                      : 'border-white/10 bg-white/5 text-gray-200 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </motion.button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            >
              {displayedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/12 bg-black/70 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%)] opacity-70" />
                  <div className="absolute inset-px rounded-[22px] border border-white/5" />

                  {/* Project Info */}
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-100">
                          {getProjectIcon(project.type)}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onMouseEnter={() => setVariant('link')}
                            onMouseLeave={() => setVariant('default')}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onMouseEnter={() => setVariant('link')}
                            onMouseLeave={() => setVariant('default')}
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-200 leading-relaxed">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium rounded-full border border-white/12 bg-white/5 text-gray-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
