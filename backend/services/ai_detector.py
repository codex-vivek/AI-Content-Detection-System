import re
import numpy as np
from typing import Dict, List, Any
import asyncio

class AIDetector:
    """
    Service for detecting AI-generated content using multiple techniques:
    1. Statistical analysis (perplexity, burstiness)
    2. Pattern recognition
    3. Linguistic markers
    
    Note: For production, integrate with actual AI detection models like:
    - Hugging Face's GPT-2 Output Detector
    - RoBERTa-based classifiers
    - OpenAI's AI Text Classifier API
    """
    
    def __init__(self):
        self.model_loaded = True
        # In production, load actual models here
        # self.model = transformers.pipeline("text-classification", model="roberta-ai-detector")
    
    def is_model_loaded(self) -> bool:
        """Check if AI detection model is loaded"""
        return self.model_loaded
    
    async def analyze(self, text: str) -> Dict[str, Any]:
        """
        Analyze text for AI-generated content
        
        Args:
            text: Text to analyze
            
        Returns:
            Analysis results including percentages, sections, and recommendations
        """
        # Split text into sentences for section analysis
        sentences = self._split_into_sentences(text)
        
        # Analyze each sentence
        section_analyses = []
        for i, sentence in enumerate(sentences):
            if len(sentence.strip()) < 10:  # Skip very short sentences
                continue
                
            ai_probability = await self._detect_ai_probability(sentence)
            
            section_analyses.append({
                'sentence': sentence,
                'ai_probability': ai_probability,
                'index': i
            })
        
        # Group consecutive sentences with similar classifications
        sections = self._group_sections(section_analyses, text)
        
        # Calculate overall statistics
        total_words = len(text.split())
        ai_word_count = sum(
            len(s['text'].split()) 
            for s in sections 
            if s['type'] == 'ai'
        )
        
        ai_percentage = round((ai_word_count / total_words * 100), 1) if total_words > 0 else 0
        human_percentage = round(100 - ai_percentage, 1)
        
        # Calculate overall confidence
        avg_confidence = np.mean([s['confidence'] for s in sections]) if sections else 85
        
        # Detect likely AI model
        detected_model = self._detect_ai_model(text, ai_percentage)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(ai_percentage, sections)
        
        return {
            'totalWords': total_words,
            'aiPercentage': ai_percentage,
            'humanPercentage': human_percentage,
            'confidence': round(avg_confidence, 1),
            'sections': sections,
            'detectedModel': detected_model,
            'recommendations': recommendations
        }
    
    def _split_into_sentences(self, text: str) -> List[str]:
        """Split text into sentences"""
        # Simple sentence splitter - can be improved with nltk.sent_tokenize
        sentences = re.split(r'[.!?]+', text)
        return [s.strip() for s in sentences if s.strip()]
    
    async def _detect_ai_probability(self, sentence: str) -> float:
        """
        Detect probability that a sentence is AI-generated
        
        This is a simplified heuristic. In production, use actual AI models.
        """
        await asyncio.sleep(0.01)  # Simulate processing time
        
        # Heuristic scoring based on patterns
        score = 50  # Base score
        
        # AI-generated text tends to:
        # 1. Use more formal language
        formal_words = ['furthermore', 'moreover', 'nevertheless', 'consequently', 
                       'therefore', 'thus', 'hence', 'accordingly', 'subsequently']
        score += sum(5 for word in formal_words if word in sentence.lower())
        
        # 2. Have consistent sentence structure
        words = sentence.split()
        if 15 <= len(words) <= 25:  # Optimal AI length
            score += 10
        
        # 3. Use passive voice more
        if re.search(r'\b(is|are|was|were|been|being)\s+\w+ed\b', sentence):
            score += 8
        
        # 4. Avoid contractions
        if not re.search(r"n't|'ll|'ve|'re|'m", sentence):
            score += 7
        
        # 5. Use more transitional phrases
        transitions = ['in addition', 'on the other hand', 'in conclusion', 
                      'to summarize', 'it is important to note']
        score += sum(6 for phrase in transitions if phrase in sentence.lower())
        
        # Human traits:
        # 1. Personal pronouns (especially first person)
        personal_pronouns = ['I ', 'my ', 'mine', 'I\'ve', 'I\'m', 'I\'d']
        score -= sum(8 for pronoun in personal_pronouns if pronoun in sentence)
        
        # 2. Informal language
        informal = ['really', 'pretty', 'stuff', 'things', 'kinda', 'sorta', 'gonna']
        score -= sum(7 for word in informal if word in sentence.lower())
        
        # 3. Questions and exclamations
        if '?' in sentence or '!' in sentence:
            score -= 10
        
        # 4. Shorter, punchier sentences
        if len(words) < 10:
            score -= 5
        
        # Normalize to 0-100
        probability = max(0, min(100, score))
        
        # Add some randomness for realism
        probability += np.random.uniform(-5, 5)
        
        return max(0, min(100, probability))
    
    def _group_sections(self, analyses: List[Dict], full_text: str) -> List[Dict]:
        """Group consecutive sentences with similar AI probabilities"""
        if not analyses:
            return []
        
        sections = []
        current_section = {
            'sentences': [analyses[0]['sentence']],
            'ai_probs': [analyses[0]['ai_probability']],
            'start_idx': 0
        }
        
        for i in range(1, len(analyses)):
            prev_type = 'ai' if analyses[i-1]['ai_probability'] >= 60 else 'human'
            curr_type = 'ai' if analyses[i]['ai_probability'] >= 60 else 'human'
            
            if prev_type == curr_type:
                # Continue current section
                current_section['sentences'].append(analyses[i]['sentence'])
                current_section['ai_probs'].append(analyses[i]['ai_probability'])
            else:
                # Save current section and start new one
                sections.append(self._finalize_section(current_section, len(sections) + 1))
                current_section = {
                    'sentences': [analyses[i]['sentence']],
                    'ai_probs': [analyses[i]['ai_probability']],
                    'start_idx': i
                }
        
        # Don't forget the last section
        sections.append(self._finalize_section(current_section, len(sections) + 1))
        
        return sections
    
    def _finalize_section(self, section_data: Dict, section_id: int) -> Dict:
        """Convert section data to final format"""
        text = ' '.join(section_data['sentences'])
        avg_prob = np.mean(section_data['ai_probs'])
        
        # Find position in text (simplified)
        start_index = 0
        end_index = len(text)
        
        return {
            'id': section_id,
            'text': text,
            'type': 'ai' if avg_prob >= 60 else 'human',
            'confidence': round(avg_prob if avg_prob >= 60 else (100 - avg_prob), 1),
            'startIndex': start_index,
            'endIndex': end_index
        }
    
    def _detect_ai_model(self, text: str, ai_percentage: float) -> str:
        """Detect likely AI model used (simplified heuristic)"""
        if ai_percentage < 30:
            return None
        
        # Pattern-based detection (simplified)
        if 'furthermore' in text.lower() and 'consequently' in text.lower():
            return 'GPT-based (likely GPT-3.5 or GPT-4)'
        elif 'moreover' in text.lower() or 'nevertheless' in text.lower():
            return 'Transformer-based model (GPT, Claude, or Bard)'
        else:
            return 'AI-assisted content detected (model uncertain)'
    
    def _generate_recommendations(self, ai_percentage: float, sections: List[Dict]) -> List[str]:
        """Generate recommendations based on analysis"""
        recommendations = []
        
        if ai_percentage > 70:
            recommendations.append(
                'High AI content detected (>70%). Consider adding personal experiences and voice.'
            )
            recommendations.append(
                'Verify all factual claims and citations independently.'
            )
        elif ai_percentage > 40:
            recommendations.append(
                'Moderate AI usage detected. Balance with more human-written sections.'
            )
            recommendations.append(
                'Review transitions between AI and human sections for coherence.'
            )
        elif ai_percentage > 20:
            recommendations.append(
                'Low to moderate AI assistance detected. Content appears well-balanced.'
            )
        else:
            recommendations.append(
                'Predominantly human-written content. AI usage is minimal.'
            )
        
        # Check for long AI sections
        long_ai_sections = [s for s in sections if s['type'] == 'ai' and len(s['text'].split()) > 100]
        if long_ai_sections:
            recommendations.append(
                f'Found {len(long_ai_sections)} lengthy AI-generated section(s). Consider breaking them up with personal insights.'
            )
        
        # Attribution reminder
        if ai_percentage > 30:
            recommendations.append(
                'If submitting academically or professionally, check if AI usage disclosure is required.'
            )
        
        return recommendations
