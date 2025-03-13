/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure static assets are handled correctly
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Configure static generation
  trailingSlash: true
}

module.exports = nextConfig 