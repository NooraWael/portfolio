import { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionTemplate } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, GraduationCap, Briefcase, Award, MapPin, RocketIcon } from 'lucide-react';
import PageTransition from '../components/pageTransition';
import photo from '../assets/photo.png';
import cvFile from '../assets/NooraWaelCV.pdf';
import { useCursor } from '../context/CursorContext';
import { usePageTransition } from '../context/TransitionContext';

type EduItem = {
  year: string;
  degree: string;
  school: string;
  description: string;
};

type ExpItem = {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/**
 * Smooth stacked scrollytelling with end-hold.
 */
function Slide<T>({
  item,
  index,
  len,
  progress,
  render,
  endHoldStart,
}: {
  item: T;
  index: number;
  len: number;
  progress: MotionValue<number>;
  render: (item: T) => React.ReactNode;
  endHoldStart: number;
}) {
  const denom = len - 1 || 1;
  const overlap = index === 0 ? 0.95 : index === len - 1 ? 0.88 : 0.75;
  const gapAfterFirst = index === 1 ? 0.08 : 0;

  const start = (index - overlap) / denom + gapAfterFirst;
  const mid = index / denom + gapAfterFirst;
  const end = (index + overlap) / denom + gapAfterFirst;

  const p = useTransform(progress, [0, endHoldStart, 1], [0, 1, 1]);
  const smoothP = useSpring(p, { stiffness: 140, damping: 26, mass: 0.7 });

  const isLast = index === len - 1;
  let safeStart = clamp01(start);
  let safeMid = clamp01(mid);
  let safeEnd = clamp01(end);

  const MIN_SPREAD = 0.16;
  const EDGE_PAD = 0.07;

  safeStart = clamp01(safeStart - EDGE_PAD);
  safeEnd = clamp01(safeEnd + EDGE_PAD);

  if (safeMid - safeStart < MIN_SPREAD) safeMid = clamp01(safeStart + MIN_SPREAD);
  if (!isLast && safeEnd - safeMid < MIN_SPREAD) safeEnd = clamp01(safeMid + MIN_SPREAD);
  if (isLast) {
    safeMid = clamp01(Math.min(0.9, Math.max(safeStart + MIN_SPREAD, safeMid - EDGE_PAD)));
    if (safeEnd - safeMid < MIN_SPREAD) safeEnd = clamp01(safeMid + MIN_SPREAD);
  }

  const blurStrength = isLast ? 0.6 : 1.3;

  const opacityInput = isLast ? [safeStart, safeMid] : [safeStart, safeMid, safeEnd];
  const opacityOutput = isLast ? [0, 1] : [0, 1, 0];
  const opacity = useTransform(smoothP, opacityInput, opacityOutput);

  const yInput = isLast ? [safeStart, safeMid] : [safeStart, safeMid, safeEnd];
  const yOutput = isLast ? [14, 0] : [14, 0, -14];
  const y = useTransform(smoothP, yInput, yOutput);

  const scale = useTransform(smoothP, [safeStart, safeMid], [0.995, 1]);

  const blurInput = isLast ? [safeStart, safeMid] : [safeStart, safeMid, safeEnd];
  const blurOutput = isLast ? [blurStrength, 0] : [blurStrength, 0, blurStrength];
  const blur = useTransform(smoothP, blurInput, blurOutput);

  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div key={index} style={{ opacity, y, scale, filter }} className="absolute inset-0">
      {render(item)}
    </motion.div>
  );
}

