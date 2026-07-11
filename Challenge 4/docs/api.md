# API Documentation

Base URL: `http://localhost:4000/api`

## Auth

`POST /auth/login`

```json
{ "email": "admin@stadiumos.ai", "password": "StadiumOS2026!" }
```

Returns access token, refresh token, and user profile.

`POST /auth/register`

```json
{ "name": "Visitor", "email": "visitor@example.com", "password": "StrongPass2026!", "role": "VISITOR" }
```

## Operations

`GET /health` returns API status.

`GET /dashboard` returns realtime KPIs, incidents, crowd zones, parking, vendors, tickets, and AI insights.

`GET /modules/:name` returns module-specific operating data.

`GET /incidents?page=1&limit=20` returns paginated incidents.

`POST /incidents` requires JWT. Creates an incident and returns AI analysis.

```json
{ "title": "Blocked exit", "location": "Gate C", "description": "Queue is blocking the accessible exit lane." }
```

`POST /assistant`

```json
{ "message": "Where should section 126 enter?", "language": "en" }
```

`POST /tickets/verify`

```json
{ "qrCode": "QR-EXAMPLE" }
```

`GET /search?q=parking` searches operational data.

## WebSocket

Connect to `ws://localhost:4000`. Messages use:

```json
{ "type": "snapshot", "data": {} }
```
