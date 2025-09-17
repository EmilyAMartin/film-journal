import * as React from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';

const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

const Favorites = () => {
	const [favorites, setFavorites] = React.useState(getFavorites());

	React.useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === 'favorites') {
				setFavorites(getFavorites());
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '60vh',
			}}
		>
			{favorites.length === 0 && (
				<h3 style={{ textAlign: 'center' }}>No film added to favorites</h3>
			)}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					width: '100%',
				}}
			>
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
