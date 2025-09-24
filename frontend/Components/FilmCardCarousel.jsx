// src/Components/FilmCardCarousel.js
import React from 'react';
import Slider from 'react-slick';
import FilmCard from './FilmCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FilmCardCarousel = ({ films = [] }) => {
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

	// If no films, you could show a placeholder or nothing
	if (!films || films.length === 0) {
		return null;
	}

	return (
		<Slider {...settings}>
			{films.map((film) => (
				<FilmCard
					key={film.imdbID}
					film={{
						title: film.Title,
						year: film.Year,
						poster: film.Poster,
						id: film.imdbID,
					}}
				/>
			))}
		</Slider>
	);
};

export default FilmCardCarousel;
