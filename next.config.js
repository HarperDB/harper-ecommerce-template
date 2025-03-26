const nextConfig = {
	reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true, },
  images: { unoptimized: true },
	// The following is required to run a Next.js app using the 
	// Harper extension: https://github.com/HarperDB/nextjs
  webpack: (config) => {
		config.externals.push({
			harperdb: 'commonjs harperdb',
		});
		return config;
	},
};

module.exports = nextConfig;
