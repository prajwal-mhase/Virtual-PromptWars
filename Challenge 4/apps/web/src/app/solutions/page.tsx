import Link from "next/link";
import { Building2, Shield, Users } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@stadiumos/ui";

const solutions = [
  { title: "Stadium Managers", icon: Building2, text: "Executive control over matchday readiness, operations, KPIs, resources, vendors, and sustainability." },
  { title: "Security and Emergency", icon: Shield, text: "Incident detection, severity scoring, evacuation guidance, team dispatch, and live timelines." },
  { title: "Visitors and Volunteers", icon: Users, text: "Natural language support, navigation, accessibility, parking, tickets, lost and found, and task assignment." }
];

export default function SolutionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-semibold">Solutions</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Role-aware operations software for everyone inside and around a World Cup stadium.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">{solutions.map((solution) => <Card key={solution.title}><CardHeader><solution.icon size={24} /><CardTitle>{solution.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-600 dark:text-slate-300">{solution.text}</p></CardContent></Card>)}</div>
      <Button asChild className="mt-8"><Link href="/dashboard">Open Command Center</Link></Button>
    </main>
  );
}
