import fetch from 'node-fetch';

export async function handler(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { prompt, length } = JSON.parse(event.body);
    
    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Prompt is required' }),
      };
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'OpenAI API key not configured' }),
      };
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
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          message: 'Failed to generate tweet content from OpenAI' 
        }),
      };
    }

    // Apply hard limit of 280 characters
    const truncatedContent = tweetContent.length > 280 
      ? tweetContent.substring(0, 277) + '...' 
      : tweetContent;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ content: truncatedContent }),
    };
  } catch (error) {
    console.error('Error generating tweet:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: error.message || 'Failed to generate tweet' 
      }),
    };
  }
} 