import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // Pinned here so the protection travels with the code instead of depending
  // on whatever the host adds. frame-ancestors stops other sites framing the
  // pages; it is the only CSP directive set, because a full policy would have
  // to allow Next's inline scripts.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  experimental: {
    // TypeScript 7 ships a native compiler without the legacy API Next reads
    // directly, so type-checking runs through the tsc CLI instead.
    useTypeScriptCli: true,
  },
};

export default nextConfig;
