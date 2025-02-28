import React from 'react';
import Slider from 'react-slick';
import FilmCard from './FilmCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FilmCardCarousel = () => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 10,
		slidesToScroll: 4,
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
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
			<div>
				<FilmCard />
			</div>
		</Slider>
	);
};

export default FilmCardCarousel;
