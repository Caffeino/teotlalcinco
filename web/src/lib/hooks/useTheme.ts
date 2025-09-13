import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context)
		throw new Error('useTheme hook must be used within an ThemeProvider');

	return context;
};
