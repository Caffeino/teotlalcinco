import { createContext } from 'react';
import type { AuthUser } from '../../types';

interface AuthContextType {
	auth: AuthUser | null;
	authLogin: (user: AuthUser) => void;
	authLogout: () => void;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
