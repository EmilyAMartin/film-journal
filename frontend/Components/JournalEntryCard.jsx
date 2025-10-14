import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const JournalEntryCard = ({ entry, onDelete }) => {
	const [open, setOpen] = useState(false);
	const { film, title, text } = entry;
	const filmTitle = film?.title || film?.Title || 'Untitled';
	const filmPoster = film?.poster || film?.Poster || '/src/Images/1.jpg';

	const handleDelete = () => {
		onDelete(entry);
		setOpen(false);
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
				onClick={() => setOpen(true)}
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

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth='sm'
				fullWidth
				PaperProps={{
					sx: {
						borderRadius: 4,
						overflow: 'hidden',
						bgcolor: 'background.paper',
						boxShadow: 24,
						position: 'relative',
						minHeight: 200,
					},
				}}
			>
				<Box sx={{ position: 'relative', p: 3 }}>
					<IconButton
						onClick={() => setOpen(false)}
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
					<Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
						<Box
							component='img'
							src={filmPoster}
							alt={filmTitle}
							sx={{
								width: 120,
								height: 180,
								objectFit: 'cover',
								borderRadius: 2,
								boxShadow: 2,
							}}
						/>
						<Box sx={{ flex: 1 }}>
							<Typography
								variant='h6'
								fontWeight='bold'
								gutterBottom
							>
								{title}
							</Typography>
							<Typography
								variant='subtitle1'
								color='text.secondary'
								gutterBottom
							>
								{filmTitle}
							</Typography>
							<Typography
								variant='body1'
								sx={{
									mt: 2,
									mb: 2,
									whiteSpace: 'pre-line',
								}}
							>
								{text}
							</Typography>
						</Box>
					</Box>
					<IconButton
						onClick={handleDelete}
						color='black'
						aria-label='delete journal entry'
						sx={{
							position: 'absolute',
							bottom: 24,
							right: 24,
						}}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Dialog>
		</>
	);
};

export default JournalEntryCard;
