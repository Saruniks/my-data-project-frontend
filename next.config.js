/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for CloudFront compatibility
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  trailingSlash: true,
  
  // No rewrites needed - CloudFront will handle /api/* routing directly
  
  // Output standalone build for better CloudFront compatibility
  output: 'standalone',
}

module.exports = nextConfig
