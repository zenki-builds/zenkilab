import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/zenkilab",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
