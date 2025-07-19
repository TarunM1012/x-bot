export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Environment check',
      openaiKeyExists: !!process.env.OPENAI_API_KEY,
      openaiKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
      openaiKeyStartsWith: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.startsWith('sk-') : false,
      allEnvVars: Object.keys(process.env).filter(key => key.includes('OPENAI') || key.includes('NETLIFY')),
    }),
  };
} 