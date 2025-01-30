// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
