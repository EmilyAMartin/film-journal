import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import FilmCard from './FilmCard';
import { getPopularMovies } from '../src/api/movieService';

const PopularFilms = () => {
	const [films, setFilms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadPopular = async () => {
			try {
				const movies = await getPopularMovies();
				setFilms(movies);
			} catch (err) {
				setError('Failed to load popular films.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		loadPopular();
	}, []);

	if (loading) return <CircularProgress sx={{ mt: 4 }} />;
	if (error) return <Typography color='error'>{error}</Typography>;

	return (
		<Box sx={{ mt: 6 }}>
			<Typography
				variant='h5'
				gutterBottom
			>
				Popular Films
			</Typography>
			<Grid
				container
				spacing={3}
			>
				{films.map((film) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={film.imdbID}
					>
						<FilmCard
							film={{
								title: film.Title,
								year: film.Year,
								poster: film.Poster,
								id: film.imdbID,
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default PopularFilms;
