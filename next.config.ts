import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/GLOBAL_MILITARY',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
