import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve already-compressed WebP files as-is. Render's CPU is too small
  // to resize multi-megabyte PNGs on the first request.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
