# Database ER Diagram

```mermaid
erDiagram
  Role ||--o{ User : grants
  User ||--o{ Session : owns
  User ||--o{ Ticket : holds
  User ||--o{ AIConversation : starts
  User ||--o| Volunteer : may_be
  User ||--o| FoodVendor : owns
  Stadium ||--o{ Match : hosts
  Stadium ||--o{ Gate : has
  Stadium ||--o{ CrowdZone : monitors
  Stadium ||--o{ ParkingLot : provides
  Stadium ||--o{ FoodVendor : contains
  Stadium ||--o{ Equipment : operates
  Match ||--o{ Ticket : issues
  Incident ||--o{ IncidentEvent : records
  FoodVendor ||--o{ Order : sells
  Volunteer ||--o{ Task : receives
  AIConversation ||--o{ AIMessage : contains
```

The Prisma schema in `apps/server/prisma/schema.prisma` defines normalized tables for users, roles, matches, stadiums, incidents, crowd telemetry, tickets, parking, food vendors, orders, maintenance, notifications, analytics/audit logs, AI conversations, and sessions.
