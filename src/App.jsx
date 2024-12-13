import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';
import Home from '../Pages/Home';
import Journal from '../Pages/Journal';
import Watchlist from '../Pages/Watchlist';
import Account from '../Pages/Account';

function App() {
	return (
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
	);
}
export default App;
