import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FilmActions from './FilmActions';
import {
	getFavorites,
	addToFavorites,
	removeFromFavorites,
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
	addJournalEntry,
} from '../src/storageService';

const FilmCard = ({ film }) => {
	const filmTitle = film?.Title || film?.title || 'Untitled';
	const filmYear = film?.Year || film?.year || '';
	const filmPoster = film?.Poster || film?.poster || '/src/Images/1.jpg';
	const filmDescription = film?.Plot || film?.description || '';
	const filmGenre = film?.Genre || film?.genre || '';
	const filmRuntime = film?.Runtime || film?.runtime || '';
	const filmDirector = film?.Director || film?.director || '';
	const filmId = film?.imdbID || film?.id || filmTitle;

	const [isFavorited, setIsFavorited] = React.useState(false);
	const [isAdded, setIsAdded] = React.useState(false);
	const [journalOpen, setJournalOpen] = React.useState(false);
	const [journalText, setJournalText] = React.useState('');
	const [journalTitle, setJournalTitle] = React.useState('');
	const [detailOpen, setDetailOpen] = React.useState(false);

	React.useEffect(() => {
		const checkStatus = async () => {
			try {
				const favorites = await getFavorites();
				const watchlist = await getWatchlist();

				setIsFavorited(favorites.some((f) => f.id === filmId));
				setIsAdded(watchlist.some((w) => w.id === filmId));
			} catch (error) {
				console.error('Failed to check film status:', error);
			}
		};
		checkStatus();
	}, [filmId]);

	const handleToggleFavorite = async () => {
		try {
			if (isFavorited) {
				await removeFromFavorites({
					id: filmId,
					title: filmTitle,
					year: filmYear,
					poster: filmPoster,
				});
				setIsFavorited(false);
			} else {
				await addToFavorites({
					id: filmId,
					title: filmTitle,
					year: filmYear,
					poster: filmPoster,
				});
				setIsFavorited(true);
			}
		} catch (error) {
			console.error('Failed to toggle favorite:', error);
		}
	};

	const handleToggleWatchlist = async () => {
		try {
			if (isAdded) {
				await removeFromWatchlist({
					id: filmId,
					title: filmTitle,
					year: filmYear,
					poster: filmPoster,
				});
				setIsAdded(false);
			} else {
				await addToWatchlist({
					id: filmId,
					title: filmTitle,
					year: filmYear,
					poster: filmPoster,
				});
				setIsAdded(true);
			}
		} catch (error) {
			console.error('Failed to toggle watchlist:', error);
		}
	};

	const handleOpenJournal = () => setJournalOpen(true);
	const handleCloseJournal = () => {
		setJournalOpen(false);
		setJournalText('');
		setJournalTitle('');
	};
	const handleJournalSubmit = async () => {
		try {
			await addJournalEntry({
				film: { id: filmId, title: filmTitle, year: filmYear, poster: filmPoster },
				title: journalTitle,
				text: journalText,
				date: new Date().toISOString(),
			});
			handleCloseJournal();
		} catch (error) {
			console.error('Failed to add journal entry:', error);
		}
	};

	return (
		<>
			<Card
				sx={{
					width: 200,
					maxWidth: '100%',
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
					mb: 4,
					mt: 2,
					cursor: 'pointer',
				}}
				onClick={() => setDetailOpen(true)}
			>
				<CardMedia
					component='img'
					height={250}
					image={filmPoster}
					alt={filmTitle}
					sx={{
						objectFit: 'cover',
						width: '100%',
						height: 300,
					}}
				/>
			</Card>

			{/* Journal Dialog */}
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
						fullWidth
						variant='outlined'
						value={journalTitle}
						onChange={(e) => setJournalTitle(e.target.value)}
					/>
					<TextField
						margin='dense'
						label='Your thoughts'
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
						color='inherit'
						sx={{ borderRadius: 4 }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleJournalSubmit}
						variant='contained'
						color='primary'
						disabled={!journalText.trim() || !journalTitle.trim()}
						sx={{ borderRadius: 4 }}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>

			{/* Detail Dialog */}
			<Dialog
				open={detailOpen}
				onClose={() => setDetailOpen(false)}
				maxWidth='md'
				fullWidth
				PaperProps={{
					sx: {
						borderRadius: 4,
						overflow: 'hidden',
						bgcolor: 'background.paper',
						boxShadow: 24,
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						position: 'relative',
						flexDirection: { xs: 'column', sm: 'row' },
					}}
				>
					{/* Close Button */}
					<IconButton
						onClick={() => setDetailOpen(false)}
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
							color: 'grey.500',
							zIndex: 10,
						}}
					>
						<CloseIcon />
					</IconButton>

					{/* Poster Section */}
					<Box
						sx={{
							width: { xs: '100%', sm: 300 },
							flexShrink: 0,
							height: { xs: 300, sm: '100%' },
							backgroundColor: 'black',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{filmPoster ? (
							<Box
								component='img'
								src={filmPoster}
								alt={`${filmTitle} Poster`}
								sx={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								}}
							/>
						) : (
							<Typography color='white'>No Image</Typography>
						)}
					</Box>

					{/* Details Section */}
					<Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
						<Typography
							variant='h5'
							fontWeight='bold'
							gutterBottom
						>
							{filmTitle} {filmYear && `(${filmYear})`}
						</Typography>
						<Typography
							variant='subtitle2'
							color='text.secondary'
							gutterBottom
						>
							{filmGenre} {filmRuntime && `• ${filmRuntime}`}{' '}
							{filmDirector && `• Directed by ${filmDirector}`}
						</Typography>
						<Divider sx={{ my: 1 }} />
						<Typography
							variant='body1'
							sx={{
								mt: 2,
								mb: 2,
								flexGrow: 1,
								overflowY: 'auto',
								maxHeight: 300,
							}}
						>
							{filmDescription || 'No description available.'}
						</Typography>
						<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
							<Tooltip
								title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
							>
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
					</Box>
				</Box>
			</Dialog>
		</>
	);
};

export default FilmCard;
