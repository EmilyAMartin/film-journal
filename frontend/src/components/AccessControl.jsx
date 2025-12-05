import { useState, useEffect } from 'react';
import {
	Box,
	Paper,
	TextField,
	Button,
	Typography,
	Alert,
	CircularProgress,
	useTheme,
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const AccessControl = ({ onAccessGranted }) => {
	const theme = useTheme();
	const [accessCode, setAccessCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [attempts, setAttempts] = useState(0);
	const VALID_ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE || 'film2024';

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
				background: `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 40%, ${theme.palette.background.default} 100%)`,
				padding: 2,
			}}
		>
			<Paper
				elevation={8}
				sx={{
					p: 4,
					maxWidth: 400,
					width: '100%',
					textAlign: 'center',
					borderRadius: 3,
					backgroundColor: 'rgba(255, 255, 255, 0.9)',
					backdropFilter: 'blur(10px)',
					boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
				}}
			>
				<LockIcon sx={{ fontSize: 48, color: theme.palette.primary.dark, mb: 2 }} />

				<Typography
					variant='h4'
					component='h1'
					gutterBottom
					sx={{ fontWeight: 700, color: '#222' }}
				>
					Film Journal
				</Typography>

				<Typography
					variant='body1'
					sx={{
						mb: 3,
						color: '#555',
					}}
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
						required
						sx={{
							mb: 2,
							'& .MuiInputLabel-root': {
								color: theme.palette.primary.dark,
								'&.Mui-focused': {
									color: theme.palette.primary.dark,
								},
							},
							'& .MuiOutlinedInput-root': {
								color: '#121212', // Dark text for visibility
								backgroundColor: '#ffffff',
								'& fieldset': {
									borderColor: theme.palette.primary.dark, // Darker border for better contrast
									borderWidth: '2px',
								},
								'&:hover fieldset': {
									borderColor: theme.palette.primary.main,
									borderWidth: '2px',
								},
								'&.Mui-focused fieldset': {
									borderColor: theme.palette.primary.dark,
									borderWidth: '2px',
								},
								'& input': {
									color: '#121212', // Ensure input text is dark and visible
								},
							},
						}}
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
						sx={{
							mb: 2,
							py: 1.4,
							fontWeight: 600,
							background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
							boxShadow: `0 4px 16px ${theme.palette.primary.main}50`,
							'&:hover': {
								background: `linear-gradient(90deg, ${theme.palette.primary.light} 100%, ${theme.palette.primary.main} 100%)`,
								boxShadow: `0 8px 24px ${theme.palette.primary.main}60`,
								transform: 'translateY(-2px)',
							},
							'&:disabled': {
								background: `${theme.palette.primary.main}100`,
								color: '#fff',
								transform: 'none',
							},
						}}
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
					sx={{
						color: '#777',
						display: 'block',
						mt: 1,
					}}
				>
					Need access? Contact the administrator.
				</Typography>
			</Paper>
		</Box>
	);
};

export default AccessControl;
