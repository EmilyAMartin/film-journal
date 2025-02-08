import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';

const FilmCard = ({ film }) => {
	// Convert the film object to string for consistent comparison in localStorage
	const filmKey = JSON.stringify(film);

	// State initialization based on localStorage for 'favorites' and 'watchlist'
	const [isFavorited, setIsFavorited] = React.useState(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		return favorites.includes(filmKey);
	});

	const [isAdded, setIsAdded] = React.useState(() => {
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
		return watchlist.includes(filmKey);
	});

	// Function to toggle 'isFavorited' state
	const handleToggleFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

		if (isFavorited) {
			const updatedFavorites = favorites.filter((f) => f !== filmKey); // Remove from favorites
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			setIsFavorited(false);
		} else {
			favorites.push(filmKey); // Add to favorites
			localStorage.setItem('favorites', JSON.stringify(favorites));
			setIsFavorited(true);
		}
	};

	// Function to toggle 'isAdded' state
	const handleToggleWatchlist = () => {
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

		if (isAdded) {
			const updatedWatchlist = watchlist.filter((w) => w !== filmKey); // Remove from watchlist
			localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
			setIsAdded(false);
		} else {
			watchlist.push(filmKey); // Add to watchlist
			localStorage.setItem('watchlist', JSON.stringify(watchlist));
			setIsAdded(true);
		}
	};

	return (
		<Card sx={{ maxWidth: 150, position: 'relative' }}>
			<CardMedia
				component='img'
				height='250'
				image='/src/Images/1.jpg'
				alt='film poster'
			/>
			<CardContent>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					{film} {/* Assuming film.title exists */}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Box sx={{ position: 'absolute', left: 8, bottom: 8 }}>
					<IconButton
						onClick={handleToggleWatchlist}
						aria-label='watchlist'
					>
						{isAdded ? <RemoveIcon color='error' /> : <AddIcon />}
					</IconButton>
				</Box>
				<Box sx={{ position: 'absolute', right: 8, bottom: 8 }}>
					<IconButton
						onClick={handleToggleFavorite}
						aria-label='favorite'
					>
						{isFavorited ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
					</IconButton>
				</Box>
			</CardActions>
		</Card>
	);
};

export default FilmCard;
