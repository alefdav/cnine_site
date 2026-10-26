import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // O PDF cifrado do guia é lido em tempo de execução: precisa ir junto com as funções que o entregam.
  outputFileTracingIncludes: {
    "/api/ebook/paraguai/download": ["./private/ebook-paraguai.pdf.enc"],
  },
};

export default nextConfig;
