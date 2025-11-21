/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // ローカル開発: basePath なし
  // 本番ビルド: basePath あり
  basePath: process.env.NODE_ENV === 'production' ? '/poker-preflop-trainer' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig