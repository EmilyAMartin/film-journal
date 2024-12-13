import React, { useState } from 'react';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleLinkClick = () => {
		setMenuOpen(false);
	};

	return (
		<nav>
			<Link
				to='/'
				className='logo'
			>
				LOGO
			</Link>
			<div
				className='menu'
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<MenuIcon style={{ margin: 10 }} />
			</div>
			<ul className={menuOpen ? 'open' : ''}>
				<li>
					<NavLink
						to='/'
						onClick={handleLinkClick}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/Artwork'
						onClick={handleLinkClick}
					>
						Artwork
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/Gallery'
						onClick={handleLinkClick}
					>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/Account'
						onClick={handleLinkClick}
					>
						Account
					</NavLink>
				</li>
				<li style={{ marginTop: 6 }}>
					<Button> Login </Button>
				</li>
			</ul>
		</nav>
	);
};
