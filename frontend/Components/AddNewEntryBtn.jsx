import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AddArtworkBtn = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchSubmit = () => {
		console.log('Searching for:', searchQuery);
		// Add search logic //
	};
	const [open, setOpen] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleMouseEnter = () => {
		setIsHover(true);
	};
	const handleMouseLeave = () => {
		setIsHover(false);
	};

	const buttonStyle = {
		padding: '0.5rem',
		color: '#7a7a7a',
		outline: 'none',
		border: 'none',
		borderRadius: '0.5rem',
		fontSize: '1rem',
		fontWeight: 500,
		cursor: 'pointer',
		transition: '0.2s',
		width: 150,
		backgroundColor: isHover ? '#e0e0e0' : '#e0e0e0',
	};
	const modalStyle = {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor: 'background.paper',
		maxWidth: 800,
	};
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

	return (
		<div>
			<button
				style={buttonStyle}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleOpen}
			>
				New Entry
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 25,
							maxWidth: 800,
							padding: 50,
						}}
					>
						<Typography variant='h5'>New Entry</Typography>
						<div
							className='search-section'
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: 20,
							}}
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
						</div>
						<FormControl
							sx={{ width: '100%' }}
							variant='outlined'
						>
							<InputLabel htmlFor='outlined-adornment- Title'>Title</InputLabel>
							<OutlinedInput
								id='outlined-adornment-title'
								endAdornment={<InputAdornment position='end'></InputAdornment>}
								label='title'
							/>
						</FormControl>

						<FormControl
							sx={{ width: '100%' }}
							variant='outlined'
						>
							<InputLabel htmlFor='outlined-adornment-date'>Date</InputLabel>
							<OutlinedInput
								id='outlined-adornment-date'
								endAdornment={<InputAdornment position='end'></InputAdornment>}
								label='date'
							/>
						</FormControl>

						<TextField
							id='outlined-multiline-static'
							multiline
							label='Comments'
							rows={4}
							sx={{ width: '100%' }}
						/>

						<FormControl
							sx={{ width: '100%' }}
							variant='outlined'
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									gap: 50,
									marginTop: 25,
								}}
							>
								<SubmitButton
									sx={{ color: 'white' }}
									variant='contained'
									onClick={handleClose}
								>
									Submit
								</SubmitButton>
								<CancelButton
									sx={{ color: 'white' }}
									variant='contained'
									onClick={handleClose}
								>
									Cancel
								</CancelButton>
							</div>
						</FormControl>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default AddArtworkBtn;
