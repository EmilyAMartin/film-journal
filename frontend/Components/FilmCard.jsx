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
	const filmKey = JSON.stringify(film);
	const [isFavorited, setIsFavorited] = React.useState(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		return favorites.includes(filmKey);
	});
	const [isAdded, setIsAdded] = React.useState(() => {
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
		return watchlist.includes(filmKey);
	});
	const handleToggleFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

		if (isFavorited) {
			const updatedFavorites = favorites.filter((f) => f !== filmKey);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			setIsFavorited(false);
		} else {
			favorites.push(filmKey);
			localStorage.setItem('favorites', JSON.stringify(favorites));
			setIsFavorited(true);
		}
	};
	const handleToggleWatchlist = () => {
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

		if (isAdded) {
			const updatedWatchlist = watchlist.filter((w) => w !== filmKey);
			localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
			setIsAdded(false);
		} else {
			watchlist.push(filmKey);
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
					{film}
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
