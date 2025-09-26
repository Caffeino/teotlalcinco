import AdmLayout from '../../components/layout/admin/AdmLayout';

const DashboardPage = ({ state }: { state: string }) => {
	return (
		<AdmLayout state={state}>
			<div className='p-4 sm:ml-64'>
				<div className='p-4 border border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
					<div className='grid grid-cols-3 gap-4 mb-4'>
						<div className='flex items-center justify-center h-24 rounded-sm bg-slate-100 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
						<div className='flex items-center justify-center h-24 rounded-sm bg-slate-100 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
						<div className='flex items-center justify-center h-24 rounded-sm bg-slate-100 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
					</div>
					<div className='flex items-center justify-center h-48 mb-4 rounded-sm bg-slate-100 dark:bg-zinc-900/30'>
						<p className='text-2xl text-gray-400 dark:text-gray-500'>
							<svg
								className='w-3.5 h-3.5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 18 18'
							>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M9 1v16M1 9h16'
								/>
							</svg>
						</p>
					</div>
					<div className='grid grid-cols-2 gap-4 mb-4'>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'>
							<p className='text-2xl text-gray-400 dark:text-gray-500'>
								<svg
									className='w-3.5 h-3.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 18 18'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M9 1v16M1 9h16'
									/>
								</svg>
							</p>
						</div>
					</div>
					<div className='flex items-center justify-center h-48 mb-4 rounded-sm bg-slate-100 dark:bg-zinc-900/30'>
						<p className='text-2xl text-gray-400 dark:text-gray-500'>
							<svg
								className='w-3.5 h-3.5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 18 18'
							>
								<path
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M9 1v16M1 9h16'
								/>
							</svg>
						</p>
					</div>
				</div>
			</div>
		</AdmLayout>
	);
};

export default DashboardPage;
