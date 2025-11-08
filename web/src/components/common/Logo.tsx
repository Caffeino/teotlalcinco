import { Menu } from 'lucide-react';
import OLogo from '../../assets/o-logo.svg';

const Logo = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
	return (
		<>
			<div className='flex items-center justify-start rtl:justify-end'>
				<button
					onClick={toggleSidebar}
					type='button'
					className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
				>
					<span className='sr-only'>Open sidebar</span>
					<Menu />
				</button>
				<a href='/' className='flex ms-2 md:me-24'>
					<img src={OLogo} className='h-6 me-2 ms-2' alt='Teotlal5 Logo' />
					<span className='self-center text-lg font-medium font-michroma sm:text-lg whitespace-nowrap text-slate-600 dark:text-zinc-300 -mt-1'>
						Texmecom
					</span>
				</a>
			</div>
		</>
	);
};

export default Logo;
