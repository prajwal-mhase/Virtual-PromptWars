import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@stadiumos/ui";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 py-16">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-28 dark:opacity-22"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=2400&q=80')" }}
        />
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm backdrop-blur dark:border-white/10 dark:bg-black/30"><ShieldCheck size={16} /> FIFA-scale tournament operations</div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">StadiumOS AI</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200">A GenAI-powered command platform for smart stadium operations, emergency response, crowd intelligence, visitor assistance, vendors, volunteers, tickets, parking, maintenance, and sustainability.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/dashboard">Open Command Center <ArrowRight size={18} /></Link></Button>
            <Button asChild variant="secondary" size="lg"><Link href="/features">Explore features</Link></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
