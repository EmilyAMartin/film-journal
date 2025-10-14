self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', function (event) {
	// Basic cache-first strategy
	event.respondWith(
		caches.open('film-journal').then(function (cache) {
			return cache.match(event.request).then(function (response) {
				return response || fetch(event.request);
			});
		})
	);
});
