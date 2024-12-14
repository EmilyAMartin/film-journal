import React from 'react';
import FlimCardCarousel from '../Components/FlimCardCarousel';

const Home = () => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: 24,
				}}
			>
				<FlimCardCarousel />
			</div>
		</div>
	);
};

export default Home;
