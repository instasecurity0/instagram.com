import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // eslint: {
  //   ignoreDuringBuilds: true, // Abaikan semua error ESLint pas build
  // },
  // typescript: {
  //   ignoreBuildErrors: true, // Abaikan semua error TypeScript pas build
  // },

  // Security headers
  async headers() {
    return [
      {
        source: "/accounts/password/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;