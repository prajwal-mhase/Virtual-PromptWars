import { vi, describe, expect, it } from "vitest";
import { api, fetchSnapshot, API_URL } from "./api";

describe("Web Client API wrapper", () => {
  it("api() - successfully performs GET fetch and resolves JSON data", async () => {
    const mockData = { items: [1, 2, 3] };
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockData,
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await api("/test-path");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/test-path`,
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual(mockData);
  });

  it("api() - throws custom structured error on non-ok status codes", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: async () => "Item does not exist",
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(api("/not-found-path")).rejects.toThrowError(
      "[api] 404 Not Found"
    );
  });

  it("fetchSnapshot() - requests correct /dashboard dashboard snap", async () => {
    const mockData = { kpis: [], incidents: [], zones: [] };
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockData,
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await fetchSnapshot();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/dashboard`,
      expect.any(Object)
    );
    expect(result).toEqual(mockData);
  });
});
