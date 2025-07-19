# XBot - AI Tweet Generator

A modern, AI-powered tweet generation platform built with React and TypeScript.

## Features

- **AI-Powered Generation**: Transform your ideas into engaging tweets with advanced AI technology
- **Customizable Tone & Style**: Choose from multiple tones and styles to match your brand voice
- **Character Count Control**: Set precise character limits for optimal Twitter engagement
- **Dark Futuristic UI**: Modern, sleek interface with a dark theme
- **Real-time Preview**: See your generated tweets before posting
- **One-Click Twitter Posting**: Opens Twitter with your tweet pre-filled and ready to post
- **Secure API Key Management**: OpenAI API key stored securely in environment variables

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd echo-tweet-magic
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp env.example .env

# Edit the .env file and add your OpenAI API key
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3001
```

4. Start the development server:
```bash
# Run both frontend and backend
npm run dev:server

# Or run them separately:
# Terminal 1: npm run dev (frontend)
# Terminal 2: npm run start (backend)
```

5. Open your browser and navigate to `http://localhost:5173`

## API Requirements

This application requires an OpenAI API key to function. You can get one by:

1. Visiting [OpenAI's website](https://openai.com/)
2. Creating an account
3. Generating an API key in your dashboard
4. Adding the key to your `.env` file

## Usage

1. **Home Page**: Visit the landing page to learn about XBot features
2. **Create Tweets**: Click "Post Now" to access the tweet generator
3. **Describe Your Idea**: Enter the main concept for your tweet
4. **Choose Settings**: Select tone, style, and character length
5. **Generate**: Click "Generate Tweet" to create your content
6. **Preview & Post**: Review your tweet and click "Tweet it" to open Twitter with your content pre-filled

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with Node.js
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Shadcn/ui component library
- **Routing**: React Router v6
- **State Management**: React Query for API calls
- **Build Tool**: Vite
- **Environment**: dotenv for configuration

## Development

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run start` - Start backend server
- `npm run dev:server` - Run both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── ui/            # Shadcn/ui components

server.js          # Express backend server
.env               # Environment variables (create from env.example)
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

## Security

- API keys are stored securely in environment variables
- No sensitive data is exposed to the frontend
- All API calls are proxied through the backend server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
