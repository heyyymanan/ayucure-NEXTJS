/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    domains: ['your-backend-domain.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://your-backend.com/api/:path*",
      },
      {
        source: "/home",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
