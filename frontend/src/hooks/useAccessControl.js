import { useState, useEffect } from 'react';

export const useAccessControl = () => {
	const [hasAccess, setHasAccess] = useState(false);
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		// Check if user has access
		const checkAccess = () => {
			const access = localStorage.getItem('film_journal_access');
			setHasAccess(access === 'true');
			setIsChecking(false);
		};

		checkAccess();
	}, []);

	const grantAccess = () => {
		setHasAccess(true);
	};

	const revokeAccess = () => {
		localStorage.removeItem('film_journal_access');
		setHasAccess(false);
		// Reload the page to reset the app state
		window.location.reload();
	};

	return {
		hasAccess,
		isChecking,
		grantAccess,
		revokeAccess,
	};
};
