import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/whatsapp',
        destination: '/whatsapp',
      },
    ];
  }
};

export default nextConfig;
