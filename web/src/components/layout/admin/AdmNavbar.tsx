import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../lib/hooks/useTheme';
import SwitchButton, { type ControlProps } from '../../buttons/SwitchButton';
import UserProfile from '../../cards/UserProfile';
import Logo from '../../common/Logo';

const switchButtonControl: ControlProps = {
	leftValue: <Sun className='text-white' size={20} />,
	rightValue: <Moon className='text-slate-800' fill='bg-slate-800' size={20} />
};

const AdmNavbar = () => {
	const { theme, toggleTheme, toggleSidebar } = useTheme();

	return (
		<nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-zinc-800 dark:border-[#2d2d35]'>
			<div className='px-3 py-3 lg:px-5 lg:pl-3'>
				<div className='flex items-center justify-between'>
					<Logo toggleSidebar={toggleSidebar} />
					<div className='flex items-center'>
						<div className='flex items-center gap-6'>
							<SwitchButton
								name='theme'
								checked={theme === 'dark'}
								toggleCheck={toggleTheme}
								control={switchButtonControl}
							/>
							<UserProfile />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default AdmNavbar;
