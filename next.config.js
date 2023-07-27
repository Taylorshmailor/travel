/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // }
  images: {
    domains: ['images.pexels.com'],
  }
}

module.exports = nextConfig
