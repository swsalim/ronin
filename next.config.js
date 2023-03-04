const nextConfig = {
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['stats.yuurrific.com', 'img.buymeacoffee.com', 'res.cloudinary.com'],
  },
  // swcMinify: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
