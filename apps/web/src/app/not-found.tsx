import Link from "next/link";
import { Button } from "@stadiumos/ui";

export default function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="text-5xl font-semibold">404</h1><p className="max-w-md text-slate-600 dark:text-slate-300">This route is outside the active stadium operations map.</p><Button asChild><Link href="/dashboard">Return to Command Center</Link></Button></main>;
}
