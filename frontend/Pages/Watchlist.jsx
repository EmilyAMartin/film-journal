import React, { useState, useEffect } from 'react';
import FilmCard from '../Components/FilmCard';

const Watchlist = () => {
	const [favorites, setFavorites] = useState([]);
	useEffect(() => {
		const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
		setFavorites(savedFavorites);
	}, []);

	return (
		<div>
			<h1>My Watchlist</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{favorites.map((film) => (
					<FilmCard
						key={film}
						//When API is set up switch to key={film.id}
						film={film}
					/>
				))}
			</div>
		</div>
	);
};

export default Watchlist;
