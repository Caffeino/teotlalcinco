import { useState, type ReactNode } from 'react';
import SignIn from '../../forms/auth/SignIn';
import Modal from '../../modal/Modal';
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
		</>
	);
};

export default MainLayout;
