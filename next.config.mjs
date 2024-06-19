/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://hen8t7wcoc.execute-api.us-east-1.amazonaws.com/:path*", // Proxy to Backend
      },
      {
        source: "/jokes/:path*",
        destination: "https://api.chucknorris.io/jokes/:path*", // Proxy to Backend
      },
      {
        source: "/fintoc/:path*",
        destination: "https://api.fintoc.com/v1/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
