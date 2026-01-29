# Backend - AI Content Analyzer

## Setup

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the Server
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check
```
GET /health
```

### Analyze Document
```
POST /api/analyze
Content-Type: multipart/form-data

Body: file (PDF, DOCX, or TXT)
```

Response:
```json
{
  "filename": "document.pdf",
  "totalWords": 1247,
  "aiPercentage": 45.2,
  "humanPercentage": 54.8,
  "confidence": 92.3,
  "sections": [...],
  "detectedModel": "GPT-based (likely GPT-3.5 or GPT-4)",
  "recommendations": [...]
}
```

### Analyze Text
```
POST /api/analyze-text
Content-Type: application/json

Body: {
  "text": "Your text content here..."
}
```

## Project Structure

```
backend/
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
├── models/             # Pydantic models
│   └── analysis_response.py
├── services/           # Business logic
│   ├── file_processor.py
│   └── ai_detector.py
└── utils/              # Helper functions
```

## AI Detection Logic

The AI detector uses multiple techniques:

1. **Statistical Analysis**
   - Perplexity measurement
   - Burstiness analysis
   - Sentence length distribution

2. **Pattern Recognition**
   - Formal language markers
   - Transitional phrases
   - Passive voice usage

3. **Linguistic Markers**
   - Personal pronoun usage
   - Informal language
   - Sentence complexity

## Future Enhancements

- [ ] Integrate actual ML models (RoBERTa, GPT-2 Detector)
- [ ] Add support for more file formats
- [ ] Implement caching for faster repeat analyses
- [ ] Add batch processing capability
- [ ] Integrate plagiarism detection
- [ ] Support for multiple languages
- [ ] Real-time streaming analysis
- [ ] User authentication and rate limiting

## License
MIT
