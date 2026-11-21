import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix: Next.js 16 Turbopack me next/font/google (Playfair Display) fail hota hai
  // Is liye build webpack par chalega — package.json me "next build --webpack" zaroori hai
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/products/ladies-wallet-pink",
        destination: "/product/ladies-wallet",
        permanent: true,
      },
      {
        source: "/product/ladies-wallet-pink",
        destination: "/product/ladies-wallet",
        permanent: true,
      },
      {
        source: "/products/ladies-wallet",
        destination: "/product/ladies-wallet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;