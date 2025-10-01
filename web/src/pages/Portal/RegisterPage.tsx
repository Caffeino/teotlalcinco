import { useState } from 'react';
import SignUp from '../../components/forms/auth/SignUp';
import MainLayout from '../../components/layout/portal/MainLayout';

const RegisterPage = () => {
	const [tokenForm, setTokenForm] = useState(false);

	return (
		<MainLayout>
			<div className='py-1 sm:m-auto max-w-screen-md'>
				<div className='p-10 rounded-lg'>
					<div className='grid grid-cols-1 gap-4 mb-4'>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 w-full dark:bg-zinc-900/30'>
							{!tokenForm ? (
								<SignUp displayTokenForm={() => setTokenForm(true)} />
							) : (
								<p>Token confirmation form</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default RegisterPage;
