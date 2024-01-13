/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lp2.hm.com',
      },
      {
        protocol: 'https',
        hostname: 'image.hm.com',
      },
    ],
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/products/ladies_all',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
