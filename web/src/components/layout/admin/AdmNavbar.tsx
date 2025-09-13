import { LucideSearch, Moon, Sun } from 'lucide-react';
import SwitchButton from '../../buttons/SwitchButton';
import ProfileInfoCard from '../../cards/ProfileInfoCard';
import Logo from '../../common/Logo';

const AdmNavbar = () => {
	return (
		<>
			<header className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-linear-to-t dark:from-blue-950 dark:to-sky-950'>
				<Logo />
				<nav className='flex items-center'></nav>
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
						checked={false}
						toggleCheck={() => {}}
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
