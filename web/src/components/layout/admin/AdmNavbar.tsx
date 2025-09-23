import { CircleUserRound, Menu, Moon, Power, Sun } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OLogo from '../../../assets/o-logo.svg';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useOnClickOutside } from '../../../lib/hooks/useOnClickOutside';
import { useTheme } from '../../../lib/hooks/useTheme';
import SwitchButton from '../../buttons/SwitchButton';
import CharAvatar from '../../cards/CharAvatar';

const AdmNavbar = () => {
	const { auth, authLogout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [showUserMenu, setShowUserMenu] = useState(false);

	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref, () => setShowUserMenu(false));

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
		<nav className='fixed top-0 z-50 w-full bg-white dark:bg-[#252528]'>
			<div className='px-3 py-3 lg:px-5 lg:pl-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center justify-start rtl:justify-end'>
						<button
							type='button'
							className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						>
							<span className='sr-only'>Open sidebar</span>
							<Menu />
						</button>
						<a href='/' className='flex ms-2 md:me-24'>
							<img src={OLogo} className='h-6 me-2 ms-2' alt='FlowBite Logo' />
							<span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-zinc-400 -mt-1'>
								Teotlal5
							</span>
						</a>
					</div>
					<div className='flex items-center'>
						<div className='flex items-center gap-6'>
							<SwitchButton
								name='theme'
								checked={theme === 'dark'}
								toggleCheck={toggleTheme}
								control={{
									leftValue: <Sun className='text-white' size={20} />,
									rightValue: (
										<Moon
											className='text-slate-800'
											fill='bg-slate-800'
											size={20}
										/>
									)
								}}
							/>
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
									className='absolute right-2 top-14 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-md dark:divide-zinc-600 dark:bg-linear-to-t dark:from-zinc-800 dark:to-zinc-700'
								>
									<div className='px-4 py-3' role='none'>
										<p
											className='text-sm text-gray-900 dark:text-white'
											role='none'
										>
											{name}
										</p>
										<p
											className='text-sm font-medium text-gray-900 truncate dark:text-zinc-300'
											role='none'
										>
											{auth?.email}
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
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default AdmNavbar;
