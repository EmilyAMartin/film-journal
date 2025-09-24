import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import FilmCardCarousel from './FilmCardCarousel';
import { getPopularMovies } from '../src/api/movieService';

const PopularFilms = () => {
	const [films, setFilms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchPopular = async () => {
			try {
				const movies = await getPopularMovies();
				setFilms(movies);
			} catch (err) {
				console.error(err);
				setError('Failed to load popular films.');
			} finally {
				setLoading(false);
			}
		};

		fetchPopular();
	}, []);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
				<CircularProgress />
			</Box>
		);
	}
	if (error) {
		return (
			<Typography
				color='error'
				sx={{ mt: 2, textAlign: 'center' }}
			>
				{error}
			</Typography>
		);
	}

	return (
		<Box sx={{ mt: 4, px: 2 }}>
			<Typography
				variant='h5'
				gutterBottom
			>
				Popular Films
			</Typography>
			<FilmCardCarousel films={films} />
		</Box>
	);
};

export default PopularFilms;
