module.exports = {
	globDirectory: 'dist/',
	globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
	swDest: 'dist/service-worker.js',
	clientsClaim: true,
	skipWaiting: true,
};
