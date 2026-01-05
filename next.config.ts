import type { NextConfig } from "next";
// Force rebuild


const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/GLOBAL_MILITARY',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
