# Getting Started with Legendary Engine

This guide will help you set up and run the Legendary Engine platform locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))

## Quick Start with Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd legendary-engine

# Copy environment file
cp backend/.env.example backend/.env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

This will start:
- PostgreSQL database on port 5432
- Redis cache on port 6379
- Backend API on port 3000
- Frontend application on port 3001

Visit `http://localhost:3001` to access the web application.

## Manual Setup

### 1. Database Setup

```bash
# Start PostgreSQL and Redis only
docker-compose up -d postgres redis
```

Or install them locally:

```bash
# macOS (Homebrew)
brew install postgresql redis
brew services start postgresql
brew services start redis

# Ubuntu
sudo apt-get install postgresql redis-server
sudo systemctl start postgresql
sudo systemctl start redis-server
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run database migrations (when available)
npm run migrate

# Start development server
npm run dev
```

The API will be available at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" > .env.local

# Start development server
npm run dev
```

The web application will be available at `http://localhost:3000` (Next.js default)

## Verify Installation

### Test Backend API

```bash
# Health check
curl http://localhost:3000/health

# Expected response: {"status":"ok","timestamp":"..."}
```

### Test Frontend

Open your browser and navigate to `http://localhost:3000` (or `http://localhost:3001` if using Docker)

## First Steps

### 1. Create an Account

Use the registration endpoint or the web interface to create your account.

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "trader123",
    "email": "trader@example.com",
    "password": "securepassword123"
  }'
```

### 2. Create Your First Agent

```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "My First Bot",
    "description": "A simple trading bot",
    "strategy": "momentum"
  }'
```

### 3. Connect Your Agent

Use one of our SDKs to connect your trading bot:

**Python:**
```python
from legendary_engine import Agent

agent = Agent(
    name="My First Bot",
    api_key="your_api_key"
)
agent.connect()
```

**JavaScript:**
```javascript
import { Agent } from 'legendary-engine-sdk';

const agent = new Agent({
  name: "My First Bot",
  apiKey: "your_api_key"
});
await agent.connect();
```

## Next Steps

- [API Documentation](./api-reference.md)
- [SDK Documentation](../agent-sdk/)
- [Creating Trading Strategies](./strategies.md)
- [Joining Competitions](./competitions.md)
- [Marketplace Guide](./marketplace.md)

## Troubleshooting

### Port Already in Use

If ports 3000, 3001, 5432, or 6379 are already in use, modify the port mappings in `docker-compose.yml` or the environment files.

### Database Connection Issues

Ensure PostgreSQL is running and accessible:

```bash
# Check PostgreSQL status
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres
```

### Node Modules Issues

If you encounter node modules issues:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Support

For questions and support:
- Open an issue on GitHub
- Check the [Documentation](./docs/)
- Join our community Discord/Slack (link TBD)

## Development

To contribute to the project, see our [Contributing Guide](./CONTRIBUTING.md).
