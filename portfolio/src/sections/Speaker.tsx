import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/pageTransition';
import { useCursor } from '../context/CursorContext';
import {
  Sparkles,
  Mic2,
  Handshake,
  Users,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';

const experienceHighlights = [
  {
    title: 'Dream Big Bahrain – “Speak Up”',
    description:
      'Guided students through the art of persuasion with live coaching on reading the room, adapting tone, and communicating with intention.',
    takeaway: 'Youth-driven storytelling and confidence workshop.',
    image: '/speakup.jpeg',
    alt: 'Students collaborating during a public speaking session.',
  },
  {
    title: 'Zain Bahrain – AI Hackathon Facilitator',
    description:
      'Designed sprints, nurtured collaboration, and kept the momentum high as teams built AI-driven business solutions.',
    takeaway: 'High-energy facilitation balancing creativity and execution.',
    image: '/zainAI.jpeg',
    alt: 'Teams brainstorming during a corporate hackathon.',
  },
  {
    title: 'Bahrain Polytechnic – Agile Workshop',
    description:
      'Returned to my alma mater to demystify Agile, proving complex ideas can feel simple, practical, and exciting.',
    takeaway: 'Hands-on Agile session grounded in product experience.',
    image: '/agile.jpeg',
    alt: 'Speaker leading a workshop in a university setting.',
  },
  {
    title: 'Reboot x Polytechnic – Build Hackathon MC',
    description:
      'Kept first-time hackers motivated, connected with every team, and created a welcoming space for bold experimentation.',
    takeaway: 'Dynamic MC presence blending empathy, humor, and momentum.',
    image: '/buildHackathon.jpeg',
    alt: 'Event host engaging with participants from the stage.',
  },
];

const signatureApproach = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Adaptive Storytelling',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Room-First Facilitation',
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: 'Partnership Mindset',
  },
  {
    icon: <Mic2 className="w-6 h-6" />,
    title: 'MC With Purpose',
  },
];

// const trustedBy = [
//   "Dream Big Bahrain",
//   "Zain Bahrain",
//   "Bahrain Polytechnic",
//   "Reboot Coding Institute",
// ];

