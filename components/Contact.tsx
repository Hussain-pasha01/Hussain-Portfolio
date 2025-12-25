import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { Mail, Phone, Send, CheckCircle, Loader2, AlertCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * EMAILJS CONFIGURATION
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a Service and a Template.
 * 3. Replace the placeholders below with your actual keys.
 */
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_4ybw2ka', // e.g., 'service_abc123'
  TEMPLATE_ID: 'template_a1nikrv', // e.g., 'template_xyz456'
  PUBLIC_KEY: 'a-2LmZBc3tZcfuF2I', // e.g., 'user_7890qwerty'
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check if keys are set
    if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
      setStatus('error');
      setErrorMessage('EmailJS is not configured. Please add your keys in Contact.tsx.');
      return;
    }

    setStatus('submitting');
    
    const payload = {
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: EMAILJS_CONFIG.TEMPLATE_ID,
      user_id: EMAILJS_CONFIG.PUBLIC_KEY,
      template_params: {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Shaik RunHussain Pasha',
      },
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to send message');
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact via phone.');
    }
  };

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[60px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400">Have a question or want to work together?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="text-slate-400 leading-relaxed">
              I am currently available for freelance work or full-time opportunities. 
              I look forward to discussing how my skills and experience can contribute to your next professional venture.
            </p>

            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg text-primary border border-primary/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Phone</h4>
                  <a href="tel:9848595811" className="text-slate-400 hover:text-white transition-colors">
                    +91 9848595811
                  </a>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg text-secondary border border-secondary/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Email</h4>
                  <a href="mailto:skrhp01@gmail.com" className="text-slate-400 hover:text-white transition-colors break-all">
                    skrhp01@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent rounded-tr-2xl"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2 mb-4"
                  >
                    <XCircle size={18} />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:ring-2 outline-none text-white transition-all placeholder:text-slate-600 disabled:opacity-50 ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-700/50 focus:ring-primary focus:border-transparent'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:ring-2 outline-none text-white transition-all placeholder:text-slate-600 disabled:opacity-50 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-700/50 focus:ring-secondary focus:border-transparent'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg focus:ring-2 outline-none text-white transition-all resize-none placeholder:text-slate-600 disabled:opacity-50 ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-700/50 focus:ring-accent focus:border-transparent'
                  }`}
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 bg-[length:200%_200%] animate-gradient-x'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Sending Message...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={20} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;