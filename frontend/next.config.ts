import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'dfhe5ze0n4pxu.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      }
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
