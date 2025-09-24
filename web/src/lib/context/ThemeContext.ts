import { createContext } from 'react';

interface ThemeContextType {
	theme: string;
	isOpenSidebar: boolean;
	toggleTheme: () => void;
	toggleSidebar: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
