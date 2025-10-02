import { useState, type ReactNode } from 'react';
import SignIn from '../../forms/auth/SignIn';
import Modal from '../../modal/Modal';
import Footer from './Footer';
import Navbar from './Navbar';

const MainLayout = ({
	state,
	children
}: {
	state?: string;
	children: ReactNode;
}) => {
	const [isOpenedAuthForm, setIsOpenedAuthForm] = useState(false);

	return (
		<>
			<Navbar state={state} openAuthForm={() => setIsOpenedAuthForm(true)} />
			{children}
			<Modal
				open={isOpenedAuthForm}
				onClose={() => setIsOpenedAuthForm(false)}
				hideHeader
			>
				<SignIn onCloseAuthForm={() => setIsOpenedAuthForm(false)} />
			</Modal>
			<Footer />
		</>
	);
};

export default MainLayout;
