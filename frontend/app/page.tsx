'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import AnalysisResults from '@/components/AnalysisResults';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Call the actual backend API
      const { analyzeDocument } = await import('@/lib/api');
      const analysisResult = await analyzeDocument(file);
      
      setAnalysisData(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze document. Please ensure the backend server is running on http://localhost:8000');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {!analysisData ? (
          <>
            <Hero />
            
            <section className="py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 animate-slide-up">
                  <h2 className="text-4xl font-bold mb-4 text-gradient">
                    Upload Your Document
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Upload any document and get instant AI content analysis
                  </p>
                </div>
                
                <FileUpload 
                  onFileUpload={handleFileUpload} 
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </section>

            <Features />
          </>
        ) : (
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <AnalysisResults 
                data={analysisData} 
                onReset={handleReset}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
