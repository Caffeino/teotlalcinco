import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/portal/MainLayout';
import { AuthProvider } from './lib/context/AuthProvider';
import { routes } from './routes';

function App() {
	return (
		<div className='dark:bg-black relative'>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						{/* Public Routes */}
						<Route path='/' element={<MainLayout />}>
							{routes}
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
