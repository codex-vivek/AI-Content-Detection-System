from pydantic import BaseModel
from typing import List, Optional

class Section(BaseModel):
    id: int
    text: str
    type: str  # 'ai' or 'human'
    confidence: float
    startIndex: int
    endIndex: int

class AnalysisResponse(BaseModel):
    filename: str
    totalWords: int
    aiPercentage: float
    humanPercentage: float
    confidence: float
    sections: List[Section]
    detectedModel: Optional[str] = None
    recommendations: Optional[List[str]] = None
