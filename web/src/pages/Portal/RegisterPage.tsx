import SignUp from '../../components/forms/auth/SignUp';
import MainLayout from '../../components/layout/portal/MainLayout';

const RegisterPage = () => {
	return (
		<MainLayout>
			<div className='py-1 sm:m-auto max-w-screen-xl'>
				<div className='p-2 rounded-lg'>
					<div className='grid grid-cols-1 gap-4 mb-4'>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 w-full dark:bg-zinc-900/30'>
							<SignUp />
						</div>
					</div>
					<div className='grid grid-cols-3 gap-4 mb-4'>
						<div className='flex items-center justify-center h-24 rounded-sm bg-slate-100 dark:bg-zinc-900/30'></div>
						<div className='flex items-center justify-center h-24 rounded-sm bg-slate-100 dark:bg-zinc-900/30'></div>
						<div className='flex items-center justify-center h-24 rounded-sm bg-slate-100 dark:bg-zinc-900/30'></div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default RegisterPage;
