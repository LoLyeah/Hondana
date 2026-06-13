import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['recharts'],
  },
  poweredByHeader: false,
};

export default nextConfig;

