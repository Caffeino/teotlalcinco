import type { ReactNode } from 'react';
import AdmNavbar from './AdmNavbar';
import AdmSidebar from './AdmSidebar';

const AdmLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<div className='flex'>
				<div className='max-[1080px]:hidden'>
					<AdmSidebar />
				</div>

				<div className='grow mx-6'>
					<AdmNavbar />
					{children}
				</div>
			</div>
		</>
	);
};

export default AdmLayout;
