import FilmSearch from '../Components/FilmSearch';
import PopularFilms from '../Components/PopularFilms';
import { Box, Stack } from '@mui/material';

const Home = () => {
	return (
		<Box>
			{/* Landing Section */}
			<Box
				className='landing-section'
				display='flex'
				alignItems='center'
				justifyContent='center'
			></Box>

			{/* Search Section */}
			<Box
				className='search-section'
				display='flex'
				alignItems='center'
				justifyContent='center'
				mt={4}
			>
				<FilmSearch />
			</Box>

			{/* Film Display Section */}
			<Stack
				className='film-section'
				direction='column'
				sx={{ m: 12.5 }}
				spacing={6}
			>
				<PopularFilms />
			</Stack>
		</Box>
	);
};

export default Home;
