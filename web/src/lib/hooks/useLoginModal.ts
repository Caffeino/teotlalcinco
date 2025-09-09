import { useState } from 'react';

export const useLoginModal = () => {
	const [authModalStatus, setAuthModalStatus] = useState(false);
	const [isLoginForm, setIsLoginForm] = useState(false);

	const openAuthForm = () => {
		setAuthModalStatus(true);
		setIsLoginForm(true);
	};

	const closeAuthForm = () => {
		setAuthModalStatus(false);
		setIsLoginForm(false);
	};

	const openRegisterForm = () => setIsLoginForm(false);

	const openLoginForm = () => setIsLoginForm(true);

	return {
		isLoginForm,
		authModalStatus,
		openAuthForm,
		closeAuthForm,
		openRegisterForm,
		openLoginForm
	};
};
