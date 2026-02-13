import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  sassOptions: {
    quietDeps: true,
    //implementation: 'sass-embedded',
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wetransfercashapi.agensic.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
    domains: ['localhost', '127.0.0.1'], // <-- autoriser localhost
  },
};

export default nextConfig;
