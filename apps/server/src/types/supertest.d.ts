declare module "supertest" {
  import type { Express } from "express";

  interface TestResponse {
    status: number;
    body: any;
    headers: Record<string, any>;
  }

  interface TestRequest {
    get(path: string): Promise<TestResponse>;
    post(path: string): TestRequest;
    set(name: string, value: string): TestRequest;
    send(data: unknown): Promise<TestResponse>;
  }

  export default function request(app: Express): TestRequest;
}
