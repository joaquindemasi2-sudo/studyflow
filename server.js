// server.js - Backend for StudyFlow
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Your Anthropic API Key (set as environment variable)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'your-api-key-here';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'StudyFlow backend is running' });
});

// Generate study materials endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Truncate text if too long
    const maxLength = 15000;
    const truncatedText = text.length > maxLength 
      ? text.substring(0, maxLength) + '\n\n[Text truncated due to length...]'
      : text;

    console.log('Generating content for text of length:', truncatedText.length);

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are an expert educational content analyzer. Analyze the following PDF content and create a comprehensive study package.

EXTRACTED PDF CONTENT:
${truncatedText}

Create a JSON object with this EXACT structure (return ONLY valid JSON, no markdown, no preamble):

{
  "summary": {
    "title": "A clear, specific title based on the actual content (not generic)",
    "overview": "Write 2-3 detailed paragraphs summarizing the ACTUAL content from the PDF. Be specific and include key facts, concepts, and themes actually present in the text.",
    "keyPoints": [
      "First key point from the actual content",
      "Second key point from the actual content", 
      "Third key point from the actual content",
      "Fourth key point from the actual content",
      "Fifth key point from the actual content"
    ],
    "youtubeSearch": "A specific search query to find relevant explanatory videos about THIS specific topic"
  },
  "flashcards": [
    {
      "front": "Specific question about content from the PDF",
      "back": "Accurate answer based on the PDF content"
    }
  ],
  "quizQuestions": [
    {
      "question": "Multiple choice question about actual PDF content",
      "options": ["Correct answer from PDF", "Plausible wrong answer", "Plausible wrong answer", "Plausible wrong answer"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this answer is correct based on the PDF"
    }
  ]
}

CRITICAL REQUIREMENTS:
- Base ALL content on the actual PDF text provided above
- Create 15-20 flashcards covering the main concepts from the PDF
- Create 20 quiz questions of varying difficulty based on the PDF content
- Make questions specific to the actual content, not generic
- Ensure the summary accurately reflects what's in the PDF
- Return ONLY the JSON object, nothing else`
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `API request failed: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Invalid API response:', data);
      return res.status(500).json({ error: 'Invalid response from API' });
    }

    const responseText = data.content[0].text;
    
    // Clean the response text
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    try {
      const parsedContent = JSON.parse(cleanText);
      
      // Validate structure
      if (!parsedContent.summary || !parsedContent.flashcards || !parsedContent.quizQuestions) {
        return res.status(500).json({ error: 'Invalid content structure from API' });
      }

      console.log('Successfully generated content');
      res.json(parsedContent);
      
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Attempted to parse:', cleanText.substring(0, 500));
      return res.status(500).json({ 
        error: 'Failed to parse API response',
        details: parseError.message
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ StudyFlow backend running on port ${PORT}`);
  console.log(`🔑 API Key configured: ${ANTHROPIC_API_KEY ? 'Yes' : 'No (using placeholder)'}`);
});
