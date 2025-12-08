// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// ===============================

// const withPWA = require("next-pwa")({
//   dest: "public",
//   // disable: process.env.NODE_ENV === 'development',
//   // register: true,
//   // scope: '/app',
//   //   sw: "service-worker.js",
//   //...
// });

// module.exports = withPWA({
//   // next.js config
// });

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "sw.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\..*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
});

export default withPWAConfig(nextConfig);
