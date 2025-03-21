/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [];
  },
  env: {
    PORT: 3001,
  },
  transpilePackages: ['@ant-design/icons', '@ant-design/icons-svg', 'antd'],
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig 