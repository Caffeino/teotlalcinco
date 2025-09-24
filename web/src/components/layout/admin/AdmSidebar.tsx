import { SIDE_ADMIN_ROUTES } from '../../../constants/sideRoutes';
import { useTheme } from '../../../lib/hooks/useTheme';

const AdmSidebar = ({ state }: { state: string }) => {
	const { isOpenSidebar } = useTheme();

	return (
		<aside
			className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${!isOpenSidebar && '-translate-x-full'} sm:translate-x-0 dark:bg-zinc-800 dark:border-[#2d2d35]`}
			aria-label='Sidebar'
		>
			<div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-linear-to-t dark:from-zinc-900 dark:to-zinc-800'>
				<div className='space-y-2 font-medium'>
					{SIDE_ADMIN_ROUTES.map((item, index) => (
						<button
							key={index}
							className={`w-full flex items-center p-2 group cursor-pointer rounded-lg text-gray-900 hover:bg-gray-100 ${
								state == item.state
									? 'dark:text-zinc-200 dark:bg-linear-to-r dark:from-sky-700 dark:to-sky-900'
									: 'dark:text-zinc-400'
							} dark:hover:text-zinc-200 dark:hover:bg-linear-to-r dark:hover:from-sky-700 dark:hover:to-fuchsia-900`}
						>
							<item.icon className='w-5 h-5' />
							<span className='ms-3'>{item.label}</span>
						</button>
					))}
				</div>
			</div>
		</aside>
	);
};

export default AdmSidebar;
