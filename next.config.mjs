import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivityPosition: 'top-right',
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'image.goat.com',
      'images.stockx.com',
      'cdn.flightclub.com',
      'stockx.imgix.net',
    ],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
