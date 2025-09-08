import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../lib/hooks/useAuth';

const ProtectedLayout = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) return <Navigate to='/' replace />;

	return <Outlet />;
};

export default ProtectedLayout;
