import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import FilmCard from './FilmCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMovieById } from '../src/api/movieService';

const FilmCardCarousel = ({ films = [] }) => {
	const [fullFilms, setFullFilms] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (films.length === 0) {
			setFullFilms([]);
			setLoading(false);
			return;
		}

		const fetchFullDetails = async () => {
			setLoading(true);
			try {
				const detailedFilms = await Promise.all(
					films.map((film) => getMovieById(film.imdbID))
				);
				setFullFilms(detailedFilms);
			} catch (err) {
				console.error('Failed to fetch full movie details:', err);
				setFullFilms(films);
			}
			setLoading(false);
		};

		fetchFullDetails();
	}, [films]);

	if (loading) {
		return <div>Loading films...</div>;
	}

	if (!fullFilms || fullFilms.length === 0) {
		return null;
	}

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 2,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<Slider {...settings}>
			{fullFilms.map((film) => (
				<FilmCard
					key={film.imdbID}
					film={film}
				/>
			))}
		</Slider>
	);
};

export default FilmCardCarousel;
