import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    },
  },
};

export default nextConfig;
