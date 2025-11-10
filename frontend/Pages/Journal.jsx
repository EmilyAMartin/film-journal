import { useState, useEffect } from 'react';
import JournalEntryCard from '../Components/JournalEntryCard';
import { getJournalEntries, setJournalEntries } from '../src/storageService';

const Journal = () => {
	const [entries, setEntriesState] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadEntries = async () => {
			try {
				const stored = await getJournalEntries();
				setEntriesState(stored);
			} catch (error) {
				console.error('Failed to load journal entries:', error);
			} finally {
				setLoading(false);
			}
		};
		loadEntries();
	}, []);

	const handleDelete = async (entryToDelete) => {
		try {
			const updated = entries.filter((entry) => entry !== entryToDelete);
			setEntriesState(updated);
			await setJournalEntries(updated);
		} catch (error) {
			console.error('Failed to delete journal entry:', error);
		}
	};

	if (loading) {
		return (
			<div style={{ padding: '2rem', textAlign: 'center' }}>
				<p>Loading journal entries...</p>
			</div>
		);
	}

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
					<h3 style={{ textAlign: 'center' }}>No journal entries yet.</h3>
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
