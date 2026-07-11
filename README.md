# StadiumOS AI

GenAI-powered smart stadium and tournament operations platform for FIFA World Cup 2026 venues. Monorepo includes a Next.js UI, Express/Prisma backend, PostgreSQL schema, Redis-ready services, WebSocket realtime operations, a Gemini-powered assistant, Docker, CI, tests, and documentation.

## Features

- **AI Command Center**: KPIs, incidents, crowd density, weather, ticketing, parking, transport, and recommended actions.
- **Gemini assistant**: streaming-ready API, multilingual prompts, voice input/output, and conversation history (with deterministic fallback if `GEMINI_API_KEY` is missing).
- **Operational modules**: crowd intelligence, incident response, navigation, parking, food, tickets, volunteers, vendors, maintenance, sustainability, reports, notifications, and settings.

## Quick Start

### 1) Install

```bash
npm install
```

### 2) Configure environment

```bash
cp .env.example .env
```

### 3) Run dependencies and start services

```bash
docker compose up -d postgres redis
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Local URLs

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api`
- Health: `http://localhost:4000/api/health`

## Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@stadiumos.ai | StadiumOS2026! |
| Manager | manager@stadiumos.ai | StadiumOS2026! |
| Volunteer | volunteer@stadiumos.ai | StadiumOS2026! |
| Vendor | vendor@stadiumos.ai | StadiumOS2026! |
| Visitor | visitor@stadiumos.ai | StadiumOS2026! |

## Repo Structure

```text
apps/web       Next.js, TailwindCSS, shadcn-style UI, dashboards, PWA
apps/server    Express, Prisma, JWT/RBAC, WebSocket, Gemini services
packages/ui    Shared React UI primitives
packages/types Shared domain and API types
packages/config Shared TypeScript, ESLint, Tailwind tokens
docs           Architecture, ERD, API, deployment, contributing
```

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run db:migrate
npm run db:seed
```

## Documentation

- [Architecture](docs/architecture.md)
- [Database ER Diagram](docs/database-er-diagram.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Environment Setup](docs/environment.md)
- [Contributing](docs/contributing.md)
- [License](LICENSE)

