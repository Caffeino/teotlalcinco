import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../lib/hooks/useTheme';
import SwitchButton from '../../buttons/SwitchButton';
import ProfileInfoCard from '../../cards/ProfileInfoCard';

const AdmNavbar = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<>
			<header className='w-full py-2 flex items-center justify-between backdrop-blur-xl font-medium bg-gray-50 dark:bg-[#252528]'>
				<nav className='flex items-center'></nav>
				<div className='flex items-center gap-4'>
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
					<div className='hidden md:block'>
						<ProfileInfoCard />
					</div>
				</div>
			</header>
		</>
	);
};

export default AdmNavbar;
