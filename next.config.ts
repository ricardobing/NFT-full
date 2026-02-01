import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize build for Vercel
  reactStrictMode: true,
  
  // Ensure proper handling of artifacts
  transpilePackages: [],
  
  webpack: (config, { isServer }) => {
    // Ignore Hardhat files during Next.js build
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Exclude Hardhat directories from being processed
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/cache/**',
        '**/artifacts/build-info/**',
        '**/.git',
      ],
    };
    
    return config;
  },
};

export default nextConfig;
