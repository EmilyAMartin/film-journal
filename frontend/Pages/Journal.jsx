import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Grid,
	IconButton,
	Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Journal = () => {
	const [entries, setEntries] = React.useState([]);

	React.useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
		setEntries(stored.reverse());
	}, []);

	const handleDelete = (idxToDelete) => {
		const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
		const originalIdx = stored.length - 1 - idxToDelete;
		const updated = stored.filter((_, idx) => idx !== originalIdx);
		localStorage.setItem('journalEntries', JSON.stringify(updated));
		setEntries(updated.slice().reverse());
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
					entries.map((entry, idx) => (
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
										{typeof entry.film === 'string'
											? entry.film
											: entry.film?.title || JSON.stringify(entry.film)}
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
					))
				)}
			</Grid>
		</div>
	);
};

export default Journal;
