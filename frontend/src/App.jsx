import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Home from '../Pages/Home';
import Journal from '../Pages/Journal';
import Favorites from '../Pages/Favorites';
import Watchlist from '../Pages/Watchlist';
import Account from '../Pages/Account';
import OfflineIndicator from '../Components/OfflineIndicator';
import InstallPrompt from '../Components/InstallPrompt';
import AccessControl from '../src/components/AccessControl';
import { useAccessControl } from '../src/hooks/useAccessControl';
import { register as registerServiceWorker } from '../src/serviceWorkerRegistration';

function App() {
	const [mode, setMode] = useState('light');
	const { hasAccess, isChecking, grantAccess } = useAccessControl();

	const theme = createTheme({
		palette: {
			mode,
		},
	});

	const toggleTheme = () => {
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		registerServiceWorker();
	}, []);

	if (isChecking) {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<div>Loading...</div>
				</div>
			</ThemeProvider>
		);
	}

	if (!hasAccess) {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AccessControl onAccessGranted={grantAccess} />
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<OfflineIndicator />
				<InstallPrompt />
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
