import * as React from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';

const TopFilms = () => {
	// Retrieve the favorites from localStorage
	const [favorites, setFavorites] = React.useState([]);

	React.useEffect(() => {
		const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
		setFavorites(storedFavorites);
	}, []);

	return (
		<Box>
			<h1>Top Films</h1>
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{favorites.map((film) => (
					<FilmCard
						key={film}
						film={film}
					/>
				))}
			</Box>
		</Box>
	);
};

export default TopFilms;
