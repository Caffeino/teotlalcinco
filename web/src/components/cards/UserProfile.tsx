import { CircleUserRound, Power } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/hooks/useAuth';
import { useOnClickOutside } from '../../lib/hooks/useOnClickOutside';
import CharAvatar from './CharAvatar';

const UserProfile = () => {
	const { auth, authLogout } = useAuth();
	const [showUserMenu, setShowUserMenu] = useState(false);

	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref, () => setShowUserMenu(false));

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
					className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-zinc-700'
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
					className='min-w-48 absolute right-2 top-14 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-md dark:divide-zinc-600 dark:bg-linear-to-t dark:from-zinc-800/95 dark:to-zinc-600'
				>
					<div className='px-4 py-3' role='none'>
						<p className='text-sm text-gray-900 dark:text-white' role='none'>
							{name} {auth.profile?.last_name}
						</p>
						<p
							className='text-xs font-normal text-gray-900 truncate dark:text-zinc-300'
							role='none'
						>
							{auth.email}
						</p>
					</div>
					<div className='py-1'>
						<button
							className='w-full flex flex-row items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer'
							role='menuitem'
						>
							<CircleUserRound size={16} />
							Perfil
						</button>
						<button
							className='w-full flex flex-row items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer'
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
