/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8282/:path*' // Proxy to Backend
            },
            {
                source: '/static/:path*',
                destination: 'http://localhost:8585/:path*' // proxy to nginx serving static files
            }
        ]
    }
}
