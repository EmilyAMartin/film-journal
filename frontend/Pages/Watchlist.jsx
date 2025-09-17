import * as React from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';

const getWatchlist = () => JSON.parse(localStorage.getItem('watchlist')) || [];

const Watchlist = () => {
	const [added, setAdded] = React.useState(getWatchlist());

	React.useEffect(() => {
		const handleStorage = (e) => {
			if (e.key === 'watchlist') {
				setAdded(getWatchlist());
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const current = getWatchlist();
			if (JSON.stringify(current) !== JSON.stringify(added)) {
				setAdded(current);
			}
		}, 500);
		return () => clearInterval(interval);
	}, [added]);

	return (
		<Box>
			{added.length === 0 && <h3>No film added to watchlist</h3>}
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{added.map((film) => (
					<FilmCard
						key={typeof film === 'object' ? JSON.stringify(film) : film}
						film={film}
					/>
				))}
			</Box>
		</Box>
	);
};

export default Watchlist;
