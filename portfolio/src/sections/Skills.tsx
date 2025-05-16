import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageTransition from '../components/pageTransition';
import { 
  Code2, Database, Palette, Terminal, Brain, Gamepad, Layout, Server,
  Globe, Smartphone, Github, ExternalLink
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
}

interface StackProject {
  title: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
}

interface TechStack {
  name: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
  projects: StackProject[];
}

const Skills = () => {
  const skillsRef = useRef(null);
  const stacksRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true });
  const isStacksInView = useInView(stacksRef, { once: true });

  // Skills data
  const skills: Skill[] = [
    // Frontend
    { name: "React", level: 90, category: "Frontend", icon: <Code2 /> },
    { name: "TypeScript", level: 85, category: "Frontend", icon: <Code2 /> },
    { name: "Next.js", level: 80, category: "Frontend", icon: <Code2 /> },
    { name: "Tailwind CSS", level: 90, category: "Frontend", icon: <Palette /> },
    
    // Backend
    { name: "Node.js", level: 85, category: "Backend", icon: <Server /> },
    { name: "MongoDB", level: 80, category: "Backend", icon: <Database /> },
    { name: "Go", level: 75, category: "Backend", icon: <Terminal /> },
    { name: "PostgreSQL", level: 80, category: "Backend", icon: <Database /> },
    
    // Game Dev
    { name: "Unity", level: 85, category: "Game Development", icon: <Gamepad /> },
    { name: "C#", level: 80, category: "Game Development", icon: <Terminal /> },
    { name: "Game Design", level: 75, category: "Game Development", icon: <Layout /> },
    { name: "3D Modeling", level: 70, category: "Game Development", icon: <Brain /> },
  ];

  // Tech stacks data
  const techStacks: TechStack[] = [
    {
      name: "Modern Web Stack",
      description: "Full-stack web development with React, Next.js, and Node.js",
      icon: <Globe />,
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      projects: [
        {
          title: "E-commerce Platform",
          description: "A modern e-commerce platform with real-time inventory and payments.",
          image: "/api/placeholder/400/300",
          github: "https://github.com",
          live: "https://demo.com"
        }
      ]
    },
    {
      name: "Game Development",
      description: "Game development using Unity and C# for immersive experiences",
      icon: <Gamepad />,
      technologies: ["Unity", "C#", "Blender", "ML-Agents", "Photon"],
      projects: [
        {
          title: "3D Adventure Game",
          description: "Open-world adventure game with dynamic weather system.",
          image: "/api/placeholder/400/300",
          github: "https://github.com"
        }
      ]
    },
    {
      name: "Mobile Development",
      description: "Cross-platform mobile app development with React Native",
      icon: <Smartphone />,
      technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
      projects: [
        {
          title: "Fitness Tracker",
          description: "Mobile app for tracking workouts and nutrition.",
          image: "/api/placeholder/400/300",
          live: "https://appstore.com"
        }
      ]
    }
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen w-full fixed inset-0 overflow-hidden">
        <div className="flex flex-col w-full bg-black overflow-y-auto relative">
          <ParticleBackground />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 mb-16"
            >
              <h1 className="text-5xl font-bold text-white mb-4">My Skills</h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                A comprehensive overview of my technical expertise and proficiencies 
                across various development domains.
              </p>
            </motion.div>

            {/* Skills Cards Section */}
            <div className="space-y-16" ref={skillsRef}>
              {categories.map((category) => (
                <motion.div
                  key={category}
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-8">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-gray-900 to-gray-800 
                            rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                              {skill.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                              {skill.name}
                            </h3>
                          </div>
                          
                          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <div className="mt-2 text-right text-sm text-gray-400">
                            {skill.level}%
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Stacks Section */}
            <motion.div
              ref={stacksRef}
              className="mt-24 space-y-8"
              initial="hidden"
              animate={isStacksInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-4xl font-bold text-white">Favorite Tech Stacks</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  These are my go-to technology combinations for different types of projects.
                </p>
              </div>

              <div className="space-y-8">
                {techStacks.map((stack, _) => (
                  <motion.div
                    key={stack.name}
                    variants={skillVariants}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl"
                  >
                    {/* Stack Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400">
                        {stack.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{stack.name}</h3>
                        <p className="text-gray-400">{stack.description}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {stack.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stack.projects.map((project, index) => (
                        <motion.div
                          key={project.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="group relative overflow-hidden rounded-xl bg-gray-800"
                        >
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-center
                                group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent
                            opacity-80 group-hover:opacity-90 transition-opacity" />
                          <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                            <p className="text-gray-300 text-sm">{project.description}</p>
                            <div className="flex gap-4 mt-4">
                              {project.github && (
                                <motion.a
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-white transition-colors"
                                >
                                  <Github className="w-5 h-5" />
                                </motion.a>
                              )}
                              {project.live && (
                                <motion.a
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-white transition-colors"
                                >
                                  <ExternalLink className="w-5 h-5" />
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;