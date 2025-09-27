import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enhanced development configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors. Only enable in development.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Only disable in development.
    ignoreDuringBuilds: false,
  },
  // Enable turbopack for faster builds
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Enable experimental features for better development experience
  experimental: {
    // Enable faster refresh for better hot reload
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Webpack configuration for better development experience
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Enable better source maps for debugging
      config.devtool = 'eval-source-map';

      // Optimize for faster rebuilds
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

export default nextConfig;
