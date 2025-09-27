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
	const [expandedEntries, setExpandedEntries] = React.useState({});

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

	const toggleExpanded = (index) => {
		setExpandedEntries((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '60vh',
				marginTop: 40,
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
						const poster = film.poster || '/src/Images/1.jpg';

						const text = entry.text || '';
						const isLong = text.length > 200;
						const isExpanded = expandedEntries[idx];
						const displayText = isExpanded
							? text
							: `${text.slice(0, 200)}${isLong ? '...' : ''}`;

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
								<Card sx={{ maxWidth: 450, position: 'relative' }}>
									<IconButton
										aria-label='delete'
										onClick={() => handleDelete(idx)}
										sx={{
											position: 'absolute',
											top: 4,
											right: 8,
											zIndex: 1,
											color: 'black',
										}}
									>
										<DeleteIcon />
									</IconButton>

									<CardMedia
										component='img'
										image={poster}
										alt={film.title || 'Film poster'}
										sx={{
											height: 300,
											width: '100%',
											objectFit: 'contain',
											bgcolor: '#f5f5f5',
										}}
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
											variant='subtitle2'
											sx={{ fontStyle: 'italic', mb: 1, textAlign: 'center' }}
										>
											{film.title || 'Untitled Film'}
										</Typography>

										<Typography
											variant='body2'
											sx={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}
										>
											{displayText}
											{isLong && (
												<Box
													component='span'
													sx={{
														color: 'primary.main',
														cursor: 'pointer',
														fontWeight: 500,
														ml: 1,
													}}
													onClick={() => toggleExpanded(idx)}
												>
													{isExpanded ? 'Show Less' : 'Read More'}
												</Box>
											)}
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
