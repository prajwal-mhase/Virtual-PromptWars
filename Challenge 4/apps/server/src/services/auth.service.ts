import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { signAccessToken, signRefreshToken } from "../middleware/auth";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
  if (!user) throw new Error("Invalid credentials");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  const payload = { id: user.id, email: user.email, role: user.role.name };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
    user: { id: user.id, name: user.name, email: user.email, role: user.role.name, avatarUrl: user.avatarUrl }
  };
}

export async function register(input: { name: string; email: string; password: string; role?: "VISITOR" | "VENDOR" | "VOLUNTEER" }) {
  const role = await prisma.role.findUniqueOrThrow({ where: { name: input.role ?? "VISITOR" } });
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({ data: { name: input.name, email: input.email, passwordHash, roleId: role.id }, include: { role: true } });
  const payload = { id: user.id, email: user.email, role: user.role.name };
  return { accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload), user: { id: user.id, name: user.name, email: user.email, role: user.role.name } };
}
