import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Gamepad,
  Globe,
  Smartphone,
  Code,
  PenTool,
} from "lucide-react";
import PageTransition from "../components/pageTransition";
import cryptic from "../assets/Logo-2.png";
import unamed from "../assets/unnamed.png";
import wget from "../assets/wget-cover.png";
import raincode from "../assets/Raincode.png";

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
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Foremaret",
      description:
        "Top Swedish Golf Second Hand Marketplace. A platform for buying and selling used golf equipment.",
      type: "mobile",
      tech: [
        "React Native",
        "Expo",
        "Node.js",
        "MongoDB",
        "Stripe",
        "Rocker",
        "BankID",
        "Firebase",
        "Rocker",
        "PostNord",
        "AWS Services",
      ],
      image:
        "https://media.licdn.com/dms/image/v2/D4D0BAQEJKehkb4XXgg/company-logo_200_200/company-logo_200_200/0/1738939089627/foremarket_logo?e=2147483647&v=beta&t=bsJ7eCQtFIqLDJ0o5IrSya6R56w_tCHgVFljkUC021Q",
      live: "https://foremarket.se/",
      featured: true,
    },
    {
      id: 2,
      title: "Cryptic Portal",
      description:
        "An immersive 3D escape game built with Unity, featuring dynamic horror house and AI-driven NPCs. Contains a trained LLM to be your escape room guide",
      type: "game",
      tech: ["Unity", "C#", "Blender", "Llama AI"],
      image: cryptic,
      live: "https://dj96u9m908mjo.cloudfront.net/Cryptic.zip",
      featured: true,
    },
    {
      id: 3,
      title: "Bevy Guide Website",
      description:
        "Created and deployed a step-by-step guide along with strong documentation on how to use bevy, a game engine in Rust",
      type: "web",
      tech: ["Nextjs", "Vercel", "Typescript", "Bevy", "Rust"],
      image: "https://bevyengine.org/assets/bevy_logo_dark.svg",
      live: "https://bevy-guide.vercel.app",
      featured: true,
      github: "https://github.com/NooraWael/bevy-guide",
    },
    {
      id: 4,
      title: "Maze wars",
      description:
        "Maze wars is a project that involved recreating the orginal game maze wars in a modern architecture, server and client using Rust",
      type: "game",
      tech: ["Rust", "Sdl2"],
      image: unamed,
      featured: false,
      github: "https://github.com/NooraWael/maze-wars",
    },
    {
      id: 5,
      title: "W-get replica",
      description:
        "W-get is a replica of the wget command in linux, it is a tool that allows you to download files from the internet, Along with that I have equipped it with a GUI interface to download files in a user friendly environemnt",
      type: "tool",
      tech: ["Go", "Gin"],
      image: wget,
      featured: false,
      github: "https://github.com/NooraWael/get-with-a-w",
    },
    {
      id: 6,
      title: "Raincode Website",
      description:
        "Raincode.tech and Raincode.bh are websites for the company Raincode. Which is based in Bahrain and Sweden and provide software solutions",
      type: "web",
      tech: ["Wordpress", "Elementor", "PHP", "JS"],
      image: raincode,
      featured: false,
      github: "https://raincode.tech",
    },

    // Add more projects as needed
  ];

  const filterOptions = [
    { value: "all", label: "All Projects", icon: Code },
    { value: "web", label: "Web Apps", icon: Globe },
    { value: "game", label: "Games", icon: Gamepad },
    { value: "mobile", label: "Mobile Apps", icon: Smartphone },
    { value: "tool", label: "Tools", icon: PenTool },
  ];

  useEffect(() => {
    const filtered =
      selectedFilter === "all"
        ? projects
        : projects.filter((project) => project.type === selectedFilter);
    setDisplayedProjects(filtered);
  }, [selectedFilter]);

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="w-5 h-5" />;
      case "game":
        return <Gamepad className="w-5 h-5" />;
      case "mobile":
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen w-full fixed inset-0 overflow-hidden">
        <div className="flex flex-col w-full bg-black overflow-y-auto">
          <div
            ref={contentRef}
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
          >
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 mb-16"
            >
              <h1 className="text-5xl font-bold text-white mb-4">
                My Projects
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Explore my portfolio of web applications, games, and mobile
                apps. Each project represents a unique challenge and innovative
                solution.
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filterOptions.map((filter) => {
                const Icon = filter.icon;
                return (
                  <motion.button
                    key={filter.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium 
                      transition-all duration-300 ${
                        selectedFilter === filter.value
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {filter.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-gradient-to-br from-gray-900 to-gray-800 
                      rounded-xl overflow-hidden shadow-xl"
                  >
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center 
                          group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400">
                          {getProjectIcon(project.type)}
                        </div>
                      </div>

                      <p className="text-gray-400">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Project Links */}
                      <div className="flex items-center gap-4 pt-4">
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Github className="w-6 h-6" />
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
                            <ExternalLink className="w-6 h-6" />
                          </motion.a>
                        )}
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div
                          className="absolute top-4 right-4 px-3 py-1 bg-blue-500 
                          text-white text-sm font-medium rounded-full shadow-lg"
                        >
                          Featured
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
