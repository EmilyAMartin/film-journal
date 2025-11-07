import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';

const navLinks = [
	{ to: '/', label: 'Films' },
	{ to: '/Journal', label: 'Journal' },
	{ to: '/Favorites', label: 'Favorites' },
	{ to: '/Watchlist', label: 'Watchlist' },
];

const Navbar = ({ toggleTheme, mode }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuClick = (to) => {
		navigate(to);
		handleMenuClose();
	};

	return (
		<Box sx={{ flexGrow: 1, mt: 2 }}>
			<AppBar
				position='static'
				color='transparent'
				elevation={0}
				sx={{
					backgroundColor: 'transparent',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Toolbar
					sx={{
						width: '100%',
						maxWidth: 1200,
						mx: 'auto',
						px: 2,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box
						component={NavLink}
						to='/'
						sx={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none',
							mr: 2,
						}}
					>
						<Typography
							variant='h5'
							component='div'
							sx={{
								fontWeight: 700,
								fontSize: { xs: '1.2rem', md: '1.5rem' },
								'& .logo-part-1': {
									color: 'text.primary',
								},
								'& .logo-part-2': {
									color: 'primary.main',
								},
							}}
						>
							<span className='logo-part-1'>FILM</span>
							<span className='logo-part-2'>JOURNAL</span>
						</Typography>
					</Box>
					<Box
						sx={{
							flex: 1,
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'center',
							gap: 2,
						}}
					>
						{navLinks.map((link) => (
							<Button
								key={link.to}
								component={NavLink}
								to={link.to}
								color='inherit'
								sx={{
									textTransform: 'none',
									fontSize: '1.1rem',
									color: 'text.primary',
									'&.active': {
										fontWeight: 'bold',
										color: 'primary.main',
										borderBottom: '2px solid',
										borderColor: 'primary.main',
										borderRadius: 0,
									},
									'&:hover': {
										color: 'primary.main',
									},
								}}
							>
								{link.label}
							</Button>
						))}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
						<IconButton
							color='inherit'
							aria-label='search'
							sx={{
								color: 'text.primary',
								'&:hover': {
									color: 'primary.main',
								},
							}}
						>
							<SearchIcon />
						</IconButton>
						<IconButton
							component={NavLink}
							to='/Account'
							color='inherit'
							aria-label='settings'
							sx={{
								color: 'text.primary',
								'&.active': {
									color: 'primary.main',
								},
								'&:hover': {
									color: 'primary.main',
								},
							}}
						>
							<SettingsIcon />
						</IconButton>
						<IconButton
							sx={{ ml: 1 }}
							onClick={toggleTheme}
							color='inherit'
							aria-label='toggle dark mode'
						>
							{mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
						</IconButton>
						<IconButton
							color='inherit'
							edge='end'
							sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}
							onClick={handleMenuOpen}
							aria-label='open navigation menu'
						>
							<MenuIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				sx={{ display: { xs: 'block', md: 'none' } }}
			>
				{navLinks.map((link) => (
					<MenuItem
						key={link.to}
						onClick={() => handleMenuClick(link.to)}
						selected={window.location.pathname === link.to}
					>
						{link.label}
					</MenuItem>
				))}
				<MenuItem
					onClick={() => handleMenuClick('/Account')}
					selected={window.location.pathname === '/Account'}
				>
					Settings
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default Navbar;
