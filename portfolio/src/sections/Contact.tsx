import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import PageTransition from "../components/pageTransition";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Loader,
} from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState<"initial" | "sending" | "success" | "error">(
    "initial"
  );
  const [activeSection, setActiveSection] = useState<"form" | "success">(
    "form"
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // EmailJS credentials from environment variables (Vite format)
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Debug logging - remove this after it's working
  console.log('Environment check:', {
    SERVICE_ID: EMAILJS_SERVICE_ID ? '✓ Found' : '✗ Missing',
    TEMPLATE_ID: EMAILJS_TEMPLATE_ID ? '✓ Found' : '✗ Missing',
    PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? '✓ Found' : '✗ Missing'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Check if all required credentials are present
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS credentials:', {
        SERVICE_ID: !!EMAILJS_SERVICE_ID,
        TEMPLATE_ID: !!EMAILJS_TEMPLATE_ID,
        PUBLIC_KEY: !!EMAILJS_PUBLIC_KEY
      });
      setFormState("error");
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
      setFormState("success");
      setActiveSection("success");
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('FAILED...', error);
      setFormState("error");
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
      title: "Email",
      detail: "nooraqasimwork@gmail.com",
      link: "mailto:nooraqasimwork@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      detail: "+973 38084876",
      link: "tel:+97338084876",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      detail: "Manama, Bahrain",
      link: "https://maps.app.goo.gl/R6sFQkoc4MEM5sds6",
    },
  ];

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, url: "https://github.com/NooraWael" },
    { icon: <Linkedin className="w-6 h-6" />, url: "https://www.linkedin.com/in/nooraqasim" },
  ];

  return (
    <PageTransition>
      <div className="flex min-h-screen w-full fixed inset-0 overflow-hidden">
        <div className="flex flex-col w-full bg-black overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 mb-16"
            >
              <h1 className="text-5xl font-bold text-white mb-4">
                Get in Touch
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Have a project in mind? Let's work together to create something
                amazing.
              </p>
            </motion.div>

            {/* Debug info - remove this after testing */}
            {/* <div className="text-white bg-gray-800 p-4 rounded mb-4">
              <h3>Debug Info:</h3>
              <p>Service ID: {EMAILJS_SERVICE_ID || 'Not found'}</p>
              <p>Template ID: {EMAILJS_TEMPLATE_ID || 'Not found'}</p>
              <p>Public Key: {EMAILJS_PUBLIC_KEY || 'Not found'}</p>
            </div> */}

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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 
                        rounded-xl hover:shadow-xl transition-shadow group"
                    >
                      <div
                        className="p-4 bg-blue-500/10 rounded-lg text-blue-400 
                        group-hover:bg-blue-500 group-hover:text-white transition-all"
                      >
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-400">{info.detail}</p>
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 bg-gray-800 rounded-lg text-gray-400 
                          hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Contact Form Section */}
              <AnimatePresence mode="wait">
                {activeSection === "form" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8"
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-white mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                            text-white focus:outline-none focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                            text-white focus:outline-none focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                            text-white focus:outline-none focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      
                      {/* Error message */}
                      {formState === "error" && (
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
                        className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold
                          hover:bg-blue-700 transition-colors flex items-center justify-center gap-2
                          disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formState === "sending"}
                      >
                        {formState === "sending" ? (
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
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8
                      flex flex-col items-center justify-center text-center"
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
                        setFormState("initial");
                        setActiveSection("form");
                      }}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold
                        hover:bg-blue-700 transition-colors"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;