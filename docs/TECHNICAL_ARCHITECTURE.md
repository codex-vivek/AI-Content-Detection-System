# 🎓 Technical Architecture & Implementation Guide

## System Architecture

### High-Level Overview

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│   Frontend      │ ◄─────► │   Backend API    │ ◄─────► │   AI Models     │
│   (Next.js)     │  HTTP   │   (FastAPI)      │         │   (Detection)   │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

### Technology Stack Details

#### Frontend Layer
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: TailwindCSS with custom design system
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion (optional)

#### Backend Layer
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn (ASGI server)
- **File Processing**:
  - PDF: PyPDF2
  - DOCX: python-docx
  - TXT: Native Python
- **AI/ML**: 
  - Current: Heuristic-based detection
  - Future: Transformers, PyTorch, TensorFlow
- **Data Validation**: Pydantic

## AI Detection Algorithm

### Current Implementation

The current AI detector uses a **heuristic-based approach** combining multiple linguistic and statistical markers:

#### 1. Linguistic Markers

**AI-Generated Indicators (+score)**:
- Formal transitional words (furthermore, moreover, consequently, etc.)
- Passive voice constructions
- Lack of contractions
- Optimal sentence length (15-25 words)
- Consistent sentence structure

**Human-Written Indicators (-score)**:
- Personal pronouns (I, my, mine)
- Informal language (really, pretty, stuff)
- Questions and exclamations
- Shorter, varied sentence lengths
- Contractions (don't, can't, won't)

#### 2. Scoring System

```python
Base Score: 50

AI Indicators:
+ Formal words: +5 each
+ Optimal length: +10
+ Passive voice: +8
+ No contractions: +7
+ Transitions: +6 each

Human Indicators:
- Personal pronouns: -8 each
- Informal words: -7 each
- Questions/exclamations: -10
- Short sentences: -5

Final Score = Normalized to 0-100
Threshold: 60 (>=60 = AI, <60 = Human)
```

#### 3. Section Grouping

The algorithm groups consecutive sentences with similar classifications:

```python
1. Analyze each sentence → AI probability score
2. Classify: AI (score >=60) or Human (score <60)
3. Group consecutive same-type sentences
4. Calculate section confidence (average of probabilities)
```

### Production-Ready ML Integration

For production deployment, replace heuristic detection with:

#### Option 1: Hugging Face Transformers

```python
from transformers import pipeline

detector = pipeline(
    "text-classification",
    model="roberta-base-openai-detector"
)

result = detector(text)
# Returns: {label: 'Real'/'Fake', score: confidence}
```

#### Option 2: OpenAI's GPT-2 Output Detector

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "openai-detector"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Inference
inputs = tokenizer(text, return_tensors="pt", truncation=True)
outputs = model(**inputs)
```

#### Option 3: Custom Fine-Tuned Model

Train on datasets like:
- **GPT-2 Output Dataset**
- **TuringBench**
- **Real/Fake Text Dataset**

```python
# Training pipeline
1. Collect labeled data (AI vs Human)
2. Fine-tune BERT/RoBERTa for classification
3. Evaluate on validation set
4. Deploy with FastAPI endpoint
```

## File Processing Pipeline

### PDF Processing
```python
PyPDF2.PdfReader → Extract pages → Combine text → Clean
```

### DOCX Processing
```python
python-docx.Document → Extract paragraphs → Combine → Clean
```

### Text Processing
```python
UTF-8 decode → Clean whitespace → Ready for analysis
```

## API Design

### Endpoints

#### POST /api/analyze
**Purpose**: Analyze uploaded document

**Request**:
```http
POST /api/analyze
Content-Type: multipart/form-data

file: [Binary file data]
```

**Response**:
```json
{
  "filename": "document.pdf",
  "totalWords": 1500,
  "aiPercentage": 45.2,
  "humanPercentage": 54.8,
  "confidence": 92.3,
  "sections": [
    {
      "id": 1,
      "text": "...",
      "type": "ai",
      "confidence": 95.0,
      "startIndex": 0,
      "endIndex": 150
    }
  ],
  "detectedModel": "GPT-based (likely GPT-3.5 or GPT-4)",
  "recommendations": [...]
}
```

#### POST /api/analyze-text
**Purpose**: Analyze raw text directly

**Request**:
```json
{
  "text": "Your text content here..."
}
```

**Response**: Same as /api/analyze

#### GET /health
**Purpose**: Health check

**Response**:
```json
{
  "status": "healthy",
  "ai_model_loaded": true
}
```

## Security Considerations

### Current Implementation
- CORS enabled for specific origins
- File type validation
- File size limits (10MB)
- Input sanitization

### Production Recommendations
1. **Authentication**: Add JWT or OAuth2
2. **Rate Limiting**: Prevent abuse
3. **Input Validation**: Enhanced validation
4. **HTTPS**: Encrypt data in transit
5. **File Scanning**: Virus/malware detection
6. **Database**: Store analysis history securely
7. **Logging**: Comprehensive audit logs

## Performance Optimization

### Backend
- **Async Processing**: FastAPI async/await
- **Caching**: Redis for frequently analyzed content
- **Batch Processing**: Process multiple files
- **Model Loading**: Load models once at startup
- **Database Connection Pooling**: Efficient DB access

### Frontend
- **Code Splitting**: Lazy load components
- **Image Optimization**: Next.js Image component
- **Caching**: Service Workers for offline support
- **Compression**: Gzip/Brotli
- **CDN**: Static asset delivery

## Scalability

### Horizontal Scaling
```
Load Balancer
     │
     ├─── FastAPI Instance 1
     ├─── FastAPI Instance 2
     ├─── FastAPI Instance 3
     └─── FastAPI Instance N
```

### Infrastructure Options

#### AWS Deployment
- **Frontend**: Vercel/Netlify or S3 + CloudFront
- **Backend**: ECS Fargate or Lambda
- **Storage**: S3 for uploaded files
- **Database**: RDS PostgreSQL
- **Cache**: ElastiCache Redis

#### GCP Deployment
- **Frontend**: Firebase Hosting or Cloud Storage + CDN
- **Backend**: Cloud Run
- **Storage**: Cloud Storage
- **Database**: Cloud SQL
- **Cache**: Memorystore

## Testing Strategy

### Backend Tests
```python
# test_ai_detector.py
import pytest
from services.ai_detector import AIDetector

def test_ai_detection():
    detector = AIDetector()
    result = await detector.analyze("AI generated text...")
    assert result['aiPercentage'] > 50

def test_human_detection():
    detector = AIDetector()
    result = await detector.analyze("I think this is my work...")
    assert result['humanPercentage'] > 50
```

### Frontend Tests
```typescript
// FileUpload.test.tsx
import { render, fireEvent } from '@testing-library/react';
import FileUpload from '@/components/FileUpload';

test('handles file upload', () => {
  const mockUpload = jest.fn();
  const { getByText } = render(
    <FileUpload onFileUpload={mockUpload} isAnalyzing={false} />
  );
  // Test file selection
});
```

## Monitoring & Analytics

### Metrics to Track
- API response times
- Success/error rates
- File upload sizes
- Analysis accuracy feedback
- User engagement

### Tools
- **Backend**: Prometheus + Grafana
- **Frontend**: Google Analytics, Sentry
- **Logs**: ELK Stack or CloudWatch

## Future Enhancements

### Phase 1 (Short-term)
- [ ] Integrate production ML models
- [ ] Add user authentication
- [ ] Implement database for history
- [ ] Add batch processing
- [ ] Support more file formats (RTF, HTML)

### Phase 2 (Medium-term)
- [ ] Plagiarism detection
- [ ] Multi-language support
- [ ] Real-time collaboration
- [ ] Browser extension
- [ ] Mobile apps (iOS/Android)

### Phase 3 (Long-term)
- [ ] Custom model training portal
- [ ] API marketplace
- [ ] Enterprise features
- [ ] White-label solutions
- [ ] AI model comparison

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit pull request
5. Code review
6. Merge

### Code Standards
- **Python**: PEP 8, type hints
- **TypeScript**: ESLint, Prettier
- **Commits**: Conventional commits
- **Documentation**: Inline comments for complex logic

## License
MIT License - See LICENSE file

## Contact & Support
- GitHub Issues: Report bugs
- Email: support@aianalyzer.com
- Documentation: docs.aianalyzer.com

---

**Last Updated**: January 2026
**Version**: 1.0.0
