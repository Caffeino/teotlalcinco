import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Activation from '../../components/forms/auth/Activation';
import SignUp from '../../components/forms/auth/SignUp';
import MainLayout from '../../components/layout/portal/MainLayout';
import { useAuth } from '../../lib/hooks/useAuth';
import type { AuthUserType } from '../../types';

const initialValue: Partial<AuthUserType> = {
	email: ''
};

const RegisterPage = () => {
	const [activationForm, setActivationForm] = useState(false);
	const [registeredUser, setRegisteredUser] =
		useState<Partial<AuthUserType>>(initialValue);

	const { token = '' } = useParams();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!token) return;

		setActivationForm(true);
	}, [token]);

	const handleRegisteredUser = (user: Partial<AuthUserType>) =>
		setRegisteredUser(user);

	return isAuthenticated ? (
		<Navigate to='/' replace />
	) : (
		<MainLayout>
			<div className='h-[calc(80vh-27px)] py-1 sm:m-auto max-w-screen-md'>
				<div className='p-10 rounded-lg'>
					<div className='grid grid-cols-1 gap-4 mb-4'>
						<div className='flex items-center justify-center rounded-sm w-full'>
							{!activationForm ? (
								<SignUp
									showActivationForm={() => setActivationForm(true)}
									handleRegisteredUser={handleRegisteredUser}
								/>
							) : (
								<Activation email={registeredUser.email} />
							)}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default RegisterPage;
