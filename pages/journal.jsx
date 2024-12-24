import React from 'react';
import JournalCard from '../Components/JournalCard';
import { Grid2 } from '@mui/material';

const Journal = () => {
	return (
		<div>
			<Grid2
				container
				spacing={3}
				columns={16}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				marginTop={4}
			>
				<JournalCard />
				<JournalCard />
				<JournalCard />
				<JournalCard />
				<JournalCard />
			</Grid2>
		</div>
	);
};

export default Journal;
