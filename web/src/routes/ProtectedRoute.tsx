import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/hooks/useAuth';

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) return <Navigate to='/' replace />;

	return <Outlet />;
};

export default ProtectedRoute;
