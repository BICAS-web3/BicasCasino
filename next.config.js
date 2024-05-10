/**
 * @type { import("next").NextConfig }
 */
module.exports = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      },
      // Handle GLTF imports
      {
        test: /\.(gltf|glb)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/models',
              outputPath: 'static/models',
              name: '[name].[hash].[ext]'
            }
          }
        ]
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.(svg|gltf|glb)$/i

    return config
  },
  reactStrictMode: false,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'game.greekkeepers.io',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'rew.greekkeepers.io',
        port: '',
        pathname: '**'
      }
    ]
  }
}
