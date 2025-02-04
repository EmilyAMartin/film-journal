import * as React from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';

const TopFilms = () => {
	const [favorites, setFavorites] = React.useState([]);

	React.useEffect(() => {
		const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
		setFavorites(storedFavorites);
	}, []);

	return (
		<Box>
			<h3>No film added to top films</h3>
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
