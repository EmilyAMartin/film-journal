import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

const FilmCard = () => {
	return (
		<Card sx={{ maxWidth: 250 }}>
			<CardMedia
				component='img'
				height='350'
				image='/src/Images/1.jpg'
				alt='film poster'
			/>
			<CardContent>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					Title
				</Typography>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					Year
				</Typography>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					Director
				</Typography>
			</CardContent>
			<CardActions disableSpacing></CardActions>
		</Card>
	);
};
export default FilmCard;
