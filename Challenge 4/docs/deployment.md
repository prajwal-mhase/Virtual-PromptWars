# Deployment Guide

## Docker Compose

1) Configure environment:

```bash
cp .env.example .env
```

2) Build and start:

```bash
docker compose up --build
```

Run migrations before production traffic:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Web (Vercel)

- Root directory: `apps/web`
- Build command: `npm run build`
- Environment variables:
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_WS_URL`

## API (Railway / Render)

- Root directory: `apps/server`
- Build command: `npm run db:generate && npm run build`
- Start command: `npm run start`
- Environment variables:
  - `DATABASE_URL`
  - `REDIS_URL`
  - `JWT_ACCESS_SECRET`
  - `JWT_REFRESH_SECRET`
  - `GEMINI_API_KEY`
  - `CORS_ORIGIN`

## Production Checklist

- Use managed PostgreSQL and Redis.
- Rotate JWT secrets and Gemini API key through the host secret manager.
- Configure HTTPS-only cookies and strict CORS origins.
- Enable backup retention and point-in-time recovery.
- Run `npm run lint`, `npm run test`, and `npm run build` in CI before release.

