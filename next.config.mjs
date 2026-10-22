
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Enable normal Next.js deployment with server functions.
  // Required for POST /api/contact and Nodemailer.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
