import type { NextConfig } from "next";

require("dotenv").config();

const nextConfig: NextConfig = {
  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET,
  },
};

export default nextConfig;
