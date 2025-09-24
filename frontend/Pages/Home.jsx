import FilmCardCarousel from '../Components/FilmCardCarousel';
import FilmSearch from '../Components/FilmSearch';
import PopularFilms from '../Components/PopularFilms'; // ✅

import { Typography, Box, Stack } from '@mui/material';

const Home = () => {
	return (
		<Box>
			<Box
				className='landing-section'
				display='flex'
				alignItems='center'
				justifyContent='center'
			></Box>

			<Box
				className='search-section'
				display='flex'
				alignItems='center'
				justifyContent='center'
				mt={4}
			>
				<FilmSearch />
			</Box>

			<Stack
				className='film-section'
				direction='column'
				sx={{ m: 12.5 }}
			></Stack>

			<Box sx={{ px: 6 }}>
				<PopularFilms /> {/* ✅ this renders the section */}
			</Box>
		</Box>
	);
};

export default Home;
