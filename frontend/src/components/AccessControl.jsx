import React, { useState, useEffect } from 'react';
import {
	Box,
	Paper,
	TextField,
	Button,
	Typography,
	Alert,
	CircularProgress,
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const AccessControl = ({ onAccessGranted }) => {
	const [accessCode, setAccessCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [attempts, setAttempts] = useState(0);
	const VALID_ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE;

	useEffect(() => {
		const hasAccess = localStorage.getItem('film_journal_access');
		if (hasAccess === 'true') {
			onAccessGranted();
		}
	}, [onAccessGranted]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		await new Promise((resolve) => setTimeout(resolve, 500));

		if (accessCode === VALID_ACCESS_CODE) {
			// Grant access
			localStorage.setItem('film_journal_access', 'true');
			onAccessGranted();
		} else {
			const newAttempts = attempts + 1;
			setAttempts(newAttempts);

			if (newAttempts >= 3) {
				setError('Too many failed attempts. Please contact the administrator.');
			} else {
				setError(`Invalid access code. ${3 - newAttempts} attempts remaining.`);
			}
		}

		setIsLoading(false);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				padding: 2,
			}}
		>
			<Paper
				elevation={10}
				sx={{
					p: 4,
					maxWidth: 400,
					width: '100%',
					textAlign: 'center',
				}}
			>
				<LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
				>
					Film Journal
				</Typography>
				<Typography
					variant='body1'
					color='text.secondary'
					sx={{ mb: 3 }}
				>
					Enter your access code to continue
				</Typography>

				<form onSubmit={handleSubmit}>
					<TextField
						fullWidth
						label='Access Code'
						type='password'
						value={accessCode}
						onChange={(e) => setAccessCode(e.target.value)}
						disabled={isLoading}
						sx={{ mb: 2 }}
						required
					/>

					{error && (
						<Alert
							severity='error'
							sx={{ mb: 2 }}
						>
							{error}
						</Alert>
					)}

					<Button
						type='submit'
						fullWidth
						variant='contained'
						size='large'
						disabled={isLoading || !accessCode.trim()}
						sx={{ mb: 2 }}
					>
						{isLoading ? (
							<CircularProgress
								size={24}
								color='inherit'
							/>
						) : (
							'Access App'
						)}
					</Button>
				</form>

				<Typography
					variant='caption'
					color='text.secondary'
				>
					Need access? Contact the administrator.
				</Typography>
			</Paper>
		</Box>
	);
};

export default AccessControl;
