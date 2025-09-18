// services/storageService.js

const get = (key) => JSON.parse(localStorage.getItem(key)) || [];
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Journal
export const getJournalEntries = () => get('journalEntries');
export const addJournalEntry = (entry) => {
	const list = getJournalEntries();
	list.push(entry);
	set('journalEntries', list);
};
export const deleteJournalEntryByIndex = (index) => {
	const list = getJournalEntries();
	list.splice(index, 1);
	set('journalEntries', list);
};

// Watchlist
export const getWatchlist = () => get('watchlist');
export const addToWatchlist = (film) => {
	const list = getWatchlist();
	if (!list.some((f) => JSON.stringify(f) === JSON.stringify(film))) {
		list.push(film);
		set('watchlist', list);
	}
};
export const removeFromWatchlist = (filmToRemove) => {
	const list = getWatchlist();
	const updated = list.filter(
		(film) => JSON.stringify(film) !== JSON.stringify(filmToRemove)
	);
	set('watchlist', updated);
};

// Favorites
export const getFavorites = () => get('favorites');
export const addToFavorites = (film) => {
	const list = getFavorites();
	if (!list.some((f) => JSON.stringify(f) === JSON.stringify(film))) {
		list.push(film);
		set('favorites', list);
	}
};
export const removeFromFavorites = (filmToRemove) => {
	const list = getFavorites();
	const updated = list.filter(
		(film) => JSON.stringify(film) !== JSON.stringify(filmToRemove)
	);
	set('favorites', updated);
};
