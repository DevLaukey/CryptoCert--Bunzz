/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        pathname: '/ipfs/*',
        
      },
      {

        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**/*',
        
          
      }
 
    ],
  },

}

module.exports = nextConfig
