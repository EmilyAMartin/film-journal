import localforage from 'localforage';

export const getJournalEntries = async () =>
	(await localforage.getItem('journalEntries')) || [];
export const setJournalEntries = async (entries) =>
	localforage.setItem('journalEntries', entries);

export const getFavorites = async () =>
	(await localforage.getItem('favorites')) || [];
export const setFavorites = async (favorites) =>
	localforage.setItem('favorites', favorites);

export const getWatchlist = async () =>
	(await localforage.getItem('watchlist')) || [];
export const setWatchlist = async (watchlist) =>
	localforage.setItem('watchlist', watchlist);