function StackedSlides<T>({
  items,
  progress,
  render,
  endHoldStart = 0.85,
}: {
  items: T[];
  progress: MotionValue<number>;
  render: (item: T) => React.ReactNode;
  endHoldStart?: number;
}) {
  const len = Math.max(1, items.length);

  return (
    <div className="relative min-h-[440px] sm:min-h-[380px] md:min-h-[320px]">
      {items.map((item, i) => (
        <Slide key={i} item={item} index={i} len={len} progress={progress} render={render} endHoldStart={endHoldStart} />
      ))}
    </div>
  );
}

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const eduSectionRef = useRef<HTMLElement>(null);
  const expSectionRef = useRef<HTMLElement>(null);
  const eduCardRef = useRef<HTMLDivElement>(null);

  const { setVariant } = useCursor();
  const { trigger } = usePageTransition();

  const education: EduItem[] = useMemo(
    () => [
      {
        year: '2021 - 2025',
        degree: "Bachelor's in Information and Communication Technology - Programming Major",
        school: 'Bahrain Polytechnic',
        description:
          'Focused on understanding the basics of programming and software development, learnt many technologies and compentencies such as Java, C#, HTML, CSS, JavaScript and more. The experience also provided me with the soft skill set needed to start any production level code and work in teams.',
      },
      {
        year: '2023 - 2025',
        degree: 'Diploma in Full Stack Development',
        school: 'Reboot Coding Institute',
        description:
          'Worked on a variety of projects including deep system architecture, algorithms, web development. Currently in specialization for DevOps and Cloud Engineering, focusing on AWS and Azure. Along with Mobile Development using React Native and Expo.',
      },
      {
        year: '2025',
        degree: 'Professional Scrum Master Certification',
        school: 'Scrum.org',
        description:
          'A certification that validates my knowledge of Scrum and Agile methodologies, focusing on the principles and practices of Scrum while imporving my proffessional career path.',
      },
    ],
    []
  );

  const experience: ExpItem[] = useMemo(
    () => [
      {
        year: '2024 - 6 months',
        role: 'Web Development Intern',
        company: 'Raincode',
        location: 'Manama Bahrain, Stockholm Sweden',
        description:
          'Worked on a project that used WordPress to create a website for the client, worked on a team of 4 that taught me how to work in a team and how to use the Agile methodology. Implemented Scrum and Kanban to manage the project effectively. You can view the project on Raincode.tech and Raincode.bh',
      },
      {
        year: 'January 2025 - Present',
        role: 'Mobile development Team Lead',
        company: 'Raincode | Foremarket',
        location: 'Manama Bahrain, Stockholm Sweden',
        description:
          'Worked on implementing a mobile application for the client using React Native and Expo. The project is a mobile application that is a second hand marketplace for golf, people can buy exchange or sell their golf equipment. The project has been released and is on Swedish market and I am leading and working with 3 other developers to expand the project internationally into the Nordic and Americas.',
      },
    ],
    []
  );

  // overall progress + scrollY inside the container
  useScroll({
    container: scrollContainerRef,
    target: contentRef,
    offset: ['start start', 'end end'],
  });
  useScroll({ container: scrollContainerRef });

  // education/experience progress inside container
  const { scrollYProgress: eduProgressRaw } = useScroll({
    container: scrollContainerRef,
    target: eduSectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const { scrollYProgress: expProgressRaw } = useScroll({
    container: scrollContainerRef,
    target: expSectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const eduProgress = useSpring(eduProgressRaw, { stiffness: 70, damping: 28, mass: 0.6 });
  const expProgress = useSpring(expProgressRaw, { stiffness: 70, damping: 28, mass: 0.6 });

  const eduCardOpacity = useTransform(eduProgress, [0, 0.08, 1], [0, 1, 1]);
  const eduCardScale = useTransform(eduProgress, [0, 0.12, 1], [0.985, 1, 1]);

  const expCardOpacity = useTransform(expProgress, [0, 0.08, 1], [0, 1, 1]);
  const expCardScale = useTransform(expProgress, [0, 0.12, 1], [0.985, 1, 1]);

  // -------------------------
  // Intro GSAP
  // -------------------------
  useEffect(() => {
    const tl = gsap.timeline();
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
      );
    }
    return () => {
      tl.kill();
    };
  }, []);

  // section heights
  const SCROLL_PER_ITEM = 110;
  const eduHeight = `${Math.max(1, education.length) * SCROLL_PER_ITEM}vh`;
  const expHeight = `${Math.max(1, experience.length) * SCROLL_PER_ITEM}vh`;

  return (
    <PageTransition>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e6e6e6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.03),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.05)_100%)] opacity-70" />

        {/* INNER SCROLL CONTAINER */}
        <div ref={scrollContainerRef} className="relative z-10 h-screen w-full overflow-y-auto">
          <div
            ref={contentRef}
            className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-24 space-y-20"
          >
            {/* TOP */}
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-400">
                  <div className="h-px w-10 bg-white/15" />
                  About Noora
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-white leading-[1.1] drop-shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
                  Calm builder of resilient systems and crafted experiences.
                </h1>

                <p className="text-lg text-gray-100 leading-relaxed">
                  I design, architect, and ship cross-platform products with a systems-first mindset.
                  From mobile to 3D interactions, I care about deliberate experiences, reliable delivery,
                  and documentation that keeps teams aligned.
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                  <span className="px-3 py-2 rounded-full border border-white/10 bg-white/5">
                    React Native & Expo
                  </span>
                  <span className="px-3 py-2 rounded-full border border-white/10 bg-white/5">
                    Three.js & Storytelling
                  </span>
                  <span className="px-3 py-2 rounded-full border border-white/10 bg-white/5">
                    Systems & DevOps
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
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

                  <motion.button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = cvFile;
                      link.download = 'Noora_Qasim_CV.pdf';
                      link.click();
                    }}
                    onMouseEnter={() => setVariant('link')}
                    onMouseLeave={() => setVariant('default')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-full border border-white/10 text-gray-200 font-semibold tracking-wide bg-white/5 hover:bg-white/10 transition-all"
                  >
                    Download CV
                  </motion.button>
                </div>
              </div>

              {/* PHOTO CARD (measured) */}
              <div className="relative w-full aspect-square">
                <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-white/0 blur-3xl opacity-50" />
                <div className="relative w-full h-full rounded-[24px] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/0 overflow-hidden">
                  <img
                    src={photo}
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover object-center filter grayscale brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent" />
                </div>
              </div>
            </div>

            {/* SCROLLYTELLING */}
            <div className="space-y-24">
              {/* EDUCATION */}
              <section ref={eduSectionRef} className="relative" style={{ height: eduHeight }}>
                <div className="sticky top-32 space-y-4">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-gray-400">
                    <div className="h-px w-6 bg-white/10" />
                    Educational Journey
                  </div>

                  <motion.div
                    ref={eduCardRef}
                    style={{ opacity: eduCardOpacity, scale: eduCardScale }}
                    className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/80 p-6"
                  >
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

                    <StackedSlides
                      items={education}
                      progress={eduProgress}
                      endHoldStart={0.85}
                      render={(item) => (
                        <div className="pl-8 space-y-3 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-200">
                            <Calendar className="w-4 h-4" />
                            <span>{item.year}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-100">
                            <GraduationCap className="w-5 h-5" />
                            <h3 className="text-xl font-semibold">{item.degree}</h3>
                          </div>

                          <p className="text-sm text-gray-200">{item.school}</p>
                          <p className="text-sm text-gray-100 leading-relaxed">{item.description}</p>
                        </div>
                      )}
                    />
                  </motion.div>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section ref={expSectionRef} className="relative" style={{ height: expHeight }}>
                <div className="sticky top-32 space-y-4">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-gray-400">
                    <div className="h-px w-6 bg-white/10" />
                    Professional Journey
                  </div>

                  <motion.div
                    style={{ opacity: expCardOpacity, scale: expCardScale }}
                    className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/80 p-6"
                  >
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

                    <StackedSlides
                      items={experience}
                      progress={expProgress}
                      endHoldStart={0.85}
                      render={(item) => (
                        <div className="pl-8 space-y-3 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-200">
                            <Calendar className="w-4 h-4" />
                            <span>{item.year}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-100">
                            <Briefcase className="w-5 h-5" />
                            <h3 className="text-xl font-semibold">{item.role}</h3>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-200">
                            <Award className="w-4 h-4" />
                            <span>{item.company}</span>
                            <MapPin className="w-4 h-4 ml-1" />
                            <span>{item.location}</span>
                          </div>

                          <p className="text-sm text-gray-100 leading-relaxed">{item.description}</p>
                        </div>
                      )}
                    />
                  </motion.div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