const Speaker = () => {
  const heroImage = '/speakingMain.jpeg';
  const { setVariant } = useCursor();

  return (
    <PageTransition>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e6e6e6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.06)_100%)] opacity-80" />
        <div className="absolute -right-32 top-24 h-72 w-72 bg-[#1d1d1d] blur-[120px] opacity-60" />
        <div className="absolute -left-28 bottom-10 h-80 w-80 bg-[#0b0b0b] blur-[140px] opacity-70" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-24 space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center"
            >
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-400">
                  <div className="h-px w-10 bg-white/15" />
                  Speaking & MC
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-white leading-[1.1] drop-shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
                  Calm energy on stage for teams, founders, and first-time builders.
                </h1>
                <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                  I shape keynotes, workshops, and hackathons where people feel seen, energized, and ready to act. From
                  youth empowerment to agile leadership, my sessions turn complex ideas into experiences that stick.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/projects" className="pointer-events-auto">
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: '0 20px 70px rgba(0, 0, 0, 0.45)' }}
                      whileTap={{ scale: 0.97 }}
                      onMouseEnter={() => setVariant('link')}
                      onMouseLeave={() => setVariant('default')}
                      className="group relative px-7 py-3 rounded-full border border-white/12 bg-gradient-to-b from-[#141414] to-[#090909] text-[#f7f7f7] font-semibold tracking-wide"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Mic2 className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        Explore Work
                      </span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
                    </motion.button>
                  </Link>
                  <Link to="/contact" className="pointer-events-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onMouseEnter={() => setVariant('link')}
                      onMouseLeave={() => setVariant('default')}
                      className="px-7 py-3 rounded-full border border-white/12 text-gray-200 font-semibold tracking-wide bg-white/5 hover:bg-white/10 transition-all"
                    >
                      Contact Me
                    </motion.button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-6 pt-4 text-sm uppercase tracking-wider text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-300" />
                    Keynotes
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-300" />
                    Workshops
                  </span>
                  <span className="flex items-center gap-2">
                    <Mic2 className="w-4 h-4 text-blue-300" />
                    MC Hosting
                  </span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/12 bg-black/70"
              >
                <img
                  src={heroImage}
                  alt="Noora facilitating a session."
                  className="absolute inset-0 h-full w-full object-cover object-center filter grayscale brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur border border-white/10">
                  <p className="text-sm text-blue-200 uppercase tracking-[0.2em]">Stage Presence</p>
                  <p className="text-white font-semibold">Toastmaster-trained speaker trusted by tech communities.</p>
                </div>
              </motion.div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2 className="text-3xl font-semibold font-serif text-white">Spotlight Moments</h2>
                <p className="text-gray-300 max-w-xl">
                  Moments that shaped my voice and the communities I serve.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {experienceHighlights.map((item) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/70 hover:border-white/25 transition-colors"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="absolute inset-0 h-full w-full object-cover filter grayscale brightness-85"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-1 text-xs uppercase tracking-[0.16em] text-blue-200 border border-white/10">
                        <Calendar className="w-4 h-4" />
                        Live Event
                      </div>
                    </div>
                    <div className="p-8 space-y-3">
                      <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-200 leading-relaxed">{item.description}</p>
                      <p className="text-sm font-semibold text-blue-200 uppercase tracking-[0.18em]">{item.takeaway}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-semibold font-serif text-white">Signature Approach</h2>
                <p className="text-gray-300 max-w-xl">The principles I bring to every stage and room.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {signatureApproach.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-white/12 bg-black/70 p-6 text-center hover:border-white/25 transition-all"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-blue-200 border border-white/10">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
            >
              <div className="p-10 rounded-3xl bg-gradient-to-br from-white/8 via-white/4 to-transparent border border-white/12 space-y-6">
                <h2 className="text-3xl font-semibold font-serif text-white">Ready to Amplify Your Next Event?</h2>
                <p className="text-gray-200">
                  Let’s tailor a keynote, workshop, or MC experience that hits your objectives and leaves your audience
                  energized.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+97338084876"
                    onMouseEnter={() => setVariant('link')}
                    onMouseLeave={() => setVariant('default')}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/12 bg-gradient-to-b from-[#141414] to-[#090909] text-white font-semibold hover:border-white/25 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +973 3808 4876
                  </a>
                  <a
                    href="mailto:nooraqasimwork@gmail.com"
                    onMouseEnter={() => setVariant('link')}
                    onMouseLeave={() => setVariant('default')}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/12 text-gray-200 font-semibold hover:bg-white/10 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    nooraqasimwork@gmail.com
                  </a>
                </div>
                <Link
                  to="/contact"
                  onMouseEnter={() => setVariant('link')}
                  onMouseLeave={() => setVariant('default')}
                  className="inline-flex items-center gap-2 text-blue-200 font-semibold hover:text-blue-100"
                >
                  Discuss your brief <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/12 bg-black/70">
                <img
                  src="/aics203.jpeg"
                  alt="Facilitator engaging with a team while planning an event."
                  className="absolute inset-0 h-full w-full object-cover filter grayscale brightness-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/35 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/60 backdrop-blur p-4 border border-white/10">
                  <p className="text-sm text-blue-200 uppercase tracking-[0.18em]">
                    Collaborative Planning
                  </p>
                  <p className="text-white font-semibold">From agenda design to on-stage delivery, I partner with organizers every step of the way.</p>
                </div>
              </div>
            </motion.section>

            {/* <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-gray-900/70 border border-gray-800"
            >
              <h3 className="text-gray-200 uppercase tracking-widest text-sm mb-4">
                Trusted By
              </h3>
              <div className="flex flex-wrap gap-4">
                {trustedBy.map((name) => (
                  <span
                    key={name}
                    className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 text-sm font-semibold"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.section> */}
          </div>
        </div>
    </PageTransition>
  );
};

export default Speaker;
