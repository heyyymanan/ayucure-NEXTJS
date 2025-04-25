/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",//allows CDN
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',//allows CDN
        pathname: '/ayucure/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://your-backend.com/api/:path*",//example
      },
      {
        source: "/home",
        destination: "/", // syncs '/' & '/home'
      },
    ];
  },
};

export default nextConfig;
