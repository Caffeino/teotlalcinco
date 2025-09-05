import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
	const [darkMode, setDarkMode] = useState(false);
	return (
		<div className={`${darkMode && 'dark'}`}>
			<Navbar darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} />
			<Outlet />
		</div>
	);
};

export default MainLayout;
