'use client';

import { useState } from 'react';
import { 
  Brain, 
  User, 
  BarChart3, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

interface Section {
  id: number;
  text: string;
  type: 'ai' | 'human';
  confidence: number;
  startIndex: number;
  endIndex: number;
}

interface AnalysisData {
  filename: string;
  totalWords: number;
  aiPercentage: number;
  humanPercentage: number;
  confidence: number;
  sections: Section[];
  detectedModel?: string;
  recommendations?: string[];
}

interface AnalysisResultsProps {
  data: AnalysisData;
  onReset: () => void;
}

export default function AnalysisResults({ data, onReset }: AnalysisResultsProps) {
  const [showFullText, setShowFullText] = useState(true);
  const [highlightMode, setHighlightMode] = useState<'all' | 'ai' | 'human'>('all');

  const handleExport = () => {
    const reportContent = `
AI Content Analysis Report
==========================

File: ${data.filename}
Total Words: ${data.totalWords}
AI-Generated Content: ${data.aiPercentage}%
Human-Written Content: ${data.humanPercentage}%
Overall Confidence: ${data.confidence}%
${data.detectedModel ? `Detected Model: ${data.detectedModel}` : ''}

Section Analysis:
${data.sections.map((section, i) => `
Section ${i + 1} (${section.type.toUpperCase()})
Confidence: ${section.confidence}%
Text: ${section.text}
`).join('\n')}

${data.recommendations ? `
Recommendations:
${data.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
` : ''}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSections = data.sections.filter(section => {
    if (highlightMode === 'all') return true;
    return section.type === highlightMode;
  });

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h2>
          <p className="text-gray-600 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            {data.filename}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl border-2 border-gray-300 font-semibold
                     hover:border-primary-500 hover:bg-primary-50 
                     transition-all duration-200 active:scale-95 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button
            onClick={onReset}
            className="btn-primary flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Analysis
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stats-card animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-light to-ai-dark 
                         mx-auto mb-3 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="stats-number text-ai">{data.aiPercentage}%</div>
          <div className="stats-label">AI Generated</div>
        </div>

        <div className="stats-card animate-slide-up animation-delay-200">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-human-light to-human-dark 
                         mx-auto mb-3 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="stats-number text-human">{data.humanPercentage}%</div>
          <div className="stats-label">Human Written</div>
        </div>

        <div className="stats-card animate-slide-up animation-delay-400">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 
                         mx-auto mb-3 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="stats-number">{data.confidence}%</div>
          <div className="stats-label">Confidence</div>
        </div>

        <div className="stats-card animate-slide-up animation-delay-600">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 
                         mx-auto mb-3 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="stats-number">{data.totalWords}</div>
          <div className="stats-label">Total Words</div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
          Content Distribution
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-ai">AI-Generated</span>
              <span className="text-sm font-bold text-ai">{data.aiPercentage}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-ai-light to-ai-dark transition-all duration-1000 ease-out"
                style={{ width: `${data.aiPercentage}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-human">Human-Written</span>
              <span className="text-sm font-bold text-human">{data.humanPercentage}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-human-light to-human-dark transition-all duration-1000 ease-out"
                style={{ width: `${data.humanPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detected Model Info */}
      {data.detectedModel && (
        <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-start space-x-3">
            <Brain className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-purple-900 mb-1">Detected AI Model</h4>
              <p className="text-purple-700">{data.detectedModel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Highlighted Text View */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h3 className="text-xl font-bold flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary-600" />
            Content Analysis
          </h3>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setHighlightMode('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                highlightMode === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setHighlightMode('ai')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                highlightMode === 'ai'
                  ? 'bg-ai text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              AI Only
            </button>
            <button
              onClick={() => setHighlightMode('human')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                highlightMode === 'human'
                  ? 'bg-human text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Human Only
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-ai-light border-2 border-ai" />
            <span className="text-sm font-medium">AI-Generated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-human-light border-2 border-human" />
            <span className="text-sm font-medium">Human-Written</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                section.type === 'ai'
                  ? 'bg-ai-light/10 border-ai-light hover:bg-ai-light/20'
                  : 'bg-human-light/10 border-human-light hover:bg-human-light/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {section.type === 'ai' ? (
                    <Brain className="w-5 h-5 text-ai" />
                  ) : (
                    <User className="w-5 h-5 text-human" />
                  )}
                  <span className={`font-bold ${
                    section.type === 'ai' ? 'text-ai' : 'text-human'
                  }`}>
                    {section.type === 'ai' ? 'AI-Generated' : 'Human-Written'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className={`font-bold ${
                    section.type === 'ai' ? 'text-ai' : 'text-human'
                  }`}>
                    {section.confidence}%
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <h3 className="text-xl font-bold mb-4 flex items-center text-amber-900">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-amber-900">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
