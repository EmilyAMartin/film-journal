import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

const SubmitButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(green[500]),
	backgroundColor: green[400],
	'&:hover': {
		backgroundColor: green[700],
	},
}));
const CancelButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(red[500]),
	backgroundColor: red[500],
	'&:hover': {
		backgroundColor: red[700],
	},
}));

const AddNewEntryBtn = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [open, setOpen] = useState(false);

	const handleSearchChange = (event) => setSearchQuery(event.target.value);
	const handleSearchSubmit = () => {
		console.log('Searching for:', searchQuery);
	};
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box>
			<Button
				variant='contained'
				color='primary'
				onClick={handleOpen}
				sx={{
					borderRadius: 2,
					fontWeight: 500,
					fontSize: '1rem',
					width: 150,
					bgcolor: '#e0e0e0',
					color: '#7a7a7a',
					textTransform: 'none',
					'&:hover': { bgcolor: '#bdbdbd' },
				}}
			>
				New Entry
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						borderRadius: 2,
						maxWidth: 800,
						width: '90%',
						p: 4,
					}}
				>
					<Typography
						variant='h5'
						sx={{ mb: 3 }}
					>
						New Entry
					</Typography>
					<Stack
						spacing={3}
						sx={{ width: '100%' }}
					>
						<TextField
							value={searchQuery}
							onChange={handleSearchChange}
							variant='outlined'
							size='small'
							label='Search'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								),
							}}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									handleSearchSubmit();
								}
							}}
						/>
						<FormControl
							variant='outlined'
							sx={{ width: '100%' }}
						>
							<InputLabel htmlFor='outlined-adornment-title'>Title</InputLabel>
							<OutlinedInput
								id='outlined-adornment-title'
								label='Title'
							/>
						</FormControl>
						<FormControl
							variant='outlined'
							sx={{ width: '100%' }}
						>
							<InputLabel htmlFor='outlined-adornment-date'>Date</InputLabel>
							<OutlinedInput
								id='outlined-adornment-date'
								label='Date'
							/>
						</FormControl>
						<TextField
							id='outlined-multiline-static'
							multiline
							label='Comments'
							rows={4}
							sx={{ width: '100%' }}
						/>
						<Stack
							direction='row'
							spacing={6}
							justifyContent='center'
							sx={{ mt: 2 }}
						>
							<SubmitButton
								variant='contained'
								onClick={handleClose}
								sx={{ textTransform: 'none' }}
							>
								Submit
							</SubmitButton>
							<CancelButton
								variant='contained'
								onClick={handleClose}
								sx={{ textTransform: 'none' }}
							>
								Cancel
							</CancelButton>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</Box>
	);
};

export default AddNewEntryBtn;
