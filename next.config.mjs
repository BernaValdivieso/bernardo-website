/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://hen8t7wcoc.execute-api.us-east-1.amazonaws.com/:path*",
      },
      {
        source: "/jokes/:path*",
        destination: "https://api.chucknorris.io/jokes/:path*",
      },
      {
        source: "/fintoc/:path*",
        destination:
          "https://p0rtpx8s4d.execute-api.us-east-1.amazonaws.com/:path*",
      },
    ];
  },
};

export default nextConfig;
