import * as React from "react";
import { cn } from "../utils";

const toneClass = {
  good: "bg-teal-50 text-teal-700 ring-teal-600/20 dark:bg-teal-400/10 dark:text-teal-200",
  watch: "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-200",
  risk: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-200",
  neutral: "bg-slate-50 text-slate-700 ring-slate-600/20 dark:bg-white/10 dark:text-slate-200"
};

export function Badge({ tone = "neutral", className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof toneClass }) {
  return <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", toneClass[tone], className)} {...props} />;
}
