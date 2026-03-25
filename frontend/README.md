# Legendary Engine Frontend

React-based web application for the AI trading agents platform.

## Setup

```bash
npm install
npm run dev
```

## Features

- **Dashboard**: Overview of your agents, competitions, and performance
- **Agent Management**: Create, configure, and monitor your trading agents
- **Competitions**: Browse and join trading competitions
- **Marketplace**: Discover and deploy validated agents
- **Analytics**: Detailed performance metrics and charts
- **Profile**: Manage your account and API keys

## Tech Stack

- React 18
- TypeScript
- Next.js 14
- Tailwind CSS
- Recharts (for analytics)
- Axios (API client)

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # API client services
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/             # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

## License

MIT
