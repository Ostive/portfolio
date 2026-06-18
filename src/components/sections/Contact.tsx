import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ostive.randrianomenjanahary@gmail.com',
    link: 'mailto:ostive.randrianomenjanahary@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+33 761 407 154',
    link: 'tel:+33761407154'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: '31670 Labège, France',
    link: null
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map form field names to state properties
    const fieldMapping: Record<string, string> = {
      'name': 'name',
      'email': 'email',
      'title': 'title',
      'message': 'message'
    };

    const stateKey = fieldMapping[name] || name;

    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.title || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all fields.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS credentials
      const serviceId = 'default_service';
      const templateId = 'template_1u0itn8';
      const publicKey = 'mSrvIezwZSAOV5SNy';

      // Prepare template parameters to match the template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        title: formData.title,
        message: formData.message,
        website: window.location.origin,
        yourName: 'Ostive Kevin',
        to_email: 'ostive.randrianomenjanahary@gmail.com', // Send a copy to your email
        reply_to: formData.email, // Reply to the sender
        // Make sure these keys exactly match what's expected in the template
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.title,
        message_content: formData.message
      };

      // First send an email to the site owner using the provided template
      await emailjs.send(serviceId, 'template_c6r0qb9', {
        to_name: 'Ostive Kevin',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.title,
        message: formData.message,
        to_email: 'ostive.randrianomenjanahary@gmail.com'
      }, publicKey);

      // Then send the confirmation email to the sender
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        title: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 font-mono"><span className="text-term-accent">## </span>Get in Touch</h2>
          <p className="text-term-muted max-w-2xl mx-auto">
            Feel free to reach out for collaboration, opportunities, or just to say hello
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-mono"><span className="text-term-accent">## </span>Contact Information</h3>
            <div className="space-y-6">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-11 h-11 border border-term-border rounded-sm flex items-center justify-center text-term-accent">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-term-muted font-mono">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className="text-lg hover:text-term-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="terminal-titlebar">
              <span className="terminal-dot bg-red-500/70" />
              <span className="terminal-dot bg-yellow-500/70" />
              <span className="terminal-dot bg-term-accent/70" />
              <span className="ml-2 text-xs font-mono text-term-muted">send_message.sh</span>
            </div>
            <div className="p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-term-bg border border-term-border rounded-sm font-mono text-sm focus:outline-none focus:border-term-accent transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-term-bg border border-term-border rounded-sm font-mono text-sm focus:outline-none focus:border-term-accent transition-colors"
                  />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-term-bg border border-term-border rounded-sm font-mono text-sm focus:outline-none focus:border-term-accent transition-colors"
                  />
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-term-bg border border-term-border rounded-sm font-mono text-sm focus:outline-none focus:border-term-accent transition-colors resize-none"
                  />
                </div>

                {submitStatus && (
                  <div className={`p-3 rounded-sm border font-mono text-sm ${submitStatus.success ? 'border-term-accent/40 text-term-accent' : 'border-red-500/40 text-red-400'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'sending...' : 'send_message'}
                  {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}