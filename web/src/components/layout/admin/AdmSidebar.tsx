import { Power } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SIDE_ADMIN_ROUTES } from '../../../constants/sideRoutes';
import { useAuth } from '../../../lib/hooks/useAuth';
import CharAvatar from '../../cards/CharAvatar';

const AdmSidebar = ({ activeMenu }: { activeMenu?: string }) => {
	const { auth, isAuthenticated, authLogout } = useAuth();

	const navigate = useNavigate();

	const handleLogout = () => {
		authLogout();
		navigate('/');
	};

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

			<div className='py-4'>
				{SIDE_ADMIN_ROUTES.map((item, index) => (
					<button
						key={`menu_${index}`}
						className={`w-full flex items-center gap-4 text-[15px] ${
							activeMenu == item.label
								? 'text-white bg-linear-to-r from-sky-500 to-cyan-400'
								: 'dark:text-slate-400 dark:hover:bg-linear-to-r dark:hover:from-zinc-800 dark:to-zinc-700'
						} hover:text-primary py-3 px-6 rounded-lg mb-3 cursor-pointer`}
						onClick={() => {}}
					>
						<item.icon className='text-xl' />
						{item.label}
					</button>
				))}
				<button
					className='dark:text-slate-400 w-full flex items-center gap-4 text-[15px] hover:text-primary py-3 px-6 rounded-lg mb-3 cursor-pointer'
					onClick={() => handleLogout()}
				>
					<Power className='text-xl' />
					Logout
				</button>
			</div>
		</div>
	);
};

export default AdmSidebar;
