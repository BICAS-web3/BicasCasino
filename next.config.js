/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next",
          outputPath: "static/media",
          name: "[name].[hash].[ext]",
        },
      },
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};
