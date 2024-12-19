import React from 'react';
import { Send } from 'lucide-react';

export function ContactForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
          placeholder="Project Discussion"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
          placeholder="Your message..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full button-primary justify-center py-3"
      >
        Send Message <Send className="w-4 h-4 ml-2" />
      </button>
    </form>
  );
}