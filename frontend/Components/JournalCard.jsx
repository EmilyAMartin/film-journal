import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const JournalCard = () => {
	return (
		<div>
			<Card sx={{ maxWidth: 350 }}>
				<CardActionArea>
					<CardActions disableSpacing></CardActions>
					<CardContent>
						<Typography
							gutterBottom
							variant='h5'
							component='div'
						>
							Jounal Title
						</Typography>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary' }}
						>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas soluta
							rem, minus quos quo aspernatur ducimus laborum nemo adipisci, libero
							necessitatibus cupiditate placeat eligendi culpa corporis non aliquid
							pariatur? Similique.Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Quas soluta rem, minus quos quo aspernatur ducimus laborum nemo
							adipisci, libero necessitatibus cupiditate placeat eligendi culpa
							corporis non aliquid pariatur? Similique.Lorem ipsum dolor sit amet,
							consectetur adipisicing elit. Quas soluta rem, minus quos quo aspernatur
							ducimus laborum nemo adipisci, libero necessitatibus cupiditate placeat
							eligendi culpa corporis non aliquid pariatur? Similique.
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
};

export default JournalCard;
