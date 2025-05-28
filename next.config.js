/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'otakudesu.cloud',
        },
        {
          hostname: 'animekita.org',
        },
      ],
    },
  };
  
  export default nextConfig;
  