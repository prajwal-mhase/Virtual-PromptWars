"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RealtimeSnapshot } from "@stadiumos/types";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@stadiumos/ui";
import { fetchSnapshot, WS_URL } from "@/lib/api";

export function CommandCenter() {
  const { data } = useQuery({ queryKey: ["snapshot"], queryFn: fetchSnapshot, refetchInterval: 15000 });
  const [snapshot, setSnapshot] = useState<RealtimeSnapshot | undefined>(data);

  useEffect(() => setSnapshot(data), [data]);
  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === "snapshot") setSnapshot(payload.data);
    };
    return () => socket.close();
  }, []);

  if (!snapshot) return <div className="h-96 animate-pulse rounded-lg bg-black/5 dark:bg-white/10" />;

  const chartData = snapshot.zones.map((zone) => ({ name: zone.name, density: zone.density, predicted: zone.predictedDensity }));

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {snapshot.kpis.map((kpi) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader><CardTitle>{kpi.label}</CardTitle><Badge tone={kpi.status}>{kpi.trend > 0 ? "+" : ""}{kpi.trend}%</Badge></CardHeader>
              <CardContent><div className="text-2xl font-semibold">{kpi.value}</div></CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <Card className="min-h-[390px]">
          <CardHeader><CardTitle>Live Stadium Heatmap</CardTitle><Badge tone="watch">Realtime</Badge></CardHeader>
          <CardContent>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-black/10 bg-[linear-gradient(90deg,rgba(15,118,110,.13)_1px,transparent_1px),linear-gradient(rgba(15,118,110,.13)_1px,transparent_1px)] bg-[size:48px_48px] dark:border-white/10">
              <div className="absolute inset-[18%] rounded-[48%] border-[10px] border-stadium-pitch/50" />
              <AnimatePresence>
                {snapshot.zones.map((zone) => (
                  <motion.div key={zone.id} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 shadow-enterprise" style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: zone.density * 1.4, height: zone.density * 1.4, background: zone.congestionRisk === "HIGH" ? "rgba(220,38,38,.48)" : zone.congestionRisk === "MEDIUM" ? "rgba(183,121,31,.48)" : "rgba(15,118,110,.42)" }} animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}>
                    <span className="sr-only">{zone.name} density {zone.density}%</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>AI Recommended Actions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {snapshot.insights.map((insight) => <div key={insight.id} className="rounded-md border border-black/10 p-3 dark:border-white/10"><Badge tone={insight.priority === "HIGH" ? "risk" : insight.priority === "MEDIUM" ? "watch" : "good"}>{insight.priority}</Badge><h4 className="mt-2 text-sm font-semibold">{insight.title}</h4><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{insight.detail}</p><p className="mt-2 text-sm font-medium">{insight.action}</p></div>)}
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Crowd Forecast</CardTitle></CardHeader><CardContent className="h-72"><ResponsiveContainer><AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" opacity={0.25} /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area dataKey="density" stroke="#0f766e" fill="#0f766e" fillOpacity={0.25} /><Area dataKey="predicted" stroke="#2563eb" fill="#2563eb" fillOpacity={0.18} /></AreaChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle>Vendor Queue Load</CardTitle></CardHeader><CardContent className="h-72"><ResponsiveContainer><BarChart data={snapshot.vendors}><CartesianGrid strokeDasharray="3 3" opacity={0.25} /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="queueMinutes" fill="#b7791f" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      </section>
    </div>
  );
}
