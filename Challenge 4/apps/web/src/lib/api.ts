import type { RealtimeSnapshot } from "@stadiumos/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`[api] ${response.status} ${response.statusText} -> ${url} | body: ${body}`);
  }

  return response.json() as Promise<T>;
}

export function fetchSnapshot() {
  return api<RealtimeSnapshot>("/dashboard");
}
