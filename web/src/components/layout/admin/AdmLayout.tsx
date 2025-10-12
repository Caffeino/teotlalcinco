import type { ReactNode } from 'react';
import AdmNavbar from './AdmNavbar';
import AdmSidebar from './AdmSidebar';

const AdmLayout = ({
	state,
	children
}: {
	state: string;
	children: ReactNode;
}) => {
	return (
		<>
			<AdmNavbar />
			<div className='p-4 sm:ml-64'>
				<div className='p-4 border border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
					{children}
				</div>
			</div>
			<AdmSidebar state={state} />
		</>
	);
};

export default AdmLayout;
