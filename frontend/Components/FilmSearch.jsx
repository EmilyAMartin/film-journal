import React, { useState, useEffect } from 'react';
import {
	TextField,
	Box,
	Typography,
	CircularProgress,
	Card,
	CardContent,
	Dialog,
	IconButton,
} from '@mui/material';
import { searchMovies, getMovieById } from '../src/api/movieService';
import debounce from 'lodash.debounce';
import CloseIcon from '@mui/icons-material/Close';
import FilmActions from './FilmActions';

const FilmSearch = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
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

	const handleMovieClick = async (movie) => {
		try {
			const fullMovie = await getMovieById(movie.imdbID);
			setSelectedMovie(fullMovie);
			setModalOpen(true);
		} catch (err) {
			console.error('Failed to fetch movie details:', err);
		}
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedMovie(null);
	};

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

			{/* Search Results */}
			<Box sx={{ mt: 3 }}>
				{results.map((movie) => (
					<Card
						key={movie.imdbID}
						sx={{ mb: 2, display: 'flex', cursor: 'pointer' }}
						onClick={() => handleMovieClick(movie)}
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

			{/* Modal with Movie Details */}
			<Dialog
				open={modalOpen}
				onClose={handleCloseModal}
				maxWidth='md'
				fullWidth
				PaperProps={{
					sx: {
						borderRadius: 4,
						overflow: 'hidden',
						bgcolor: 'background.paper',
						boxShadow: 24,
					},
				}}
			>
				{selectedMovie && (
					<Box
						sx={{
							display: 'flex',
							position: 'relative',
							flexDirection: { xs: 'column', sm: 'row' },
						}}
					>
						{/* Close Button */}
						<IconButton
							onClick={handleCloseModal}
							sx={{
								position: 'absolute',
								top: 8,
								right: 8,
								color: 'grey.500',
								zIndex: 10,
							}}
						>
							<CloseIcon />
						</IconButton>

						{/* Poster Section */}
						<Box
							sx={{
								width: { xs: '100%', sm: 300 },
								flexShrink: 0,
								height: { xs: 300, sm: '100%' },
								backgroundColor: 'black',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{selectedMovie.Poster && selectedMovie.Poster !== 'N/A' ? (
								<img
									src={selectedMovie.Poster}
									alt={`${selectedMovie.Title} Poster`}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
									}}
								/>
							) : (
								<Typography color='white'>No Image</Typography>
							)}
						</Box>

						{/* Details Section */}
						<Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
							<Typography
								variant='h5'
								fontWeight='bold'
								gutterBottom
							>
								{selectedMovie.Title} ({selectedMovie.Year})
							</Typography>

							<Typography
								variant='subtitle2'
								color='text.secondary'
								gutterBottom
							>
								{selectedMovie.Genre} • {selectedMovie.Runtime} • Directed by{' '}
								{selectedMovie.Director}
							</Typography>

							<Typography
								variant='body1'
								sx={{ mt: 2, mb: 2, flexGrow: 1, overflowY: 'auto' }}
							>
								{selectedMovie.Plot || 'No description available.'}
							</Typography>

							{/* Film Action Icons */}
							<FilmActions
								film={{
									id: selectedMovie.imdbID,
									title: selectedMovie.Title,
									year: selectedMovie.Year,
									poster: selectedMovie.Poster,
								}}
							/>
						</Box>
					</Box>
				)}
			</Dialog>
		</Box>
	);
};

export default FilmSearch;
