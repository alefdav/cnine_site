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
  // Os PDFs cifrados dos guias são lidos em tempo de execução: precisam ir junto com a função que os entrega.
  outputFileTracingIncludes: {
    "/api/ebook/[slug]/download": ["./private/*.pdf.enc"],
  },
};

export default nextConfig;
