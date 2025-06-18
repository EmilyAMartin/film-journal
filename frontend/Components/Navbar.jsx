import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginBtn from './LoginBtn';

const navLinks = [
	{ to: '/', label: 'Films' },
	{ to: '/Journal', label: 'Journal' },
	{ to: '/Favorites', label: 'Favorites' },
	{ to: '/Watchlist', label: 'Watchlist' },
	{ to: '/Account', label: 'Account' },
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
		<Box sx={{ flexGrow: 1 }}>
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
					<IconButton
						component={NavLink}
						to='/'
						color='inherit'
						edge='start'
						sx={{ mr: 2 }}
					>
						<TheaterComedyOutlinedIcon fontSize='large' />
					</IconButton>
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
									'&.active': {
										fontWeight: 'bold',
										color: 'primary.main',
									},
								}}
							>
								{link.label}
							</Button>
						))}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
						<LoginBtn />
						<IconButton
							sx={{ ml: 2 }}
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
			</Menu>
		</Box>
	);
};

export default Navbar;
