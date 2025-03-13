import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Link } from '../ui/Link';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'Ostiverandrianomenjanahary@gmail.com',
    link: 'mailto:Ostiverandrianomenjanahary@gmail.com'
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
              <Link href="#" className="button-primary w-full flex items-center justify-center">
                Send Message <Send className="w-4 h-4 ml-2" />
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}