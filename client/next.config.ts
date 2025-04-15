import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compilerOptions: {
    baseUrl: "./",
    paths: {
      "@/*": ["src/*"],
    },
    // other options
  },
  include: ["src/**/*"],
};

export default nextConfig;
