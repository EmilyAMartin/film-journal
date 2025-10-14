import React, { useState, useEffect } from 'react';
import JournalEntryCard from '../Components/JournalEntryCard';
import { getJournalEntries, setJournalEntries } from '../src/storageService';
const Journal = () => {
	const [entries, setEntriesState] = useState([]);

	useEffect(() => {
		const fetchEntries = async () => {
			const stored = await getJournalEntries();
			setEntriesState(stored);
		};
		fetchEntries();
	}, []);

	const handleDelete = async (entryToDelete) => {
		const updated = entries.filter((entry) => entry !== entryToDelete);
		setEntriesState(updated);
		await setJournalEntries(updated);
	};

	return (
		<div style={{ padding: '2rem' }}>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '2rem',
					marginTop: '2rem',
				}}
			>
				{entries.length === 0 ? (
					<p>No journal entries yet.</p>
				) : (
					entries.map((entry, idx) => (
						<JournalEntryCard
							key={idx}
							entry={entry}
							onDelete={handleDelete}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Journal;
