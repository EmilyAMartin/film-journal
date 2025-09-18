import React, { useState } from 'react';
import {
	Box,
	Typography,
	Avatar,
	Button,
	TextField,
	Grid,
	Paper,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const Account = () => {
	const [user, setUser] = useState({
		name: 'Jane Doe',
		email: 'jane@example.com',
		avatar: '/avatar.png',
	});

	const [newEmail, setNewEmail] = useState(user.email);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [avatarFile, setAvatarFile] = useState(null);

	const handleAvatarChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			const preview = URL.createObjectURL(file);
			setUser((prev) => ({ ...prev, avatar: preview }));
			// Backend Check Task: Upload avatar to backend
		}
	};

	const handleEmailChange = () => {
		// Backend Check Task: Add validation and backend integration
		setUser((prev) => ({ ...prev, email: newEmail }));
		alert('Email updated!');
	};

	const handlePasswordChange = () => {
		if (newPassword !== confirmPassword) {
			alert("Passwords don't match.");
			return;
		}

		// Backend Check Task: Call backend to update password
		alert('Password updated!');
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
	};

	return (
		<Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
			<Typography
				variant='h4'
				fontWeight={600}
				gutterBottom
			>
				Account Settings
			</Typography>

			{/* Profile Section */}
			<Paper
				elevation={2}
				sx={{ p: 3, mb: 4, borderRadius: 3 }}
			>
				<Typography
					variant='h6'
					fontWeight={500}
					gutterBottom
				>
					Profile
				</Typography>
				<Grid
					container
					spacing={2}
					alignItems='center'
				>
					<Grid item>
						<Avatar
							src={user.avatar}
							alt={user.name}
							sx={{ width: 80, height: 80 }}
						/>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							component='label'
							startIcon={<UploadIcon />}
							sx={{
								textTransform: 'none',
								borderRadius: 2,
								fontWeight: 500,
								backgroundColor: '#f57c00',
								'&:hover': {
									backgroundColor: '#ef6c00',
								},
							}}
						>
							Update Profile Picture
							<input
								hidden
								accept='image/*'
								type='file'
								onChange={handleAvatarChange}
							/>
						</Button>
					</Grid>
				</Grid>
			</Paper>

			{/* Update Email */}
			<Paper
				elevation={2}
				sx={{ p: 3, mb: 4, borderRadius: 3 }}
			>
				<Typography
					variant='h6'
					fontWeight={500}
					gutterBottom
				>
					Update Email
				</Typography>
				<TextField
					label='New Email'
					type='email'
					fullWidth
					sx={{ mt: 2, mb: 2 }}
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
				/>
				<Button
					variant='contained'
					onClick={handleEmailChange}
					sx={{
						textTransform: 'none',
						borderRadius: 2,
						fontWeight: 500,
						backgroundColor: '#f57c00',
						'&:hover': {
							backgroundColor: '#ef6c00',
						},
					}}
				>
					Update Email
				</Button>
			</Paper>

			{/* Change Password */}
			<Paper
				elevation={2}
				sx={{ p: 3, borderRadius: 3 }}
			>
				<Typography
					variant='h6'
					fontWeight={500}
					gutterBottom
				>
					Change Password
				</Typography>
				<TextField
					label='Current Password'
					type='password'
					fullWidth
					sx={{ mt: 2 }}
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<TextField
					label='New Password'
					type='password'
					fullWidth
					sx={{ mt: 2 }}
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<TextField
					label='Confirm New Password'
					type='password'
					fullWidth
					sx={{ mt: 2, mb: 2 }}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<Button
					variant='contained'
					onClick={handlePasswordChange}
					sx={{
						textTransform: 'none',
						borderRadius: 2,
						fontWeight: 500,
						backgroundColor: '#f57c00',
						'&:hover': {
							backgroundColor: '#ef6c00',
						},
					}}
				>
					Update Password
				</Button>
			</Paper>
		</Box>
	);
};

export default Account;
