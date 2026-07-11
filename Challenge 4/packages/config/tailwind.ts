import type { Config } from "tailwindcss";

export const stadiumTailwindPreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        stadium: {
          ink: "#101418",
          panel: "#151b20",
          mist: "#eef2f3",
          line: "#d7dee2",
          pitch: "#0f766e",
          signal: "#2563eb",
          amber: "#b7791f",
          danger: "#dc2626"
        }
      },
      boxShadow: {
        enterprise: "0 24px 80px rgba(16, 20, 24, 0.14)"
      }
    }
  }
} satisfies Partial<Config>;
