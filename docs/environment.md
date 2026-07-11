# Environment Setup

## Prerequisites

- Node.js 22+
- npm 10+
- Docker Desktop
- PostgreSQL 16 (only if you are not using Docker)
- Redis 7 (only if you are not using Docker)

## Configure `.env`

Create your environment file from the example:

```bash
cp .env.example .env
```

## Local Development

```bash
npm install
docker compose up -d postgres redis
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Gemini Configuration

Gemini is optional for local development. If `GEMINI_API_KEY` is not set, the assistant uses deterministic operational fallback responses.

