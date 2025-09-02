import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import publicRoutes from '../../../routes/public';
import Logo from '../../common/Logo';

const Navbar = () => {
	return (
		<header className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>
			<Logo />
			<nav className='flex items-center'>
				<ul className='flex gap-6 text-slate-800 dark:text-white sm:text-[1rem] font-semibold max-sm:w-60 max-sm:pl-10 max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-cyan-500 max-sm:text-white max-sm:pt-20 sm:items-center transition-all'>
					{publicRoutes.map((route, iKey) => {
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
			<div>
				<Link
					to='/'
					className='text-[1rem] max-sm:hidden flex items-center gap-2 bg-primary text-white hover:bg-blue-600/80 px-6 py-2 rounded-full cursor-pointer transition-all'
				>
					Sign In
					<MoveRight />
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
