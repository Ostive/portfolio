import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

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
        reply_to: formData.email // Reply to the sender
      };

      // Use send method with explicit parameters
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out for collaboration, opportunities, or just to say hello
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className="text-lg hover:text-indigo-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Subject" 
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
                <textarea 
                  rows={4} 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message" 
                  className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" 
                />
              </div>
              
              {submitStatus && (
                <div className={`p-3 rounded-md ${submitStatus.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="button-primary w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} 
                {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}