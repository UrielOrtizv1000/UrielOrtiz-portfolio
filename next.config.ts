import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for GitHub Pages.
     Served from the custom domain root (https://urielortiz.xyz/),
     so no basePath or assetPrefix is needed. */
  output: "export",
  agentRules: false,
};

export default nextConfig;
