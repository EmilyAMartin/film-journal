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

	if (!canMakeRequest()) return [];

	const res = await fetch(
		`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
	);
	const data = await res.json();

	incrementRequestCount();

	if (data.Response === 'True') {
		setCached(cacheKey, data.Search);
		return data.Search;
	} else {
		setCached(cacheKey, []);
		return [];
	}
}

export async function getMovieById(imdbID) {
	const cacheKey = `movie_${imdbID}`;
	const cached = getCached(cacheKey);
	if (cached) return cached;

	if (!canMakeRequest()) return {};

	const res = await fetch(
		`${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
	);
	const data = await res.json();

	incrementRequestCount();

	if (data.Response === 'True') {
		setCached(cacheKey, data);
		return data;
	} else {
		setCached(cacheKey, {});
		return {};
	}
}

export async function getPopularMovies() {
	const cacheKey = `popular_movies`;
	const cached = getCached(cacheKey);
	if (cached) return cached;

	if (!canMakeRequest()) return [];

	const popularIds = [
		'tt0111161', // The Shawshank Redemption
		'tt0068646', // The Godfather
		'tt0468569', // The Dark Knight
		'tt0110912', // Pulp Fiction
		'tt0109830', // Forrest Gump
		'tt1375666', // Inception
		'tt0137523', // Fight Club
		'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
		'tt0167260', // The Lord of the Rings: The Return of the King
		'tt0108052', // Schindler's List
	];

	const allResults = await Promise.all(popularIds.map((id) => getMovieById(id)));

	setCached(cacheKey, allResults);
	return allResults;
}

export async function getTrendingMovies() {
	const cacheKey = `trending_movies`;
	const cached = getCached(cacheKey);
	if (cached) return cached;

	if (!canMakeRequest()) return [];

	const trendingIds = [
		'tt1517268', // Barbie (2023)
		'tt1745960', // Oppenheimer (2023)
		'tt6791350', // Guardians of the Galaxy Vol. 3
		'tt9362722', // Spider-Man: Across the Spider-Verse
		'tt1877830', // The Batman
		'tt15239678', // Dune: Part Two
		'tt10362466', // John Wick: Chapter 4
		'tt1074638', // Skyfall
		'tt4154796', // Avengers: Endgame
		'tt4154756', // Avengers: Infinity War
	];

	const allResults = await Promise.all(
		trendingIds.map((id) => getMovieById(id))
	);

	setCached(cacheKey, allResults);
	return allResults;
}
