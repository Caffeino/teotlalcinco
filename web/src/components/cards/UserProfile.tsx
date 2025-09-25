import { LayoutDashboard, Power } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/hooks/useAuth';
import { useOnClickOutside } from '../../lib/hooks/useOnClickOutside';
import { useTheme } from '../../lib/hooks/useTheme';
import ThemeToggleButton from '../buttons/ThemeToggleButton';
import CharAvatar from './CharAvatar';

const UserProfile = ({ mainNavbar = false }: { mainNavbar?: boolean }) => {
	const [showUserMenu, setShowUserMenu] = useState(false);
	const { auth, authLogout } = useAuth();
	const { theme, toggleTheme } = useTheme();

	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref, () => setShowUserMenu(false));

	const handleClick = (route: string) => navigate(route);

	const handleLogout = () => {
		authLogout();
		navigate('/');
	};

	const name: string = auth.profile?.first_name
		? auth.profile?.first_name
		: auth.username
			? auth.username
			: '';

	return (
		<>
			<div className='inline-block'>
				<button
					type='button'
					className='flex text-sm bg-slate-200 rounded-full focus:ring-4 focus:ring-gray-400 dark:focus:ring-zinc-700 cursor-pointer'
					onMouseEnter={() => setShowUserMenu(true)}
				>
					<span className='sr-only'>Open user menu</span>
					<CharAvatar
						name={name}
						width='w-8'
						height='h-8'
						style='text-zinc-500 dark:text-gray-900 text-xl bg-slate-200 dark:bg-gray-500'
					/>
				</button>
			</div>
			{showUserMenu && (
				<div
					ref={ref}
					className={`min-w-48 absolute ${mainNavbar ? '-mx-36' : 'right-2'} top-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md border border-gray-200 dark:border-[#2d2d35] dark:divide-zinc-600 dark:bg-linear-to-t dark:from-zinc-800 dark:to-zinc-700`}
				>
					<div className='px-4 py-3' role='none'>
						<p className='text-sm text-slate-600 dark:text-white' role='none'>
							{name} {auth.profile?.last_name}
						</p>
						<p
							className='text-xs font-normal text-slate-500 truncate dark:text-zinc-300'
							role='none'
						>
							{auth.email}
						</p>
					</div>
					<div className='py-1'>
						<button
							className='w-full flex flex-row items-center gap-3 px-4 py-2 cursor-pointer text-sm text-slate-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-500 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-linear-to-r dark:hover:from-sky-700 dark:hover:to-fuchsia-900'
							onClick={() => handleClick('/admin/dashboard')}
						>
							<LayoutDashboard size={16} />
							Dashboard
						</button>
						<button
							className='w-full flex flex-row items-center gap-3 px-4 py-2 cursor-pointer text-sm text-slate-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-500 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-linear-to-r dark:hover:from-sky-700 dark:hover:to-fuchsia-900'
							onClick={toggleTheme}
						>
							<ThemeToggleButton checked={theme === 'dark'} />
						</button>
					</div>
					<div className='py-1'>
						<button
							className='w-full flex flex-row items-center gap-3 px-4 py-2 cursor-pointer text-sm text-slate-600 hover:text-white hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-500 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-linear-to-r dark:hover:from-sky-700 dark:hover:to-fuchsia-900'
							onClick={() => handleLogout()}
						>
							<Power size={16} />
							Salir
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default UserProfile;
