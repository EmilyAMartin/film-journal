import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
	Box,
	IconButton,
	Snackbar,
	Alert,
} from '@mui/material';
import {
	GetApp as InstallIcon,
	Close as CloseIcon,
	PhoneAndroid as MobileIcon,
	Computer as DesktopIcon,
} from '@mui/icons-material';
import { usePWAInstall } from '../src/hooks/usePWAInstall';

const InstallPrompt = () => {
	const { canInstall, installApp, isInstalled } = usePWAInstall();
	const [showPrompt, setShowPrompt] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	// Show prompt after a delay if installable
	React.useEffect(() => {
		if (canInstall && !isInstalled) {
			const timer = setTimeout(() => {
				setShowPrompt(true);
			}, 3000); // Show after 3 seconds
			return () => clearTimeout(timer);
		}
	}, [canInstall, isInstalled]);

	const handleInstall = async () => {
		const success = await installApp();
		if (success) {
			setShowPrompt(false);
			setShowSuccess(true);
		}
	};

	const handleDismiss = () => {
		setShowPrompt(false);
		// Store dismissal in localStorage to avoid showing again
		localStorage.setItem('pwa-install-dismissed', 'true');
	};

	// Don't show if user previously dismissed
	React.useEffect(() => {
		const dismissed = localStorage.getItem('pwa-install-dismissed');
		if (dismissed === 'true') {
			setShowPrompt(false);
		}
	}, []);

	if (!showPrompt || isInstalled) return null;

	return (
		<>
			{/* Install Prompt Card */}
			<Snackbar
				open={showPrompt}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				sx={{ mb: 2 }}
			>
				<Card sx={{ minWidth: 300, maxWidth: 400 }}>
					<CardContent sx={{ pb: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
							<InstallIcon sx={{ mr: 1, color: 'primary.main' }} />
							<Typography
								variant='h6'
								component='div'
							>
								Install Film Journal
							</Typography>
							<IconButton
								size='small'
								onClick={handleDismiss}
								sx={{ ml: 'auto' }}
							>
								<CloseIcon />
							</IconButton>
						</Box>
						<Typography
							variant='body2'
							color='text.secondary'
						>
							Install this app on your device for a better experience. Works offline
							and feels like a native app!
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
							<MobileIcon
								fontSize='small'
								color='primary'
							/>
							<Typography
								variant='caption'
								color='text.secondary'
							>
								Available on mobile and desktop
							</Typography>
						</Box>
					</CardContent>
					<CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
						<Button
							onClick={handleInstall}
							variant='contained'
							startIcon={<InstallIcon />}
							fullWidth
							sx={{ borderRadius: 2 }}
						>
							Install App
						</Button>
					</CardActions>
				</Card>
			</Snackbar>

			{/* Success Message */}
			<Snackbar
				open={showSuccess}
				autoHideDuration={4000}
				onClose={() => setShowSuccess(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					severity='success'
					variant='filled'
				>
					<Typography variant='body2'>
						🎉 Film Journal installed successfully!
					</Typography>
				</Alert>
			</Snackbar>
		</>
	);
};

export default InstallPrompt;
