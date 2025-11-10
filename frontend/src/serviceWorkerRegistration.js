export function register() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			// Try production path first, then fallback to dev path
			const swPath = import.meta.env.PROD ? '/dist/service-worker.js' : '/service-worker.js';
			
			navigator.serviceWorker
				.register(swPath)
				.then((registration) => {
					console.log('SW registered: ', registration);
				})
				.catch((registrationError) => {
					console.log('SW registration failed: ', registrationError);
					// Try fallback path if first attempt failed
					if (swPath === '/dist/service-worker.js') {
						console.log('Trying fallback path: /service-worker.js');
						navigator.serviceWorker
							.register('/service-worker.js')
							.then((registration) => {
								console.log('SW registered (fallback): ', registration);
							})
							.catch((err) => {
								console.log('SW registration failed (fallback): ', err);
							});
					}
				});
		});
	}
}
