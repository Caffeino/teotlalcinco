import { useEffect, useState, type ReactNode } from 'react';
import type { AuthUser } from '../../types';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadAuthUser = () => {
			try {
				const savedUser = localStorage.getItem('auth');

				if (savedUser) setAuth(JSON.parse(savedUser));

				setLoading(false);
			} catch (error) {
				console.log('Error parsing saved user:', error);
				localStorage.removeItem('auth');
			}
		};

		loadAuthUser();
	}, []);

	const authLogin = (userData: AuthUser) => {
		setAuth(userData);
		localStorage.setItem('auth', JSON.stringify(userData));
	};

	const authLogout = () => {
		setAuth(null);
		localStorage.removeItem('auth');
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
