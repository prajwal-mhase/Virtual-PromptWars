"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@stadiumos/ui";
import { api, fetchSnapshot } from "@/lib/api";
import { moduleCopy } from "@/lib/modules";
import { Sun, Wind, ShieldAlert, Train, Car, Compass, Zap, Droplet, Trash2, ClipboardList, Shield, UserCheck, Users } from "lucide-react";
import { cn } from "@stadiumos/ui";

export function ModulePage({ slug }: { slug: string }) {
  const copy = moduleCopy[slug] ?? {
    title: "Analytics",
    subtitle: "Cross-module metrics, funnel performance, operational trends, and executive reporting.",
    icon: moduleCopy.analytics!.icon
  };
  const Icon = copy.icon;
  
  const { data: snapshot } = useQuery({ queryKey: ["snapshot", slug], queryFn: fetchSnapshot });
  const { data: moduleData } = useQuery({ queryKey: ["module", slug], queryFn: () => api<{ name: string; data: any }>(`/modules/${slug}`) });

  const data = moduleData?.data;

  // Custom visualizers based on slug and data
  function renderOperationalWorkspace() {
    if (!data) {
      return <div className="h-48 animate-pulse rounded-lg bg-black/5 dark:bg-white/10" />;
    }

    switch (slug) {
      case "weather":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
              <Sun className="text-amber-500" size={32} />
              <div>
                <p className="text-xs text-slate-500">Temperature</p>
                <p className="text-xl font-bold">{data.temperature}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
              <Wind className="text-slate-500" size={32} />
              <div>
                <p className="text-xs text-slate-500">Wind Speed</p>
                <p className="text-xl font-bold">{data.wind}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
              <Compass className="text-teal-500" size={32} />
              <div>
                <p className="text-xs text-slate-500">Condition</p>
                <p className="text-xl font-bold">{data.condition}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
              <ShieldAlert className={data.lightningRisk === "Low" ? "text-green-500" : "text-red-500"} size={32} />
              <div>
                <p className="text-xs text-slate-500">Lightning Risk</p>
                <p className="text-xl font-bold">{data.lightningRisk}</p>
              </div>
            </div>
          </div>
        );

      case "transport":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                <p className="text-xs text-slate-500">Metro Delay</p>
                <p className="text-lg font-bold">{data.metroDelay}</p>
              </div>
              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                <p className="text-xs text-slate-500">Ride Share Dwell</p>
                <p className="text-lg font-bold">{data.rideShareDwell}</p>
              </div>
              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                <p className="text-xs text-slate-500">Shuttle Load</p>
                <p className="text-lg font-bold">{data.shuttleLoad}</p>
              </div>
            </div>
            <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/50">
              <p className="text-xs font-semibold text-teal-700 dark:text-teal-400">AI Recommendation</p>
              <p className="mt-1 text-sm">{data.recommendation}</p>
            </div>
          </div>
        );

      case "navigation":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table" aria-label="Smart Navigation Routes">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="pb-2 font-semibold">User Mode</th>
                  <th className="pb-2 font-semibold">Route Path</th>
                  <th className="pb-2 font-semibold">ETA</th>
                  <th className="pb-2 font-semibold">Accessibility</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-black/5 dark:border-white/5 last:border-0">
                    <td className="py-3"><Badge tone={item.mode === "EMERGENCY" ? "risk" : item.mode === "VIP" ? "watch" : "good"}>{item.mode}</Badge></td>
                    <td className="py-3 font-medium">{item.route}</td>
                    <td className="py-3">{item.eta}</td>
                    <td className="py-3">{item.accessible ? <Badge tone="good">Wheelchair Access</Badge> : <Badge tone="risk">Steps Only</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "maintenance":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table" aria-label="Maintenance Records">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="pb-2 font-semibold">Equipment</th>
                  <th className="pb-2 font-semibold">Health Score</th>
                  <th className="pb-2 font-semibold">Failure Risk</th>
                  <th className="pb-2 font-semibold">Next Window</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-black/5 dark:border-white/5 last:border-0">
                    <td className="py-3 font-semibold">{item.name}</td>
                    <td className="py-3">
                      <span className={cn(
                        "font-bold",
                        item.healthScore > 80 ? "text-green-600 dark:text-green-400" : item.healthScore > 65 ? "text-orange-500" : "text-red-600 dark:text-red-400"
                      )}>{item.healthScore}%</span>
                    </td>
                    <td className="py-3"><Badge tone={item.failureRisk === "HIGH" ? "risk" : item.failureRisk === "MEDIUM" ? "watch" : "good"}>{item.failureRisk}</Badge></td>
                    <td className="py-3 text-xs text-slate-500">{new Date(item.nextMaintenanceAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "sustainability":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
                <Zap className="text-yellow-500" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Power Usage</p>
                  <p className="text-lg font-bold">{data.powerMw} MW</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
                <Droplet className="text-blue-500" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Water Discharged</p>
                  <p className="text-lg font-bold">{data.waterKl} KL</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
                <Trash2 className="text-green-500" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Waste Diversion</p>
                  <p className="text-lg font-bold">{data.wasteDiversion}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10">
                <Compass className="text-purple-500" size={24} />
                <div>
                  <p className="text-xs text-slate-500">Carbon Footprint</p>
                  <p className="text-lg font-bold">{data.carbonTonnes} tCO2e</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Green Action Recommendation</p>
              <p className="mt-1 text-sm">{data.recommendation}</p>
            </div>
          </div>
        );

      case "volunteers":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table" aria-label="Volunteer Shift Allocations">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="pb-2 font-semibold">Volunteer</th>
                  <th className="pb-2 font-semibold">Assigned Task</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Shift Schedule</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-black/5 dark:border-white/5 last:border-0">
                    <td className="py-3 font-semibold flex items-center gap-2"><UserCheck size={16} />{item.name}</td>
                    <td className="py-3">{item.task}</td>
                    <td className="py-3"><Badge tone="good">{item.status}</Badge></td>
                    <td className="py-3 text-xs text-slate-500">{item.shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "crowd-intelligence":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table" aria-label="Crowd Density Visualizer">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="pb-2 font-semibold">Zone</th>
                  <th className="pb-2 font-semibold">Live Density</th>
                  <th className="pb-2 font-semibold">Forecasted Density</th>
                  <th className="pb-2 font-semibold">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {snapshot?.zones.map((zone) => (
                  <tr key={zone.id} className="border-b border-black/5 dark:border-white/5 last:border-0">
                    <td className="py-3 font-semibold">{zone.name}</td>
                    <td className="py-3 font-bold">{zone.density}%</td>
                    <td className="py-3 text-slate-500">{zone.predictedDensity}%</td>
                    <td className="py-3"><Badge tone={zone.congestionRisk === "HIGH" ? "risk" : zone.congestionRisk === "MEDIUM" ? "watch" : "good"}>{zone.congestionRisk}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "incident-center":
        return (
          <div className="space-y-3">
            {snapshot?.incidents.map((incident) => (
              <div key={incident.id} className="rounded-lg border border-black/10 p-4 dark:border-white/10 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{incident.id}</span>
                    <Badge tone={incident.severity === "CRITICAL" || incident.severity === "HIGH" ? "risk" : "watch"}>{incident.severity}</Badge>
                  </div>
                  <h4 className="font-semibold mt-1">{incident.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">Location: {incident.location}</p>
                </div>
                <div className="text-right">
                  <Badge tone="watch">{incident.status}</Badge>
                  <p className="text-xs font-semibold mt-2 text-slate-600 dark:text-slate-300">Responders: {incident.assignedTeam}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "parking":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table" aria-label="Parking Occupancy Metrics">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="pb-2 font-semibold">Parking Area</th>
                  <th className="pb-2 font-semibold">Occupancy Rate</th>
                  <th className="pb-2 font-semibold">Walking Time</th>
                  <th className="pb-2 font-semibold">AI Recommended</th>
                </tr>
              </thead>
              <tbody>
                {snapshot?.parking.map((lot) => {
                  const rate = Math.round((lot.occupancy / lot.capacity) * 100);
                  return (
                    <tr key={lot.id} className="border-b border-black/5 dark:border-white/5 last:border-0">
                      <td className="py-3 font-semibold">{lot.name}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{rate}%</span>
                          <span className="text-xs text-slate-400">({lot.occupancy}/{lot.capacity})</span>
                        </div>
                      </td>
                      <td className="py-3">{lot.walkingMinutes} mins walk</td>
                      <td className="py-3">{lot.recommended ? <Badge tone="good">Recommended</Badge> : <span className="text-slate-400">-</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );

      case "food":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table" aria-label="Food Vendor Live Queues">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="pb-2 font-semibold">Vendor</th>
                  <th className="pb-2 font-semibold">Queue Estimate</th>
                  <th className="pb-2 font-semibold">Signature Dish</th>
                </tr>
              </thead>
              <tbody>
                {snapshot?.vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-black/5 dark:border-white/5 last:border-0">
                    <td className="py-3 font-semibold">{vendor.name} <span className="text-xs font-normal text-slate-400">({vendor.cuisine})</span></td>
                    <td className="py-3 font-bold text-orange-600 dark:text-orange-400">{vendor.queueMinutes} mins wait</td>
                    <td className="py-3 text-xs">{vendor.popularItems.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "tickets":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                <p className="text-xs text-slate-500">Total Stadium Capacity</p>
                <p className="text-xl font-bold">{snapshot?.ticketSummary.total.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                <p className="text-xs text-slate-500">Tickets Scanned In</p>
                <p className="text-xl font-bold">{snapshot?.ticketSummary.scanned.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                <p className="text-xs text-slate-500">Scan Exceptions</p>
                <p className="text-xl font-bold text-red-500">{snapshot?.ticketSummary.exceptions.toLocaleString()}</p>
              </div>
            </div>
            <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/50">
              <p className="text-xs font-semibold text-teal-700 dark:text-teal-400">Access Guidelines</p>
              <p className="mt-1 text-sm">{snapshot?.ticketSummary.recommendedGate}</p>
            </div>
          </div>
        );

      default:
        // Generic fallback structured representation for raw object or arrays
        if (typeof data === "object" && data !== null) {
          const entries = Object.entries(data);
          return (
            <div className="grid gap-4 sm:grid-cols-2">
              {entries.map(([key, val]) => (
                <div key={key} className="rounded-lg border border-black/10 p-4 dark:border-white/10">
                  <p className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-md font-semibold mt-1">{String(val)}</p>
                </div>
              ))}
            </div>
          );
        }
        return (
          <pre className="max-h-[430px] overflow-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">
            {JSON.stringify(data, null, 2)}
          </pre>
        );
    }
  }

  return (
    <div className="space-y-6">
      <section className="glass rounded-lg p-6">
        <div className="flex items-start gap-4">
          <span className="rounded-lg bg-stadium-ink p-3 text-white dark:bg-white dark:text-stadium-ink" aria-hidden="true">
            <Icon size={24} />
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1>
            <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{copy.subtitle}</p>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {snapshot?.kpis.slice(0, 3).map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
              <Badge tone={kpi.status}>{kpi.trend}%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Operational Workspace</CardTitle>
          </CardHeader>
          <CardContent>
            {renderOperationalWorkspace()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Decision Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {snapshot?.insights.map((insight) => (
              <div key={insight.id} className="rounded-md border border-black/10 p-3 dark:border-white/10">
                <Badge tone={insight.priority === "HIGH" ? "risk" : "watch"}>{insight.priority}</Badge>
                <p className="mt-2 text-sm font-semibold">{insight.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{insight.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
