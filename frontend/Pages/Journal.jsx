import { useState, useEffect } from 'react';
import JournalEntryCard from '../Components/JournalEntryCard';
import { getJournalEntries } from '../storageService';
const Journal = () => {
	const [entries, setEntriesState] = useState([]);

	useEffect(() => {
		const stored = getJournalEntries();
		setEntriesState(stored);
	}, []);

	const handleDelete = (entryToDelete) => {
		const updated = entries.filter((entry) => entry !== entryToDelete);
		setEntriesState(updated);
		// Update localStorage directly
		localStorage.setItem('journalEntries', JSON.stringify(updated));
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
