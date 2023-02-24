/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['gateway.pinata.cloud', 'githubusercontent.com'],
        pathname: '/ipfs/*',

      },
    ],
  },

}

module.exports = nextConfig
