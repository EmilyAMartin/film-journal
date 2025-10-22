import React, { useState } from 'react';
import {
	Box,
	Typography,
	Button,
	TextField,
	Grid,
	Paper,
	Alert,
	Snackbar,
	Card,
	CardContent,
	CardActions,
} from '@mui/material';
import {
	Download as DownloadIcon,
	Upload as UploadIcon,
	Delete as DeleteIcon,
	Info as InfoIcon,
	Backup as BackupIcon,
	Restore as RestoreIcon,
	Logout as LogoutIcon,
} from '@mui/icons-material';
import {
	exportAllData,
	importAllData,
	clearAllData,
} from '../src/storageService';
import { useAccessControl } from '../src/hooks/useAccessControl';
import { useTheme } from '@mui/material/styles';

const Account = () => {
	const theme = useTheme();
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'info',
	});
	const [importFile, setImportFile] = useState(null);
	const [showClearConfirm, setShowClearConfirm] = useState(false);
	const { revokeAccess } = useAccessControl();

	const showSnackbar = (message, severity = 'info') => {
		setSnackbar({ open: true, message, severity });
	};

	const handleExportData = async () => {
		try {
			const data = await exportAllData();
			const blob = new Blob([JSON.stringify(data, null, 2)], {
				type: 'application/json',
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `film-journal-backup-${
				new Date().toISOString().split('T')[0]
			}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			showSnackbar('Data exported successfully!', 'success');
		} catch (error) {
			console.error('Export failed:', error);
			showSnackbar('Export failed. Please try again.', 'error');
		}
	};

	const handleImportFile = (event) => {
		const file = event.target.files?.[0];
		if (file) setImportFile(file);
	};

	const handleImportData = async () => {
		if (!importFile) return;
		try {
			const text = await importFile.text();
			const data = JSON.parse(text);

			if (!data.journalEntries || !data.favorites || !data.watchlist) {
				showSnackbar('Invalid backup file format.', 'error');
				return;
			}

			const success = await importAllData(data);
			if (success) {
				showSnackbar(
					'Data imported successfully! Please refresh the page.',
					'success'
				);
				setImportFile(null);
				const fileInput = document.getElementById('import-file');
				if (fileInput) fileInput.value = '';
			} else {
				showSnackbar('Import failed. Please try again.', 'error');
			}
		} catch (error) {
			console.error('Import failed:', error);
			showSnackbar('Invalid file format or corrupted data.', 'error');
		}
	};

	const handleClearData = async () => {
		try {
			await clearAllData();
			showSnackbar('All data cleared successfully!', 'success');
			setShowClearConfirm(false);
			setTimeout(() => window.location.reload(), 1000);
		} catch (error) {
			console.error('Clear data failed:', error);
			showSnackbar('Failed to clear data. Please try again.', 'error');
		}
	};

	const handleLogout = () => {
		revokeAccess();
		showSnackbar(
			'Logged out successfully. You will need to enter the access code again.',
			'info'
		);
	};

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
				minHeight: '100vh',
				py: 4,
			}}
		>
			<Box
				sx={{
					maxWidth: 800,
					mx: 'auto',
					px: { xs: 2, md: 4 },
				}}
			>
				{/* Header */}
				<Box sx={{ textAlign: 'center', mb: 6 }}>
					<Typography
						variant='h3'
						fontWeight={600}
						gutterBottom
						sx={{ color: theme.palette.text.primary, mb: 2 }}
					>
						Settings
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: theme.palette.text.secondary,
							maxWidth: 500,
							mx: 'auto',
						}}
					>
						Manage your film journal data with backup and restore tools
					</Typography>
				</Box>

				{/* Info Card */}
				<Card
					sx={{
						mb: 4,
						backgroundColor: theme.palette.background.paper,
						border: `1px solid ${theme.palette.divider}`,
						borderRadius: 2,
						boxShadow: theme.shadows[3],
					}}
				>
					<CardContent sx={{ p: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<InfoIcon sx={{ mr: 2, fontSize: 24, color: '#ff6b35' }} />
							<Typography
								variant='h6'
								fontWeight={600}
							>
								Local-First App
							</Typography>
						</Box>
						<Typography
							variant='body2'
							sx={{ color: theme.palette.text.secondary }}
						>
							Your film journal data is stored locally on your device. Use the tools
							below to backup, restore, or manage your data.
						</Typography>
					</CardContent>
				</Card>

				<Grid
					container
					spacing={4}
				>
					{/* Export Data */}
					<Grid
						item
						xs={12}
						md={6}
					>
						<Card
							sx={{
								height: '100%',
								backgroundColor: theme.palette.background.paper,
								border: `1px solid ${theme.palette.divider}`,
								borderRadius: 2,
								boxShadow: theme.shadows[3],
								transition: 'all 0.2s ease',
								'&:hover': { boxShadow: theme.shadows[6] },
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Box
										sx={{
											p: 1.5,
											borderRadius: 2,
											background: '#ff6b35',
											mr: 2,
										}}
									>
										<BackupIcon sx={{ color: 'white', fontSize: 20 }} />
									</Box>
									<Typography
										variant='h6'
										fontWeight={600}
									>
										Export Data
									</Typography>
								</Box>
								<Typography
									variant='body2'
									sx={{ mb: 2, color: theme.palette.text.secondary }}
								>
									Download a backup of all your journal entries, favorites, and
									watchlist.
								</Typography>
								<Box
									sx={{
										backgroundColor: theme.palette.action.hover,
										p: 2,
										borderRadius: 1,
										mb: 2,
									}}
								>
									<Typography
										variant='caption'
										sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
									>
										Includes: Journal entries, Favorites, Watchlist
									</Typography>
								</Box>
							</CardContent>
							<CardActions sx={{ p: 3, pt: 0 }}>
								<Button
									variant='contained'
									startIcon={<DownloadIcon />}
									onClick={handleExportData}
									fullWidth
									sx={{
										borderRadius: 2,
										py: 1.5,
										fontWeight: 600,
										background: '#ff6b35',
										'&:hover': { background: '#e55a2b' },
									}}
								>
									Export Backup
								</Button>
							</CardActions>
						</Card>
					</Grid>

					{/* Import Data */}
					<Grid
						item
						xs={12}
						md={6}
					>
						<Card
							sx={{
								height: '100%',
								backgroundColor: theme.palette.background.paper,
								border: `1px solid ${theme.palette.divider}`,
								borderRadius: 2,
								boxShadow: theme.shadows[3],
								transition: 'all 0.2s ease',
								'&:hover': { boxShadow: theme.shadows[6] },
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Box
										sx={{
											p: 1.5,
											borderRadius: 2,
											background: '#ff6b35',
											mr: 2,
										}}
									>
										<RestoreIcon sx={{ color: 'white', fontSize: 20 }} />
									</Box>
									<Typography
										variant='h6'
										fontWeight={600}
									>
										Import Data
									</Typography>
								</Box>
								<Typography
									variant='body2'
									sx={{ mb: 2, color: theme.palette.text.secondary }}
								>
									Restore your data from a previously exported backup file.
								</Typography>
								<TextField
									type='file'
									accept='.json'
									onChange={handleImportFile}
									sx={{ display: 'none' }}
									id='import-file'
								/>
								<Box
									sx={{
										backgroundColor: theme.palette.action.hover,
										p: 2,
										borderRadius: 1,
										mb: 2,
									}}
								>
									<Typography
										variant='caption'
										sx={{
											color: importFile ? '#ff6b35' : theme.palette.text.secondary,
											fontWeight: 500,
											fontStyle: importFile ? 'normal' : 'italic',
										}}
									>
										{importFile ? `Selected: ${importFile.name}` : 'No file selected'}
									</Typography>
								</Box>
							</CardContent>
							<CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
								<Button
									variant='outlined'
									component='label'
									startIcon={<UploadIcon />}
									sx={{
										flex: 1,
										borderRadius: 2,
										py: 1.5,
										fontWeight: 600,
										borderColor: '#ff6b35',
										color: '#ff6b35',
										'&:hover': {
											borderColor: '#e55a2b',
											backgroundColor: 'rgba(255,107,53,0.1)',
										},
									}}
								>
									Choose File
									<input
										hidden
										type='file'
										accept='.json'
										onChange={handleImportFile}
									/>
								</Button>
								<Button
									variant='contained'
									onClick={handleImportData}
									disabled={!importFile}
									sx={{
										flex: 1,
										borderRadius: 2,
										py: 1.5,
										fontWeight: 600,
										background: '#ff6b35',
										'&:hover': { background: '#e55a2b' },
										'&:disabled': {
											background: theme.palette.action.disabledBackground,
											color: theme.palette.text.disabled,
										},
									}}
								>
									Import
								</Button>
							</CardActions>
						</Card>
					</Grid>

					{/* Clear Data */}
					<Grid
						item
						xs={12}
					>
						<Card
							sx={{
								backgroundColor: theme.palette.background.paper,
								border: `2px solid #ff6b35`,
								borderRadius: 2,
								boxShadow: theme.shadows[3],
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Box
										sx={{
											p: 1.5,
											borderRadius: 2,
											background: '#ff6b35',
											mr: 2,
										}}
									>
										<DeleteIcon sx={{ color: 'white', fontSize: 20 }} />
									</Box>
									<Typography
										variant='h6'
										fontWeight={600}
										sx={{ color: '#d32f2f' }}
									>
										Danger Zone
									</Typography>
								</Box>
								<Typography
									variant='body2'
									sx={{ color: theme.palette.text.secondary, mb: 2 }}
								>
									Permanently delete all your journal entries, favorites, and watchlist.
									This action cannot be undone.
								</Typography>
								{showClearConfirm && (
									<Alert
										severity='warning'
										sx={{ mb: 2, borderRadius: 2 }}
									>
										Are you sure you want to delete all data? This cannot be undone!
									</Alert>
								)}
							</CardContent>
							<CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
								{!showClearConfirm ? (
									<Button
										variant='outlined'
										startIcon={<DeleteIcon />}
										onClick={() => setShowClearConfirm(true)}
										sx={{
											borderRadius: 2,
											py: 1.5,
											fontWeight: 600,
											borderColor: '#ff6b35',
											color: '#ff6b35',
											'&:hover': {
												borderColor: '#e55a2b',
												backgroundColor: 'rgba(255,107,53,0.1)',
											},
										}}
									>
										Clear All Data
									</Button>
								) : (
									<>
										<Button
											variant='outlined'
											onClick={() => setShowClearConfirm(false)}
											sx={{
												flex: 1,
												borderRadius: 2,
												py: 1.5,
												fontWeight: 600,
												borderColor: theme.palette.text.secondary,
												color: theme.palette.text.secondary,
												'&:hover': {
													borderColor: theme.palette.text.primary,
													backgroundColor: theme.palette.action.hover,
												},
											}}
										>
											Cancel
										</Button>
										<Button
											variant='contained'
											onClick={handleClearData}
											sx={{
												flex: 1,
												borderRadius: 2,
												py: 1.5,
												fontWeight: 600,
												background: '#ff6b35',
												'&:hover': { background: '#e55a2b' },
											}}
										>
											Yes, Delete Everything
										</Button>
									</>
								)}
							</CardActions>
						</Card>
					</Grid>

					{/* Access Control */}
					<Grid
						item
						xs={12}
					>
						<Card
							sx={{
								backgroundColor: theme.palette.background.paper,
								border: `1px solid ${theme.palette.divider}`,
								borderRadius: 2,
								boxShadow: theme.shadows[3],
							}}
						>
							<CardContent sx={{ p: 3 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
									<Box
										sx={{
											p: 1.5,
											borderRadius: 2,
											background: '#ff6b35',
											mr: 2,
										}}
									>
										<LogoutIcon sx={{ color: 'white', fontSize: 20 }} />
									</Box>
									<Typography
										variant='h6'
										fontWeight={600}
									>
										Access Control
									</Typography>
								</Box>
								<Typography
									variant='body2'
									sx={{ color: theme.palette.text.secondary, mb: 2 }}
								>
									Log out to require the access code again. This will protect your app
									from unauthorized use.
								</Typography>
							</CardContent>
							<CardActions sx={{ p: 3, pt: 0 }}>
								<Button
									variant='outlined'
									startIcon={<LogoutIcon />}
									onClick={handleLogout}
									fullWidth
									sx={{
										borderRadius: 2,
										py: 1.5,
										fontWeight: 600,
										borderColor: '#ff6b35',
										color: '#ff6b35',
										'&:hover': {
											borderColor: '#e55a2b',
											backgroundColor: 'rgba(255,107,53,0.1)',
										},
									}}
								>
									Log Out
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>

				{/* Snackbar */}
				<Snackbar
					open={snackbar.open}
					autoHideDuration={4000}
					onClose={() => setSnackbar({ ...snackbar, open: false })}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert
						severity={snackbar.severity}
						onClose={() => setSnackbar({ ...snackbar, open: false })}
						sx={{ borderRadius: 2, fontWeight: 500 }}
					>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</Box>
		</Box>
	);
};

export default Account;
