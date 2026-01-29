# Vercel Serverless Function - AI Content Detection System
import os
import sys

# Add the root and backend directories to the path
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(root)
sys.path.append(os.path.join(root, 'backend'))

from backend.main import app

# Vercel needs the app object to be available as 'app' or 'handler'
handler = app
