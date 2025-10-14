module.exports = {
	globDirectory: 'build/',
	globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
	swDest: 'build/service-worker.js',
	clientsClaim: true,
	skipWaiting: true,
};
