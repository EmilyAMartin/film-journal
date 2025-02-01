import React, { useState } from 'react';
import { TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilmCardCarousel from '../Components/FilmCardCarousel';

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchSubmit = () => {
		console.log('Searching for:', searchQuery);
		// Add search logic //
	};

	return (
		<div>
			<img
				src='/src/Images/theater.jpg'
				alt='image'
				width={1950}
			/>
			<div
				className='lading-section'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			></div>

			<div
				className='search-section'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 20,
				}}
			>
				<TextField
					value={searchQuery}
					onChange={handleSearchChange}
					variant='outlined'
					size='small'
					label='Search'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
					onKeyPress={(event) => {
						if (event.key === 'Enter') {
							handleSearchSubmit();
						}
					}}
				/>
			</div>
			<div
				className='film-section'
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: 24,
				}}
			>
				<FilmCardCarousel />
			</div>
		</div>
	);
};

export default Home;
