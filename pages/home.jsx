import React, { useState } from 'react';
import { TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlimCardCarousel from '../Components/FlimCardCarousel';

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
			<div
				className='lading-section'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			></div>
			<Typography
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dolorem, hic
				odit mollitia libero vero rerum temporibus maiores modi nihil corporis, quae
				error, animi reiciendis soluta! In soluta impedit officiis. Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Quam dolorem, hic odit mollitia
				libero vero rerum temporibus maiores modi nihil corporis, quae error, animi
				reiciendis soluta! In soluta impedit officiis.
			</Typography>

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
				<FlimCardCarousel />
			</div>
		</div>
	);
};

export default Home;
