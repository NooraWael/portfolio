import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, GraduationCap, Briefcase, Award, MapPin } from 'lucide-react';
import PageTransition from '../components/pageTransition';
import photo from '../assets/photo.png';
import cvFile from '../assets/NooraWaelCV.pdf';


const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();
    
    if (contentRef.current) {
      timeline.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  const education = [
    {
      year: "2021 - 2025",
      degree: "Bachelor's in Information and Communication Technology - Programming Major", 
      school: "Bahrain Polytechnic",
      description: "Focused on understanding the basics of programming and software development, learnt many technologies and compentencies such as Java, C#, HTML, CSS, JavaScript and more. The experience also provided me with the soft skill set needed to start any production level code and work in teams."
    },
    {
      year: "2023 - 2025",
      degree: "Diploma in Full Stack Development",
      school: "Reboot Coding Institute",
      description: "Worked on a variety of projects including deep system architecture, algorithms, web development. Currently in specialization for DevOps and Cloud Engineering, focusing on AWS and Azure. Along with Mobile Development using React Native and Expo."
    },
    {
      year: "2025",
      degree: "Professional Scrum Master Certification", 
      school: "Scrum.org",
      description: "A certification that validates my knowledge of Scrum and Agile methodologies, focusing on the principles and practices of Scrum while imporving my proffessional career path."
    }
  ];

  const experience = [
    {
      year: "2024 - 6 months",
      role: "Web Development Intern",
      company: "Raincode",
      location: "Manama Bahrain, Stockholm Sweden",
      description: "Worked on a project that used WordPress to create a website for the client, worked on a team of 4 that taught me how to work in a team and how to use the Agile methodology. Implemented Scrum and Kanban to manage the project effectively. You can view the project on Raincode.tech and Raincode.bh"
    },
    {
      year: "January 2025 - Present",
      role: "Mobile development Team Lead",
      company: "Raincode | Foremarket",
      location: "Manama Bahrain, Stockholm Sweden",
      description: "Worked on implementing a mobile application for the client using React Native and Expo. The project is a mobile application that is a second hand marketplace for golf, people can buy exchange or sell their golf equipment. The project has been released and is on Swedish market and I am leading and working with 3 other developers to expand the project internationally into the Nordic and Americas."
    }
  ];

  return (
    <PageTransition>
      <div className="flex min-h-screen w-full fixed inset-0 overflow-hidden">
        <div className="flex flex-col w-full bg-black overflow-y-auto">
          {/* Added pt-28 to account for navbar height (h-20) plus extra spacing */}
          <div ref={contentRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-24">
            {/* Header Section */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4">About Me</h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
            </div>

            {/* Main Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Full Stack Developer & React Native Fanatic
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  With a passion for creating beautiful and functional applications,
                  I bring ideas to life through clean code and intuitive design.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My journey in technology started with web development, and I've since
                  expanded into game development and mobile applications, working on
                  various projects that have sharpened my skills across different platforms.
                </p>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg
                      hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = cvFile;
                        link.download = 'Noora_Qasim_CV.pdf';
                        link.click();
                      }}
                  >
                    Download CV
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 border-2 border-blue-500 text-blue-500
                      rounded-lg hover:bg-blue-500/10 transition-colors"
                    onClick={() => window.open('/projects')}
                  >
                    My Work
                  </motion.button>
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="relative w-full aspect-square">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br
                  from-blue-600/20 to-purple-600/20 overflow-hidden relative group"
                >
                  <img
                    src={photo}
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover object-center
                      group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr
                    from-black via-black/50 to-transparent opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Education Timeline Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Educational Journey
              </h2>
              <div className="space-y-12">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Calendar className="w-4 h-4" />
                        <span>{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                      <p className="text-gray-400">{item.school}</p>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Work Experience Timeline Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Professional Journey
              </h2>
              <div className="space-y-12">
                {experience.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-500">
                        <Calendar className="w-4 h-4" />
                        <span>{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.role}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Award className="w-4 h-4" />
                        <span>{item.company}</span>
                        <MapPin className="w-4 h-4 ml-2" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;