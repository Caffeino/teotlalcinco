import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/layout/admin/ProtectedRoute';
import MainLayout from './components/layout/portal/MainLayout';
import { AuthProvider } from './lib/context/AuthProvider';
import { privateRoutes, publicRoutes } from './routes';

function App() {
	return (
		<div className='dark:bg-black relative'>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<MainLayout />}>
							{publicRoutes}
						</Route>
						<Route element={<ProtectedRoute />}>{privateRoutes}</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
