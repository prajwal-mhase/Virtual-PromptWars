"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@stadiumos/ui";
import { api, fetchSnapshot } from "@/lib/api";
import { moduleCopy } from "@/lib/modules";

export function ModulePage({ slug }: { slug: string }) {
  const copy = moduleCopy[slug] ?? moduleCopy.analytics;
  const Icon = copy.icon;
  const { data: snapshot } = useQuery({ queryKey: ["snapshot", slug], queryFn: fetchSnapshot });
  const { data: moduleData } = useQuery({ queryKey: ["module", slug], queryFn: () => api<{ data: unknown }>(`/modules/${slug}`) });
  return (
    <div className="space-y-6">
      <section className="glass rounded-lg p-6">
        <div className="flex items-start gap-4"><span className="rounded-lg bg-stadium-ink p-3 text-white dark:bg-white dark:text-stadium-ink"><Icon size={24} /></span><div><h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1><p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{copy.subtitle}</p></div></div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {snapshot?.kpis.slice(0, 3).map((kpi) => <Card key={kpi.label}><CardHeader><CardTitle>{kpi.label}</CardTitle><Badge tone={kpi.status}>{kpi.trend}%</Badge></CardHeader><CardContent><div className="text-2xl font-semibold">{kpi.value}</div></CardContent></Card>)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card><CardHeader><CardTitle>Operational Workspace</CardTitle></CardHeader><CardContent><pre className="max-h-[430px] overflow-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">{JSON.stringify(moduleData?.data ?? snapshot, null, 2)}</pre></CardContent></Card>
        <Card><CardHeader><CardTitle>Decision Support</CardTitle></CardHeader><CardContent className="space-y-3">{snapshot?.insights.map((insight) => <div key={insight.id} className="rounded-md border border-black/10 p-3 dark:border-white/10"><Badge tone={insight.priority === "HIGH" ? "risk" : "watch"}>{insight.priority}</Badge><p className="mt-2 text-sm font-semibold">{insight.title}</p><p className="text-sm text-slate-600 dark:text-slate-300">{insight.action}</p></div>)}</CardContent></Card>
      </section>
    </div>
  );
}
