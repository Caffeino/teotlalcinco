import type { ReactNode } from 'react';
import { useLoginModal } from '../../../lib/hooks/useLoginModal';
import SignIn from '../../forms/auth/SignIn';
import SignUp from '../../forms/auth/SignUp';
import Modal from '../../modal/Modal';
import Navbar from './Navbar';

const MainLayout = ({
	state,
	children
}: {
	state: string;
	children: ReactNode;
}) => {
	const {
		isLoginForm,
		authModalStatus,
		openAuthForm,
		closeAuthForm,
		openRegisterForm,
		openLoginForm
	} = useLoginModal();

	return (
		<>
			<Navbar state={state} openAuthForm={openAuthForm} />
			{children}
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
		</>
	);
};

export default MainLayout;
