import type { NextConfig } from "next";

const allowedOrigins = ["*.github.dev", "localhost:3000", "*.app.github.dev"];

if (process.env.APP_URL) {
  // Extract just the hostname (e.g., from https://my-app.com to my-app.com)
  const url = process.env.APP_URL.replace(/^https?:\/\//, '').split('/')[0];
  allowedOrigins.push(url);
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
