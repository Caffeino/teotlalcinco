import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SignIn from '../../forms/auth/SignIn';
import SignUp from '../../forms/auth/SignUp';
import Modal from '../../modal/Modal';
import Navbar from './Navbar';

const MainLayout = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [openAuthModal, setOpenAuthModal] = useState(false);
	const [loginForm, setLoginForm] = useState(false);

	const openAuthForm = () => {
		setOpenAuthModal(true);
		setLoginForm(true);
	};

	const onCloseAuthForm = () => {
		setOpenAuthModal(false);
		setLoginForm(false);
	};

	const openRegisterForm = () => setLoginForm(false);

	const openLoginForm = () => setLoginForm(true);

	return (
		<div className={`${darkMode && 'dark'}`}>
			<Navbar
				darkMode={darkMode}
				setDarkMode={() => setDarkMode(!darkMode)}
				openAuthForm={openAuthForm}
			/>
			<Outlet />
			<Modal open={openAuthModal} onClose={onCloseAuthForm} hideHeader>
				{loginForm ? (
					<SignIn
						openRegisterForm={openRegisterForm}
						onCloseAuthForm={onCloseAuthForm}
					/>
				) : (
					<SignUp
						openLoginForm={openLoginForm}
						onCloseAuthForm={onCloseAuthForm}
					/>
				)}
			</Modal>
		</div>
	);
};

export default MainLayout;
