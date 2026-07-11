import type { Config } from "tailwindcss";

import { stadiumTailwindPreset } from "@stadiumos/config/tailwind";

export default {
  presets: [stadiumTailwindPreset],
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"]
} satisfies Config;


