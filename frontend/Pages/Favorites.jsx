import React, { useEffect, useState } from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';
import { getFavorites } from '../storageService';
import { getMovieById } from '../src/api/movieService';

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchDetails = async () => {
		const stored = await getFavorites();
		const detailed = await Promise.all(
			stored.map((film) => getMovieById(film.imdbID || film.id))
		);
		setFavorites(detailed);
		setLoading(false);
	};

	useEffect(() => {
		fetchDetails();
		// Listen for localForage changes (polling)
		const interval = setInterval(() => {
			fetchDetails();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

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
			{loading ? (
				<h3 style={{ textAlign: 'center' }}>Loading...</h3>
			) : favorites.length === 0 ? (
				<h3 style={{ textAlign: 'center' }}>No film added to favorites</h3>
			) : (
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
							key={film.imdbID || film.id}
							film={film}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default Favorites;
