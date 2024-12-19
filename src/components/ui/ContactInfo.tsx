import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@example.com',
    link: 'mailto:contact@example.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    link: null
  }
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="prose prose-invert">
        <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
        <p className="text-gray-400">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out through any of the following channels.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="p-3 bg-gray-700 rounded-lg">
              <detail.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-300">{detail.label}</h4>
              {detail.link ? (
                <a 
                  href={detail.link}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-gray-400">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}