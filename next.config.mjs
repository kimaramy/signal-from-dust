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
