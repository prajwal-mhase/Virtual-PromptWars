import express from "express";
import morgan from "morgan";
import { applySecurity } from "./middleware/security";
import { authRouter } from "./routes/auth.routes";
import { platformRouter } from "./routes/platform.routes";

export function createApp() {
  const app = express();
  applySecurity(app);
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("combined"));
  app.use("/api/auth", authRouter);
  app.use("/api", platformRouter);
  app.use((req, res) => {
    console.error(`[api][404] ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Route not found" });
  });
  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ error: message });
  });
  return app;
}
