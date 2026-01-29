'use client';

import { 
  Sparkles, 
  Target, 
  Globe, 
  Download, 
  Zap, 
  Shield,
  BarChart,
  FileSearch
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Precise Detection',
    description: 'Advanced AI models with 92%+ accuracy in detecting AI-generated content across multiple sources.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BarChart,
    title: 'Detailed Analytics',
    description: 'Get comprehensive breakdowns of AI vs human content ratios, confidence scores, and section-wise analysis.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FileSearch,
    title: 'Visual Highlighting',
    description: 'Color-coded visualization makes it easy to identify AI-generated sections at a glance.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Sparkles,
    title: 'Model Detection',
    description: 'Identify the likely AI model used (GPT, Claude, etc.) when generating the content.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Analyze content in multiple languages with equal accuracy and precision.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Download,
    title: 'Export Reports',
    description: 'Download detailed analysis reports in PDF or CSV format for documentation and sharing.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get results in seconds, not minutes. Our optimized pipeline ensures rapid analysis.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your documents are processed securely and never stored. Complete privacy guaranteed.',
    color: 'from-teal-500 to-cyan-500'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Verify Content</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with intuitive design 
            to give you complete transparency into content authenticity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card group hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} 
                               flex items-center justify-center mb-4 
                               group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and accurate in just 3 steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Document',
                description: 'Upload your PDF, DOCX, or TXT file. We support documents up to 10MB.',
                icon: '📄'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI models analyze your content using NLP and machine learning.',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'View detailed results with visual highlighting and download comprehensive reports.',
                icon: '📊'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="card text-center group hover:scale-105 animate-slide-up"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-primary-600 mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
