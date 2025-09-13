import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/portal/MainLayout';
import { AuthProvider } from './lib/context/AuthProvider';
import { privateRoutes, publicRoutes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
	return (
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
	);
}

export default App;
