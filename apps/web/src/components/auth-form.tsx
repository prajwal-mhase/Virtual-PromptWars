"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@stadiumos/ui";
import { api } from "@/lib/api";

export function AuthForm({ mode }: { mode: "login" | "register" | "forgot" }) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (mode === "forgot") return setStatus("Password recovery instructions have been prepared for your email channel.");
    const path = mode === "login" ? "/auth/login" : "/auth/register";
    await api(path, { method: "POST", body: JSON.stringify(data) });
    router.push("/dashboard");
  }
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>{mode === "login" ? "Login" : mode === "register" ? "Register" : "Reset Password"}</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={submit}>
            {mode === "register" && (
              <div>
                <label htmlFor="name-input" className="sr-only">Full Name</label>
                <input id="name-input" required name="name" className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 dark:border-white/10" placeholder="Full name" aria-label="Full Name" />
              </div>
            )}
            <div>
              <label htmlFor="email-input" className="sr-only">Email Address</label>
              <input id="email-input" required name="email" type="email" className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 dark:border-white/10" placeholder="Email" defaultValue={mode === "login" ? "admin@stadiumos.ai" : ""} aria-label="Email Address" />
            </div>
            {mode !== "forgot" && (
              <div>
                <label htmlFor="password-input" className="sr-only">Password</label>
                <input id="password-input" required name="password" type="password" minLength={8} className="w-full rounded-md border border-black/10 bg-transparent px-3 py-2 dark:border-white/10" placeholder="Password" defaultValue={mode === "login" ? "StadiumOS2026!" : ""} aria-label="Password" />
              </div>
            )}
            <Button className="w-full">{mode === "login" ? "Sign in" : mode === "register" ? "Create account" : "Send recovery"}</Button>
            {status && <p role="status" className="text-sm text-stadium-pitch">{status}</p>}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
