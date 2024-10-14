/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "githubusercontent.com" },
      { hostname: "**.githubusercontent.com" },
      { hostname: "github.com" },
      { hostname: "**.github.com" },
    ],
  },
};

export default nextConfig;
