import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*.github.dev", "localhost:3000", "*.app.github.dev"],
    },
  },
};

export default nextConfig;
