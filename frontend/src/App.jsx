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
				// Use darker teal for light mode (better contrast), bright teal for dark mode
				main: mode === 'dark' ? '#00D9FF' : '#008B8B', // Bright teal for dark, dark cyan/teal for light
				light: mode === 'dark' ? '#33E0FF' : '#20B2AA',
				dark: mode === 'dark' ? '#00B8D9' : '#006666',
				contrastText: '#fff',
			},
			secondary: {
				main: mode === 'dark' ? '#14B8A6' : '#0D7377', // Darker for light mode
				light: mode === 'dark' ? '#26C9B8' : '#14A085',
				dark: mode === 'dark' ? '#0F9A8A' : '#0A5D61',
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
		components: {
			// Modern button styling
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: '12px',
						textTransform: 'none',
						fontWeight: 600,
						padding: '10px 24px',
						boxShadow: 'none',
						transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
						},
						'&:active': {
							transform: 'translateY(0px)',
						},
					},
					contained: {
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						'&:hover': {
							boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
						},
					},
					outlined: {
						borderWidth: '2px',
						'&:hover': {
							borderWidth: '2px',
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						},
					},
				},
			},
			// Modern IconButton styling
			MuiIconButton: {
				styleOverrides: {
					root: {
						transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
						'&:hover': {
							transform: 'scale(1.1)',
							backgroundColor: 'rgba(0, 0, 0, 0.04)',
						},
					},
				},
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
