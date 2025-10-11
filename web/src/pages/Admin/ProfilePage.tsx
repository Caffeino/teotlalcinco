import AdmLayout from '../../components/layout/admin/AdmLayout';

function ProfilePage({ state }: { state: string }) {
	return (
		<AdmLayout state={state}>
			<div className='p-4 sm:ml-64'>
				<div className='p-4 border border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
					<div className='flex items-center justify-center h-48 mb-4 rounded-sm bg-slate-100 dark:bg-zinc-900/30'></div>
					<div className='grid grid-cols-2 gap-4 mb-4'>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'></div>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'></div>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'></div>
						<div className='flex items-center justify-center rounded-sm bg-slate-100 h-28 dark:bg-zinc-900/30'></div>
					</div>
					<div className='flex items-center justify-center h-48 mb-4 rounded-sm bg-slate-100 dark:bg-zinc-900/30'></div>
				</div>
			</div>
		</AdmLayout>
	);
}

export default ProfilePage;
