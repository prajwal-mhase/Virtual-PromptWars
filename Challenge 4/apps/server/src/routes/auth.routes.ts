import { Router } from "express";
import { z } from "zod";
import { login, register } from "../services/auth.service";
import { validate } from "../middleware/validate";

export const authRouter = Router();

authRouter.post("/login", validate(z.object({ email: z.string().email(), password: z.string().min(8) })), async (req, res) => {
  try {
    const result = await login(req.body.email, req.body.password);
    res.cookie("accessToken", result.accessToken, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.json(result);
  } catch {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

authRouter.post("/register", validate(z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8), role: z.enum(["VISITOR", "VENDOR", "VOLUNTEER"]).optional() })), async (req, res) => {
  const result = await register(req.body);
  res.status(201).json(result);
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("accessToken");
  res.json({ ok: true });
});
