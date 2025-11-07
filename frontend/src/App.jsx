import { useState, useEffect } from 'react';
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
	const [mode, setMode] = useState('dark'); // Default to dark mode
	const { hasAccess, isChecking, grantAccess } = useAccessControl();

	const theme = createTheme({
		palette: {
			mode: mode, // Use the mode state variable
			primary: {
				main: '#00D9FF', // Vibrant teal
				light: '#33E0FF',
				dark: '#00B8D9',
				contrastText: '#fff',
			},
			secondary: {
				main: '#14B8A6', // Teal variant for secondary actions
				light: '#26C9B8',
				dark: '#0F9A8A',
				contrastText: '#fff',
			},
			background: {
				default: mode === 'dark' ? '#121212' : '#f5f5f5', // Dark grey for dark mode, light grey for light mode
				paper: mode === 'dark' ? '#1a1a1a' : '#ffffff', // Slightly lighter dark grey for cards in dark mode, white in light mode
			},
			text: {
				primary: mode === 'dark' ? '#ffffff' : '#121212',
				secondary:
					mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
			},
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
