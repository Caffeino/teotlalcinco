import { useEffect, useState, type ReactNode } from 'react';
import { USER_PROFILE_INITIAL_STATE } from '../../constants/initialState';
import type { AuthUserType } from '../../types';
import { fetchUser } from '../api/auth';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<AuthUserType>(USER_PROFILE_INITIAL_STATE);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('user', auth);
		if (auth.id) return;

		const authToken = localStorage.getItem('token');

		if (!authToken) return setLoading(false);

		const loadAuthUser = async () => {
			try {
				const user = await fetchUser();
				if (!user)
					throw new Error(
						'Error al iniciar sesión, inténte de nuevo más tarde.'
					);

				console.log('user fetch', user);

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
		setLoading(false);
	};

	const authLogout = () => {
		setAuth(USER_PROFILE_INITIAL_STATE);
		localStorage.removeItem('token');
	};

	if (loading) return null;

	const value = {
		auth,
		authLogin,
		authLogout,
		isAuthenticated: auth.id > 0
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
