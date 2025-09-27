import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Grid,
	IconButton,
	Box,
	CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	getJournalEntries,
	deleteJournalEntryByIndex,
} from '../storageService';

const Journal = () => {
	const [entries, setEntries] = React.useState([]);

	React.useEffect(() => {
		const stored = getJournalEntries().reverse();
		setEntries(stored);
	}, []);

	const handleDelete = (displayedIndex) => {
		const originalIndex = entries.length - 1 - displayedIndex;
		deleteJournalEntryByIndex(originalIndex);
		const updated = getJournalEntries().reverse();
		setEntries(updated);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '60vh',
			}}
		>
			<Grid
				container
				spacing={3}
				columns={16}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				{entries.length === 0 ? (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: '60vh',
							width: '100%',
						}}
					>
						<h3 style={{ textAlign: 'center' }}>No journal entries yet.</h3>
					</Box>
				) : (
					entries.map((entry, idx) => {
						const film = entry.film || {};
						const poster = film.poster || '/src/Images/1.jpg'; // fallback image

						return (
							<Grid
								item
								xs={16}
								sm={8}
								md={5}
								key={idx}
								display='flex'
								justifyContent='center'
							>
								<Card sx={{ maxWidth: 350, position: 'relative' }}>
									<IconButton
										aria-label='delete'
										onClick={() => handleDelete(idx)}
										sx={{
											position: 'absolute',
											top: 8,
											right: 8,
											zIndex: 1,
											color: 'error.main',
										}}
									>
										<DeleteIcon />
									</IconButton>

									{/* 🎬 Film Poster */}
									<CardMedia
										component='img'
										height='200'
										image={poster}
										alt={film.title || 'Film poster'}
										sx={{ objectFit: 'cover' }}
									/>

									<CardContent>
										<Typography
											variant='h6'
											gutterBottom
											sx={{ fontWeight: 700, textAlign: 'center' }}
										>
											{entry.title || 'Untitled Entry'}
										</Typography>

										<Typography
											variant='caption'
											sx={{
												color: 'text.secondary',
												mb: 1,
												display: 'block',
												textAlign: 'center',
											}}
										>
											{new Date(entry.date).toLocaleString()}
										</Typography>

										<Typography
											variant='subtitle2'
											sx={{ fontStyle: 'italic', mb: 1, textAlign: 'center' }}
										>
											{film.title || 'Untitled Film'}
										</Typography>

										<Typography
											variant='body1'
											sx={{ textAlign: 'center' }}
										>
											{entry.text}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						);
					})
				)}
			</Grid>
		</div>
	);
};

export default Journal;
