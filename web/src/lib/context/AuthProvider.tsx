import { useEffect, useState, type ReactNode } from 'react';
import type { AuthUserType } from '../../types';
import { fetchUser } from '../api/auth';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<AuthUserType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (auth) return;

		const authToken = localStorage.getItem('token');

		if (!authToken) return setLoading(false);

		const loadAuthUser = async () => {
			try {
				const user = await fetchUser();
				if (!user)
					throw new Error(
						'Error al iniciar sesión, inténte de nuevo más tarde.'
					);

				console.log(user);

				setAuth(user);
			} catch (error) {
				console.log('Error parsing saved user:', error);
				localStorage.removeItem('token');
			} finally {
				setLoading(false);
			}
		};

		loadAuthUser();
	}, [auth]);

	const authLogin = (userData: AuthUserType) => {
		setAuth(userData);
		const { token } = userData;
		if (token) localStorage.setItem('token', token);
	};

	const authLogout = () => {
		setAuth(null);
		localStorage.removeItem('token');
	};

	if (loading) return null;

	const value = {
		auth,
		authLogin,
		authLogout,
		isAuthenticated: !!auth
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
