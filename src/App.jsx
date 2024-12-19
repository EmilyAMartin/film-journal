import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import Home from '../Pages/Home';
import Journal from '../Pages/Journal';
import Watchlist from '../Pages/Watchlist';
import Account from '../Pages/Account';
import { Switch } from '@mui/material';

function App() {
	const [toggleDarkMode, setToggleDarkMode] = useState(true);
	const toggleDarkTheme = () => {
		setToggleDarkMode(!toggleDarkMode);
	};
	const darkTheme = createTheme({
		palette: {
			mode: toggleDarkMode ? 'dark' : 'light',
			primary: {
				main: '#90caf1',
			},
			secondary: {
				main: '#131052',
			},
		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<div className='App'>
				<Navbar />
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
						path='/Watchlist'
						element={<Watchlist />}
					/>
					<Route
						path='/Account'
						element={<Account />}
					/>
				</Routes>
			</div>
			<CssBaseline />
			<div
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<Switch
					checked={toggleDarkMode}
					onChange={toggleDarkTheme}
				/>
			</div>
		</ThemeProvider>
	);
}
export default App;
