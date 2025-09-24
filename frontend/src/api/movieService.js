const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const REQUEST_LIMIT = 1000;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const getToday = () => new Date().toISOString().slice(0, 10);

function incrementRequestCount() {
	const today = getToday();
	const stats = JSON.parse(localStorage.getItem('omdb_usage')) || {};

	if (stats.date !== today) {
		stats.date = today;
		stats.count = 0;
	}

	stats.count = (stats.count || 0) + 1;
	localStorage.setItem('omdb_usage', JSON.stringify(stats));

	return stats.count;
}

function canMakeRequest() {
	const stats = JSON.parse(localStorage.getItem('omdb_usage')) || {};
	return stats.count === undefined || stats.count < REQUEST_LIMIT;
}

function getCached(key) {
	const cache = JSON.parse(localStorage.getItem(key));
	if (!cache) return null;

	const now = Date.now();
	if (now - cache.timestamp > CACHE_DURATION) {
		localStorage.removeItem(key);
		return null;
	}

	return cache.data;
}

function setCached(key, data) {
	const item = {
		timestamp: Date.now(),
		data,
	};
	localStorage.setItem(key, JSON.stringify(item));
}

export async function searchMovies(title) {
	const cacheKey = `search_${title.toLowerCase()}`;
	const cached = getCached(cacheKey);
	if (cached) return cached;

	if (!canMakeRequest()) {
		throw new Error('Daily request limit reached.');
	}

	const res = await fetch(
		`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
	);
	const data = await res.json();

	incrementRequestCount();

	if (data.Response === 'True') {
		setCached(cacheKey, data.Search);
		return data.Search;
	} else {
		throw new Error(data.Error || 'Movie not found');
	}
}

export async function getMovieById(imdbID) {
	const cacheKey = `movie_${imdbID}`;
	const cached = getCached(cacheKey);
	if (cached) return cached;

	if (!canMakeRequest()) {
		throw new Error('Daily request limit reached.');
	}

	const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
	const data = await res.json();

	incrementRequestCount();

	if (data.Response === 'True') {
		setCached(cacheKey, data);
		return data;
	} else {
		throw new Error(data.Error || 'Movie not found');
	}
}
