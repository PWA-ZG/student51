const withPWA = require("@ducanh2912/next-pwa").default({
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	dest: "public",
	fallbacks: {
		"/offline": "/offline",
	},
	workboxOptions: {
		disableDevLogs: true,
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPWA(nextConfig)
