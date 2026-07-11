import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@stadiumos/ui";
import { moduleCopy } from "@/lib/modules";

export default function FeaturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4"><div><h1 className="text-4xl font-semibold">Platform Features</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Every module needed for FIFA-scale venue operations.</p></div><Button asChild><Link href="/dashboard">Launch <ArrowRight size={16} /></Link></Button></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Object.entries(moduleCopy).map(([slug, item]) => <Card key={slug}><CardHeader><CardTitle>{item.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600 dark:text-slate-300">{item.subtitle}</p><Link className="mt-4 inline-flex text-sm font-medium" href={`/${slug}`}>Open module</Link></CardContent></Card>)}</div>
    </main>
  );
}
