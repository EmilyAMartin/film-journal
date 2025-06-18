import React, { useState, useEffect } from 'react';
import {
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Grid2,
	Typography,
	CircularProgress,
	InputAdornment,
	Button,
} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const FilmSearch = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedGenre, setSelectedGenre] = useState('');
	const [sortOrder, setSortOrder] = useState('a-z');
	const [films, setFilms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const apiKey = '1234';

	useEffect(() => {
		if (searchQuery) {
			fetchFilms();
		}
	}, [searchQuery, selectedYear, selectedGenre, page]);

	const fetchFilms = async () => {
		setLoading(true);
		try {
			const url = `https://www.omdbapi.com/?apikey=1234&s=${
				searchQuery || '*'
			}&type=movie&page=${page}&y=${selectedYear || ''}&genre=${
				selectedGenre || ''
			}`;

			const response = await axios.get(url);

			if (response.data.Response === 'True') {
				setFilms((prevFilms) => [...prevFilms, ...response.data.Search]);
				setTotalResults(Number(response.data.totalResults));
			} else {
				setFilms([]);
				setError(response.data.Error);
			}
			setLoading(false);
		} catch (err) {
			setError('Error fetching films. Please try again later.');
			setLoading(false);
		}
	};

	const handleSearch = () => {
		const filteredFilms = films
			.filter((film) => {
				return (
					(selectedYear ? film.Year === selectedYear : true) &&
					(selectedGenre
						? film.Genre &&
						  film.Genre.toLowerCase().includes(selectedGenre.toLowerCase())
						: true) &&
					(searchQuery
						? film.Title.toLowerCase().includes(searchQuery.toLowerCase())
						: true)
				);
			})
			.sort((a, b) => {
				if (sortOrder === 'a-z') return a.Title.localeCompare(b.Title);
				if (sortOrder === 'z-a') return b.Title.localeCompare(a.Title);
				return 0;
			});

		onSearch(filteredFilms);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleSelectChange = () => {
		handleSearch();
	};

	const handleLoadMore = () => {
		if (films.length < totalResults) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const years = [...new Set(films.map((film) => film.Year))];
	const genres = [...new Set(films.map((film) => film.Genre))];

	return (
		<Grid2
			container
			spacing={2}
			alignItems='center'
		>
			<Grid2
				item
				xs={12}
				sm={4}
			>
				<TextField
					label='Search by Title'
					variant='outlined'
					fullWidth
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyPress={handleKeyPress}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid2>
			<Grid2
				item
				xs={12}
				sm={2}
			>
				<FormControl
					fullWidth
					variant='outlined'
				>
					<InputLabel>Year</InputLabel>
					<Select
						value={selectedYear}
						onChange={(e) => {
							setSelectedYear(e.target.value);
							handleSelectChange();
						}}
						label='Year'
					>
						<MenuItem value=''>All Years</MenuItem>
						{years.map((year) => (
							<MenuItem
								key={year}
								value={year}
							>
								{year}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid2>
			<Grid2
				item
				xs={12}
				sm={2}
			>
				<FormControl
					fullWidth
					variant='outlined'
				>
					<InputLabel>Genre</InputLabel>
					<Select
						value={selectedGenre}
						onChange={(e) => {
							setSelectedGenre(e.target.value);
							handleSelectChange();
						}}
						label='Genre'
					>
						<MenuItem value=''>All Genres</MenuItem>
						{genres.map((genre) => (
							<MenuItem
								key={genre}
								value={genre}
							>
								{genre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid2>
			<Grid2
				item
				xs={12}
				sm={2}
			>
				<FormControl
					fullWidth
					variant='outlined'
				>
					<InputLabel>Sort By</InputLabel>
					<Select
						value={sortOrder}
						onChange={(e) => {
							setSortOrder(e.target.value);
							handleSelectChange();
						}}
						label='Sort By'
					>
						<MenuItem value='a-z'>A-Z</MenuItem>
						<MenuItem value='z-a'>Z-A</MenuItem>
					</Select>
				</FormControl>
			</Grid2>

			{/* Loading spinner */}
			{loading && (
				<Grid2
					item
					xs={12}
				>
					<CircularProgress />
				</Grid2>
			)}

			{/* Error message */}
			{error && (
				<Grid2
					item
					xs={12}
				>
					<Typography color='error'>{error}</Typography>
				</Grid2>
			)}

			{/* Display "Load More" button */}
			{films.length < totalResults && !loading && (
				<Grid2
					item
					xs={12}
				>
					<Button
						fullWidth
						variant='contained'
						color='primary'
						onClick={handleLoadMore}
					>
						Load More
					</Button>
				</Grid2>
			)}
		</Grid2>
	);
};

export default FilmSearch;
