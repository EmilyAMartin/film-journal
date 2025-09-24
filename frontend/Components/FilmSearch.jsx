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

	useEffect(() => {
		handleSearch(query);
		return () => handleSearch.cancel();
	}, [query]);

	return (
		<Box sx={{ width: '100%', maxWidth: 600 }}>
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
						sx={{ mb: 2 }}
					>
						<CardContent>
							<Typography variant='h6'>{movie.Title}</Typography>
							<Typography variant='body2'>{movie.Year}</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
};

export default FilmSearch;
