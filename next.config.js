/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure static assets are handled correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Disable server components since we're using edge runtime
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig 