import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [wasOffline, setWasOffline] = useState(false);

	useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
			setWasOffline(true);
			// Reset the wasOffline flag after a short delay
			setTimeout(() => setWasOffline(false), 3000);
		};

		const handleOffline = () => {
			setIsOnline(false);
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return { isOnline, wasOffline };
};
