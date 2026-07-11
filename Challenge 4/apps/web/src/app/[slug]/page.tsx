import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ModulePage } from "@/components/module-page";
import { moduleCopy } from "@/lib/modules";

const standalone = new Set(["features", "solutions", "login", "register", "forgot-password"]);

export default function DynamicPage({ params }: { params: { slug: string } }) {
  if (standalone.has(params.slug)) return notFound();
  if (!moduleCopy[params.slug]) return notFound();
  return <AppShell><ModulePage slug={params.slug} /></AppShell>;
}
