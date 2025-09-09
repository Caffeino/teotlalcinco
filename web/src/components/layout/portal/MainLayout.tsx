import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLoginModal } from '../../../lib/hooks/useLoginModal';
import SignIn from '../../forms/auth/SignIn';
import SignUp from '../../forms/auth/SignUp';
import Modal from '../../modal/Modal';
import Navbar from './Navbar';

const MainLayout = () => {
	const [darkMode, setDarkMode] = useState(false);
	const {
		isLoginForm,
		authModalStatus,
		openAuthForm,
		closeAuthForm,
		openRegisterForm,
		openLoginForm
	} = useLoginModal();

	return (
		<div className={`${darkMode && 'dark'}`}>
			<Navbar
				darkMode={darkMode}
				setDarkMode={() => setDarkMode(!darkMode)}
				openAuthForm={openAuthForm}
			/>
			<Outlet />
			<Modal open={authModalStatus} onClose={closeAuthForm} hideHeader>
				{isLoginForm ? (
					<SignIn
						openRegisterForm={openRegisterForm}
						onCloseAuthForm={closeAuthForm}
					/>
				) : (
					<SignUp
						openLoginForm={openLoginForm}
						onCloseAuthForm={closeAuthForm}
					/>
				)}
			</Modal>
		</div>
	);
};

export default MainLayout;
