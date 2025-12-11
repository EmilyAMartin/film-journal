import React, { useEffect, useState } from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';
import { getWatchlist } from '../src/storageService';
import { getMovieById } from '../src/api/movieService';

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchDetails = async () => {
		try {
			const stored = (await getWatchlist()) || [];
			const valid = Array.isArray(stored) ? stored.filter(Boolean) : [];
			if (valid.length === 0) {
				setWatchlist([]);
				return;
			}

			const detailed = await Promise.all(
				valid
					.map((film) => {
						const id = film && (film.imdbID || film.id);
						if (!id) return null;
						return getMovieById(id).catch((err) => {
							console.error('getMovieById failed for', id, err);
							return null;
						});
					})
					.filter(Boolean)
			);

			setWatchlist(detailed.filter(Boolean));
		} catch (err) {
			console.error('Failed to fetch watchlist details:', err);
			setWatchlist([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDetails();
		const interval = setInterval(fetchDetails, 2000);
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
			) : watchlist.length === 0 ? (
				<h3 style={{ textAlign: 'center' }}>No film added to watchlist</h3>
			) : (
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					{watchlist.map((film) => (
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

export default Watchlist;
