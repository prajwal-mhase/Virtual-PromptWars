import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app";

describe("platform api", () => {
  it("returns health", async () => {
    const response = await request(createApp()).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("returns dashboard snapshot", async () => {
    const response = await request(createApp()).get("/api/dashboard");
    expect(response.status).toBe(200);
    expect(response.body.kpis.length).toBeGreaterThan(0);
  });
});
