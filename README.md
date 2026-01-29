# 🤖 AI-Powered Content Analysis & Source Detection Platform 🚀

## Overview
An advanced AI-powered platform that analyzes uploaded documents to detect AI-generated content, providing transparent insights into content authenticity and origin.

## ✨ Key Features

### Core Capabilities
- **Multi-format Support**: Upload PDF, DOCX, TXT files
- **AI Detection**: Identify AI-generated vs human-written content
- **Visual Highlighting**: Color-coded display of AI-generated sections
- **Detailed Analytics**: 
  - AI vs Human content ratio
  - Section-wise breakdown
  - Confidence scores
  - Source model detection (when possible)

### Advanced Features
- **Interactive Dashboard**: Real-time analysis visualization
- **Heatmap View**: Confidence scoring visualization
- **Export Reports**: PDF/CSV format
- **Multi-language Support**: Analyze content in various languages
- **API Integration**: RESTful API for third-party integrations

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14+ (React)
- **Styling**: Modern CSS with animations
- **UI/UX**: Premium, responsive design
- **Visualizations**: Interactive charts and heatmaps

### Backend
- **API**: Python FastAPI
- **AI/ML**: TensorFlow, PyTorch, Transformers
- **NLP**: spaCy, NLTK, Hugging Face models
- **File Processing**: PyPDF2, python-docx

### AI Models
- GPT-2 Output Detector
- RoBERTa-based classifiers
- Custom fine-tuned models
- Perplexity analysis

## 📁 Project Structure

```
├── frontend/           # Next.js application
│   ├── app/           # App router pages
│   ├── components/    # Reusable components
│   ├── lib/           # Utilities and helpers
│   └── public/        # Static assets
│
├── backend/           # Python FastAPI server
│   ├── api/          # API endpoints
│   ├── models/       # AI/ML models
│   ├── services/     # Business logic
│   └── utils/        # Helper functions
│
└── docs/             # Documentation
```

## 🚀 Getting Started

### ⚡ Quick Start (Windows - EASIEST!)

1. **Double-click** `START-APP.bat`
2. Wait for the browser to open
3. Start analyzing! 🎉

That's it! The script automatically:
- Sets up the backend
- Installs dependencies
- Starts the server
- Opens the standalone app in your browser

### 📝 Alternative: Manual Setup

If the quick start doesn't work, or you're on macOS/Linux:

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🎯 Target Users
- Educational institutions
- Students and researchers
- Content creators and writers
- Companies and HR teams
- Publishers and editors

## 📊 Use Cases
1. **Academic Integrity**: Detect AI-generated assignments
2. **Content Verification**: Verify originality of articles
3. **Quality Assurance**: Ensure authentic human-written content
4. **Research Analysis**: Study AI content patterns

## 🔒 Privacy & Security
- No data retention policy
- Secure file upload and processing
- GDPR compliant
- End-to-end encryption

## 📝 License
MIT License

## 🤝 Contributing
Contributions are welcome! Please read our contributing guidelines.

---
Built with ❤️ using AI, NLP, and Modern Web Technologies
