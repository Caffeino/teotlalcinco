import { useAuth } from '../../../lib/hooks/useAuth';
import CharAvatar from '../../cards/CharAvatar';

const AdmSidebar = () => {
	const { auth, isAuthenticated } = useAuth();

	const name: string = auth?.profile?.first_name
		? auth?.profile?.first_name
		: auth?.username
			? auth?.username
			: '';

	return (
		<div className='w-65 h-[calc(100vh)] bg-white border-r border-gray-200 dark:bg-zinc-800 dark:border-0 p-5 sticky top-[61px] z-20'>
			{isAuthenticated && (
				<div className='flex flex-col items-center justify-center gap-1'>
					<CharAvatar
						name={name}
						width='w-15'
						height='h-15'
						style='text-zinc-500 dark:text-gray-900 text-xl bg-slate-200 dark:bg-gray-500'
					/>
					<div>
						<h5 className='text-slate-500 dark:text-slate-300 text-center leading-6 mt-1'>
							{auth?.profile?.first_name || ''}
						</h5>
						<p className='text-xs font-medium text-slate-500 dark:text-slate-400 text-center'>
							{auth?.username ? `@${auth.username}` : ''}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdmSidebar;
