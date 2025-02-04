import * as React from 'react';
import FilmCard from '../Components/FilmCard';
import Box from '@mui/material/Box';

const Watchlist = () => {
	const [added, setAdded] = React.useState([]);

	React.useEffect(() => {
		const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
		setAdded(storedWatchlist);
	}, []);

	return (
		<Box>
			<h3>No film added to watchlist</h3>
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{added.map((film) => (
					<FilmCard
						key={film}
						film={film}
					/>
				))}
			</Box>
		</Box>
	);
};

export default Watchlist;
