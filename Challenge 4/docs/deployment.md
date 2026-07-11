# Deployment Guide

## Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

Run migrations before production traffic:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Vercel Web

- Root directory: `apps/web`
- Build command: `npm run build`
- Environment: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`

## Railway or Render API

- Root directory: `apps/server`
- Build command: `npm run db:generate && npm run build`
- Start command: `npm run start`
- Environment: `DATABASE_URL`, `REDIS_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `GEMINI_API_KEY`, `CORS_ORIGIN`

## Production Checklist

- Use managed PostgreSQL and Redis.
- Rotate JWT secrets and Gemini API key through the host secret manager.
- Configure HTTPS-only cookies and strict CORS origins.
- Enable backup retention and point-in-time recovery.
- Run `npm run lint`, `npm run test`, and `npm run build` in CI before release.
