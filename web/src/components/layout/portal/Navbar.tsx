import { ArrowRight, LucideSearch, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/hooks/useAuth';
import { useTheme } from '../../../lib/hooks/useTheme';
import appRoutes from '../../../routes/appRoutes';
import SwitchButton from '../../buttons/SwitchButton';
import ProfileInfoCard from '../../cards/ProfileInfoCard';
import Logo from '../../common/Logo';

interface NavbarProps {
	openAuthForm: () => void;
}

const Navbar = ({ openAuthForm }: NavbarProps) => {
	const { theme, toggleTheme } = useTheme();
	const { isAuthenticated } = useAuth();

	return (
		<>
			<header className='w-[80%] py-2 m-auto flex items-center justify-between backdrop-blur-xl font-medium bg-gray-50 dark:bg-[#252528]'>
				<Logo />
				<nav className='flex items-center'>
					<ul className='flex gap-6 text-slate-800 dark:text-white sm:text-[1rem] font-semibold max-sm:w-60 max-sm:pl-10 max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-cyan-500 max-sm:text-white max-sm:pt-20 sm:items-center transition-all'>
						{appRoutes.publicRoutes &&
							appRoutes.publicRoutes.map((route, iKey) => {
								return (
									<li key={iKey}>
										<Link to={route.path!} className='sm:hover:text-primary'>
											{route.displayText}
										</Link>
									</li>
								);
							})}
					</ul>
				</nav>
				<div className='flex items-center gap-4'>
					<div className='flex justify-center border-r border-gray-300 dark:border-gray-500 px-4 py-[2px]'>
						<button
							className='hover:text-primary dark:text-white cursor-pointer'
							onClick={() => {}}
						>
							<LucideSearch size={20} />
						</button>
					</div>
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
					{!isAuthenticated ? (
						<button
							onClick={openAuthForm}
							className='text-[1rem] max-sm:hidden flex items-center gap-2 px-6 py-2 text-white bg-linear-to-r from-primary to-sky-400 rounded-full cursor-pointer transition-all'
						>
							Login
							<ArrowRight />
						</button>
					) : (
						<div className='hidden md:block'>
							<ProfileInfoCard />
						</div>
					)}
				</div>
			</header>
		</>
	);
};

export default Navbar;
