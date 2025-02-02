/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "cdn.discordapp.com",
    ],
  },
};

export default nextConfig;
