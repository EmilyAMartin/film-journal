import React, { useState, useEffect } from 'react';
import JournalEntryCard from '../Components/JournalEntryCard';

const Journal = () => {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
		setEntries(stored);
	}, []);

	const handleDelete = (entryToDelete) => {
		const updated = entries.filter((entry) => entry !== entryToDelete);
		setEntries(updated);
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
