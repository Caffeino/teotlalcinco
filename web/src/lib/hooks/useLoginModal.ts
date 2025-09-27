import { useState } from 'react';

export const useLoginModal = () => {
	const [authModalStatus, setAuthModalStatus] = useState(false);

	const openAuthForm = () => {
		setAuthModalStatus(true);
	};

	const closeAuthForm = () => {
		setAuthModalStatus(false);
	};

	return {
		authModalStatus,
		openAuthForm,
		closeAuthForm
	};
};
