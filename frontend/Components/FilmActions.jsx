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
import {
	getFavorites,
	addToFavorites,
	removeFromFavorites,
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
	addJournalEntry,
} from '../src/storageService';

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
		const checkStatus = async () => {
			const favorites = await getFavorites();
			const watchlist = await getWatchlist();

			setIsFavorited(favorites.some((f) => f.id === filmId || f.imdbID === filmId));
			setIsAdded(watchlist.some((w) => w.id === filmId || w.imdbID === filmId));
		};
		checkStatus();
	}, [filmId]);

	const handleToggleFavorite = async () => {
		const filmData = {
			id: filmId,
			imdbID: filmId,
			title: filmTitle,
			year: filmYear,
			poster: filmPoster,
		};

		if (isFavorited) {
			await removeFromFavorites(filmData);
			setIsFavorited(false);
		} else {
			await addToFavorites(filmData);
			setIsFavorited(true);
		}
	};

	const handleToggleWatchlist = async () => {
		const filmData = {
			id: filmId,
			imdbID: filmId,
			title: filmTitle,
			year: filmYear,
			poster: filmPoster,
		};

		if (isAdded) {
			await removeFromWatchlist(filmData);
			setIsAdded(false);
		} else {
			await addToWatchlist(filmData);
			setIsAdded(true);
		}
	};

	const handleJournalSubmit = async () => {
		const entry = {
			film: { id: filmId, imdbID: filmId, title: filmTitle, year: filmYear, poster: filmPoster },
			title: journalTitle,
			text: journalText,
			date: new Date().toISOString(),
		};
		await addJournalEntry(entry);
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
				<DialogActions sx={{ gap: 1 }}>
					<Button
						onClick={handleCloseJournal}
						variant='outlined'
					>
						Cancel
					</Button>
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
