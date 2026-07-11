import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma";
import { getRealtimeSnapshot, moduleRecords } from "../data/operations";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { analyzeIncident, askGemini } from "../services/ai.service";

export const platformRouter = Router();

platformRouter.get("/health", (_req, res) => res.json({ status: "ok", service: "StadiumOS AI", timestamp: new Date().toISOString() }));
platformRouter.get("/dashboard", (_req, res) => res.json(getRealtimeSnapshot()));
platformRouter.get("/modules/:name", (req, res) => res.json({ name: req.params.name, data: moduleRecords[req.params.name as keyof typeof moduleRecords] ?? getRealtimeSnapshot() }));

platformRouter.get("/incidents", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const take = Math.min(Number(req.query.limit ?? 20), 100);
  const [items, total] = await Promise.all([
    prisma.incident.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * take, take, include: { timeline: true } }),
    prisma.incident.count()
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / take) });
});

platformRouter.post("/incidents", requireAuth, validate(z.object({ title: z.string().min(3), location: z.string().min(2), description: z.string().min(5) })), async (req, res) => {
  const analysis = await analyzeIncident(req.body);
  const incident = await prisma.incident.create({
    data: {
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      severity: analysis.severityScore > 90 ? "CRITICAL" : analysis.severityScore > 70 ? "HIGH" : analysis.severityScore > 40 ? "MEDIUM" : "LOW",
      assignedTeam: analysis.nearestMedicalTeam,
      timeline: { create: [{ message: analysis.response }] }
    },
    include: { timeline: true }
  });
  res.status(201).json({ incident, analysis });
});

platformRouter.post("/assistant", validate(z.object({ message: z.string().min(1), language: z.string().default("en"), conversationId: z.string().optional() })), async (req, res) => {
  const content = await askGemini(req.body.message, req.body.language);
  res.json({ message: { id: crypto.randomUUID(), role: "assistant", content, language: req.body.language, createdAt: new Date().toISOString() } });
});

platformRouter.post("/tickets/verify", validate(z.object({ qrCode: z.string().min(4) })), async (req, res) => {
  const ticket = await prisma.ticket.findUnique({ where: { qrCode: req.body.qrCode }, include: { match: true, user: true } });
  if (!ticket) return res.status(404).json({ valid: false, reason: "Ticket not found" });
  res.json({ valid: ticket.status !== "REFUNDED", ticket, recommendedGate: "Gate B", walletPass: `STADIUMOS-${ticket.id}` });
});

platformRouter.get("/search", (req, res) => {
  const q = String(req.query.q ?? "").toLowerCase();
  const snapshot = getRealtimeSnapshot();
  const results = [...snapshot.incidents, ...snapshot.zones, ...snapshot.parking, ...snapshot.vendors].filter((item) => JSON.stringify(item).toLowerCase().includes(q));
  res.json({ query: q, results });
});
