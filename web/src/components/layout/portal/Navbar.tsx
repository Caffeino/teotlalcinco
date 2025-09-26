import { LogIn, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import OLogo from '../../../assets/o-logo.svg';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useTheme } from '../../../lib/hooks/useTheme';
import appRoutes from '../../../routes/appRoutes';
import UserProfile from '../../cards/UserProfile';

interface NavbarProps {
	state: string;
	openAuthForm: () => void;
}

const Navbar = ({ state, openAuthForm }: NavbarProps) => {
	const { isAuthenticated } = useAuth();

	const { isOpenSidebar, toggleSidebar } = useTheme();

	return (
		<nav className='bg-white border-b border-gray-200 dark:bg-zinc-800 dark:border-[#2d2d35]'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3'>
				<a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<img src={OLogo} className='h-6 me-1' alt='Teotlal5 Logo' />
					<span className='self-center text-slate-600 text-xl font-semibold font-michroma whitespace-nowrap dark:text-white'>
						Teotlal5
					</span>
				</a>
				<div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
					{!isAuthenticated ? (
						<button
							type='button'
							className='flex items-center justify-between gap-2 text-white bg-linear-to-r from-sky-500 to-sky-600 hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-400 rounded-full text-sm px-4 py-4 h-8 cursor-pointer'
							onClick={openAuthForm}
						>
							Iniciar
							<LogIn size={18} />
						</button>
					) : (
						<UserProfile mainNavbar={true} />
					)}
					<button
						type='button'
						className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						onClick={toggleSidebar}
					>
						<span className='sr-only'>Open main menu</span>
						<Menu />
					</button>
				</div>
				<div
					className={`items-center justify-between ${!isOpenSidebar && 'hidden'} w-full md:flex md:w-auto md:order-1`}
				>
					<ul className='flex flex-col font-semibold p-3 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0'>
						{appRoutes.publicRoutes &&
							appRoutes.publicRoutes.map((route, iKey) => {
								return (
									<li key={iKey}>
										<Link
											to={route.path!}
											className={`block py-2 px-3 md:p-0 ${state == route.state ? 'text-primary' : 'text-slate-700 dark:text-white'} rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
										>
											{route.displayText}
										</Link>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
