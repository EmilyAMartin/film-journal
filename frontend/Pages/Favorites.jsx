import * as React from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';

const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

const Favorites = () => {
	const [favorites, setFavorites] = React.useState(getFavorites());

	// Listen for changes to localStorage from other tabs/components
	React.useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === 'favorites') {
				setFavorites(getFavorites());
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	// Poll for changes in localStorage (same tab)
	React.useEffect(() => {
		const interval = setInterval(() => {
			const current = getFavorites();
			if (JSON.stringify(current) !== JSON.stringify(favorites)) {
				setFavorites(current);
			}
		}, 500);
		return () => clearInterval(interval);
	}, [favorites]);

	return (
		<Box>
			{favorites.length === 0 && <h3>No film added to top films</h3>}
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{favorites.map((film) => (
					<FilmCard
						key={typeof film === 'object' ? JSON.stringify(film) : film}
						film={film}
					/>
				))}
			</Box>
		</Box>
	);
};

export default Favorites;
