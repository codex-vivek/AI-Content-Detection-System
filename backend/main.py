from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from typing import List, Dict, Any
import os
from services.file_processor import FileProcessor
from services.ai_detector import AIDetector
from models.analysis_response import AnalysisResponse

app = FastAPI(
    title="AI Content Analyzer API",
    description="Advanced API for detecting and analyzing AI-generated content",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for the standalone dashboard to work locally
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
file_processor = FileProcessor()
ai_detector = AIDetector()

@app.get("/")
async def root():
    return {
        "message": "AI Content Analyzer API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "ai_model_loaded": ai_detector.is_model_loaded()
    }

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_document(file: UploadFile = File(...)):
    """
    Analyze an uploaded document for AI-generated content
    
    Accepts: PDF, DOCX, TXT files
    Returns: Detailed analysis including AI percentage, highlighted sections, and recommendations
    """
    try:
        # Validate file type
        allowed_extensions = ['.pdf', '.docx', '.txt']
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Read file content
        content = await file.read()
        
        # Process file and extract text
        text = await file_processor.extract_text(content, file_ext)
        
        if not text or len(text.strip()) < 10:
            raise HTTPException(
                status_code=400,
                detail="Document appears to be empty or too short to analyze"
            )
        
        # Perform AI content analysis
        analysis_result = await ai_detector.analyze(text)
        
        # Add filename to result
        analysis_result['filename'] = file.filename
        
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing document: {str(e)}"
        )

@app.post("/api/analyze-text")
async def analyze_text(data: Dict[str, str]):
    """
    Analyze raw text for AI-generated content
    
    Request body: {"text": "your text here"}
    """
    try:
        text = data.get("text", "")
        
        if not text or len(text.strip()) < 10:
            raise HTTPException(
                status_code=400,
                detail="Text is too short to analyze (minimum 10 characters)"
            )
        
        # Perform AI content analysis
        analysis_result = await ai_detector.analyze(text)
        analysis_result['filename'] = "Direct Text Input"
        
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing text: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
