import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const FilmCard = ({ film }) => {
	const isFilmObj = film && typeof film === 'object';
	const filmTitle = isFilmObj ? film.title || 'Untitled' : film || 'Untitled';
	const filmYear = isFilmObj && film.year ? film.year : '';
	const filmPoster =
		isFilmObj && film.poster ? film.poster : '/src/Images/1.jpg';

	const filmKey = JSON.stringify(film);
	const [isFavorited, setIsFavorited] = React.useState(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		return favorites.includes(filmKey);
	});
	const [isAdded, setIsAdded] = React.useState(() => {
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
		return watchlist.includes(filmKey);
	});
	const [journalOpen, setJournalOpen] = React.useState(false);
	const [journalText, setJournalText] = React.useState('');
	const [journalTitle, setJournalTitle] = React.useState('');

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

	const handleOpenJournal = () => setJournalOpen(true);
	const handleCloseJournal = () => {
		setJournalOpen(false);
		setJournalText('');
		setJournalTitle('');
	};

	const handleJournalSubmit = () => {
		const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
		entries.push({
			film,
			title: journalTitle,
			text: journalText,
			date: new Date().toISOString(),
		});
		localStorage.setItem('journalEntries', JSON.stringify(entries));
		handleCloseJournal();
	};

	return (
		<Card
			sx={{
				maxWidth: 400,
				borderRadius: 4,
				boxShadow: 6,
				overflow: 'hidden',
				transition: 'transform 0.2s, box-shadow 0.2s',
				'&:hover': {
					transform: 'translateY(-4px) scale(1.03)',
					boxShadow: 12,
				},
				bgcolor: 'background.paper',
				mx: 'auto',
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<CardMedia
					component='img'
					height='250'
					image={filmPoster}
					alt={filmTitle}
					sx={{
						objectFit: 'cover',
						filter: 'brightness(0.97)',
					}}
				/>
				<Box
					sx={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						bgcolor: 'rgba(0,0,0,0.65)',
						color: 'white',
						px: 2,
						py: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
					<Typography
						variant='subtitle1'
						fontWeight={700}
						noWrap
					>
						{filmTitle}
					</Typography>
					{filmYear && (
						<Typography
							variant='caption'
							sx={{ opacity: 0.8 }}
						>
							{filmYear}
						</Typography>
					)}
				</Box>
			</Box>
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					px: 2,
					py: 1,
					bgcolor: 'background.default',
				}}
			>
				<Box>
					<IconButton
						onClick={handleToggleWatchlist}
						aria-label='watchlist'
						size='small'
						color={isAdded ? 'primary' : 'default'}
					>
						{isAdded ? <RemoveIcon /> : <AddIcon />}
					</IconButton>
					<IconButton
						onClick={handleToggleFavorite}
						aria-label='favorite'
						size='small'
						color={isFavorited ? 'error' : 'default'}
					>
						{isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					</IconButton>
				</Box>
				<Button
					variant='contained'
					size='small'
					onClick={handleOpenJournal}
					sx={{
						textTransform: 'none',
						borderRadius: 2,
						boxShadow: 0,
						fontWeight: 500,
						bgcolor: 'primary.main',
						'&:hover': { bgcolor: 'primary.dark' },
					}}
				>
					Journal
				</Button>
			</CardActions>
			<Dialog
				open={journalOpen}
				onClose={handleCloseJournal}
				maxWidth='sm'
				fullWidth
				PaperProps={{
					sx: {
						borderRadius: 3,
						p: 2,
						bgcolor: 'background.paper',
						boxShadow: 8,
					},
				}}
			>
				<DialogTitle sx={{ fontWeight: 700, fontSize: 22, pb: 1 }}>
					New Journal Entry
				</DialogTitle>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Typography
						variant='subtitle2'
						gutterBottom
					>
						Film: {filmTitle}
					</Typography>
					<TextField
						autoFocus
						margin='dense'
						label='Journal Title'
						type='text'
						fullWidth
						variant='outlined'
						value={journalTitle}
						onChange={(e) => setJournalTitle(e.target.value)}
					/>
					<TextField
						margin='dense'
						label='Your thoughts'
						type='text'
						fullWidth
						multiline
						rows={5}
						variant='outlined'
						value={journalText}
						onChange={(e) => setJournalText(e.target.value)}
					/>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button
						onClick={handleCloseJournal}
						variant='outlined'
					>
						Cancel
					</Button>
					<Button
						onClick={handleJournalSubmit}
						variant='contained'
						disabled={!journalText.trim() || !journalTitle.trim()}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default FilmCard;
