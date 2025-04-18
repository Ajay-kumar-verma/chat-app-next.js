// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/old-page',      // the old route
        destination: '/new-page', // where it should go
        permanent: true,          // true = 308 (permanent), false = 307 (temporary)
      },
    ];
  },
};

module.exports = nextConfig;
