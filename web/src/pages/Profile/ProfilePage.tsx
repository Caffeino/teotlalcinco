import {
	CalendarCheck,
	GalleryVerticalEnd,
	Settings,
	UserRoundPen
} from 'lucide-react';
import DEFAULT_BANNER from '../../assets/default-banner.svg';
import TEMP_LOGO from '../../assets/o-logo.svg';
import MainLayout from '../../components/layout/portal/MainLayout';
import { useAuth } from '../../lib/hooks/useAuth';

const ProfilePage = () => {
	const { auth } = useAuth();

	return (
		<MainLayout state={''}>
			<div className='h-[calc(80vh-27px)] py-1 sm:m-auto max-w-screen-xl'>
				<div className='p-1 rounded-lg'>
					<div className='relative overflow-hidden rounded-lg'>
						<div className='w-full flex-shrink-0'>
							<div className='relative h-56 md:h-72'>
								<img
									src={DEFAULT_BANNER}
									alt='profile-banner'
									className='w-full h-full object-cover'
								/>
							</div>
						</div>
						<div className='absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-gray-800/75 to-gray-600/65'>
							<div className='w-full flex items-center gap-4'>
								<img
									className='w-18 h-18 mx-2 rounded-full shadow-lg'
									src={TEMP_LOGO}
									alt='profile-photo'
								/>
								<div className='w-full flex-row items-center gap-2'>
									<p className='mb-1 text-xl font-medium text-white'>
										{auth.profile?.first_name} {auth.profile?.last_name}
									</p>
									<span className='text-sm text-gray-500 dark:text-gray-400'>
										@{auth.username}
									</span>
								</div>
								<div className='w-full flex items-end justify-end h-10'>
									<button
										type='button'
										className='text-white bg-linear-to-r from-sky-500 to-sky-600 hover:bg-linear-to-r hover:from-sky-500 hover:to-fuchsia-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center cursor-pointer'
									>
										<UserRoundPen />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='p-1 md:flex'>
					<ul className='flex-column space-y space-y-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0'>
						<li>
							<a
								href='#'
								className='inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-sm active w-full dark:bg-blue-600'
								aria-current='page'
							>
								<GalleryVerticalEnd className='mr-2' />
								Posts
							</a>
						</li>
						<li>
							<a
								href='#'
								className='inline-flex items-center px-4 py-3 rounded-sm hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								<CalendarCheck className='mr-2' />
								Eventos
							</a>
						</li>
						<li>
							<a
								href='#'
								className='inline-flex items-center px-4 py-3 rounded-sm hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
							>
								<Settings className='mr-2' />
								Settings
							</a>
						</li>
					</ul>
					<div className='p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
							&Uacute;ltimos 2 d&iacute;as
						</h3>
						<p className='mb-2'>Example content 1. Bla bla bla...</p>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProfilePage;
