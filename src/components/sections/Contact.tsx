import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Link } from '../ui/Link';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'Ostivekevin@gmail.com',
    link: 'mailto:Ostivekevin@gmail.com'
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
    value: '395 Rue du Colombier, 31670 Labège, France',
    link: null
  }
];

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Interested in collaboration or want to discuss opportunities? I'd love to hear from you.
          </p>
          <Link 
            href="mailto:Ostivekevin@gmail.com" 
            className="button-primary inline-flex"
          >
            Let's Talk <Send className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {contactDetails.map((detail, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-4 bg-gray-700 rounded-full mb-4">
                <detail.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">{detail.label}</h3>
              {detail.link ? (
                <Link 
                  href={detail.link}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {detail.value}
                </Link>
              ) : (
                <p className="text-gray-400">{detail.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}