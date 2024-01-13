/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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

module.exports = withBundleAnalyzer(nextConfig);
