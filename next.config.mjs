// @ts-check

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ygpfckjmxgbewxkislyq.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
  /**
   * https://vercel.com/guides/how-to-enable-cors
   */
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `/api/seoulAirQuality`,
        destination: `${process.env.SEOUL_OPENAPI_URL}/${process.env.SEOUL_OPENAPI_KEY}/json/ListAvgOfSeoulAirQualityService/1/5/`,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
