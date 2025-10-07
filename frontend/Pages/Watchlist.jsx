import React, { useEffect, useState } from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';
import { getWatchlist } from '../storageService';
import { getMovieById } from '../src/api/movieService';

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchDetails = async () => {
		const stored = getWatchlist();
		const detailed = await Promise.all(
			stored.map((film) => getMovieById(film.imdbID || film.id))
		);
		setWatchlist(detailed);
		setLoading(false);
	};

	useEffect(() => {
		fetchDetails();
		const handleStorage = (e) => {
			if (e.key === 'watchlist') {
				fetchDetails();
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			fetchDetails();
		}, 1000);
		return () => clearInterval(interval);
		// eslint-disable-next-line
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
							key={film.imdbID}
							film={film}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default Watchlist;
