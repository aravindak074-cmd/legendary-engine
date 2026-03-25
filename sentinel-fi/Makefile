# Sentinel FI - Makefile for common development tasks

.PHONY: help install dev test build docker-up docker-down clean

# Default target
help:
@echo "Sentinel FI - Development Commands"
@echo ""
@echo "Usage: make [command]"
@echo ""
@echo "Commands:"
@echo "  install       Install all dependencies"
@echo "  dev           Start development servers"
@echo "  test          Run all tests"
@echo "  lint          Run linters"
@echo "  build         Build all components"
@echo "  docker-up     Start Docker containers"
@echo "  docker-down   Stop Docker containers"
@echo "  clean         Clean build artifacts"
@echo "  migrate       Run database migrations"
@echo "  seed          Seed database with sample data"

# Install all dependencies
install:
@echo "Installing Python SDK dependencies..."
cd sdk-python && pip install -e ".[dev]"
@echo "Installing web dashboard dependencies..."
cd web-dashboard && npm install
@echo "Installation complete!"

# Start development servers
dev:
@echo "Starting development environment..."
@echo "Note: Run 'make docker-up' first to start databases"
cd web-dashboard && npm run dev &
cd core && python -m uvicorn api.main:app --reload --port 8000

# Run tests
test:
@echo "Running Python tests..."
cd sdk-python && pytest tests/ -v --cov=sentinel
@echo "Running TypeScript tests..."
cd web-dashboard && npm test

# Run linters
lint:
@echo "Running Python linter..."
cd sdk-python && flake8 sentinel tests
@echo "Running TypeScript linter..."
cd web-dashboard && npm run lint

# Build all components
build:
@echo "Building web dashboard..."
cd web-dashboard && npm run build
@echo "Build complete!"

# Docker commands
docker-up:
@echo "Starting Docker containers..."
docker-compose up -d
@echo "Waiting for services to be ready..."
@sleep 5
@echo "Docker containers started!"

docker-down:
@echo "Stopping Docker containers..."
docker-compose down

docker-logs:
docker-compose logs -f

# Database migrations
migrate:
@echo "Running database migrations..."
cd core && python -m alembic upgrade head

# Seed database
seed:
@echo "Seeding database with sample data..."
cd core && python scripts/seed_data.py

# Clean build artifacts
clean:
@echo "Cleaning build artifacts..."
find . -type d -name "__pycache__" -exec rm -rf {} +
find . -type d -name "*.egg-info" -exec rm -rf {} +
find . -type d -name "node_modules" -exec rm -rf {} +
find . -type d -name ".next" -exec rm -rf {} +
find . -type d -name "dist" -exec rm -rf {} +
find . -type d -name "build" -exec rm -rf {} +
find . -type f -name "*.pyc" -delete
@echo "Clean complete!"

# Security audit
security:
@echo "Running security audit..."
cd sdk-python && safety check
cd web-dashboard && npm audit

# Generate documentation
docs:
@echo "Generating documentation..."
cd sdk-python && pdoc --html sentinel -o docs/api
@echo "Documentation generated!"
