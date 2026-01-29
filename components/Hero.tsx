'use client';

import { Sparkles, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600">
              Powered by Advanced AI & NLP
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Detect</span>
            <br />
            <span className="text-gradient">AI-Generated Content</span>
            <br />
            <span className="text-gray-900">with Precision</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload any document and receive detailed insights into content authenticity, 
            AI usage percentage, and source detection—all in real-time.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <a 
              href="#upload"
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <span>Start Analyzing</span>
              <Zap className="w-5 h-5" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>100% Private & Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <span>Advanced AI Detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-accent-600" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
