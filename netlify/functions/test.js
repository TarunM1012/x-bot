export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      message: 'Netlify function is working!',
      timestamp: new Date().toISOString(),
      env: process.env.OPENAI_API_KEY ? 'API key is set' : 'API key is NOT set'
    }),
  };
} 