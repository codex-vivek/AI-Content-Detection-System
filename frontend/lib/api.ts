import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

export interface AnalysisResult {
  filename: string;
  totalWords: number;
  aiPercentage: number;
  humanPercentage: number;
  confidence: number;
  sections: Section[];
  detectedModel?: string;
  recommendations?: string[];
}

export interface Section {
  id: number;
  text: string;
  type: 'ai' | 'human';
  confidence: number;
  startIndex: number;
  endIndex: number;
}

export const analyzeDocument = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<AnalysisResult>('/api/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  const response = await apiClient.post<AnalysisResult>('/api/analyze-text', {
    text,
  });

  return response.data;
};

export const checkHealth = async (): Promise<{ status: string; ai_model_loaded: boolean }> => {
  const response = await apiClient.get('/health');
  return response.data;
};
