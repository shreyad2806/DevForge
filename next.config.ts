import type { NextConfig } from "next";
import path from "path";

declare const __dirname: string;

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
