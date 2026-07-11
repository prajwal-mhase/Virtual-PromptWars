declare module "supertest" {
  import type { Express } from "express";

  interface TestResponse {
    status: number;
    body: Record<string, unknown>;
  }

  interface TestRequest {
    get(path: string): Promise<TestResponse>;
  }

  export default function request(app: Express): TestRequest;
}
