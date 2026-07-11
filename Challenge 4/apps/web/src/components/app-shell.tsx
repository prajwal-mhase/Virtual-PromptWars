"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@stadiumos/ui";
import { navItems } from "@/lib/modules";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 z-30 hidden h-screen border-r border-black/10 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-stadium-ink/70 lg:block">
        <Link href="/dashboard" className="mb-6 flex items-center gap-3 rounded-lg px-2 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stadium-ink text-white dark:bg-white dark:text-stadium-ink"><ShieldCheck size={21} /></span>
          <span><strong className="block text-sm">StadiumOS AI</strong><span className="text-xs text-slate-500 dark:text-slate-400">FIFA operations suite</span></span>
        </Link>
        <nav className="space-y-1 overflow-y-auto pb-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm transition", active ? "bg-stadium-ink text-white dark:bg-white dark:text-stadium-ink" : "text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10")}>
                <Icon size={17} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/10 bg-white/70 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-stadium-ink/70 lg:px-8">
          <Link href="/dashboard" className="font-semibold lg:hidden">StadiumOS AI</Link>
          <div className="hidden text-sm text-slate-500 dark:text-slate-400 lg:block">World Cup 2026 Operations Command</div>
          <button aria-label="Toggle theme" className="rounded-md border border-black/10 p-2 dark:border-white/10" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="hidden dark:block" size={18} />
            <Moon className="dark:hidden" size={18} />
          </button>
        </header>
        <div className="px-4 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
