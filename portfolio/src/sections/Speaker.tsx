import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/pageTransition";
import {
  Sparkles,
  Mic2,
  Handshake,
  Users,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

const experienceHighlights = [
  {
    title: "Dream Big Bahrain – “Speak Up”",
    description:
      "Guided students through the art of persuasion with live coaching on reading the room, adapting tone, and communicating with intention.",
    takeaway: "Youth-driven storytelling and confidence workshop.",
    image: "/speakup.jpeg",
    alt: "Students collaborating during a public speaking session.",
  },
  {
    title: "Zain Bahrain – AI Hackathon Facilitator",
    description:
      "Designed sprints, nurtured collaboration, and kept the momentum high as teams built AI-driven business solutions.",
    takeaway: "High-energy facilitation balancing creativity and execution.",
    image: "/zainAI.jpeg",
    alt: "Teams brainstorming during a corporate hackathon.",
  },
  {
    title: "Bahrain Polytechnic – Agile Workshop",
    description:
      "Returned to my alma mater to demystify Agile, proving complex ideas can feel simple, practical, and exciting.",
    takeaway: "Hands-on Agile session grounded in product experience.",
    image: "/agile.jpeg",
    alt: "Speaker leading a workshop in a university setting.",
  },
  {
    title: "Reboot x Polytechnic – Build Hackathon MC",
    description:
      "Kept first-time hackers motivated, connected with every team, and created a welcoming space for bold experimentation.",
    takeaway: "Dynamic MC presence blending empathy, humor, and momentum.",
    image: "/buildHackathon.jpeg",
    alt: "Event host engaging with participants from the stage.",
  },
];

const signatureApproach = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Adaptive Storytelling",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Room-First Facilitation",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Partnership Mindset",
  },
  {
    icon: <Mic2 className="w-6 h-6" />,
    title: "MC With Purpose",
  },
];

const trustedBy = [
  "Dream Big Bahrain",
  "Zain Bahrain",
  "Bahrain Polytechnic",
  "Reboot Coding Institute",
];

const Speaker = () => {
  const heroImage = "/speakingMain.jpeg";

  return (
    <PageTransition>
      <div className="flex min-h-screen w-full fixed inset-0 overflow-hidden">
        <div className="flex flex-col w-full bg-black overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center"
            >
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm uppercase tracking-wide w-fit">
                  <Mic2 className="w-4 h-4" /> Speaker & MC
                </span>
                <h1 className="text-5xl font-bold text-white">
                  The Voice Behind Energetic Tech Stories
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl">
                  I craft stages, workshops, and hackathons where people feel
                  seen, energized, and ready to take action. From youth
                  empowerment to agile leadership, my sessions turn complex ideas
                  into experiences that stick.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/projects">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                      Explore Work
                    </motion.button>
                  </Link>
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-xl font-semibold hover:bg-blue-500/10 transition-colors"
                    >
                      Contact Me
                    </motion.button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-6 pt-4 text-sm uppercase tracking-wider text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Keynotes
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    Workshops
                  </span>
                  <span className="flex items-center gap-2">
                    <Mic2 className="w-4 h-4 text-blue-400" />
                    MC Hosting
                  </span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-blue-500/20"
              >
                <img
                  src={heroImage}
                  alt="Noora facilitating a session."
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-blue-900/30" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur">
                  <p className="text-sm text-blue-300 uppercase tracking-widest">
                    Stage Presence
                  </p>
                  <p className="text-white font-semibold">
                    Toastmaster-trained speaker trusted by tech communities.
                  </p>
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
                <h2 className="text-3xl font-bold text-white">
                  Spotlight Moments
                </h2>
                <p className="text-gray-400 max-w-xl">
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
                    className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/70 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wide text-blue-300">
                        <Calendar className="w-4 h-4" />
                        Live Event
                      </div>
                    </div>
                    <div className="p-8 space-y-3">
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                        {item.takeaway}
                      </p>
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
                <h2 className="text-3xl font-bold text-white">
                  Signature Approach
                </h2>
                <p className="text-gray-400 max-w-xl">
                  The principles I bring to every stage and room.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {signatureApproach.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 text-center hover:border-blue-500/50 transition-all"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
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
              <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-purple-600/10 border border-blue-500/30 space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Ready to Amplify Your Next Event?
                </h2>
                <p className="text-gray-200">
                  Let’s tailor a keynote, workshop, or MC experience that hits
                  your objectives and leaves your audience energized.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+97338084876"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +973 3808 4876
                  </a>
                  <a
                    href="mailto:nooraqasimwork@gmail.com"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-blue-400 text-blue-400 font-semibold hover:bg-blue-500/10 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    nooraqasimwork@gmail.com
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-blue-300 font-semibold hover:text-blue-200"
                >
                  Discuss your brief <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-gray-800">
                <img
                  src="/aics203.jpeg"
                  alt="Facilitator engaging with a team while planning an event."
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-blue-900/20" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/60 backdrop-blur p-4">
                  <p className="text-sm text-blue-300 uppercase tracking-widest">
                    Collaborative Planning
                  </p>
                  <p className="text-white font-semibold">
                    From agenda design to on-stage delivery, I partner with
                    organizers every step of the way.
                  </p>
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
      </div>
    </PageTransition>
  );
};

export default Speaker;
