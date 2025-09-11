import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddNewEntryBtn from '../Components/AddNewEntryBtn';

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
		<div>
			<AddNewEntryBtn />
			<Grid
				container
				spacing={3}
				columns={16}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				marginTop={4}
			>
				{entries.length === 0 ? (
					<Typography
						variant='body1'
						sx={{ mt: 4 }}
					>
						No journal entries yet.
					</Typography>
				) : (
					entries.map((entry, idx) => (
						<Grid
							item
							xs={16}
							sm={8}
							md={5}
							key={idx}
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
									{/* Journal Title */}
									<Typography
										variant='h6'
										gutterBottom
										sx={{ fontWeight: 700 }}
									>
										{entry.title || 'Untitled Entry'}
									</Typography>
									{/* Date */}
									<Typography
										variant='caption'
										sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
									>
										{new Date(entry.date).toLocaleString()}
									</Typography>
									{/* Movie Title */}
									<Typography
										variant='subtitle2'
										sx={{ fontStyle: 'italic', mb: 1 }}
									>
										{typeof entry.film === 'string'
											? entry.film
											: entry.film?.title || JSON.stringify(entry.film)}
									</Typography>
									{/* Entry Text */}
									<Typography variant='body1'>{entry.text}</Typography>
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
