import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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