import { createContext } from 'react';
import type { AuthUserType } from '../../types';

interface AuthContextType {
	auth: AuthUserType;
	authLogin: (user: AuthUserType) => void;
	authLogout: () => void;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
