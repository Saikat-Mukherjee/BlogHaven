/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  // output: 'export', // Commented out for development
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Remove experimental config as turbo is stable in Next.js 15
};

module.exports = nextConfig;
