import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  fallbacks: {
    document: "/offline",
  },
});

export default withPWA(nextConfig);
