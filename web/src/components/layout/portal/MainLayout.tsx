import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SignIn from '../../forms/auth/SignIn';
import Modal from '../../modal/Modal';
import Navbar from './Navbar';

const MainLayout = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [openAuthModal, setOpenAuthModal] = useState(false);

	return (
		<div className={`${darkMode && 'dark'}`}>
			<Navbar
				darkMode={darkMode}
				setDarkMode={() => setDarkMode(!darkMode)}
				showAuthModal={() => setOpenAuthModal(true)}
			/>
			<Outlet />
			<Modal
				open={openAuthModal}
				onClose={() => setOpenAuthModal(false)}
				hideHeader
			>
				<SignIn />
			</Modal>
		</div>
	);
};

export default MainLayout;
