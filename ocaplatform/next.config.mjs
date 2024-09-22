/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be.oca.classlionvn.net",
        port: "",
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
