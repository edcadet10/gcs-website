/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const path = require('path');

const nextConfig = {
  reactStrictMode: false, // Disable strict mode for better hot reloading
  i18n,
  images: {
    domains: ['localhost', 'yoursupabasebucket.supabase.co'],
  },
  // Enable CSS import in JS files
  webpack(config) {
    return config;
  },
  // Removing the unnecessary redirect that creates a loop
  async redirects() {
    return [];
  },
  // Add path aliases
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig