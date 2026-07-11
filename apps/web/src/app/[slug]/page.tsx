import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { moduleCopy } from "@/lib/modules";

const standalone = new Set(["features", "solutions", "login", "register", "forgot-password"]);

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (standalone.has(slug)) return notFound();
  if (!moduleCopy[slug]) return notFound();
  return <AppShell><ModulePage slug={slug} /></AppShell>;
}
