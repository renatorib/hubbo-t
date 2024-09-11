/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
