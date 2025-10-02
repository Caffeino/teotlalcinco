import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AccountConfirm from '../../components/forms/auth/AccountConfirm';
import SignUp from '../../components/forms/auth/SignUp';
import MainLayout from '../../components/layout/portal/MainLayout';
import { activateAccount } from '../../lib/api/auth';
import { useAuth } from '../../lib/hooks/useAuth';
import type { AuthUserType } from '../../types';

const initialValue: Partial<AuthUserType> = {
	email: ''
};

const RegisterPage = () => {
	const { isAuthenticated } = useAuth();
	const { token = '' } = useParams();
	const [verifyForm, setVerifyForm] = useState(false);
	const [temporalUser, setTemporalUser] =
		useState<Partial<AuthUserType>>(initialValue);

	useEffect(() => {
		if (!token) return;

		if (token === 'verify') return setVerifyForm(true);

		const activateAccountHandler = async () => {
			try {
				const activation = activateAccount(token);
				console.log('actiovation result', activation);
			} catch (error) {
				console.log(error);
			}
		};

		activateAccountHandler();
	}, [token]);

	const handleTemporalUser = (user: Partial<AuthUserType>) =>
		setTemporalUser(user);

	return isAuthenticated ? (
		<Navigate to='/' replace />
	) : (
		<MainLayout>
			<div className='h-[calc(80vh-7px)] py-1 sm:m-auto max-w-screen-md'>
				<div className='p-10 rounded-lg'>
					<div className='grid grid-cols-1 gap-4 mb-4'>
						<div className='flex items-center justify-center rounded-sm w-full'>
							{!verifyForm ? (
								<SignUp
									showVerifyForm={() => setVerifyForm(true)}
									handleTemporalUser={handleTemporalUser}
								/>
							) : (
								<AccountConfirm email={temporalUser.email} />
							)}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default RegisterPage;
