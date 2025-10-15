import localforage from 'localforage';

// Configure localforage
localforage.config({
	name: 'FilmJournal',
	storeName: 'filmJournalData',
	description: 'Film Journal local storage',
});

// Migration flag to ensure we only migrate once
const MIGRATION_KEY = 'migration_completed_v1';

// Migrate data from localStorage to IndexedDB
const migrateFromLocalStorage = async () => {
	const migrationCompleted = await localforage.getItem(MIGRATION_KEY);
	if (migrationCompleted) return;

	console.log('Migrating data from localStorage to IndexedDB...');

	try {
		// Migrate journal entries
		const journalEntries = JSON.parse(
			localStorage.getItem('journalEntries') || '[]'
		);
		if (journalEntries.length > 0) {
			await localforage.setItem('journalEntries', journalEntries);
			console.log(`Migrated ${journalEntries.length} journal entries`);
		}

		// Migrate favorites
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		if (favorites.length > 0) {
			await localforage.setItem('favorites', favorites);
			console.log(`Migrated ${favorites.length} favorites`);
		}

		// Migrate watchlist
		const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
		if (watchlist.length > 0) {
			await localforage.setItem('watchlist', watchlist);
			console.log(`Migrated ${watchlist.length} watchlist items`);
		}

		// Mark migration as completed
		await localforage.setItem(MIGRATION_KEY, true);

		// Clear localStorage data after successful migration
		localStorage.removeItem('journalEntries');
		localStorage.removeItem('favorites');
		localStorage.removeItem('watchlist');

		console.log('Migration completed successfully');
	} catch (error) {
		console.error('Migration failed:', error);
	}
};

// Initialize migration on first load
migrateFromLocalStorage();

// Journal entries
export const getJournalEntries = async () => {
	const entries = await localforage.getItem('journalEntries');
	return entries || [];
};

export const setJournalEntries = async (entries) => {
	return await localforage.setItem('journalEntries', entries);
};

export const addJournalEntry = async (entry) => {
	const entries = await getJournalEntries();
	entries.push(entry);
	return await setJournalEntries(entries);
};

export const deleteJournalEntryByIndex = async (index) => {
	const entries = await getJournalEntries();
	entries.splice(index, 1);
	return await setJournalEntries(entries);
};

// Favorites
export const getFavorites = async () => {
	const favorites = await localforage.getItem('favorites');
	return favorites || [];
};

export const setFavorites = async (favorites) => {
	return await localforage.setItem('favorites', favorites);
};

export const addToFavorites = async (film) => {
	const favorites = await getFavorites();
	if (!favorites.some((f) => JSON.stringify(f) === JSON.stringify(film))) {
		favorites.push(film);
		return await setFavorites(favorites);
	}
	return favorites;
};

export const removeFromFavorites = async (filmToRemove) => {
	const favorites = await getFavorites();
	const updated = favorites.filter(
		(film) => JSON.stringify(film) !== JSON.stringify(filmToRemove)
	);
	return await setFavorites(updated);
};

// Watchlist
export const getWatchlist = async () => {
	const watchlist = await localforage.getItem('watchlist');
	return watchlist || [];
};

export const setWatchlist = async (watchlist) => {
	return await localforage.setItem('watchlist', watchlist);
};

export const addToWatchlist = async (film) => {
	const watchlist = await getWatchlist();
	if (!watchlist.some((f) => JSON.stringify(f) === JSON.stringify(film))) {
		watchlist.push(film);
		return await setWatchlist(watchlist);
	}
	return watchlist;
};

export const removeFromWatchlist = async (filmToRemove) => {
	const watchlist = await getWatchlist();
	const updated = watchlist.filter(
		(film) => JSON.stringify(film) !== JSON.stringify(filmToRemove)
	);
	return await setWatchlist(updated);
};

// Data export/import utilities
export const exportAllData = async () => {
	const journalEntries = await getJournalEntries();
	const favorites = await getFavorites();
	const watchlist = await getWatchlist();

	return {
		journalEntries,
		favorites,
		watchlist,
		exportDate: new Date().toISOString(),
		version: '1.0',
	};
};

export const importAllData = async (data) => {
	try {
		if (data.journalEntries) await setJournalEntries(data.journalEntries);
		if (data.favorites) await setFavorites(data.favorites);
		if (data.watchlist) await setWatchlist(data.watchlist);
		return true;
	} catch (error) {
		console.error('Import failed:', error);
		return false;
	}
};

// Clear all data
export const clearAllData = async () => {
	await localforage.clear();
	return true;
};
