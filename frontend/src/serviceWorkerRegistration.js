export function register() {
	if ('serviceWorker' in navigator) {
		const base = import.meta.env.BASE_URL || '/';
		const swUrl = new URL('service-worker.js', base).toString();

		window.addEventListener('load', async () => {
			try {
				// avoid registering if the SW file isn't present (prevents 404 in console)
				const res = await fetch(swUrl, { method: 'HEAD' });
				if (!res.ok) throw new Error(`Service worker not found at ${swUrl}`);

				const registration = await navigator.serviceWorker.register(swUrl);
				console.log('SW registered:', swUrl, registration);
			} catch (registrationError) {
				console.error('SW registration failed:', registrationError);
			}
		});
	}
}
