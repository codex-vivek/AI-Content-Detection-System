import PyPDF2
from docx import Document
import io
from typing import Union

class FileProcessor:
    """Service for processing and extracting text from various file formats"""
    
    async def extract_text(self, content: bytes, file_extension: str) -> str:
        """
        Extract text from uploaded file based on its extension
        
        Args:
            content: File content as bytes
            file_extension: File extension (.pdf, .docx, .txt)
            
        Returns:
            Extracted text as string
        """
        try:
            if file_extension == '.pdf':
                return await self._extract_from_pdf(content)
            elif file_extension == '.docx':
                return await self._extract_from_docx(content)
            elif file_extension == '.txt':
                return content.decode('utf-8')
            else:
                raise ValueError(f"Unsupported file extension: {file_extension}")
        except Exception as e:
            raise Exception(f"Error extracting text: {str(e)}")
    
    async def _extract_from_pdf(self, content: bytes) -> str:
        """Extract text from PDF file"""
        try:
            pdf_file = io.BytesIO(content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            return text.strip()
        except Exception as e:
            raise Exception(f"Error reading PDF: {str(e)}")
    
    async def _extract_from_docx(self, content: bytes) -> str:
        """Extract text from DOCX file"""
        try:
            docx_file = io.BytesIO(content)
            doc = Document(docx_file)
            
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            
            return text.strip()
        except Exception as e:
            raise Exception(f"Error reading DOCX: {str(e)}")
