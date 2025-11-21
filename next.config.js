/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/poker-preflop-trainer',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig