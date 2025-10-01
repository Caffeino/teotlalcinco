import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountConfirm from '../../components/forms/auth/AccountConfirm';
import SignUp from '../../components/forms/auth/SignUp';
import MainLayout from '../../components/layout/portal/MainLayout';
import type { AuthUserType } from '../../types';

const initialValue: Partial<AuthUserType> = {
	email: ''
};

const RegisterPage = () => {
	const { token = '' } = useParams();
	const [verifyForm, setVerifyForm] = useState(false);
	const [temporalUser, setTemporalUser] =
		useState<Partial<AuthUserType>>(initialValue);

	useEffect(() => {
		if (!token) return;

		setVerifyForm(true);
	}, [token]);

	const handleTemporalUser = (user: Partial<AuthUserType>) =>
		setTemporalUser(user);

	return (
		<MainLayout>
			<div className='py-1 sm:m-auto max-w-screen-md'>
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
