'use client';

import { Brain, Github, Mail, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Content Analyzer</h3>
                <p className="text-sm text-gray-400">Detect & Analyze AI Content</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Advanced AI-powered platform for detecting and analyzing AI-generated content. 
              Ensuring transparency and authenticity in the digital age.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 
                                                      flex items-center justify-center transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 
                                                       flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 
                                                        flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#features" className="hover:text-primary-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#upload" className="hover:text-primary-400 transition-colors">
                  Try Now
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Use Cases */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h4 className="font-bold text-lg mb-4 text-center">Perfect For</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '🎓 Educational Institutions',
              '✍️ Content Creators',
              '📰 Publishers',
              '🏢 Businesses',
              '🔍 Researchers',
              '👨‍💼 HR Teams'
            ].map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm
                         hover:bg-gray-700 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} AI Content Analyzer. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Mail className="w-4 h-4" />
            <a href="mailto:contact@aianalyzer.com" className="hover:text-primary-400 transition-colors">
              contact@aianalyzer.com
            </a>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Built with ❤️ using Next.js, React, Python, FastAPI, and Advanced AI/NLP
          </p>
        </div>
      </div>
    </footer>
  );
}
