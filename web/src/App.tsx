import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Portal/LandingPage';

function App() {
	return (
		<div className='dark:bg-black relative'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
