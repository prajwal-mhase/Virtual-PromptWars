import { AppShell } from "@/components/app-shell";
import { CommandCenter } from "@/components/command-center";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-6"><h1 className="text-3xl font-semibold tracking-tight">AI Command Center</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Live venue KPIs, incidents, crowd flow, AI insights, ticketing, parking, weather, and recommended actions.</p></div>
      <CommandCenter />
    </AppShell>
  );
}
