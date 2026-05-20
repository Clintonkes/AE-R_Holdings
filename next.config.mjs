/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Proxy all /api/* and /health requests to the internal FastAPI server.
  // In production (Railway) the browser hits the Next.js port and Next.js
  // forwards server-side to FastAPI — no second public port needed.
  async rewrites() {
    const apiBase = `http://localhost:${process.env.API_PORT || 8001}`;
    return [
      { source: '/api/:path*', destination: `${apiBase}/api/:path*` },
      { source: '/health',     destination: `${apiBase}/health` },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
