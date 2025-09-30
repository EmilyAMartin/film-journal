import React, { useState, useEffect } from 'react';
import {
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FilmActions = ({ film }) => {
	const filmId = film?.id || film?.imdbID || film?.title;
	const filmTitle = film?.title || 'Untitled';
	const filmYear = film?.year || '';
	const filmPoster = film?.poster || '/src/Images/1.jpg';

	const [isFavorited, setIsFavorited] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const [journalOpen, setJournalOpen] = useState(false);
	const [journalText, setJournalText] = useState('');
	const [journalTitle, setJournalTitle] = useState('');

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

		setIsFavorited(favorites.some((f) => f.id === filmId));
		setIsAdded(watchlist.some((w) => w.id === filmId));
	}, [filmId]);

	const handleToggleFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

		if (isFavorited) {
			const updated = favorites.filter((f) => f.id !== filmId);
			localStorage.setItem('favorites', JSON.stringify(updated));
			setIsFavorited(false);
		} else {
			if (!favorites.some((f) => f.id === filmId)) {
				favorites.push({
					id: filmId,
					title: filmTitle,
					year: filmYear,
					poster: filmPoster,
				});
			}
			localStorage.setItem('favorites', JSON.stringify(favorites));
			setIsFavorited(true);
		}
	};

	const handleToggleWatchlist = () => {
		const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

		if (isAdded) {
			const updated = watchlist.filter((w) => w.id !== filmId);
			localStorage.setItem('watchlist', JSON.stringify(updated));
			setIsAdded(false);
		} else {
			if (!watchlist.some((w) => w.id === filmId)) {
				watchlist.push({
					id: filmId,
					title: filmTitle,
					year: filmYear,
					poster: filmPoster,
				});
			}
			localStorage.setItem('watchlist', JSON.stringify(watchlist));
			setIsAdded(true);
		}
	};

	const handleJournalSubmit = () => {
		const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
		entries.push({
			film: { id: filmId, title: filmTitle, year: filmYear, poster: filmPoster },
			title: journalTitle,
			text: journalText,
			date: new Date().toISOString(),
		});
		localStorage.setItem('journalEntries', JSON.stringify(entries));
		handleCloseJournal();
	};

	const handleOpenJournal = () => setJournalOpen(true);
	const handleCloseJournal = () => {
		setJournalOpen(false);
		setJournalText('');
		setJournalTitle('');
	};

	return (
		<>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Tooltip title={isAdded ? 'Remove from Watchlist' : 'Add to Watchlist'}>
					<IconButton
						onClick={handleToggleWatchlist}
						aria-label='watchlist'
						size='medium'
						color={isAdded ? 'primary' : 'default'}
					>
						{isAdded ? <VisibilityIcon /> : <VisibilityOutlinedIcon />}
					</IconButton>
				</Tooltip>

				<Tooltip title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}>
					<IconButton
						onClick={handleToggleFavorite}
						aria-label='favorite'
						size='medium'
						color={isFavorited ? 'error' : 'default'}
					>
						{isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					</IconButton>
				</Tooltip>

				<Tooltip title='Add Journal Entry'>
					<IconButton
						onClick={handleOpenJournal}
						aria-label='journal'
						size='medium'
						color='secondary'
					>
						<AddCircleOutlineIcon />
					</IconButton>
				</Tooltip>
			</Box>

			<Dialog
				open={journalOpen}
				onClose={handleCloseJournal}
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>New Journal Entry</DialogTitle>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<TextField
						label='Journal Title'
						fullWidth
						variant='outlined'
						value={journalTitle}
						onChange={(e) => setJournalTitle(e.target.value)}
					/>
					<TextField
						label='Your thoughts'
						fullWidth
						multiline
						rows={5}
						variant='outlined'
						value={journalText}
						onChange={(e) => setJournalText(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseJournal}>Cancel</Button>
					<Button
						onClick={handleJournalSubmit}
						variant='contained'
						disabled={!journalTitle.trim() || !journalText.trim()}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default FilmActions;
