# 🚀 Quick Start Guide - AI Content Analyzer

## Overview
This guide will help you get the AI Content Analyzer platform up and running on your local machine.

## Prerequisites

### Required Software
- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

### Check Installations
```bash
python --version
node --version
npm --version
```

---

## 🔧 Setup Instructions

### Step 1: Backend Setup (Python FastAPI)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # Activate on Windows:
   venv\Scripts\activate
   
   # Activate on macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**
   ```bash
   python main.py
   ```
   
   The backend will be available at: `http://localhost:8000`
   
   Check API documentation at: `http://localhost:8000/docs`

---

### Step 2: Frontend Setup (Next.js)

1. **Open a new terminal** (keep backend running)

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter errors, try:
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at: `http://localhost:3000`

---

## 🎯 Usage

1. Open your browser and go to `http://localhost:3000`
2. Upload a document (PDF, DOCX, or TXT)
3. Wait for the analysis to complete
4. View the results with:
   - AI vs Human percentage breakdown
   - Color-coded highlighted sections
   - Confidence scores
   - Detected AI model (if applicable)
   - Recommendations

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError`
**Solution**: Make sure you're in the virtual environment and all dependencies are installed
```bash
pip install -r requirements.txt
```

**Problem**: Port 8000 already in use
**Solution**: Change the port in `main.py` or kill the process using port 8000

### Frontend Issues

**Problem**: `npm install` fails
**Solution**: Try these alternatives:
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`, then reinstall
3. Use `npm install --legacy-peer-deps`
4. Use yarn instead: `yarn install`

**Problem**: Cannot connect to backend
**Solution**: 
1. Ensure backend is running on `http://localhost:8000`
2. Check CORS settings in `backend/main.py`
3. Look for error messages in browser console

### General Issues

**Problem**: Blank page or errors in browser
**Solution**:
1. Check browser console (F12) for error messages
2. Ensure both frontend and backend are running
3. Clear browser cache and reload

---

## 📁 Project Structure

```
AI-Powered Content Analysis & Source Detection Platform/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   │   ├── page.tsx        # Main page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── FileUpload.tsx
│   │   ├── AnalysisResults.tsx
│   │   ├── Features.tsx
│   │   └── Footer.tsx
│   ├── lib/                # Utilities
│   │   └── api.ts         # API client
│   └── package.json       # Dependencies
│
├── backend/                # Python FastAPI server
│   ├── main.py            # FastAPI app
│   ├── models/            # Pydantic models
│   ├── services/          # Business logic
│   │   ├── file_processor.py
│   │   └── ai_detector.py
│   └── requirements.txt   # Python dependencies
│
├── docs/                  # Documentation
└── README.md             # Project overview
```

---

## 🎨 Features

✅ **Multi-format Support** - PDF, DOCX, TXT
✅ **AI Detection** - Identify AI-generated content
✅ **Visual Highlighting** - Color-coded sections
✅ **Detailed Analytics** - Percentages, confidence scores
✅ **Model Detection** - Identify likely AI model used
✅ **Recommendations** - Actionable insights
✅ **Export Reports** - Download analysis results
✅ **Responsive Design** - Works on all devices

---

## 🔜 Next Steps

### For Development
- Integrate actual AI/ML models (RoBERTa, GPT-2 Detector)
- Add user authentication
- Implement database for history
- Add batch processing
- Support more file formats

### For Production
- Deploy backend to cloud (AWS, GCP, Azure)
- Deploy frontend to Vercel/Netlify
- Add CDN for static assets
- Implement caching and optimization
- Add monitoring and analytics

---

## 📞 Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review error messages carefully
3. Check browser console and terminal output
4. Ensure all prerequisites are installed

---

## 📄 License
MIT License - feel free to use and modify for your needs

---

**Built with ❤️ using Next.js, React, Python, FastAPI, and Advanced AI/NLP**
