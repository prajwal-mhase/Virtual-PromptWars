import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@stadiumos/ui", "@stadiumos/types"],
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"]
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  }
};

export default nextConfig;
