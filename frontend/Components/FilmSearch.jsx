import React, { useState, useEffect } from 'react';
import {
	TextField,
	Box,
	Typography,
	CircularProgress,
	Card,
	CardContent,
} from '@mui/material';
import { searchMovies } from '../src/api/movieService';
import debounce from 'lodash.debounce';

const FilmSearch = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Debounced search handler
	const handleSearch = debounce(async (searchTerm) => {
		if (!searchTerm) {
			setResults([]);
			setError('');
			return;
		}

		setLoading(true);
		try {
			const movies = await searchMovies(searchTerm);
			setResults(movies);
			setError('');
		} catch (err) {
			setError(err.message);
			setResults([]);
		} finally {
			setLoading(false);
		}
	}, 500);

	// Trigger search when query changes
	useEffect(() => {
		handleSearch(query);
		return () => handleSearch.cancel();
	}, [query]);

	return (
		<Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
			<TextField
				fullWidth
				label='Search Movies'
				variant='outlined'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{loading && <CircularProgress sx={{ mt: 2 }} />}
			{error && (
				<Typography
					color='error'
					sx={{ mt: 2 }}
				>
					{error}
				</Typography>
			)}

			<Box sx={{ mt: 3 }}>
				{results.map((movie) => (
					<Card
						key={movie.imdbID}
						sx={{ mb: 2, display: 'flex' }}
					>
						{movie.Poster && movie.Poster !== 'N/A' && (
							<Box sx={{ width: 100, flexShrink: 0 }}>
								<img
									src={movie.Poster}
									alt={`${movie.Title} poster`}
									style={{ width: '100%', height: 'auto' }}
								/>
							</Box>
						)}
						<CardContent>
							<Typography variant='h6'>{movie.Title}</Typography>
							<Typography variant='body2'>Year: {movie.Year}</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
};

export default FilmSearch;
