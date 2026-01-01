import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import PageTransition from '../components/pageTransition';
import { useCursor } from '../context/CursorContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  Loader,
} from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState<'initial' | 'sending' | 'success' | 'error'>(
    'initial'
  );
  const [activeSection, setActiveSection] = useState<'form' | 'success'>(
    'form'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { setVariant } = useCursor();

  // EmailJS credentials from environment variables (Vite format)
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    // Check if all required credentials are present
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS credentials:', {
        SERVICE_ID: !!EMAILJS_SERVICE_ID,
        TEMPLATE_ID: !!EMAILJS_TEMPLATE_ID,
        PUBLIC_KEY: !!EMAILJS_PUBLIC_KEY
      });
      setFormState('error');
      return;
    }

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      console.log('SUCCESS!', result.text);
      setFormState('success');
      setActiveSection('success');
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('FAILED...', error);
      setFormState('error');
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      detail: 'nooraqasimwork@gmail.com',
      link: 'mailto:nooraqasimwork@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      detail: '+973 38084876',
      link: 'tel:+97338084876',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      detail: 'Manama, Bahrain',
      link: 'https://maps.app.goo.gl/R6sFQkoc4MEM5sds6',
    },
  ];

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, url: 'https://github.com/NooraWael' },
    { icon: <Linkedin className="w-6 h-6" />, url: 'https://www.linkedin.com/in/nooraqasim' },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e6e6e6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.06)_100%)] opacity-80" />
        <div className="absolute -right-28 top-20 h-72 w-72 bg-[#1d1d1d] blur-[120px] opacity-60" />
        <div className="absolute -left-24 bottom-12 h-80 w-80 bg-[#0b0b0b] blur-[140px] opacity-70" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-24 space-y-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-400">
              <div className="h-px w-10 bg-white/15" />
              Contact
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-serif text-white leading-[1.1] drop-shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
                Let’s build the next calm, resilient thing.
              </h1>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setVariant('link')}
                    onMouseLeave={() => setVariant('default')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-2xl border border-white/12 bg-black/70 hover:border-white/25 transition-colors group backdrop-blur-sm"
                  >
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-blue-200 group-hover:border-white/25 transition-all">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      <p className="text-gray-300">{info.detail}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-white font-semibold mb-4">Find me on</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onMouseEnter={() => setVariant('link')}
                      onMouseLeave={() => setVariant('default')}
                      className="p-4 rounded-xl border border-white/12 bg-white/5 text-gray-200 hover:border-white/25 transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form Section */}
            <AnimatePresence mode="wait">
                {activeSection === 'form' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl border border-white/12 bg-black/70 p-8 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-white mb-2 text-sm uppercase tracking-[0.12em]">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2 text-sm uppercase tracking-[0.12em]">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2 text-sm uppercase tracking-[0.12em]">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-500"
                          required
                        />
                      </div>
                      
                      {/* Error message */}
                      {formState === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                        >
                          <p className="text-red-400 text-sm">
                            Failed to send message. Please check your configuration or contact me directly.
                          </p>
                        </motion.div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-full border border-white/12 bg-gradient-to-b from-[#141414] to-[#090909] text-white font-semibold hover:border-white/25 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formState === 'sending'}
                        onMouseEnter={() => setVariant('link')}
                        onMouseLeave={() => setVariant('default')}
                      >
                        {formState === 'sending' ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl border border-white/12 bg-black/70 p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-green-500 mb-6"
                    >
                      <CheckCircle className="w-16 h-16" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 mb-8">
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFormState('initial');
                        setActiveSection('form');
                      }}
                      onMouseEnter={() => setVariant('link')}
                      onMouseLeave={() => setVariant('default')}
                      className="px-8 py-3 rounded-full border border-white/12 bg-gradient-to-b from-[#141414] to-[#090909] text-white font-semibold hover:border-white/25 transition-colors"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
