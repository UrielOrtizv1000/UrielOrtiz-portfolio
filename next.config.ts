import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for GitHub Pages, served from the repo subpath */
  output: "export",
  basePath: "/UrielOrtiz-portfolio",
  assetPrefix: "/UrielOrtiz-portfolio/",
};

export default nextConfig;
