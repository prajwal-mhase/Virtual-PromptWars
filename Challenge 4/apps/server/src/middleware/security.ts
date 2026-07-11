import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import sanitizeHtml from "sanitize-html";
import { env } from "../config/env";

export function applySecurity(app: Express) {
  app.disable("x-powered-by");
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(compression());
  app.use(cookieParser());
  app.use(rateLimit({ windowMs: 60_000, limit: 180, standardHeaders: true, legacyHeaders: false }));
  app.use((req, _res, next) => {
    if (req.body && typeof req.body === "object") sanitizeObject(req.body);
    if (req.query && typeof req.query === "object") sanitizeObject(req.query);
    next();
  });
}

function sanitizeObject(value: Record<string, unknown>) {
  for (const key of Object.keys(value)) {
    const item = value[key];
    if (typeof item === "string") value[key] = sanitizeHtml(item, { allowedTags: [], allowedAttributes: {} });
    if (item && typeof item === "object") sanitizeObject(item as Record<string, unknown>);
  }
}
