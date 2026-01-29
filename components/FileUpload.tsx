'use client';

import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function FileUpload({ onFileUpload, isAnalyzing }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full" id="upload">
      <div
        className={`card relative transition-all duration-300 ${
          dragActive ? 'border-primary-500 bg-primary-50/50 scale-[1.02]' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx,.txt"
          onChange={handleChange}
          disabled={isAnalyzing}
        />

        <div className="text-center space-y-6 py-12">
          {/* Upload Icon */}
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 
                           flex items-center justify-center transition-transform duration-300
                           ${dragActive ? 'scale-110' : ''}`}>
              <Upload className={`w-10 h-10 text-primary-600 ${dragActive ? 'animate-bounce' : ''}`} />
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedFile ? selectedFile.name : 'Upload Your Document'}
            </h3>
            <p className="text-gray-600">
              {selectedFile 
                ? `${(selectedFile.size / 1024).toFixed(2)} KB • Ready to analyze`
                : 'Drag and drop your file here, or click to browse'}
            </p>
          </div>

          {/* File Info Alert */}
          <div className="max-w-md mx-auto glass-dark rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-left text-gray-300">
                <p className="font-semibold text-blue-300 mb-1">Supported Formats:</p>
                <p>PDF, DOCX, TXT (Max 10MB)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            {!selectedFile ? (
              <button
                onClick={handleButtonClick}
                disabled={isAnalyzing}
                className="btn-primary"
              >
                <FileText className="w-5 h-5 mr-2 inline" />
                Choose File
              </button>
            ) : (
              <>
                <button
                  onClick={handleButtonClick}
                  disabled={isAnalyzing}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 font-semibold
                           hover:border-primary-500 hover:bg-primary-50 
                           transition-all duration-200 active:scale-95"
                >
                  Change File
                </button>
                <button
                  onClick={handleUploadClick}
                  disabled={isAnalyzing}
                  className="btn-primary relative"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2 inline" />
                      Analyze Document
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '🎯', title: 'Accurate Detection', desc: '92%+ accuracy rate' },
          { icon: '⚡', title: 'Lightning Fast', desc: 'Results in seconds' },
          { icon: '🔒', title: 'Private & Secure', desc: 'Your data, your privacy' }
        ].map((feature, index) => (
          <div 
            key={index}
            className="glass rounded-xl p-4 text-center animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const Zap = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
