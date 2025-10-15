module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}',
		'manifest.json',
	],
	swDest: 'dist/service-worker.js',
	clientsClaim: true,
	skipWaiting: true,
	cleanupOutdatedCaches: true,
	maximumFileSizeToCacheInBytes: 5000000, // 5MB
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/www\.omdbapi\.com\//,
			handler: 'NetworkFirst',
			options: {
				cacheName: 'omdb-api-cache',
				networkTimeoutSeconds: 10,
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
			handler: 'CacheFirst',
			options: {
				cacheName: 'images-cache',
				expiration: {
					maxEntries: 100,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
				},
			},
		},
		{
			urlPattern: /\.(?:js|css)$/,
			handler: 'StaleWhileRevalidate',
			options: {
				cacheName: 'static-resources-cache',
			},
		},
	],
};
