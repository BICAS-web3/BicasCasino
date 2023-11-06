/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  //basePath: '/test',
  async rewrites() {
    return [];
  },
  images: {
    domains: ["game.greekkeepers.io"],
  },
};
