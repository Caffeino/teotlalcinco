import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './lib/context/AuthProvider';
import RegisterPage from './pages/Portal/RegisterPage';
import { privateRoutes, publicRoutes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{publicRoutes}
					<Route path='/bienvenido/:token?' element={<RegisterPage />} />
					<Route element={<ProtectedRoute />}>{privateRoutes}</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
