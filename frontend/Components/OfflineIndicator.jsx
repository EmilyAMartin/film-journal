import React from 'react';
import { Alert, AlertTitle, Snackbar, Slide } from '@mui/material';
import { useOnlineStatus } from '../src/hooks/useOnlineStatus';

const SlideTransition = (props) => {
	return (
		<Slide
			{...props}
			direction='down'
		/>
	);
};

const OfflineIndicator = () => {
	const { isOnline, wasOffline } = useOnlineStatus();
	const [showReconnected, setShowReconnected] = React.useState(false);

	React.useEffect(() => {
		if (wasOffline && isOnline) {
			setShowReconnected(true);
			const timer = setTimeout(() => setShowReconnected(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [wasOffline, isOnline]);

	return (
		<>
			{/* Offline Alert */}
			<Snackbar
				open={!isOnline}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				TransitionComponent={SlideTransition}
				sx={{ mt: 8 }}
			>
				<Alert
					severity='warning'
					variant='filled'
					sx={{
						minWidth: 300,
						'& .MuiAlert-message': {
							width: '100%',
						},
					}}
				>
					<AlertTitle>You're offline</AlertTitle>
					Your data is saved locally. Some features may be limited.
				</Alert>
			</Snackbar>

			{/* Reconnected Alert */}
			<Snackbar
				open={showReconnected}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				TransitionComponent={SlideTransition}
				sx={{ mt: 8 }}
			>
				<Alert
					severity='success'
					variant='filled'
					sx={{
						minWidth: 300,
						'& .MuiAlert-message': {
							width: '100%',
						},
					}}
				>
					<AlertTitle>Back online!</AlertTitle>
					All features are now available.
				</Alert>
			</Snackbar>
		</>
	);
};

export default OfflineIndicator;
