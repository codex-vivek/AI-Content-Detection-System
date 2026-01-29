# 🚀 Running the Application - Step by Step

## Quick Start (Standalone Version)

If you want to avoid npm installation issues, you can use the standalone HTML version:

### Step 1: Start the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
python main.py
```

The backend will start on `http://localhost:8000`

### Step 2: Open the Frontend

Simply open the file:
```
standalone/index.html
```

in your web browser (Chrome, Firefox, Edge, etc.)

That's it! The application is now ready to use.

---

## Full Next.js Version

### Step 1: Start the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
python main.py
```

Backend will be available at: `http://localhost:8000`
API docs will be at: `http://localhost:8000/docs`

### Step 2: Start the Frontend

Open a NEW terminal window (keep backend running):

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## Testing the Application

### Test with Sample Document

1. Navigate to `docs/sample_test_document.txt`
2. Upload this file to the application
3. You should see:
   - Mixed AI and Human content detection
   - Multiple sections highlighted
   - Percentage breakdown
   - Recommendations

### Test with Your Own Documents

1. Upload PDF, DOCX, or TXT files
2. Maximum file size: 10MB
3. Wait for analysis (usually 2-10 seconds)
4. Review results

### Expected Results
- **AI-Generated Sections**: Purple/violet highlighting
  - Formal language
  - Transitional phrases
  - Consistent structure
  
- **Human-Written Sections**: Green highlighting
  - Personal pronouns
  - Informal language
  - Questions and varied structure

---

## Troubleshooting Common Issues

### Backend Won't Start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`
**Fix**:
```bash
pip install -r requirements.txt
```

**Error**: `Port 8000 already in use`
**Fix**:
Edit `backend/main.py` line 78:
```python
uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)  # Changed to 8001
```

Also update frontend API URL in `frontend/lib/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8001';  // Changed to 8001
```

### Frontend Won't Start

**Error**: npm install fails
**Solution 1**: Use standalone version (standalone/index.html)

**Solution 2**: Clear cache and retry
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Solution 3**: Use yarn instead
```bash
npm install -g yarn
yarn install
yarn dev
```

### Backend Connection Error

**Error**: "Failed to fetch" or "Network Error"

**Check**:
1. Is backend running? Visit `http://localhost:8000/health`
2. Check CORS settings in `backend/main.py`
3. Ensure firewall isn't blocking port 8000

### File Upload Fails

**Error**: "Unsupported file type"
**Fix**: Only upload PDF (.pdf), Word (.docx), or Text (.txt) files

**Error**: "File too large"
**Fix**: File must be under 10MB

**Error**: "Document appears to be empty"
**Fix**: Ensure the document contains actual text content

---

## Development Commands

### Backend

```bash
# Start development server
python main.py

# Start with auto-reload
uvicorn main:app --reload

# Run on specific port
uvicorn main:app --port 8001

# Run tests (when implemented)
pytest
```

### Frontend

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

---

## API Testing with Tools

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# Analyze text
curl -X POST http://localhost:8000/api/analyze-text \
  -H "Content-Type: application/json" \
  -d '{"text":"Your text here..."}'

# Analyze file
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@/path/to/document.pdf"
```

### Using Postman

1. Open Postman
2. Create new POST request to `http://localhost:8000/api/analyze`
3. Go to Body → form-data
4. Add key `file` (type: File)
5. Select your test document
6. Send request

### Using FastAPI Swagger UI

Visit `http://localhost:8000/docs` for interactive API documentation

---

## Production Deployment

### Backend (Example: Heroku)

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Add Procfile
echo "web: uvicorn main:app --host=0.0.0.0 --port=${PORT:-8000}" > backend/Procfile

# Deploy
git push heroku main
```

### Frontend (Example: Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Environment Variables

Create `.env` file:

**Backend**:
```env
ENVIRONMENT=production
ALLOWED_ORIGINS=https://your-frontend-domain.com
MAX_FILE_SIZE=10485760
```

**Frontend**:
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

---

## Next Steps

After successful setup:

1. ✅ Test with sample document
2. ✅ Upload your own files
3. ✅ Review analysis results
4. ✅ Export reports
5. ⭐ Consider integrating production ML models
6. ⭐ Add user authentication
7. ⭐ Deploy to production

---

## Support

If you encounter issues not covered here:

1. Check the console/terminal for error messages
2. Review `docs/TECHNICAL_ARCHITECTURE.md`
3. Check `docs/QUICK_START.md`
4. Open an issue on GitHub

---

**Happy Analyzing! 🎉**
