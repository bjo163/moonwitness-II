import path from "node:path";
import type { NextConfig } from "next";

const repositoryRoot = path.resolve(process.cwd(), "../..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: repositoryRoot,
  outputFileTracingIncludes: {
    "/**": ["../../data/**/*.yaml"]
  }
};

export default nextConfig;
