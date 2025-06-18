import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Home from '../Pages/Home';
import Journal from '../Pages/Journal';
import Favorites from '../Pages/Favorites';
import Watchlist from '../Pages/Watchlist';
import Account from '../Pages/Account';

function App() {
	const [mode, setMode] = useState('light');
	const theme = createTheme({
		palette: {
			mode,
		},
	});

	const toggleTheme = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<Navbar
					toggleTheme={toggleTheme}
					mode={mode}
				/>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/Journal'
						element={<Journal />}
					/>
					<Route
						path='/Favorites'
						element={<Favorites />}
					/>
					<Route
						path='/Watchlist'
						element={<Watchlist />}
					/>
					<Route
						path='/Account'
						element={<Account />}
					/>
				</Routes>
			</div>
		</ThemeProvider>
	);
}
export default App;
