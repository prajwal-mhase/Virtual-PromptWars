import { vi, describe, expect, it, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "./app";
import { prisma } from "./config/prisma";
import bcrypt from "bcryptjs";
import { signAccessToken } from "./middleware/auth";

vi.mock("./config/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    role: {
      findUniqueOrThrow: vi.fn(),
      findMany: vi.fn(),
      upsert: vi.fn(),
    },
    incident: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
    ticket: {
      findUnique: vi.fn(),
    }
  }
}));

vi.mock("./services/ai.service", () => ({
  askGemini: vi.fn().mockResolvedValue("Gemini response"),
  analyzeIncident: vi.fn().mockResolvedValue({
    severityScore: 78,
    response: "Check safety limits",
    nearestMedicalTeam: "Medical Alpha",
    nearestExit: "Exit B4",
    checklist: ["Secure area", "Clear concourse"]
  })
}));

describe("StadiumOS API Suite", () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Platform General", () => {
    it("GET /api/health - returns 200 health check status", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(res.body.service).toBe("StadiumOS AI");
    });

    it("GET /api/dashboard - returns realtime snapshot metrics", async () => {
      const res = await request(app).get("/api/dashboard");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("kpis");
      expect(res.body).toHaveProperty("incidents");
      expect(res.body).toHaveProperty("zones");
    });

    it("GET /api/modules/:name - returns custom module records", async () => {
      const res = await request(app).get("/api/modules/weather");
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("weather");
      expect(res.body.data).toHaveProperty("temperature");
    });

    it("GET /api/search - returns filtered query results", async () => {
      const res = await request(app).get("/api/search?q=Lot");
      expect(res.status).toBe(200);
      expect(res.body.query).toBe("lot");
      expect(Array.isArray(res.body.results)).toBe(true);
    });
  });

  describe("Auth Routes", () => {
    it("POST /api/auth/register - successfully creates visitor user", async () => {
      const mockRole = { id: "role-123", name: "VISITOR" };
      const mockUser = {
        id: "user-123",
        name: "Test User",
        email: "test@example.com",
        passwordHash: "hashed_pass",
        roleId: "role-123",
        role: mockRole,
      };

      vi.mocked(prisma.role.findUniqueOrThrow).mockResolvedValue(mockRole as any);
      vi.mocked(prisma.user.create).mockResolvedValue(mockUser as any);

      const res = await request(app)
        .post("/api/auth/register")
        .send({ name: "Test User", email: "test@example.com", password: "securepassword123", role: "VISITOR" });

      expect(res.status).toBe(201);
      expect(res.body.user.name).toBe("Test User");
      expect(res.body.user.email).toBe("test@example.com");
      expect(res.body).toHaveProperty("accessToken");
    });

    it("POST /api/auth/login - authenticates user and sets cookie", async () => {
      const mockRole = { id: "role-123", name: "ADMIN" };
      const passwordHash = await bcrypt.hash("securepassword123", 12);
      const mockUser = {
        id: "user-123",
        name: "Admin User",
        email: "admin@example.com",
        passwordHash,
        roleId: "role-123",
        role: mockRole,
        avatarUrl: null
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "securepassword123" });

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe("admin@example.com");
      expect(res.body.user.role).toBe("ADMIN");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("POST /api/auth/login - returns 401 on invalid password", async () => {
      const mockRole = { id: "role-123", name: "ADMIN" };
      const passwordHash = await bcrypt.hash("securepassword123", 12);
      const mockUser = {
        id: "user-123",
        name: "Admin User",
        email: "admin@example.com",
        passwordHash,
        roleId: "role-123",
        role: mockRole,
        avatarUrl: null
      };

      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "wrongpassword" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Invalid credentials");
    });

    it("POST /api/auth/logout - clears authentication cookie", async () => {
      const res = await request(app).post("/api/auth/logout").send({});
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("Incident Management", () => {
    it("GET /api/incidents - returns paginated incident records", async () => {
      const mockIncidents = [
        { id: "inc-1", title: "Crowd crush risk", location: "Gate C", severity: "HIGH", status: "OPEN", createdAt: new Date().toISOString(), assignedTeam: "Security" }
      ];
      vi.mocked(prisma.incident.findMany).mockResolvedValue(mockIncidents as any);
      vi.mocked(prisma.incident.count).mockResolvedValue(1);

      const res = await request(app).get("/api/incidents");
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(1);
      expect(res.body.total).toBe(1);
    });

    it("POST /api/incidents - returns 401 when creating incident without auth token", async () => {
      const res = await request(app)
        .post("/api/incidents")
        .send({ title: "Fire Alarm", location: "East Stand", description: "Smoke detected on level 2 concourse" });

      expect(res.status).toBe(401);
    });

    it("POST /api/incidents - successfully creates incident when authorized", async () => {
      const token = signAccessToken({ id: "user-123", email: "admin@example.com", role: "ADMIN" });
      const mockIncident = {
        id: "inc-2",
        title: "Fire Alarm",
        location: "East Stand",
        description: "Smoke detected on level 2 concourse",
        severity: "HIGH",
        status: "OPEN",
        createdAt: new Date().toISOString(),
        assignedTeam: "Medical Alpha",
        timeline: []
      };

      vi.mocked(prisma.incident.create).mockResolvedValue(mockIncident as any);

      const res = await request(app)
        .post("/api/incidents")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Fire Alarm", location: "East Stand", description: "Smoke detected on level 2 concourse" });

      expect(res.status).toBe(201);
      expect(res.body.incident.title).toBe("Fire Alarm");
      expect(res.body.analysis.nearestMedicalTeam).toBe("Medical Alpha");
    });
  });

  describe("Assistant & Tickets", () => {
    it("POST /api/assistant - gets response from AI assistant", async () => {
      const res = await request(app)
        .post("/api/assistant")
        .send({ message: "What gate should I use for Section 120?" });

      expect(res.status).toBe(200);
      expect(res.body.message.content).toBe("Gemini response");
      expect(res.body.message.role).toBe("assistant");
    });

    it("POST /api/tickets/verify - returns verification details for valid ticket", async () => {
      const mockTicket = {
        id: "ticket-123",
        qrCode: "QR-CONFIRM-123",
        status: "ISSUED",
        matchId: "match-1",
        userId: "user-123",
        section: "101",
        row: "A",
        seat: "12",
        scannedAt: null,
        match: { id: "match-1", title: "Mexico vs Argentina" },
        user: { id: "user-123", name: "Bob Martin" }
      };

      vi.mocked(prisma.ticket.findUnique).mockResolvedValue(mockTicket as any);

      const res = await request(app)
        .post("/api/tickets/verify")
        .send({ qrCode: "QR-CONFIRM-123" });

      expect(res.status).toBe(200);
      expect(res.body.valid).toBe(true);
      expect(res.body.recommendedGate).toBe("Gate B");
      expect(res.body.ticket.user.name).toBe("Bob Martin");
    });

    it("POST /api/tickets/verify - returns 404 if ticket doesn't exist", async () => {
      vi.mocked(prisma.ticket.findUnique).mockResolvedValue(null);

      const res = await request(app)
        .post("/api/tickets/verify")
        .send({ qrCode: "INVALID-QR-CODE" });

      expect(res.status).toBe(404);
      expect(res.body.valid).toBe(false);
      expect(res.body.reason).toBe("Ticket not found");
    });
  });
});
