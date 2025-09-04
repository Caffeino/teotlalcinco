import { createContext } from 'react';
import type { AuthUser } from '../../types';

interface AuthContextType {
	auth: AuthUser | null;
	login: (user: AuthUser) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
