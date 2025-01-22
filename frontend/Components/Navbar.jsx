import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import LoginBtn from './LoginBtn';
import './Navbar.css';

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
				<TheaterComedyOutlinedIcon fontSize='large' />
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
						to='/Journal'
						onClick={handleLinkClick}
					>
						Journal
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/Watchlist'
						onClick={handleLinkClick}
					>
						Watchlist
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
			</ul>
			<LoginBtn />
		</nav>
	);
};
