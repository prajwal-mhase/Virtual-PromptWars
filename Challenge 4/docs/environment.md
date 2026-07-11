# Environment Setup

Required software:

- Node.js 22+
- npm 10+
- Docker Desktop
- PostgreSQL 16 if not using Docker
- Redis 7 if not using Docker

Create `.env` from `.env.example` and fill secrets.

```bash
cp .env.example .env
npm install
docker compose up -d postgres redis
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Gemini is optional for local development. Without `GEMINI_API_KEY`, the assistant uses deterministic operational fallback responses.
