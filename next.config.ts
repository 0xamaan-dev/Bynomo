import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {},
  async redirects() {
    return [
      { source: '/', destination: '/trade', permanent: false },
    ];
  },
};

export default nextConfig;
