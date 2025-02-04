import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';

const FilmCard = ({ film }) => {
	const [isFavorited, setIsFavorited] = React.useState(false);
	React.useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		if (favorites.some((f) => f === film)) {
			setIsFavorited(true);
		}
	}, [film]);

	const [isAdded, setIsAdded] = React.useState(false);
	React.useEffect(() => {
		const added = JSON.parse(localStorage.getItem('watchlist')) || [];
		if (added.some((w) => w === film)) {
			setIsAdded(true);
		}
	}, [film]);

	const handleToggleFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

		if (isFavorited) {
			const updatedFavorites = favorites.filter((f) => f !== film);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			setIsFavorited(false);
			console.log('Film removed from list');
		} else {
			favorites.push(film);
			localStorage.setItem('favorites', JSON.stringify(favorites));
			setIsFavorited(true);
			console.log('Film added to list');
		}
	};

	const handleToggleWatchlist = () => {
		const added = JSON.parse(localStorage.getItem('watchlist')) || [];

		if (isAdded) {
			const updatedWatchlist = added.filter((w) => w !== film);
			localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
			setIsAdded(false);
			console.log('Film removed from list');
		} else {
			added.push(film);
			localStorage.setItem('watchlist', JSON.stringify(added));
			setIsAdded(true);
			console.log('Film added to list');
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
					{film} {/* Use dynamic data */}
				</Typography>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					{film}
				</Typography>
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
						aria-label='favorite'
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
