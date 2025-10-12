import { UserRoundPen } from 'lucide-react';
import DEFAULT_BANNER from '../../assets/default-banner.svg';
import TEMP_LOGO from '../../assets/o-logo.svg';
import AdmLayout from '../../components/layout/admin/AdmLayout';
import { useAuth } from '../../lib/hooks/useAuth';

function ProfilePage({ state }: { state: string }) {
	const { auth } = useAuth();

	return (
		<AdmLayout state={state}>
			<div className='flex items-center justify-center'>
				<div className='w-[90vw] lg:w-[55vw] md:w-[33vw] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
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
			</div>
		</AdmLayout>
	);
}

export default ProfilePage;
