/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

// import withPlaiceholder from '@plaiceholder/next';

const bundleAnalyser = withBundleAnalyzer({
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
        destination: '/products/ladies',
        permanent: false,
      },
    ];
  },
};

export default bundleAnalyser(nextConfig);
