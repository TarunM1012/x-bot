import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for generating tweets
app.post('/api/generate-tweet', async (req, res) => {
  try {
    const { prompt, length } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a social media expert who creates engaging tweets. IMPORTANT: Always stay within Twitter\'s 280 character limit. Focus on creating concise, impactful content that fits Twitter\'s format. Keep tweets short and punchy.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 80,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate tweet');
    }

    const data = await response.json();
    const tweetContent = data.choices[0]?.message?.content?.trim() || '';

    if (!tweetContent) {
      return res.status(500).json({ 
        message: 'Failed to generate tweet content from OpenAI' 
      });
    }

    // Apply hard limit of 280 characters
    const truncatedContent = tweetContent.length > 280 
      ? tweetContent.substring(0, 277) + '...' 
      : tweetContent;

    res.json({ content: truncatedContent });
  } catch (error) {
    console.error('Error generating tweet:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to generate tweet' 
    });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 