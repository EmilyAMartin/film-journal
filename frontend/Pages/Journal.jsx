import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AddNewEntryBtn from '../Components/AddNewEntryBtn';

const Journal = () => {
	const [entries, setEntries] = React.useState([]);

	React.useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
		setEntries(stored.reverse()); // newest first
	}, []);

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
							<Card sx={{ maxWidth: 350 }}>
								<CardContent>
									<Typography
										variant='h6'
										gutterBottom
									>
										{typeof entry.film === 'string'
											? entry.film
											: JSON.stringify(entry.film)}
									</Typography>
									<Typography
										variant='body2'
										sx={{ color: 'text.secondary', mb: 1 }}
									>
										{new Date(entry.date).toLocaleString()}
									</Typography>
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
