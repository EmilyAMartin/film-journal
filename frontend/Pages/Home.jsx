import React from 'react';
import FilmCardCarousel from '../Components/FilmCardCarousel';
import FilmSearch from '../Components/FilmSearch';
import { Typography } from '@mui/material';

const Home = () => {
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
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<FilmSearch />
			</div>

			<div
				className='film-section'
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: 100,
				}}
			>
				<Typography>Popular This Week</Typography>
				<FilmCardCarousel />
			</div>
		</div>
	);
};

export default Home;
